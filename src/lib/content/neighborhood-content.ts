/**
 * Conteúdo editorial do guia de bairros — complementa src/lib/properties/neighborhoods.ts
 * (que guarda os dados "estruturais" usados também pelos filtros de imóveis).
 * Texto original, pensado para SEO local e para ser citável por IAs (GEO):
 * respostas diretas, dados concretos e nada de conteúdo genérico.
 */
export type NeighborhoodContent = {
  slug: string;
  idealFor: string;
  infrastructure: string[];
  profile: string[];
};

export const neighborhoodContent: NeighborhoodContent[] = [
  {
    slug: "lago-sul",
    idealFor: "Famílias e investidores que buscam casas de alto padrão com privacidade e vista para o lago.",
    infrastructure: [
      "Pontão do Lago Sul e orla com restaurantes e bares",
      "Clubes como o Iate Clube de Brasília",
      "Proximidade com embaixadas e o Setor de Clubes",
      "Fácil acesso ao Plano Piloto pela EPIA e pela Ponte JK",
    ],
    profile: [
      "O Lago Sul é, historicamente, a região mais valorizada de Brasília. Lotes amplos, muita arborização e proximidade com o Lago Paranoá formam o cenário para casas de alto padrão, a maioria em condomínios fechados ou em quadras residenciais de baixa densidade.",
      "A região concentra embaixadas, clubes tradicionais e um comércio de vizinhança discreto, voltado a um público que valoriza privacidade. É a região mais procurada por quem busca morar perto do centro político e econômico do DF sem abrir mão de espaço e natureza.",
    ],
  },
  {
    slug: "lago-norte",
    idealFor: "Quem quer viver perto do lago com um pouco mais de acessibilidade de preço que o Lago Sul.",
    infrastructure: [
      "Setor de Clubes Esportivos Norte (SCEN)",
      "Proximidade com a Asa Norte e universidades",
      "Pistas para caminhada e ciclismo à beira do lago",
      "Acesso facilitado pela EPTG e EPNB",
    ],
    profile: [
      "O Lago Norte oferece um estilo de vida parecido com o do Lago Sul — casas espaçosas, arborização e contato direto com o Lago Paranoá —, mas com uma dinâmica um pouco mais acessível e próxima da Asa Norte, universidades e do comércio do Plano Piloto.",
      "É uma região procurada por famílias que querem espaço e qualidade de vida sem abrir mão da proximidade com o dia a dia da cidade.",
    ],
  },
  {
    slug: "asa-sul",
    idealFor: "Quem busca vida de bairro, arborização e proximidade com tudo, em apartamento.",
    infrastructure: [
      "Parque da Cidade Sarah Kubitschek",
      "Comércio local em cada superquadra",
      "Rede de ensino público e privado tradicional",
      "Fácil acesso ao Eixo Monumental e ao Setor Comercial Sul",
    ],
    profile: [
      "Projetada por Lucio Costa, a Asa Sul reúne superquadras residenciais com muita arborização, comércio de bairro a poucos passos e uma das maiores áreas verdes urbanas do mundo, o Parque da Cidade, como vizinho.",
      "É a região preferida de quem quer viver em apartamento com vida de bairro consolidada, sem abrir mão da proximidade com o centro de Brasília.",
    ],
  },
  {
    slug: "asa-norte",
    idealFor: "Quem busca vida universitária, boa infraestrutura de serviços e apartamentos bem localizados.",
    infrastructure: [
      "Universidades (UnB fica na divisa da região)",
      "Forte rede de comércio e serviços em cada quadra",
      "Hospitais e clínicas de referência",
      "Boa oferta de transporte público",
    ],
    profile: [
      "Tão tradicional quanto a Asa Sul, a Asa Norte reúne superquadras residenciais, universidades, hospitais de referência e uma vida de bairro intensa — com cafés, academias e comércio de proximidade em praticamente todas as quadras.",
      "A região atrai tanto famílias quanto estudantes e profissionais que valorizam caminhar até o essencial do dia a dia.",
    ],
  },
  {
    slug: "sudoeste",
    idealFor: "Quem quer um apartamento mais novo no Plano Piloto, com boa infraestrutura de lazer.",
    infrastructure: [
      "Proximidade com o Parque da Cidade",
      "Prédios mais recentes, muitos com infraestrutura completa de lazer",
      "Comércio local em expansão",
      "Acesso rápido ao Setor Comercial Sul e à Asa Sul",
    ],
    profile: [
      "O Sudoeste é um bairro planejado, arborizado e com prédios mais recentes que os das Asas — o que normalmente significa mais infraestrutura de lazer dentro dos próprios condomínios, como piscinas, academias e espaços para crianças.",
      "É uma das regiões com maior procura por apartamentos modernos dentro do Plano Piloto.",
    ],
  },
  {
    slug: "noroeste",
    idealFor: "Quem busca sustentabilidade, prédios novos e um bairro planejado desde o início para isso.",
    infrastructure: [
      "Certificação de sustentabilidade em parte do bairro",
      "Ciclovias integradas ao projeto urbanístico",
      "Comércio e gastronomia em crescimento",
      "Proximidade com a Asa Norte e a UnB",
    ],
    profile: [
      "O Noroeste é o bairro mais novo do Plano Piloto, planejado com conceitos de sustentabilidade desde a concepção: ciclovias, áreas verdes integradas e prédios mais recentes.",
      "A região tem atraído um público que busca uma Brasília mais contemporânea sem perder a proximidade com a Asa Norte e a UnB.",
    ],
  },
  {
    slug: "park-way",
    idealFor: "Quem quer natureza, privacidade e espaço, sem abrir mão da proximidade com o Plano Piloto.",
    infrastructure: [
      "Grandes lotes arborizados, muitos com áreas de chácara",
      "Acesso rápido pela EPIA",
      "Tranquilidade e baixa densidade populacional",
      "Proximidade com o Parque Nacional de Brasília",
    ],
    profile: [
      "O Park Way reúne chácaras e mansões em lotes muito maiores que a média de Brasília, com arborização nativa e muita privacidade — ideal para quem busca contato com a natureza sem morar longe do centro.",
      "É procurado tanto para moradia fixa quanto para casas de fim de semana, mantendo fácil acesso ao Plano Piloto.",
    ],
  },
  {
    slug: "jardim-botanico",
    idealFor: "Quem busca condomínio fechado de alto padrão com segurança e contato com o Cerrado.",
    infrastructure: [
      "Proximidade com o Jardim Botânico de Brasília",
      "Condomínios horizontais fechados com segurança 24h",
      "Comércio de conveniência em expansão na região",
      "Acesso pela DF-001 (Estrada Parque Contorno) e DF-025",
    ],
    profile: [
      "O Jardim Botânico concentra condomínios horizontais fechados de alto padrão, em meio à vegetação nativa do Cerrado — uma opção para quem busca segurança, amplo espaço e contato direto com a natureza.",
      "É uma das regiões de crescimento mais consistente entre famílias que trocam o apartamento por uma casa maior sem se afastar demais do Plano Piloto.",
    ],
  },
  {
    slug: "aguas-claras",
    idealFor: "Quem busca praticidade urbana: metrô, torres residenciais modernas e vida de bairro vertical.",
    infrastructure: [
      "Estações de metrô ao longo de toda a Avenida das Araucárias",
      "Parque Ecológico de Águas Claras",
      "Shoppings e grande oferta de comércio e serviços",
      "Acesso rápido pela EPTG e EPIA",
    ],
    profile: [
      "Águas Claras é a região vertical de crescimento mais acelerado do DF: torres residenciais modernas, metrô ao longo de toda a avenida principal e uma vida de bairro pulsante, com parques, comércio e serviços a poucos minutos de qualquer apartamento.",
      "É a porta de entrada mais procurada por quem quer morar perto do Plano Piloto com um orçamento mais acessível que o das Asas.",
    ],
  },
];

export function getNeighborhoodContent(slug: string) {
  return neighborhoodContent.find((n) => n.slug === slug);
}
