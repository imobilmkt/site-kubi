"use client";

import { useEffect } from "react";
import { setDefaultConsent } from "@/lib/analytics/consent";
import { captureAttribution, listenForConsentAndCapture } from "@/lib/analytics/attribution";

/**
 * Define o consentimento padrão (negado) antes do GTM carregar e inicia a
 * captura de UTMs/click ids. Deve ser montado uma única vez, no layout raiz,
 * antes de <GoogleTagManager />.
 */
export function ConsentInit() {
  useEffect(() => {
    setDefaultConsent();
    captureAttribution();
    return listenForConsentAndCapture();
  }, []);

  return null;
}
