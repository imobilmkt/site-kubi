import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import matter from "gray-matter";
import type { BlogCategory } from "./categories";
import type { PostFrontmatter, PostMeta } from "./types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const BLOG_TAG = "blog-posts";

async function readAllSlugs() {
  const files = await readdir(BLOG_DIR);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");

  const slugs = await readAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { ...(data as PostFrontmatter), slug };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostsByCategory(category: BlogCategory): Promise<PostMeta[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");

  const all = await getAllPostsMeta();
  return all.filter((p) => p.category === category);
}

export async function getPostSource(slug: string): Promise<{ content: string; data: PostFrontmatter } | null> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");

  try {
    const raw = await readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { content, data } = matter(raw);
    return { content, data: data as PostFrontmatter };
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");
  return readAllSlugs();
}

export async function getRelatedPosts(slug: string, category: BlogCategory, limit = 3): Promise<PostMeta[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");

  const all = await getAllPostsMeta();
  return all.filter((p) => p.slug !== slug && p.category === category).slice(0, limit);
}

export { BLOG_TAG };
