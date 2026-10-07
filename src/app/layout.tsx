import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fontVariables} h-full antialiased`}>
      <head>
        <JsonLd data={[organizationJsonLd(), realEstateAgentJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="flex min-h-full flex-col bg-kubi-white text-kubi-black">
        <ConsentInit />
        <GoogleTagManager />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsappFloatingButton />
        <ConsentBanner />
      </body>
    </html>
  );
}
