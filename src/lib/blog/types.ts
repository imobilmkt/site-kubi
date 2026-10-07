import type { BlogCategory } from "./categories";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  coverImage: string;
  coverImageAlt: string;
  author: string;
};

export type PostMeta = PostFrontmatter & { slug: string };
