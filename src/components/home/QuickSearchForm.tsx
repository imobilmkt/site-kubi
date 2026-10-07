"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROPERTY_TYPES } from "@/lib/properties/types";
import { neighborhoods } from "@/lib/properties/neighborhoods";

const SALE_PRICE_BANDS = [
  { label: "Qualquer valor", min: "", max: "" },
  { label: "Até R$ 500 mil", min: "", max: "500000" },
  { label: "R$ 500 mil – R$ 1 milhão", min: "500000", max: "1000000" },
  { label: "R$ 1 – 2 milhões", min: "1000000", max: "2000000" },
  { label: "R$ 2 – 5 milhões", min: "2000000", max: "5000000" },
  { label: "Acima de R$ 5 milhões", min: "5000000", max: "" },
];

const RENT_PRICE_BANDS = [
  { label: "Qualquer valor", min: "", max: "" },
  { label: "Até R$ 2 mil", min: "", max: "2000" },
  { label: "R$ 2 mil – R$ 4 mil", min: "2000", max: "4000" },
  { label: "R$ 4 mil – R$ 8 mil", min: "4000", max: "8000" },
  { label: "Acima de R$ 8 mil", min: "8000", max: "" },
];

export function QuickSearchForm() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"venda" | "locacao">("venda");
  const [type, setType] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [priceBand, setPriceBand] = useState(0);

  const bands = purpose === "venda" ? SALE_PRICE_BANDS : RENT_PRICE_BANDS;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("tipo", type);
    if (neighborhood) params.set("bairro", neighborhood);
    const band = bands[priceBand];
    if (band.min) params.set("precoMin", band.min);
    if (band.max) params.set("precoMax", band.max);

    const query = params.toString();
    router.push(`/imoveis/${purpose}${query ? `?${query}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl rounded-2xl bg-kubi-white/95 p-3 shadow-2xl backdrop-blur sm:p-4"
    >
      <div className="mb-3 flex gap-2">
        {(["venda", "locacao"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setPurpose(p);
              setPriceBand(0);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              purpose === p
                ? "bg-kubi-black text-kubi-white"
                : "bg-kubi-gray-100 text-kubi-gray-700 hover:bg-kubi-gray-200"
            }`}
          >
            {p === "venda" ? "Comprar" : "Alugar"}
          </button>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        <select
          aria-label="Tipo de imóvel"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-kubi-gray-200 px-3 py-2.5 text-sm text-kubi-black"
        >
          <option value="">Qualquer tipo</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          aria-label="Bairro ou região"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="rounded-lg border border-kubi-gray-200 px-3 py-2.5 text-sm text-kubi-black"
        >
          <option value="">Qualquer região</option>
          {neighborhoods.map((n) => (
            <option key={n.slug} value={n.slug}>
              {n.name}
            </option>
          ))}
        </select>

        <select
          aria-label="Faixa de preço"
          value={priceBand}
          onChange={(e) => setPriceBand(Number(e.target.value))}
          className="rounded-lg border border-kubi-gray-200 px-3 py-2.5 text-sm text-kubi-black"
        >
          {bands.map((band, index) => (
            <option key={band.label} value={index}>
              {band.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-lg bg-kubi-orange px-4 py-2.5 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark"
        >
          Buscar imóveis
        </button>
      </div>
    </form>
  );
}
