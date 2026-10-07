import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { WhatsappFloatingButton } from "@/components/layout/WhatsappFloatingButton";
import { ConsentInit } from "@/components/analytics/ConsentInit";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, realEstateAgentJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Layout raiz: só o essencial comum a TODO o site, inclusive as landing
 * pages de Ads (/lp/*), que têm seu próprio layout sem o header/footer
 * completos (ver src/app/lp/layout.tsx) — mas continuam precisando de
 * consentimento, analytics e botão de WhatsApp.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fontVariables} h-full antialiased`}>
      <head>
        <JsonLd data={[organizationJsonLd(), realEstateAgentJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="flex min-h-full flex-col bg-kubi-white text-kubi-black">
        <ConsentInit />
        <GoogleTagManager />
        <div className="flex-1 flex flex-col">{children}</div>
        <WhatsappFloatingButton />
        <ConsentBanner />
      </body>
    </html>
  );
}
