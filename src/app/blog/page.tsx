import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PostCard } from "@/components/content/PostCard";
import { getAllPostsMeta } from "@/lib/blog/posts";
import { BLOG_CATEGORIES } from "@/lib/blog/categories";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo sobre comprar, vender, alugar e investir em imóveis em Brasília, financiamento, documentação e os bairros do Distrito Federal.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta();

  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Blog da Kubi Imóveis
        </h1>
        <p className="mt-3 max-w-2xl text-kubi-gray">
          Conteúdo para quem quer comprar, vender, alugar ou investir em imóveis em
          Brasília com mais segurança.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/categoria/${c.slug}`}
              className="rounded-full border border-kubi-gray-200 px-4 py-1.5 text-sm font-medium text-kubi-black hover:border-kubi-black"
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
