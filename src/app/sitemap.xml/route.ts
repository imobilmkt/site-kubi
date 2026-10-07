import { buildSitemapIndexXml, xmlResponse } from "@/lib/seo/sitemap";

/** Índice de sitemaps — dividido por tipo de conteúdo (páginas, imóveis, bairros, blog). */
export async function GET() {
  return xmlResponse(
    buildSitemapIndexXml([
      "/sitemap-paginas.xml",
      "/sitemap-imoveis.xml",
      "/sitemap-bairros.xml",
      "/sitemap-blog.xml",
    ]),
  );
}
