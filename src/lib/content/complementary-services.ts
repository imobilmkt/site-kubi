export type ServiceIconName =
  | "pencil-ruler"
  | "scale"
  | "landmark"
  | "file-signature"
  | "file-text"
  | "shield-check"
  | "piggy-bank"
  | "presentation"
  | "search"
  | "home"
  | "key"
  | "megaphone"
  | "clipboard-list"
  | "handshake"
  | "calculator";

export type ComplementaryService = {
  slug: string;
  title: string;
  icon: ServiceIconName;
  tag?: string;
  /** Descrição breve usada no card da página /servicos. */
  description: string;
  /** Pontos de destaque usados na página própria do serviço (quando não é uma página já existente e mais completa). */
  highlights?: string[];
  whatsappMessage: string;
  /** Página própria do serviço, para onde o ícone/card leva. */
  href: string;
};

export const complementaryServices: ComplementaryService[] = [
  {
    slug: "arquitetura",
    title: "Arquitetura",
    icon: "pencil-ruler",
    description:
      "Projeto arquitetônico e consultoria para reformas, construções e otimização de espaços, em parceria com escritórios especializados — do estudo de layout e viabilidade até o acompanhamento da obra, para valorizar o imóvel antes de morar, alugar ou vender.",
    highlights: [
      "Estudo de layout e viabilidade antes de iniciar a obra ou reforma.",
      "Projetos para construção, reforma e otimização de espaços internos.",
      "Acompanhamento técnico com escritórios de arquitetura parceiros.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre o serviço de Arquitetura.",
    href: "/arquitetura",
  },
  {
    slug: "servicos-juridicos",
    title: "Serviços jurídicos",
    icon: "scale",
    description:
      "Assessoria jurídica imobiliária completa com advogados parceiros especializados no setor: análise de matrícula e certidões, contratos de compra, venda e locação, inventário, usucapião e regularização de imóveis.",
    highlights: [
      "Análise de matrícula, ônus e certidões antes de fechar negócio.",
      "Apoio em inventário, usucapião e regularização de imóveis.",
      "Revisão jurídica de contratos de compra, venda e locação.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre Serviços jurídicos.",
    href: "/servicos-juridicos",
  },
  {
    slug: "correspondente-bancario",
    title: "Correspondente bancário",
    icon: "landmark",
    tag: "Sem custo para você",
    description:
      "Atuamos como correspondente bancário autorizado: simulamos e acompanhamos seu financiamento junto aos principais bancos, comparando taxas e organizando a documentação da aprovação de crédito — sem nenhum custo para quem compra.",
    highlights: [
      "Simulação e comparação de taxas entre os principais bancos.",
      "Organização da documentação exigida para a aprovação do crédito.",
      "Acompanhamento do processo do início à liberação do financiamento, sem custo para você.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre o Correspondente bancário (financiamento).",
    href: "/correspondente-bancario",
  },
  {
    slug: "despachante-imobiliario",
    title: "Despachante imobiliário",
    icon: "file-signature",
    description:
      "Cuidamos da parte burocrática da compra, venda ou transferência do seu imóvel: emissão de certidões, pagamento de ITBI, registro em cartório e demais trâmites junto a órgãos públicos, para você não enfrentar filas nem perder tempo.",
    highlights: [
      "Emissão de certidões e documentos exigidos na transação.",
      "Cálculo e pagamento de ITBI junto ao órgão competente.",
      "Acompanhamento do registro em cartório até a conclusão do trâmite.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre o serviço de Despachante imobiliário.",
    href: "/despachante-imobiliario",
  },
  {
    slug: "contratos",
    title: "Contratos",
    icon: "file-text",
    description:
      "Elaboração e revisão de contratos de compra e venda, locação, prestação de serviço e parcerias imobiliárias, com cláusulas claras sobre prazo, reajuste, garantias e responsabilidades de cada parte envolvida.",
    highlights: [
      "Elaboração de contratos de compra e venda e de locação.",
      "Revisão de cláusulas de prazo, reajuste, multas e garantias.",
      "Contratos de prestação de serviço e parcerias imobiliárias.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre elaboração de Contratos.",
    href: "/contratos",
  },
  {
    slug: "seguro",
    title: "Seguro",
    icon: "shield-check",
    description:
      "Cotação de seguro residencial, seguro-fiança e demais modalidades para proteger seu imóvel e facilitar a aprovação da locação, com condições negociadas junto às principais seguradoras do mercado.",
    highlights: [
      "Seguro residencial para proteger o imóvel contra imprevistos.",
      "Seguro-fiança para agilizar a aprovação de locações.",
      "Cotação comparativa junto às principais seguradoras do mercado.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre Seguro.",
    href: "/seguro",
  },
  {
    slug: "consorcio-imobiliario",
    title: "Consórcio imobiliário",
    icon: "piggy-bank",
    description:
      "Alternativa sem juros ao financiamento tradicional: orientamos sobre cartas de crédito, prazos e estratégias de lance para acelerar a contemplação e conquistar seu imóvel com planejamento.",
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre Consórcio imobiliário.",
    href: "/consorcio-imobiliario",
  },
  {
    slug: "treinamento-de-vendas",
    title: "Treinamento de vendas",
    icon: "presentation",
    description:
      "Capacitação e treinamento de técnicas de vendas para corretores e equipes comerciais do mercado imobiliário, com metodologia prática voltada para negociação, atendimento e fechamento de negócios.",
    highlights: [
      "Metodologia prática de negociação e fechamento de negócios.",
      "Treinamento voltado para corretores e equipes comerciais.",
      "Técnicas de atendimento aplicadas à rotina do mercado imobiliário.",
    ],
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre Treinamento de vendas.",
    href: "/treinamento-de-vendas",
  },
  {
    slug: "avaliacao-de-imovel",
    title: "Avaliação de imóvel",
    icon: "search",
    description:
      "Avaliação gratuita e criteriosa, cruzando dados reais de mercado com as características do seu imóvel, para você vender, alugar ou simplesmente saber quanto ele vale.",
    whatsappMessage:
      "Olá! Vim pelo site da Kubi Imóveis e gostaria de saber mais sobre Avaliação de imóvel.",
    href: "/avaliacao-de-imovel",
  },
];

export function getComplementaryService(slug: string) {
  return complementaryServices.find((s) => s.slug === slug);
}
