/**
 * Modelo de dados de imóvel. Este é o contrato estável que toda a camada de
 * apresentação (listagens, página do imóvel, SEO/JSON-LD) consome — ele não
 * deve mudar quando trocarmos o MockProvider pelo NidotecProvider. Qualquer
 * particularidade do CRM Nidotec deve ser *mapeada* para este formato dentro
 * do próprio NidotecProvider, nunca vazada para o restante do app.
 */

export type PropertyPurpose = "venda" | "locacao" | "ambos";

/** Finalidade "roteável": toda combinação "ambos" aparece nas duas rotas. */
export type RoutablePurpose = "venda" | "locacao";

export const PROPERTY_TYPES = [
  { slug: "apartamento", label: "Apartamento", labelPlural: "Apartamentos" },
  { slug: "casa", label: "Casa", labelPlural: "Casas" },
  {
    slug: "casa-em-condominio",
    label: "Casa em condomínio",
    labelPlural: "Casas em condomínio",
  },
  { slug: "cobertura", label: "Cobertura", labelPlural: "Coberturas" },
  { slug: "kitnet-studio", label: "Kitnet/Studio", labelPlural: "Kitnets/Studios" },
  { slug: "lote-terreno", label: "Lote/Terreno", labelPlural: "Lotes/Terrenos" },
  { slug: "sala-comercial", label: "Sala comercial", labelPlural: "Salas comerciais" },
  { slug: "loja", label: "Loja", labelPlural: "Lojas" },
  { slug: "galpao", label: "Galpão", labelPlural: "Galpões" },
  { slug: "rural", label: "Imóvel rural", labelPlural: "Imóveis rurais" },
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number]["slug"];

export type PropertyStatus =
  | "disponivel"
  | "reservado"
  | "vendido"
  | "alugado"
  | "lancamento";

export type PropertyPhoto = {
  url: string;
  alt: string;
  isCover?: boolean;
};

export type PropertyAddress = {
  city: string;
  state: "DF";
  neighborhoodSlug: string;
  neighborhood: string;
  block?: string;
  /** Quando true, omitimos o endereço exato nas páginas públicas. */
  hideExactAddress?: boolean;
  exactAddress?: string;
};

export type PropertyAgent = {
  name: string;
  creci?: string;
  phone?: string;
  whatsapp?: string;
  photoUrl?: string;
};

export type Property = {
  id: string;
  /** Código de referência exibido ao cliente, ex: "KB1234". */
  code: string;
  /** Slug final da URL, sem os segmentos de finalidade/tipo/bairro. Inclui o código. */
  slug: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;

  salePrice?: number;
  rentPrice?: number;
  condoFee?: number;
  iptu?: number;

  usableArea?: number;
  totalArea?: number;

  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  parkingSpots?: number;
  floor?: number;

  furnished?: boolean;
  acceptsFinancing?: boolean;
  acceptsTrade?: boolean;

  /** Características do imóvel, ex: "Piscina privativa", "Churrasqueira". */
  features: string[];
  /** Lazer/infraestrutura do condomínio, ex: "Salão de festas", "Portaria 24h". */
  condoAmenities: string[];

  address: PropertyAddress;
  coordinates?: { lat: number; lng: number };

  photos: PropertyPhoto[];
  videoUrl?: string;
  virtualTourUrl?: string;

  agent: PropertyAgent;

  createdAt: string;
  updatedAt: string;

  /** Marca imóveis fictícios do MockProvider — nunca deve aparecer em produção com a Nidotec. */
  isFictional?: boolean;
};

export type PropertySortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "area-asc"
  | "area-desc"
  | "newest";

export type PropertyFilters = {
  purpose?: RoutablePurpose;
  types?: PropertyType[];
  neighborhoods?: string[];
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  suites?: number;
  parkingSpots?: number;
  areaMin?: number;
  areaMax?: number;
  features?: string[];
  code?: string;
  sort?: PropertySortOption;
  page?: number;
  pageSize?: number;
};

export type PropertyListResult = {
  items: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function getPropertyTypeLabel(type: PropertyType) {
  return PROPERTY_TYPES.find((t) => t.slug === type)?.label ?? type;
}

export function getPropertyTypePluralLabel(type: PropertyType) {
  return PROPERTY_TYPES.find((t) => t.slug === type)?.labelPlural ?? type;
}

/** Converte a finalidade do imóvel nas finalidades "roteáveis" (URLs). */
export function routablePurposes(purpose: PropertyPurpose): RoutablePurpose[] {
  if (purpose === "ambos") return ["venda", "locacao"];
  return [purpose];
}

export function getCoverPhoto(property: Property): PropertyPhoto | undefined {
  return property.photos.find((p) => p.isCover) ?? property.photos[0];
}
