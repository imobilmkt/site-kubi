import { buildUrlsetXml, xmlResponse, type SitemapUrl } from "@/lib/seo/sitemap";
import { getAllProperties } from "@/lib/properties";
import { routablePurposes } from "@/lib/properties/types";
import { servicePages } from "@/lib/content/service-pages";
import { complementaryServices } from "@/lib/content/complementary-services";


const STATIC_PAGES = [
  "/",
  "/sobre",
  "/equipe",
  "/depoimentos",
  "/trabalhe-conosco",
  "/contato",
  "/bairros",
  "/blog",
  "/faq",
  "/servicos",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/politica-de-cookies",
  "/imoveis",
];

/** Páginas institucionais, de serviço e as combinações de categoria de imóveis que têm ao menos 1 resultado (evita indexar combinação vazia). */
export async function GET() {
  const properties = await getAllProperties();

  const purposeSet = new Set<string>();
  const typeSet = new Set<string>();
  const leafSet = new Set<string>();

  for (const property of properties) {
    for (const purpose of routablePurposes(property.purpose)) {
      purposeSet.add(`/imoveis/${purpose}`);
      typeSet.add(`/imoveis/${purpose}/${property.type}`);
      leafSet.add(`/imoveis/${purpose}/${property.type}/${property.address.neighborhoodSlug}`);
    }
  }

  const servicePageSlugs = new Set(servicePages.map((s) => s.slug));
  const newComplementaryServices = complementaryServices.filter(
    (s) => !servicePageSlugs.has(s.slug),
  );

  const urls: SitemapUrl[] = [
    ...STATIC_PAGES.map((loc) => ({ loc, changeFrequency: "weekly" as const })),
    ...servicePages.map((s) => ({ loc: `/${s.slug}`, changeFrequency: "monthly" as const })),
    ...newComplementaryServices.map((s) => ({ loc: s.href, changeFrequency: "monthly" as const })),
    ...[...purposeSet, ...typeSet, ...leafSet].map((loc) => ({
      loc,
      changeFrequency: "daily" as const,
    })),
  ];

  return xmlResponse(buildUrlsetXml(urls));
}
