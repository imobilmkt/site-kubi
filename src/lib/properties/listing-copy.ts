import { getPropertyTypePluralLabel, type PropertyType } from "./types";
import { getNeighborhoodBySlug } from "./neighborhoods";
import type { ListingSegments } from "./query";

function purposeVerb(purpose?: "venda" | "locacao") {
  if (purpose === "locacao") return "para alugar";
  if (purpose === "venda") return "à venda";
  return "à venda e para alugar";
}

export function buildListingTitle(segments: ListingSegments): string {
  const typeLabel = segments.type
    ? getPropertyTypePluralLabel(segments.type as PropertyType)
    : "Imóveis";
  const neighborhood = segments.neighborhood ? getNeighborhoodBySlug(segments.neighborhood) : null;
  const place = neighborhood ? `no ${neighborhood.name}` : "em Brasília";

  return `${typeLabel} ${purposeVerb(segments.purpose)} ${place}`;
}

export function buildListingIntro(segments: ListingSegments): string {
  const typeLabel = segments.type
    ? getPropertyTypePluralLabel(segments.type as PropertyType).toLowerCase()
    : "imóveis";
  const neighborhood = segments.neighborhood ? getNeighborhoodBySlug(segments.neighborhood) : null;

  if (neighborhood) {
    return `A Kubi Imóveis reúne as melhores oportunidades de ${typeLabel} ${purposeVerb(segments.purpose)} no ${neighborhood.name}. ${neighborhood.summary} Fale com um de nossos corretores especialistas na região para uma visita ou mais informações.`;
  }

  return `Explore ${typeLabel} ${purposeVerb(segments.purpose)} nas principais regiões de Brasília — Lago Sul, Lago Norte, Plano Piloto e muito mais — com curadoria e atendimento exclusivo da Kubi Imóveis.`;
}

export function buildListingBreadcrumbs(segments: ListingSegments) {
  const items = [
    { name: "Imóveis", url: "/imoveis" },
  ];
  if (segments.purpose) {
    items.push({
      name: segments.purpose === "venda" ? "Comprar" : "Alugar",
      url: `/imoveis/${segments.purpose}`,
    });
  }
  if (segments.purpose && segments.type) {
    items.push({
      name: getPropertyTypePluralLabel(segments.type as PropertyType),
      url: `/imoveis/${segments.purpose}/${segments.type}`,
    });
  }
  if (segments.purpose && segments.type && segments.neighborhood) {
    const n = getNeighborhoodBySlug(segments.neighborhood);
    items.push({
      name: n?.name ?? segments.neighborhood,
      url: `/imoveis/${segments.purpose}/${segments.type}/${segments.neighborhood}`,
    });
  }
  return items;
}
