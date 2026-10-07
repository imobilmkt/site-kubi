export const BLOG_CATEGORIES = [
  { slug: "comprar", label: "Comprar" },
  { slug: "vender", label: "Vender" },
  { slug: "alugar", label: "Alugar" },
  { slug: "investir", label: "Investir" },
  { slug: "financiamento", label: "Financiamento" },
  { slug: "documentacao", label: "Documentação" },
  { slug: "bairros-de-brasilia", label: "Bairros de Brasília" },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]["slug"];

export function getCategoryLabel(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
