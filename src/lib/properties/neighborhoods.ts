/**
 * Lista canônica de bairros/regiões administrativas atendidas pela Kubi.
 * Usada pela camada de imóveis (endereço, filtros), pelas páginas de
 * categoria (/imoveis/[finalidade]/[tipo]/[bairro]) e pelo guia de bairros.
 * Adicionar uma região aqui é suficiente para que ela passe a existir em
 * todo o site (filtros, sitemap, guia de bairros).
 */
export type Neighborhood = {
  slug: string;
  name: string;
  region: "Lago Sul" | "Lago Norte" | "Plano Piloto" | "Outras regiões";
  /** Usado como ponto central aproximado para o mapa do guia de bairros. */
  coordinates: { lat: number; lng: number };
  priceRangeHint: string;
  summary: string;
};

export const neighborhoods: Neighborhood[] = [
  {
    slug: "lago-sul",
    name: "Lago Sul",
    region: "Lago Sul",
    coordinates: { lat: -15.8398, lng: -47.8514 },
    priceRangeHint: "R$ 1,8 milhão a R$ 15 milhões",
    summary:
      "Uma das regiões mais valorizadas de Brasília, com casas de alto padrão à beira do Lago Paranoá, grandes terrenos arborizados e proximidade com embaixadas e clubes.",
  },
  {
    slug: "lago-norte",
    name: "Lago Norte",
    region: "Lago Norte",
    coordinates: { lat: -15.7347, lng: -47.8622 },
    priceRangeHint: "R$ 1,2 milhão a R$ 9 milhões",
    summary:
      "Região residencial nobre às margens do Lago Paranoá, com casas espaçosas, condomínios fechados e fácil acesso à Asa Norte e ao Setor de Clubes.",
  },
  {
    slug: "asa-sul",
    name: "Asa Sul",
    region: "Plano Piloto",
    coordinates: { lat: -15.8148, lng: -47.9127 },
    priceRangeHint: "R$ 600 mil a R$ 4 milhões",
    summary:
      "Superquadras planejadas por Lucio Costa, com apartamentos amplos, muita arborização e comércio local de bairro a poucos passos de casa.",
  },
  {
    slug: "asa-norte",
    name: "Asa Norte",
    region: "Plano Piloto",
    coordinates: { lat: -15.7633, lng: -47.8822 },
    priceRangeHint: "R$ 550 mil a R$ 3,8 milhões",
    summary:
      "Tão tradicional quanto a Asa Sul, reúne superquadras residenciais, universidades e uma vida de bairro intensa, com ótima infraestrutura de serviços.",
  },
  {
    slug: "sudoeste",
    name: "Sudoeste",
    region: "Outras regiões",
    coordinates: { lat: -15.7975, lng: -47.9339 },
    priceRangeHint: "R$ 700 mil a R$ 3,5 milhões",
    summary:
      "Bairro planejado e arborizado, com prédios mais recentes, excelente qualidade de vida e grande procura por quem busca apartamentos modernos no Plano Piloto.",
  },
  {
    slug: "noroeste",
    name: "Noroeste",
    region: "Outras regiões",
    coordinates: { lat: -15.7441, lng: -47.9218 },
    priceRangeHint: "R$ 800 mil a R$ 4,5 milhões",
    summary:
      "O bairro mais novo do Plano Piloto, com certificação de sustentabilidade, prédios modernos, ciclovias e crescente oferta de lazer e gastronomia.",
  },
  {
    slug: "park-way",
    name: "Park Way",
    region: "Outras regiões",
    coordinates: { lat: -15.8726, lng: -47.9613 },
    priceRangeHint: "R$ 1,5 milhão a R$ 8 milhões",
    summary:
      "Chácaras e mansões em grandes lotes arborizados, ideal para quem busca tranquilidade, natureza e privacidade sem abrir mão da proximidade com o Plano Piloto.",
  },
  {
    slug: "jardim-botanico",
    name: "Jardim Botânico",
    region: "Outras regiões",
    coordinates: { lat: -15.8646, lng: -47.7961 },
    priceRangeHint: "R$ 1,3 milhão a R$ 7 milhões",
    summary:
      "Condomínios horizontais fechados de alto padrão, com casas amplas, segurança 24h e contato direto com a natureza do Cerrado.",
  },
  {
    slug: "aguas-claras",
    name: "Águas Claras",
    region: "Outras regiões",
    coordinates: { lat: -15.8378, lng: -48.0277 },
    priceRangeHint: "R$ 450 mil a R$ 2,5 milhões",
    summary:
      "A região vertical de crescimento mais acelerado do DF, com torres residenciais modernas, metrô, parques e forte vida de bairro.",
  },
];

export function getNeighborhoodBySlug(slug: string) {
  return neighborhoods.find((n) => n.slug === slug);
}
