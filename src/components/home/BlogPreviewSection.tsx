import Link from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/content/PostCard";
import { getAllPostsMeta } from "@/lib/blog/posts";

export async function BlogPreviewSection() {
  const posts = (await getAllPostsMeta()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
              Do blog da Kubi
            </h2>
            <p className="mt-2 text-kubi-gray">
              Conteúdo para comprar, vender, alugar e investir com mais segurança.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 text-sm font-semibold text-kubi-orange-dark hover:underline sm:block"
          >
            Ver todos os posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
