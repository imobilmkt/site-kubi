import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostCard } from "@/components/content/PostCard";
import { getAllPostSlugs, getPostSource, getRelatedPosts } from "@/lib/blog/posts";
import { getCategoryLabel } from "@/lib/blog/categories";
import { siteConfig } from "@/config/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostSource(slug);
  if (!post) return {};

  return {
    title: post.data.title,
    description: post.data.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      type: "article",
      publishedTime: post.data.date,
      images: [{ url: post.data.coverImage }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  const post = await getPostSource(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.data.category, 3);
  const canonical = `${siteConfig.url}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    image: post.data.coverImage,
    datePublished: post.data.date,
    author: { "@type": "Organization", name: post.data.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="py-10">
      <JsonLd data={articleJsonLd} />
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: getCategoryLabel(post.data.category), url: `/blog/categoria/${post.data.category}` },
            { name: post.data.title, url: `/blog/${slug}` },
          ]}
        />

        <p className="mt-4 text-sm text-kubi-gray">
          {getCategoryLabel(post.data.category)} · {formatDate(post.data.date)} ·{" "}
          {post.data.author}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          {post.data.title}
        </h1>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-card bg-kubi-gray-100">
          <Image
            src={post.data.coverImage}
            alt={post.data.coverImageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <article className="prose prose-neutral mt-8 max-w-none prose-headings:font-heading prose-a:text-kubi-orange-dark">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-kubi-black">
              Continue lendo
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
