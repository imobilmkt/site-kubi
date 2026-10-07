"use client";

/**
 * Consentimento de cookies (LGPD) compatível com o Google Consent Mode v2.
 *
 * Por padrão, todo consentimento começa como "denied" (postura mais
 * privativa) — os pixels de marketing/analytics só disparam de fato depois
 * que a pessoa aceita no banner (ver ConsentBanner.tsx). O GTM é carregado
 * sempre, mas as tags dentro dele devem respeitar os sinais de consentimento
 * (configurar isso no painel do GTM é responsabilidade de quem configurar as
 * tags — ver README).
 */

export type ConsentChoice = "granted" | "denied";

export type ConsentState = {
  analytics: ConsentChoice;
  ads: ConsentChoice;
  timestamp: string;
};

const STORAGE_KEY = "kubi_consent";
const CONSENT_EVENT = "kubi:consent-updated";

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/** Deve ser chamado o mais cedo possível (antes do GTM carregar). */
export function setDefaultConsent() {
  if (typeof window === "undefined") return;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
}

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function updateConsent(choice: "accept-all" | "reject-non-essential") {
  const granted = choice === "accept-all";
  const state: ConsentState = {
    analytics: granted ? "granted" : "denied",
    ads: granted ? "granted" : "denied",
    timestamp: new Date().toISOString(),
  };

  gtag("consent", "update", {
    ad_storage: state.ads,
    ad_user_data: state.ads,
    ad_personalization: state.ads,
    analytics_storage: state.analytics,
  });

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage indisponível (modo privado); segue só em memória nesta sessão.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export { CONSENT_EVENT };
