import type { PropertyProvider } from "./provider";
import type { Property, PropertyFilters, PropertyListResult } from "./types";
import { routablePurposes } from "./types";
import { mockProperties } from "./mock-data";

const DEFAULT_PAGE_SIZE = 12;

function matchesFilters(property: Property, filters: PropertyFilters): boolean {
  if (filters.purpose && !routablePurposes(property.purpose).includes(filters.purpose)) {
    return false;
  }
  if (filters.types?.length && !filters.types.includes(property.type)) {
    return false;
  }
  if (
    filters.neighborhoods?.length &&
    !filters.neighborhoods.includes(property.address.neighborhoodSlug)
  ) {
    return false;
  }
  if (filters.code && property.code.toLowerCase() !== filters.code.toLowerCase()) {
    return false;
  }

  const relevantPrice =
    filters.purpose === "locacao"
      ? property.rentPrice
      : filters.purpose === "venda"
        ? property.salePrice
        : (property.salePrice ?? property.rentPrice);

  if (filters.priceMin && (relevantPrice ?? 0) < filters.priceMin) return false;
  if (filters.priceMax && (relevantPrice ?? Infinity) > filters.priceMax) return false;

  if (filters.bedrooms && (property.bedrooms ?? 0) < filters.bedrooms) return false;
  if (filters.suites && (property.suites ?? 0) < filters.suites) return false;
  if (filters.parkingSpots && (property.parkingSpots ?? 0) < filters.parkingSpots) {
    return false;
  }
  if (filters.areaMin && (property.usableArea ?? 0) < filters.areaMin) return false;
  if (filters.areaMax && (property.usableArea ?? Infinity) > filters.areaMax) return false;

  if (filters.features?.length) {
    const all = [...property.features, ...property.condoAmenities];
    if (!filters.features.every((f) => all.includes(f))) return false;
  }

  return true;
}

function sortProperties(items: Property[], sort: PropertyFilters["sort"]): Property[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort(
        (a, b) => (a.salePrice ?? a.rentPrice ?? 0) - (b.salePrice ?? b.rentPrice ?? 0),
      );
    case "price-desc":
      return sorted.sort(
        (a, b) => (b.salePrice ?? b.rentPrice ?? 0) - (a.salePrice ?? a.rentPrice ?? 0),
      );
    case "area-asc":
      return sorted.sort((a, b) => (a.usableArea ?? 0) - (b.usableArea ?? 0));
    case "area-desc":
      return sorted.sort((a, b) => (b.usableArea ?? 0) - (a.usableArea ?? 0));
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      // "relevance": destaques primeiro, depois mais recentes
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }
}

export class MockProvider implements PropertyProvider {
  private data = mockProperties;

  async list(filters: PropertyFilters): Promise<PropertyListResult> {
    const filtered = this.data.filter((p) => matchesFilters(p, filters));
    const sorted = sortProperties(filtered, filters.sort);

    const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE;
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const start = (page - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);

    return {
      items,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
    };
  }

  async getBySlug(slug: string): Promise<Property | null> {
    return this.data.find((p) => p.slug === slug) ?? null;
  }

  async getByCode(code: string): Promise<Property | null> {
    return this.data.find((p) => p.code.toLowerCase() === code.toLowerCase()) ?? null;
  }

  async listFeatured(limit = 6): Promise<Property[]> {
    return this.data
      .filter((p) => p.featured && p.status !== "vendido" && p.status !== "alugado")
      .slice(0, limit);
  }

  async listSimilar(property: Property, limit = 4): Promise<Property[]> {
    return this.data
      .filter(
        (p) =>
          p.id !== property.id &&
          p.type === property.type &&
          p.address.neighborhoodSlug === property.address.neighborhoodSlug &&
          p.status !== "vendido" &&
          p.status !== "alugado",
      )
      .slice(0, limit)
      .concat(
        this.data.filter(
          (p) =>
            p.id !== property.id &&
            p.address.neighborhoodSlug === property.address.neighborhoodSlug &&
            p.status !== "vendido" &&
            p.status !== "alugado",
        ),
      )
      .filter((p, index, arr) => arr.findIndex((x) => x.id === p.id) === index)
      .slice(0, limit);
  }

  async listAll(): Promise<Property[]> {
    return this.data;
  }
}
