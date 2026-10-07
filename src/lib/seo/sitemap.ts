import { siteConfig } from "@/config/site";

export type SitemapUrl = {
  loc: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildUrlsetXml(urls: SitemapUrl[]) {
  const items = urls
    .map((u) => {
      const lastmod = u.lastModified
        ? `<lastmod>${new Date(u.lastModified).toISOString()}</lastmod>`
        : "";
      const freq = u.changeFrequency ? `<changefreq>${u.changeFrequency}</changefreq>` : "";
      const priority = u.priority !== undefined ? `<priority>${u.priority}</priority>` : "";
      return `<url><loc>${escapeXml(`${siteConfig.url}${u.loc}`)}</loc>${lastmod}${freq}${priority}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
}

export function buildSitemapIndexXml(sitemapPaths: string[]) {
  const items = sitemapPaths
    .map((path) => `<sitemap><loc>${escapeXml(`${siteConfig.url}${path}`)}</loc></sitemap>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`;
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
