"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Property } from "@/lib/properties/types";
import { PropertyCard } from "./PropertyCard";

const PropertyMap = dynamic(() => import("./PropertyMap").then((m) => m.PropertyMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] w-full items-center justify-center rounded-card bg-kubi-gray-100 text-sm text-kubi-gray">
      Carregando mapa...
    </div>
  ),
});

export function ListingView({ properties }: { properties: Property[] }) {
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        {(["list", "map"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              view === v
                ? "bg-kubi-black text-kubi-white"
                : "bg-kubi-gray-100 text-kubi-gray-700 hover:bg-kubi-gray-200"
            }`}
          >
            {v === "list" ? "Lista" : "Mapa"}
          </button>
        ))}
      </div>

      {view === "list" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <PropertyMap properties={properties} />
      )}
    </div>
  );
}
