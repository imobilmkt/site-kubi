const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatBRL(value: number | undefined | null) {
  if (value === undefined || value === null) return null;
  return currencyFormatter.format(value);
}

export function formatArea(value: number | undefined | null) {
  if (value === undefined || value === null) return null;
  return `${new Intl.NumberFormat("pt-BR").format(value)} m²`;
}

/** Preço de exibição no card/listagem: venda, ou aluguel + "/mês" quando só houver locação. */
export function getDisplayPrice(property: {
  purpose: string;
  salePrice?: number;
  rentPrice?: number;
}) {
  if (property.purpose === "locacao" && property.rentPrice) {
    return `${formatBRL(property.rentPrice)}/mês`;
  }
  if (property.salePrice) {
    const suffix = property.purpose === "ambos" && property.rentPrice ? " (venda)" : "";
    return `${formatBRL(property.salePrice)}${suffix}`;
  }
  if (property.rentPrice) {
    return `${formatBRL(property.rentPrice)}/mês`;
  }
  return "Consulte";
}
