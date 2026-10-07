"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROPERTY_TYPES, type PropertyFilters } from "@/lib/properties/types";
import { neighborhoods } from "@/lib/properties/neighborhoods";

type FilterBarProps = {
  filters: PropertyFilters;
};

const SORT_LABELS: Record<NonNullable<PropertyFilters["sort"]>, string> = {
  relevance: "Relevância",
  "price-asc": "Menor preço",
  "price-desc": "Maior preço",
  "area-asc": "Menor área",
  "area-desc": "Maior área",
  newest: "Mais recentes",
};

/** Barra de filtros da listagem. Qualquer alteração navega para /imoveis/[finalidade] com os filtros em query string. */
export function FilterBar({ filters }: FilterBarProps) {
  const router = useRouter();
  const [draft, setDraft] = useState({
    priceMin: filters.priceMin?.toString() ?? "",
    priceMax: filters.priceMax?.toString() ?? "",
  });

  function navigate(next: Partial<PropertyFilters>) {
    const merged = { ...filters, ...next, page: undefined };
    const purpose = merged.purpose ?? "";
    const params = new URLSearchParams();

    if (merged.types?.[0]) params.set("tipo", merged.types[0]);
    if (merged.neighborhoods?.length) params.set("bairro", merged.neighborhoods.join(","));
    if (merged.priceMin) params.set("precoMin", String(merged.priceMin));
    if (merged.priceMax) params.set("precoMax", String(merged.priceMax));
    if (merged.bedrooms) params.set("quartos", String(merged.bedrooms));
    if (merged.suites) params.set("suites", String(merged.suites));
    if (merged.parkingSpots) params.set("vagas", String(merged.parkingSpots));
    if (merged.sort && merged.sort !== "relevance") params.set("ordenar", merged.sort);

    const query = params.toString();
    router.push(`/imoveis${purpose ? `/${purpose}` : ""}${query ? `?${query}` : ""}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-kubi-gray-200 pb-6">
      <div className="flex gap-2">
        {(["venda", "locacao"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => navigate({ purpose: p })}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filters.purpose === p
                ? "bg-kubi-black text-kubi-white"
                : "bg-kubi-gray-100 text-kubi-gray-700 hover:bg-kubi-gray-200"
            }`}
          >
            {p === "venda" ? "Comprar" : "Alugar"}
          </button>
        ))}
      </div>

      <select
        aria-label="Tipo de imóvel"
        value={filters.types?.[0] ?? ""}
        onChange={(e) => navigate({ types: e.target.value ? [e.target.value as never] : undefined })}
        className="rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Qualquer tipo</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        aria-label="Bairro"
        value={filters.neighborhoods?.[0] ?? ""}
        onChange={(e) => navigate({ neighborhoods: e.target.value ? [e.target.value] : undefined })}
        className="rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Qualquer região</option>
        {neighborhoods.map((n) => (
          <option key={n.slug} value={n.slug}>
            {n.name}
          </option>
        ))}
      </select>

      <select
        aria-label="Quartos (mínimo)"
        value={filters.bedrooms ?? ""}
        onChange={(e) => navigate({ bedrooms: e.target.value ? Number(e.target.value) : undefined })}
        className="rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Quartos</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}+ quartos
          </option>
        ))}
      </select>

      <select
        aria-label="Vagas (mínimo)"
        value={filters.parkingSpots ?? ""}
        onChange={(e) => navigate({ parkingSpots: e.target.value ? Number(e.target.value) : undefined })}
        className="rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Vagas</option>
        {[1, 2, 3, 4].map((n) => (
          <option key={n} value={n}>
            {n}+ vagas
          </option>
        ))}
      </select>

      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({
            priceMin: draft.priceMin ? Number(draft.priceMin) : undefined,
            priceMax: draft.priceMax ? Number(draft.priceMax) : undefined,
          });
        }}
      >
        <input
          aria-label="Preço mínimo"
          placeholder="Preço mín."
          inputMode="numeric"
          value={draft.priceMin}
          onChange={(e) => setDraft((d) => ({ ...d, priceMin: e.target.value }))}
          className="w-28 rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
        />
        <span className="text-kubi-gray-300">–</span>
        <input
          aria-label="Preço máximo"
          placeholder="Preço máx."
          inputMode="numeric"
          value={draft.priceMax}
          onChange={(e) => setDraft((d) => ({ ...d, priceMax: e.target.value }))}
          className="w-28 rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg border border-kubi-gray-300 px-3 py-2 text-sm font-medium hover:border-kubi-black"
        >
          Aplicar
        </button>
      </form>

      <select
        aria-label="Ordenar por"
        value={filters.sort ?? "relevance"}
        onChange={(e) => navigate({ sort: e.target.value as PropertyFilters["sort"] })}
        className="ml-auto rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm"
      >
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            Ordenar: {label}
          </option>
        ))}
      </select>
    </div>
  );
}
