import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/lib/content/service-pages";
import { buildServiceMetadata } from "@/lib/content/service-page-metadata";
import { ServicePageContent } from "@/components/content/ServicePageContent";

const SLUG = "avaliacao-de-imovel";

export function generateMetadata(): Metadata {
  const def = getServicePage(SLUG);
  if (!def) return {};
  return buildServiceMetadata(def);
}

export default function Page() {
  const def = getServicePage(SLUG);
  if (!def) notFound();
  return <ServicePageContent def={def} />;
}
