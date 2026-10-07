import { buildUrlsetXml, xmlResponse, type SitemapUrl } from "@/lib/seo/sitemap";
import { getAllPostsMeta } from "@/lib/blog/posts";
import { BLOG_CATEGORIES } from "@/lib/blog/categories";


export async function GET() {
  const posts = await getAllPostsMeta();

  const urls: SitemapUrl[] = [
    ...posts.map((p) => ({
      loc: `/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...BLOG_CATEGORIES.map((c) => ({
      loc: `/blog/categoria/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return xmlResponse(buildUrlsetXml(urls));
}
