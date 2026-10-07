"use client";

import { buildWhatsappUrl, siteConfig } from "@/config/site";
import { trackWhatsappClick } from "@/lib/analytics/dataLayer";

/** Botão flutuante de WhatsApp, visível em todas as páginas públicas. */
export function WhatsappFloatingButton() {
  const href = buildWhatsappUrl(
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de falar com um corretor.`,
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsappClick(undefined, "floating_button")}
      aria-label="Falar com a Kubi Imóveis no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.26 4.9L2 22l5.25-1.38A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.2a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.96 3.85Zm4.52-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.76 2.68 4.25 3.76.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
      </svg>
    </a>
  );
}
