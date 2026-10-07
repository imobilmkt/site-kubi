import { buildUrlsetXml, xmlResponse, type SitemapUrl } from "@/lib/seo/sitemap";
import { getAllProperties } from "@/lib/properties";
import { getPropertyUrl } from "@/lib/properties/url";
import { routablePurposes } from "@/lib/properties/types";


export async function GET() {
  const properties = await getAllProperties();

  const urls: SitemapUrl[] = properties.flatMap((property) =>
    routablePurposes(property.purpose).map((purpose) => ({
      loc: getPropertyUrl(property, purpose),
      lastModified: property.updatedAt,
      changeFrequency: "daily" as const,
      priority: property.featured ? 0.9 : 0.7,
    })),
  );

  return xmlResponse(buildUrlsetXml(urls));
}
