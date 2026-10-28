import Link from "@/components/ui/Link";

type PaginationProps = {
  basePath: string;
  searchParams: Record<string, string | undefined>;
  page: number;
  totalPages: number;
};

export function Pagination({ basePath, searchParams, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  function hrefFor(targetPage: number) {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter((entry): entry is [string, string] => Boolean(entry[1])),
    );
    if (targetPage > 1) params.set("pagina", String(targetPage));
    else params.delete("pagina");
    const query = params.toString();
    return `${basePath}${query ? `?${query}` : ""}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginação de imóveis" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          className="rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm hover:border-kubi-black"
        >
          Anterior
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === page ? "page" : undefined}
          className={`rounded-lg px-3 py-2 text-sm ${
            p === page
              ? "bg-kubi-black text-kubi-white"
              : "border border-kubi-gray-200 hover:border-kubi-black"
          }`}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link
          href={hrefFor(page + 1)}
          className="rounded-lg border border-kubi-gray-200 px-3 py-2 text-sm hover:border-kubi-black"
        >
          Próxima
        </Link>
      )}
    </nav>
  );
}
