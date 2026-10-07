"use client";

import { buildWhatsappUrl, siteConfig } from "@/config/site";
import { trackPhoneClick, trackWhatsappClick } from "@/lib/analytics/dataLayer";

export function StickyMobileCta({ propertyCode, title }: { propertyCode: string; title: string }) {
  const whatsappHref = buildWhatsappUrl(
    `Olá! Tenho interesse no imóvel "${title}" (Ref. ${propertyCode}) e gostaria de mais informações.`,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-kubi-gray-200 bg-kubi-white/95 backdrop-blur lg:hidden">
      <a
        href={siteConfig.contact.phoneHref}
        onClick={() => trackPhoneClick("property_sticky_cta")}
        className="flex flex-1 items-center justify-center gap-1.5 py-3.5 text-sm font-semibold text-kubi-black"
      >
        Ligar
      </a>
      <a
        href="#agendar-visita"
        className="flex flex-1 items-center justify-center gap-1.5 border-x border-kubi-gray-200 py-3.5 text-sm font-semibold text-kubi-black"
      >
        Agendar visita
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick(propertyCode, "property_sticky_cta")}
        className="flex flex-1 items-center justify-center gap-1.5 bg-kubi-orange py-3.5 text-sm font-semibold text-kubi-black"
      >
        WhatsApp
      </a>
    </div>
  );
}
