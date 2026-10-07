import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllProperties,
  getPropertyBySlug,
  getSimilarProperties,
} from "@/lib/properties";
import { routablePurposes, type RoutablePurpose } from "@/lib/properties/types";
import { getPropertyUrl, getCategoryUrl } from "@/lib/properties/url";
import { buildListingBreadcrumbs } from "@/lib/properties/listing-copy";
import { getNeighborhoodBySlug } from "@/lib/properties/neighborhoods";
import { formatBRL, getDisplayPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { propertyJsonLd } from "@/lib/seo/jsonld";
import { Gallery } from "@/components/property/Gallery";
import { PropertySpecs } from "@/components/property/PropertySpecs";
import { StickyMobileCta } from "@/components/property/StickyMobileCta";
import { FinancingSimulator } from "@/components/property/FinancingSimulator";
import { ShareButtons } from "@/components/property/ShareButtons";
import { UnavailableBanner } from "@/components/property/UnavailableBanner";
import { PropertyViewTracker } from "@/components/property/PropertyViewTracker";
import { VisitForm } from "@/components/forms/VisitForm";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyCtaButtons } from "@/components/property/PropertyCtaButtons";

type RouteParams = { finalidade: string; tipo: string; bairro: string; slug: string };
type PageProps = { params: Promise<RouteParams> };

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.flatMap((property) =>
    routablePurposes(property.purpose).map((finalidade) => ({
      finalidade,
      tipo: property.type,
      bairro: property.address.neighborhoodSlug,
      slug: property.slug,
    })),
  );
}

/**
 * Resolve o imóvel e valida a URL. Duas situações tratadas sem 404 seco
 * (ver UnavailableBanner e o redirect abaixo):
 *   1. Slug existe mas o imóvel foi vendido/alugado: a página continua no
 *      ar, com aviso de indisponibilidade + imóveis semelhantes — preserva
 *      o link (compartilhado, indexado, com backlinks) em vez de quebrá-lo.
 *   2. Slug não existe mais (removido do feed): 301 para a listagem da
 *      mesma finalidade/tipo/bairro pedida na URL, que é o conteúdo mais
 *      relevante disponível para quem chegou por aquele link.
 * Incompatibilidade de segmentos (ex.: tipo errado na URL) -> 301 para a
 * URL canônica do imóvel, evitando conteúdo duplicado.
 */
async function resolveProperty({ finalidade, tipo, bairro, slug }: RouteParams) {
  if (finalidade !== "venda" && finalidade !== "locacao") notFound();
  if (!getNeighborhoodBySlug(bairro)) notFound();

  const property = await getPropertyBySlug(slug);
  if (!property) {
    permanentRedirect(getCategoryUrl({ purpose: finalidade as RoutablePurpose, type: tipo, neighborhood: bairro }));
  }

  const canonical = getPropertyUrl(property, finalidade as RoutablePurpose);
  const validPurpose = routablePurposes(property.purpose).includes(finalidade as RoutablePurpose);
  if (!validPurpose || tipo !== property.type || bairro !== property.address.neighborhoodSlug) {
    permanentRedirect(canonical);
  }

  return { property, finalidade: finalidade as RoutablePurpose };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { property } = await resolveProperty(params);
  const canonical = getPropertyUrl(property, params.finalidade as RoutablePurpose);
  const unavailable = property.status === "vendido" || property.status === "alugado";

  return {
    title: property.title,
    description: property.description.slice(0, 155),
    alternates: { canonical },
    robots: unavailable ? { index: false, follow: true } : undefined,
    // A imagem de Open Graph é gerada dinamicamente por opengraph-image.tsx
    // (foto de capa + título + preço + marca), não precisa ser repetida aqui.
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 155),
    },
  };
}

export default async function PropertyPage(props: PageProps) {
  const params = await props.params;
  const { property, finalidade } = await resolveProperty(params);

  const canonical = getPropertyUrl(property, finalidade);
  const breadcrumbItems = [
    ...buildListingBreadcrumbs({
      purpose: finalidade,
      type: property.type,
      neighborhood: property.address.neighborhoodSlug,
    }),
    { name: property.title, url: canonical },
  ];

  const similar = await getSimilarProperties(property, 4);
  const unavailable = property.status === "vendido" || property.status === "alugado";

  return (
    <main className="pb-24 pt-10 lg:pb-10">
      <JsonLd data={propertyJsonLd(property, `${siteConfig.url}${canonical}`)} />
      <PropertyViewTracker
        code={property.code}
        purpose={property.purpose}
        type={property.type}
        neighborhood={property.address.neighborhood}
        price={property.salePrice ?? property.rentPrice}
      />

      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Gallery photos={property.photos} title={property.title} />

            <div className="mt-8">
              {unavailable && (
                <div className="mb-6">
                  <UnavailableBanner status={property.status} />
                </div>
              )}

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
                    {property.title}
                  </h1>
                  <p className="mt-1 text-kubi-gray">
                    {property.address.neighborhood}
                    {property.address.block ? ` — ${property.address.block}` : ""}
                    {!property.address.hideExactAddress && property.address.exactAddress
                      ? ` — ${property.address.exactAddress}`
                      : ""}
                  </p>
                </div>
                <ShareButtons title={property.title} />
              </div>

              <p className="mt-4 font-heading text-3xl font-semibold text-kubi-black">
                {getDisplayPrice(property)}
              </p>
              <p className="text-sm text-kubi-gray">
                {property.condoFee ? `Condomínio ${formatBRL(property.condoFee)}` : ""}
                {property.condoFee && property.iptu ? " · " : ""}
                {property.iptu ? `IPTU ${formatBRL(property.iptu)}` : ""}
              </p>

              <p className="mt-6 whitespace-pre-line text-kubi-black/90">
                {property.description}
              </p>

              {property.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-heading text-lg font-semibold text-kubi-black">
                    Características
                  </h2>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-kubi-black/85 sm:grid-cols-3">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-kubi-orange" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.condoAmenities.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-heading text-lg font-semibold text-kubi-black">
                    Lazer do condomínio
                  </h2>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-kubi-black/85 sm:grid-cols-3">
                    {property.condoAmenities.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-kubi-orange" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <h2 className="font-heading text-lg font-semibold text-kubi-black">
                  Ficha técnica
                </h2>
                <div className="mt-3">
                  <PropertySpecs property={property} />
                </div>
              </div>

              {property.salePrice && !unavailable && (
                <div className="mt-8">
                  <FinancingSimulator salePrice={property.salePrice} />
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-card border border-kubi-gray-200 p-6">
              <p className="text-sm text-kubi-gray">Ref. {property.code}</p>
              <p className="mt-1 font-heading text-2xl font-semibold text-kubi-black">
                {getDisplayPrice(property)}
              </p>

              <div className="mt-4">
                <PropertyCtaButtons code={property.code} title={property.title} />
              </div>
            </div>

            <div id="agendar-visita" className="scroll-mt-24 rounded-card border border-kubi-gray-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-kubi-black">
                Agendar visita
              </h2>
              <div className="mt-4">
                <VisitForm propertyCode={property.code} />
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-kubi-black">
              Imóveis semelhantes
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </Container>

      <StickyMobileCta propertyCode={property.code} title={property.title} />
    </main>
  );
}
