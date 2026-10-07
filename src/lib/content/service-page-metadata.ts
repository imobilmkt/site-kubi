import type { Metadata } from "next";
import type { ServicePageDef } from "./service-pages";

export function buildServiceMetadata(def: ServicePageDef): Metadata {
  return {
    title: def.title,
    description: def.metaDescription,
    alternates: { canonical: `/${def.slug}` },
  };
}
