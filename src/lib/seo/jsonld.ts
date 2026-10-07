import { siteConfig } from "@/config/site";
import type { Property } from "@/lib/properties/types";
import { getCoverPhoto } from "@/lib/properties/types";

/**
 * Builders de dados estruturados (schema.org/JSON-LD). Centralizar aqui
 * garante consistência de entidade (mesmo nome/endereço/telefone em todo o
 * schema) — essencial tanto para SEO local quanto para citação por IAs (GEO).
 * Use `<JsonLd data={...} />` (ver components/seo/JsonLd.tsx) para injetar.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon`,
    slogan: siteConfig.slogan,
    sameAs: [siteConfig.social.instagramUrl, siteConfig.social.googleBusinessUrl].filter(
      Boolean,
    ),
  };
}

export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: `${siteConfig.url}/icon`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.businessHours.spec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    sameAs: [siteConfig.social.instagramUrl, siteConfig.social.googleBusinessUrl].filter(
      Boolean,
    ),
    // CRECI-DF (registro profissional) — exibido também no rodapé de todas as páginas.
    identifier: {
      "@type": "PropertyValue",
      name: "CRECI-DF",
      value: siteConfig.creci,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/imoveis?busca={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function propertyAvailability(status: Property["status"]) {
  switch (status) {
    case "disponivel":
    case "lancamento":
      return "https://schema.org/InStock";
    case "reservado":
      return "https://schema.org/LimitedAvailability";
    default:
      return "https://schema.org/OutOfStock";
  }
}

const RESIDENTIAL_TYPES = new Set([
  "apartamento",
  "casa",
  "casa-em-condominio",
  "cobertura",
  "kitnet-studio",
]);

export function propertyJsonLd(property: Property, canonicalUrl: string) {
  const cover = getCoverPhoto(property);
  const price = property.salePrice ?? property.rentPrice;
  const businessFunction =
    property.purpose === "locacao"
      ? "https://schema.org/LeaseOut"
      : "https://schema.org/Sell";

  return {
    "@context": "https://schema.org",
    "@type": RESIDENTIAL_TYPES.has(property.type) ? "Residence" : "Place",
    name: property.title,
    description: property.description,
    url: canonicalUrl,
    image: property.photos.map((p) => p.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.address.city,
      addressRegion: "DF",
      addressCountry: "BR",
      ...(property.address.hideExactAddress
        ? {}
        : { streetAddress: property.address.exactAddress }),
    },
    ...(property.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: property.coordinates.lat,
            longitude: property.coordinates.lng,
          },
        }
      : {}),
    ...(property.usableArea
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: property.usableArea,
            unitCode: "MTK",
          },
        }
      : {}),
    ...(property.bedrooms ? { numberOfRooms: property.bedrooms } : {}),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "BRL",
      availability: propertyAvailability(property.status),
      businessFunction,
      url: canonicalUrl,
      image: cover?.url,
    },
  };
}
