"use client";

import { useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // usuário cancelou o compartilhamento nativo — cai no fallback de copiar link
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-kubi-gray-700 hover:text-kubi-black"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8.5 10.5 15.5 7M8.5 13.5 15.5 17M6 12a2 2 0 1 1 0-.01M18 6a2 2 0 1 1 0-.01M18 18a2 2 0 1 1 0-.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {copied ? "Link copiado!" : "Compartilhar"}
    </button>
  );
}
