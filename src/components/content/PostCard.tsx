import Image from "next/image";
import Link from "@/components/ui/Link";
import type { PostMeta } from "@/lib/blog/types";
import { getCategoryLabel } from "@/lib/blog/categories";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-card border border-kubi-gray-200"
    >
      <div className="relative aspect-[16/10] bg-kubi-gray-100">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-kubi-gray">
          <span className="rounded-full bg-kubi-gray-100 px-2.5 py-1 font-medium text-kubi-gray-700">
            {getCategoryLabel(post.category)}
          </span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-semibold text-kubi-black">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-kubi-gray">{post.description}</p>
      </div>
    </Link>
  );
}
