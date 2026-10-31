/**
 * Fonte única da verdade para NAP (Nome, Endereço, Telefone) e demais dados
 * institucionais da Kubi Imóveis. Todo o site, rodapé e dados estruturados
 * (JSON-LD) devem importar valores daqui — nunca duplicar esses dados em
 * outros arquivos. Isso evita divergência de NAP, que é crítico para SEO local.
 *
 * Campos marcados com [PREENCHER] são placeholders e precisam ser
 * substituídos pelos dados reais antes do lançamento. Veja a lista completa
 * em README.md.
 */

export const siteConfig = {
  name: "Kubi Imóveis",
  legalName: "Kubi Imóveis Ltda.",
  alternateName: "Kubi Imobiliária",
  slogan: "Mais que imóveis, espaços de vida",
  description:
    "Imobiliária de alto padrão em Brasília/DF. Compra, venda, locação e administração de imóveis no Lago Sul, Lago Norte, Plano Piloto e principais regiões de Brasília, com atendimento exclusivo e segurança documental.",

  domain: "[DOMINIO]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kubiimoveis.com.br",

  address: {
    streetAddress: "SMDB 12, Bloco G, salas 109, 110 e 111",
    neighborhood: "Lago Sul",
    city: "Brasília",
    state: "DF",
    stateFull: "Distrito Federal",
    postalCode: "71680-120",
    country: "BR",
    full: "SMDB 12, Bloco G, salas 109, 110 e 111 – Lago Sul, Brasília/DF – CEP 71680-120",
  },

  geo: {
    // [PREENCHER] coordenadas exatas do escritório (Lago Sul)
    latitude: -15.8267,
    longitude: -47.8788,
  },

  contact: {
    phone: "(61) 99191-7557",
    phoneHref: "tel:+5561991917557",
    whatsapp: "(61) 99191-7557",
    whatsappNumber: "5561991917557", // somente dígitos, com DDI 55
    email: "atendimento@kubiimoveis.com",
    // Linha dedicada da equipe de avaliações, exibida no rodapé.
    avaliacoesPhone: "(61) 99288-2120",
    avaliacoesPhoneHref: "tel:+5561992882120",
  },

  creci: "31.240",

  social: {
    instagram: "@kubiimoveis",
    instagramUrl: "https://www.instagram.com/kubiimoveis/",
    googleBusinessUrl: "[PREENCHER google maps / google my business url]",
    facebookUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
  },

  businessHours: {
    display: "Segunda a quinta: 8h às 18h · Sexta: 8h às 17h · Sábado: 9h às 13h · Domingo: fechado",
    // Estrutura para schema.org OpeningHoursSpecification.
    spec: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        dayOfWeek: ["Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
  },

  directors: [
    {
      name: "Ingrid Eing",
      role: "Administrativo, Locação, Consórcio e Jurídico",
    },
    {
      name: "Cleia",
      role: "Comercial e Equipe de Vendas",
    },
    {
      name: "Luana de Paula",
      role: "Financiamento",
    },
  ],

  areaServed: [
    "Lago Sul",
    "Lago Norte",
    "Plano Piloto",
    "Asa Sul",
    "Asa Norte",
    "Sudoeste",
    "Noroeste",
    "Park Way",
    "Jardim Botânico",
    "Águas Claras",
  ],

  // Nomes dos eventos de conversão enviados ao dataLayer (ver README).
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Monta a mensagem padrão de WhatsApp com o código do imóvel (quando houver). */
export function buildWhatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
}
