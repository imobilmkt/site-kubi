"use client";

/**
 * Ponto único de disparo de eventos para o dataLayer (Google Tag Manager).
 * Nomes e formatos de evento documentados em README.md § Eventos de conversão
 * — use esse README para configurar os gatilhos no GA4, Google Ads e Meta
 * Pixel via GTM.
 */

function pushToDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

export type FormType =
  | "contato"
  | "visita"
  | "captacao"
  | "avaliacao"
  | "trabalhe_conosco"
  | "financiamento"
  | "consorcio";

/** Disparado quando qualquer formulário do site é enviado com sucesso. */
export function trackFormSubmit(formType: FormType, extra?: Record<string, unknown>) {
  pushToDataLayer({ event: "form_submit", form_type: formType, ...extra });
}

/** Disparado ao clicar em qualquer botão/link de WhatsApp. */
export function trackWhatsappClick(propertyCode?: string, context?: string) {
  pushToDataLayer({
    event: "whatsapp_click",
    property_code: propertyCode ?? null,
    click_context: context ?? null,
  });
}

/** Disparado ao clicar em links "tel:". */
export function trackPhoneClick(context?: string) {
  pushToDataLayer({ event: "phone_click", click_context: context ?? null });
}

/** Disparado ao clicar em links "mailto:". */
export function trackEmailClick(context?: string) {
  pushToDataLayer({ event: "email_click", click_context: context ?? null });
}

/** Disparado na visualização da página de um imóvel. */
export function trackPropertyView(data: {
  code: string;
  purpose: string;
  type: string;
  neighborhood: string;
  price?: number;
}) {
  pushToDataLayer({
    event: "property_view",
    property_code: data.code,
    property_purpose: data.purpose,
    property_type: data.type,
    property_neighborhood: data.neighborhood,
    property_price: data.price ?? null,
  });
}

export { pushToDataLayer };
