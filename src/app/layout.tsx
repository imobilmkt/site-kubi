import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
      <body className="min-h-full flex flex-col bg-kubi-white text-kubi-black">
        {children}
      </body>
    </html>
  );
}
