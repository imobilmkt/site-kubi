"use client";

import { buildWhatsappUrl, siteConfig } from "@/config/site";
import { trackPhoneClick, trackWhatsappClick } from "@/lib/analytics/dataLayer";

export function PropertyCtaButtons({ code, title }: { code: string; title: string }) {
  const whatsappHref = buildWhatsappUrl(
    `Olá! Tenho interesse no imóvel "${title}" (Ref. ${code}) e gostaria de mais informações.`,
  );

  return (
    <div className="flex flex-col gap-2.5">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick(code, "property_sidebar")}
        className="rounded-full bg-kubi-orange px-5 py-3 text-center text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark"
      >
        Falar no WhatsApp
      </a>
      <a
        href={siteConfig.contact.phoneHref}
        onClick={() => trackPhoneClick("property_sidebar")}
        className="rounded-full border border-kubi-gray-300 px-5 py-3 text-center text-sm font-semibold text-kubi-black hover:border-kubi-black"
      >
        Ligar para a Kubi
      </a>
    </div>
  );
}
