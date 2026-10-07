import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export type BreadcrumbItem = { name: string; url: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const full = [{ name: "Início", url: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-kubi-gray">
      <JsonLd data={breadcrumbJsonLd(full)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {full.map((item, index) => (
          <li key={item.url} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === full.length - 1 ? (
              <span aria-current="page" className="text-kubi-black">
                {item.name}
              </span>
            ) : (
              <Link href={item.url} className="hover:text-kubi-black hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
