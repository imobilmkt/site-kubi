"use client";

import { CONSENT_EVENT, getStoredConsent } from "./consent";

/**
 * Captura e persiste, no primeiro acesso, os parâmetros de atribuição
 * (UTMs + gclid/gbraid/wbraid/fbclid). Esses dados são enviados junto com
 * todo lead (ver src/lib/leads/types.ts) para alimentar conversões offline
 * no Google Ads e a API de Conversões da Meta. Respeita o consentimento:
 * só persiste em localStorage depois que a pessoa aceitar cookies — até lá,
 * fica apenas em sessionStorage (dado efêmero, descartado ao fechar a aba).
 */

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  landing_page?: string;
  first_visit_at?: string;
};

const LOCAL_KEY = "kubi_attribution";
const SESSION_KEY = "kubi_attribution_pending";

function readFromUrl(): Attribution | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  let hasAny = false;
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  }
  if (!hasAny) return null;
  found.landing_page = window.location.pathname;
  found.first_visit_at = new Date().toISOString();
  return found;
}

function hasPersistedAttribution() {
  try {
    return Boolean(window.localStorage.getItem(LOCAL_KEY));
  } catch {
    return false;
  }
}

function persist(attribution: Attribution) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(attribution));
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignora falha de storage
  }
}

function stashPending(attribution: Attribution) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));
  } catch {
    // ignora falha de storage
  }
}

/** Chamar uma vez por carregamento de página (ver AttributionCapture). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  if (hasPersistedAttribution()) return;

  const fromUrl = readFromUrl();
  const consent = getStoredConsent();

  if (fromUrl) {
    if (consent?.analytics === "granted" || consent?.ads === "granted") {
      persist(fromUrl);
    } else {
      stashPending(fromUrl);
    }
    return;
  }

  // Sem novos parâmetros na URL: se já existe atribuição pendente de uma
  // visita anterior (aguardando consentimento), tenta persistir agora.
  if (consent?.analytics === "granted" || consent?.ads === "granted") {
    try {
      const pending = window.sessionStorage.getItem(SESSION_KEY);
      if (pending) persist(JSON.parse(pending));
    } catch {
      // ignora
    }
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      window.localStorage.getItem(LOCAL_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

export function listenForConsentAndCapture() {
  if (typeof window === "undefined") return () => {};
  const handler = () => captureAttribution();
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
