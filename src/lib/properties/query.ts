import {
  PROPERTY_TYPES,
  type PropertyFilters,
  type PropertySortOption,
  type PropertyType,
} from "./types";
import { getNeighborhoodBySlug } from "./neighborhoods";

export type ListingSegments = {
  purpose?: "venda" | "locacao";
  type?: string;
  neighborhood?: string;
};

/** Valida e tipa os segmentos de path de /imoveis/[[...segments]]. `null` = combinação inválida (404). */
export function parseSegments(segments: string[] | undefined): ListingSegments | null {
  if (!segments || segments.length === 0) return {};

  const [purposeSeg, typeSeg, neighborhoodSeg, ...rest] = segments;
  if (rest.length > 0) return null;

  if (purposeSeg && purposeSeg !== "venda" && purposeSeg !== "locacao") return null;
  if (typeSeg && !PROPERTY_TYPES.some((t) => t.slug === typeSeg)) return null;
  if (neighborhoodSeg && !getNeighborhoodBySlug(neighborhoodSeg)) return null;
  // Bairro só é válido quando o tipo também foi informado (mantém a hierarquia da URL).
  if (neighborhoodSeg && !typeSeg) return null;

  return {
    purpose: purposeSeg as "venda" | "locacao" | undefined,
    type: typeSeg,
    neighborhood: neighborhoodSeg,
  };
}

const SORT_OPTIONS: PropertySortOption[] = [
  "relevance",
  "price-asc",
  "price-desc",
  "area-asc",
  "area-desc",
  "newest",
];

export type ListingSearchParams = { [key: string]: string | string[] | undefined };

function getParam(searchParams: ListingSearchParams, key: string): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

/** True quando a URL tem apenas os parâmetros "neutros" de paginação/ordenação — ou seja, é uma página de categoria indexável. */
export function isCleanCategoryQuery(searchParams: ListingSearchParams) {
  const allowed = new Set(["pagina", "ordenar"]);
  return Object.keys(searchParams).every((key) => allowed.has(key));
}

export function buildFiltersFromRequest(
  segments: ListingSegments,
  searchParams: ListingSearchParams,
): PropertyFilters {
  const sortParam = getParam(searchParams, "ordenar");
  const sort = SORT_OPTIONS.includes(sortParam as PropertySortOption)
    ? (sortParam as PropertySortOption)
    : "relevance";

  const page = Number(getParam(searchParams, "pagina") ?? "1") || 1;

  const neighborhoodsParam = getParam(searchParams, "bairro");
  const neighborhoods = segments.neighborhood
    ? [segments.neighborhood]
    : neighborhoodsParam
      ? neighborhoodsParam.split(",")
      : undefined;

  const typeParam = getParam(searchParams, "tipo");
  const types: PropertyType[] | undefined = segments.type
    ? [segments.type as PropertyType]
    : typeParam
      ? (typeParam.split(",") as PropertyType[])
      : undefined;

  const featuresParam = getParam(searchParams, "caracteristicas");

  return {
    purpose: segments.purpose,
    types,
    neighborhoods,
    priceMin: numberParam(searchParams, "precoMin"),
    priceMax: numberParam(searchParams, "precoMax"),
    bedrooms: numberParam(searchParams, "quartos"),
    suites: numberParam(searchParams, "suites"),
    parkingSpots: numberParam(searchParams, "vagas"),
    areaMin: numberParam(searchParams, "areaMin"),
    areaMax: numberParam(searchParams, "areaMax"),
    features: featuresParam ? featuresParam.split(",") : undefined,
    code: getParam(searchParams, "codigo"),
    sort,
    page,
    pageSize: 12,
  };
}

function numberParam(searchParams: ListingSearchParams, key: string) {
  const raw = getParam(searchParams, key);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}
