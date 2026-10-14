/** Estrutura de navegação centralizada — usada no header e no rodapé. */

export const serviceLinks = [
  { href: "/comprar-imovel", label: "Comprar imóvel" },
  { href: "/alugar-imovel", label: "Alugar imóvel" },
  { href: "/anuncie-seu-imovel", label: "Anuncie seu imóvel" },
  { href: "/administracao-de-imoveis", label: "Administração de imóveis" },
  { href: "/intermediacao-imobiliaria", label: "Intermediação e assessoria" },
  { href: "/financiamento-imobiliario", label: "Financiamento imobiliário" },
  { href: "/consorcio-imobiliario", label: "Consórcio imobiliário" },
  { href: "/avaliacao-de-imovel", label: "Avaliação de imóvel" },
  { href: "/servicos", label: "Serviços complementares" },
] as const;

export const mainNav = [
  { href: "/imoveis/venda", label: "Comprar" },
  { href: "/imoveis/locacao", label: "Alugar" },
  { href: "/anuncie-seu-imovel", label: "Anunciar" },
  { href: "/servicos", label: "Serviços", children: serviceLinks },
  { href: "/sobre", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
] as const;

export const institutionalLinks = [
  { href: "/sobre", label: "Sobre a Kubi" },
  { href: "/equipe", label: "Nossa equipe" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/trabalhe-conosco", label: "Trabalhe conosco" },
  { href: "/contato", label: "Contato" },
] as const;

export const contentLinks = [
  { href: "/bairros", label: "Guia de bairros" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Perguntas frequentes" },
] as const;

export const legalLinks = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
] as const;
