"use client";

import Link from "next/link";
import { buildWhatsappUrl, siteConfig } from "@/config/site";
import { trackWhatsappClick } from "@/lib/analytics/dataLayer";
import {
  complementaryServices,
  type ComplementaryService,
} from "@/lib/content/complementary-services";
import { servicePages } from "@/lib/content/service-pages";
import { ServiceIcon } from "@/components/content/ServiceIcon";

const coreServiceIcons: Record<string, ComplementaryService["icon"]> = {
  "comprar-imovel": "home",
  "anuncie-seu-imovel": "megaphone",
  "alugar-imovel": "key",
  "administracao-de-imoveis": "clipboard-list",
  "intermediacao-imobiliaria": "handshake",
  "financiamento-imobiliario": "calculator",
  "consorcio-imobiliario": "piggy-bank",
  "avaliacao-de-imovel": "search",
};

const coreServices: ComplementaryService[] = servicePages.map((s) => ({
  slug: s.slug,
  title: s.eyebrow,
  icon: coreServiceIcons[s.slug] ?? "file-text",
  description: s.metaDescription,
  whatsappMessage: `Olá! Vim pelo site da ${siteConfig.name} e gostaria de saber mais sobre ${s.eyebrow}.`,
  href: `/${s.slug}`,
}));

const coreServiceSlugs = new Set(servicePages.map((s) => s.slug));
const extraServices = complementaryServices.filter((s) => !coreServiceSlugs.has(s.slug));

function ServiceCard({ service }: { service: ComplementaryService }) {
  const whatsappHref = buildWhatsappUrl(service.whatsappMessage);

  return (
    <div className="flex flex-col rounded-card border border-kubi-gray-200 p-6">
      {service.tag && (
        <span className="mb-3 inline-block w-fit rounded-full bg-kubi-orange/15 px-3 py-1 text-xs font-semibold text-kubi-orange-dark">
          {service.tag}
        </span>
      )}

      <Link
        href={service.href}
        className="group flex items-center gap-4"
        aria-label={`Ver página de ${service.title}`}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-kubi-gray-50 text-kubi-black transition-colors group-hover:bg-kubi-orange">
          <ServiceIcon name={service.icon} />
        </span>
        <h3 className="font-heading text-lg font-semibold text-kubi-black group-hover:text-kubi-orange-dark">
          {service.title}
        </h3>
      </Link>

      <p className="mt-3 flex-1 text-sm text-kubi-gray">{service.description}</p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick(undefined, `servicos_${service.slug}`)}
        className="mt-5 inline-flex w-fit items-center rounded-full bg-kubi-orange px-5 py-2.5 text-sm font-semibold text-kubi-black transition-colors hover:bg-kubi-orange-dark hover:text-kubi-white"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}

const allServices: ComplementaryService[] = [...coreServices, ...extraServices];

export function ServicesHub() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {allServices.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
