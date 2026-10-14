"use client";

import { buildWhatsappUrl, siteConfig } from "@/config/site";
import { trackWhatsappClick } from "@/lib/analytics/dataLayer";

export function ServiceWhatsappCta({
  slug,
  eyebrow,
  title,
}: {
  slug: string;
  eyebrow: string;
  title: string;
}) {
  const href = buildWhatsappUrl(
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de saber mais sobre ${eyebrow}.`,
  );

  return (
    <div>
      <h2 className="font-heading text-lg font-semibold text-kubi-black">{title}</h2>
      <p className="mt-2 text-sm text-kubi-gray">
        Fale agora com a equipe Kubi pelo WhatsApp e tire todas as suas dúvidas sobre esse
        serviço, sem compromisso.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick(undefined, `servico_${slug}`)}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-kubi-orange px-6 py-3 text-sm font-semibold text-kubi-black transition-colors hover:bg-kubi-orange-dark hover:text-kubi-white"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
