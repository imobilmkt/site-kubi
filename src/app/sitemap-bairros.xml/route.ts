import { buildUrlsetXml, xmlResponse } from "@/lib/seo/sitemap";
import { neighborhoods } from "@/lib/properties/neighborhoods";


export async function GET() {
  const urls = neighborhoods.map((n) => ({
    loc: `/bairros/${n.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return xmlResponse(buildUrlsetXml(urls));
}
