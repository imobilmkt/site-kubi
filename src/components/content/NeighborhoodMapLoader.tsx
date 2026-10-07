"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/lib/properties/types";

const PropertyMap = dynamic(
  () => import("@/components/properties/PropertyMap").then((m) => m.PropertyMap),
  {
    ssr: false,
    loading: () => <div className="h-[360px] w-full rounded-card bg-kubi-gray-100" />,
  },
);

export function NeighborhoodMapLoader({
  center,
  properties,
}: {
  center: { lat: number; lng: number };
  properties: Property[];
}) {
  return (
    <PropertyMap properties={properties} fallbackCenter={center} heightClassName="h-[360px]" />
  );
}
