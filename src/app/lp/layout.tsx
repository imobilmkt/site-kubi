import type { Metadata } from "next";
import { LpHeader } from "@/components/layout/LpHeader";
import { LpFooter } from "@/components/layout/LpFooter";

/**
 * Todas as páginas sob /lp/* são noindex por padrão: são landing pages de
 * campanha (Google Ads/Meta Ads), feitas para message match e conversão —
 * não devem competir com as páginas orgânicas equivalentes no Google.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LpHeader />
      <div className="flex-1">{children}</div>
      <LpFooter />
    </>
  );
}
