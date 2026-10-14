import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComplementaryService } from "@/lib/content/complementary-services";
import { ComplementaryServicePageContent } from "@/components/content/ComplementaryServicePageContent";

const SLUG = "seguro";

export function generateMetadata(): Metadata {
  const service = getComplementaryService(SLUG);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: service.href },
  };
}

export default function Page() {
  const service = getComplementaryService(SLUG);
  if (!service) notFound();
  return <ComplementaryServicePageContent service={service} />;
}
