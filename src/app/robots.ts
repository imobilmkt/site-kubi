import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Libera explicitamente os principais robôs de IA (GEO/AEO) além dos
 * buscadores tradicionais. /lp/* (landing pages de Ads) e /api/* ficam de
 * fora do rastreamento — as LPs já são noindex via metadata, e bloqueá-las
 * aqui também evita que apareçam em buscas e reforça o sinal para o Google
 * não competir com as páginas orgânicas equivalentes.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/lp/"],
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/lp/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
