import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { neighborhoods, getNeighborhoodBySlug } from "@/lib/properties/neighborhoods";
import { neighborhoodImages } from "@/lib/properties/neighborhood-images";
import { getNeighborhoodContent } from "@/lib/content/neighborhood-content";
import { getProperties } from "@/lib/properties";
import { NeighborhoodMapLoader } from "@/components/content/NeighborhoodMapLoader";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) return {};

  return {
    title: `${neighborhood.name} — Guia do bairro e imóveis`,
    description: `Imobiliária no ${neighborhood.name}: perfil da região, infraestrutura, faixa de preço e imóveis disponíveis à venda e para alugar com a Kubi Imóveis.`,
    alternates: { canonical: `/bairros/${neighborhood.slug}` },
  };
}

export default async function BairroPage(props: PageProps) {
  const { slug } = await props.params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const content = getNeighborhoodContent(slug);
  const image = neighborhoodImages[slug];
  const { items: properties } = await getProperties({ neighborhoods: [slug], pageSize: 8 });

  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Guia de bairros", url: "/bairros" },
            { name: neighborhood.name, url: `/bairros/${slug}` },
          ]}
        />

        {image && (
          <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-card bg-kubi-gray-100">
            <Image src={image.url} alt={image.alt} fill sizes="100vw" className="object-cover" priority />
          </div>
        )}

        <h1 className="mt-6 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Imobiliária no {neighborhood.name}: guia completo do bairro
        </h1>
        <p className="mt-3 text-kubi-gray">
          Faixa de preço de imóveis: {neighborhood.priceRangeHint}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {content?.profile.map((paragraph, i) => (
              <p key={i} className="mt-4 text-kubi-black/85">
                {paragraph}
              </p>
            ))}

            {content && (
              <div className="mt-8 rounded-card bg-kubi-gray-50 p-5">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-kubi-gray-700">
                  Ideal para
                </h2>
                <p className="mt-2 text-sm text-kubi-black/85">{content.idealFor}</p>
              </div>
            )}

            {content && content.infrastructure.length > 0 && (
              <div className="mt-8">
                <h2 className="font-heading text-xl font-semibold text-kubi-black">
                  Infraestrutura do {neighborhood.name}
                </h2>
                <ul className="mt-4 space-y-2">
                  {content.infrastructure.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-kubi-black/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kubi-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside>
            <NeighborhoodMapLoader
              center={neighborhood.coordinates}
              properties={properties.filter((p) => p.coordinates)}
            />
            <div className="mt-6 rounded-card border border-kubi-gray-200 p-5">
              <h2 className="font-heading font-semibold text-kubi-black">
                Quer comprar ou alugar no {neighborhood.name}?
              </h2>
              <p className="mt-2 text-sm text-kubi-gray">
                Fale com um corretor especialista na região.
              </p>
              <Link
                href="/contato"
                className="mt-4 inline-block rounded-full bg-kubi-orange px-5 py-2.5 text-sm font-semibold text-kubi-black transition-colors hover:bg-kubi-orange-dark hover:text-kubi-white"
              >
                Falar com a Kubi
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold text-kubi-black">
              Imóveis disponíveis no {neighborhood.name}
            </h2>
            <Link
              href={`/imoveis/venda?bairro=${slug}`}
              className="hidden shrink-0 text-sm font-semibold text-kubi-orange-dark hover:underline sm:block"
            >
              Ver todos →
            </Link>
          </div>

          {properties.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-kubi-gray">
              Nenhum imóvel disponível no momento nesta região. Fale com a Kubi — podemos
              ter oportunidades que ainda não estão no site.
            </p>
          )}
        </div>
      </Container>
    </main>
  );
}
