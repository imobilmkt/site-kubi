import type { Property, PropertyFilters, PropertyListResult } from "./types";

/**
 * Contrato que qualquer fonte de dados de imóveis precisa implementar.
 * Hoje existe o MockProvider (20 imóveis fictícios); no futuro o
 * NidotecProvider substituirá/complementará o mock sem que nenhuma página
 * precise mudar — todas consomem apenas esta interface.
 */
export interface PropertyProvider {
  /** Lista imóveis aplicando filtros, ordenação e paginação. */
  list(filters: PropertyFilters): Promise<PropertyListResult>;

  /** Busca um imóvel pelo slug completo (último segmento da URL, com código). */
  getBySlug(slug: string): Promise<Property | null>;

  /** Busca um imóvel pelo código de referência (ex: "KB1234"). */
  getByCode(code: string): Promise<Property | null>;

  /** Imóveis marcados como destaque, para a home. */
  listFeatured(limit?: number): Promise<Property[]>;

  /** Imóveis semelhantes (mesmo tipo/bairro/faixa de preço), para a página do imóvel. */
  listSimilar(property: Property, limit?: number): Promise<Property[]>;

  /** Todos os imóveis — usado para gerar sitemap e páginas estáticas (generateStaticParams). */
  listAll(): Promise<Property[]>;
}
