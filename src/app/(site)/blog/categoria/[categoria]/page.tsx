import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PostCard } from "@/components/content/PostCard";
import { getPostsByCategory } from "@/lib/blog/posts";
import { BLOG_CATEGORIES, getCategoryLabel, type BlogCategory } from "@/lib/blog/categories";

type PageProps = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ categoria: c.slug }));
}

function isValidCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORIES.some((c) => c.slug === value);
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { categoria } = await props.params;
  if (!isValidCategory(categoria)) return {};
  const label = getCategoryLabel(categoria);
  return {
    title: `Blog — ${label}`,
    description: `Artigos sobre ${label.toLowerCase()} imóveis em Brasília, escritos pela equipe da Kubi Imóveis.`,
    alternates: { canonical: `/blog/categoria/${categoria}` },
  };
}

export default async function BlogCategoryPage(props: PageProps) {
  const { categoria } = await props.params;
  if (!isValidCategory(categoria)) notFound();

  const posts = await getPostsByCategory(categoria);
  const label = getCategoryLabel(categoria);

  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: label, url: `/blog/categoria/${categoria}` },
          ]}
        />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Blog — {label}
        </h1>

        {posts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-kubi-gray">Em breve, novos conteúdos nesta categoria.</p>
        )}
      </Container>
    </main>
  );
}
