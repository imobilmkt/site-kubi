"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, updateConsent } from "@/lib/analytics/consent";

/** Banner de cookies (LGPD). Enquanto não houver escolha, pixels de marketing e analytics ficam bloqueados (Consent Mode v2). */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Leitura de localStorage só é possível no cliente; decide a visibilidade
    // do banner após a hidratação (não há como saber isso durante o SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!getStoredConsent());
  }, []);

  if (!visible) return null;

  function handle(choice: "accept-all" | "reject-non-essential") {
    updateConsent(choice);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      aria-describedby="consent-description"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-kubi-gray-200 bg-kubi-white/97 p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="consent-description" className="text-sm text-kubi-gray-700">
          Usamos cookies para melhorar sua experiência e medir o desempenho dos nossos
          anúncios. Você pode aceitar todos os cookies ou manter apenas os essenciais ao
          funcionamento do site. Saiba mais na nossa{" "}
          <Link href="/politica-de-privacidade" className="underline hover:text-kubi-black">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handle("reject-non-essential")}
            className="rounded-full border border-kubi-gray-300 px-4 py-2 text-sm font-medium text-kubi-black transition-colors hover:border-kubi-black"
          >
            Somente essenciais
          </button>
          <button
            type="button"
            onClick={() => handle("accept-all")}
            className="rounded-full bg-kubi-orange px-4 py-2 text-sm font-semibold text-kubi-black transition-colors hover:bg-kubi-orange-dark hover:text-kubi-white"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
