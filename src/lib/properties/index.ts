import { cacheLife, cacheTag } from "next/cache";
import { MockProvider } from "./mock-provider";
import { NidotecProvider } from "./nidotec-provider";
import type { PropertyProvider } from "./provider";
import type { Property, PropertyFilters } from "./types";

export * from "./types";
export { neighborhoods, getNeighborhoodBySlug } from "./neighborhoods";

/**
 * Fábrica do provider ativo. Controlada por env var para permitir alternar
 * entre dados fictícios (mock) e o CRM Nidotec sem alterar nenhuma página.
 * Ver README para instruções de como ligar a integração Nidotec quando a
 * documentação da API estiver disponível.
 */
function createProvider(): PropertyProvider {
  if (process.env.PROPERTY_PROVIDER === "nidotec") {
    return new NidotecProvider();
  }
  return new MockProvider();
}

const provider = createProvider();

/**
 * Tag genérica de todos os imóveis. Invalidada pela rota /api/revalidate
 * sempre que o CRM avisar sobre qualquer criação/alteração/remoção, e
 * revalidada automaticamente a cada hora como segurança (cacheLife).
 */
const PROPERTIES_TAG = "properties";

function propertyTag(slugOrCode: string) {
  return `property:${slugOrCode}`;
}

export async function getProperties(filters: PropertyFilters) {
  "use cache";
  cacheTag(PROPERTIES_TAG);
  cacheLife("hours");
  return provider.list(filters);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  "use cache";
  cacheTag(PROPERTIES_TAG, propertyTag(slug));
  cacheLife("hours");
  return provider.getBySlug(slug);
}

export async function getPropertyByCode(code: string): Promise<Property | null> {
  "use cache";
  cacheTag(PROPERTIES_TAG, propertyTag(code));
  cacheLife("hours");
  return provider.getByCode(code);
}

export async function getFeaturedProperties(limit?: number) {
  "use cache";
  cacheTag(PROPERTIES_TAG);
  cacheLife("hours");
  return provider.listFeatured(limit);
}

export async function getSimilarProperties(property: Property, limit?: number) {
  "use cache";
  cacheTag(PROPERTIES_TAG);
  cacheLife("hours");
  return provider.listSimilar(property, limit);
}

export async function getAllProperties() {
  "use cache";
  cacheTag(PROPERTIES_TAG);
  cacheLife("hours");
  return provider.listAll();
}

export { PROPERTIES_TAG, propertyTag };
