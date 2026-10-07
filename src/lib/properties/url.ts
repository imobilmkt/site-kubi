import type { Property, RoutablePurpose } from "./types";
import { routablePurposes } from "./types";

/**
 * URL canônica do imóvel: /imoveis/[finalidade]/[tipo]/[bairro]/[slug-KBxxxx].
 * Para imóveis com finalidade "ambos", a venda é a finalidade canônica (ver
 * getAlternatePurposeUrls para a outra rota, usada em redirecionamentos).
 */
export function getPropertyUrl(property: Property, purpose?: RoutablePurpose) {
  const chosenPurpose = purpose ?? routablePurposes(property.purpose)[0];
  return `/imoveis/${chosenPurpose}/${property.type}/${property.address.neighborhoodSlug}/${property.slug}`;
}

export function getAllPropertyUrls(property: Property) {
  return routablePurposes(property.purpose).map((purpose) => getPropertyUrl(property, purpose));
}

export function getCategoryUrl(params: {
  purpose: RoutablePurpose;
  type?: string;
  neighborhood?: string;
}) {
  const segments = [params.purpose, params.type, params.neighborhood].filter(Boolean);
  return `/imoveis/${segments.join("/")}`;
}
