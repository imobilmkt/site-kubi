import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProperties } from "@/lib/properties";
import {
  buildFiltersFromRequest,
  isCleanCategoryQuery,
  parseSegments,
  type ListingSearchParams,
} from "@/lib/properties/query";
import {
  buildListingBreadcrumbs,
  buildListingIntro,
  buildListingTitle,
} from "@/lib/properties/listing-copy";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FilterBar } from "@/components/properties/FilterBar";
import { ListingView } from "@/components/properties/ListingView";
import { Pagination } from "@/components/properties/Pagination";

/**
 * Listagem depende de searchParams (filtros/paginação) em praticamente toda
 * requisição — não faz sentido pré-renderizar um shell estático aqui. Os
 * dados em si (getProperties) continuam cacheados por chave de filtro.
 */
export const instant = false;

type PageProps = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<ListingSearchParams>;
};

async function resolveListing(props: PageProps) {
  const { segments: rawSegments } = await props.params;
  const searchParams = await props.searchParams;
  const segments = parseSegments(rawSegments);
  if (segments === null) return null;

  const filters = buildFiltersFromRequest(segments, searchParams);
  const result = await getProperties(filters);
  const indexable = isCleanCategoryQuery(searchParams) && result.total > 0;

  return { segments, searchParams, filters, result, indexable };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const listing = await resolveListing(props);
  if (!listing) return {};

  const title = buildListingTitle(listing.segments);
  const description = `${buildListingIntro(listing.segments)}`.slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: canonicalPath(listing.segments) },
    robots: listing.indexable ? undefined : { index: false, follow: true },
  };
}

function canonicalPath(segments: { purpose?: string; type?: string; neighborhood?: string }) {
  const parts = ["imoveis", segments.purpose, segments.type, segments.neighborhood].filter(
    Boolean,
  );
  return `/${parts.join("/")}`;
}

export default async function ImoveisPage(props: PageProps) {
  const listing = await resolveListing(props);
  if (!listing) notFound();

  const { segments, searchParams, filters, result } = listing;
  const title = buildListingTitle(segments);
  const intro = buildListingIntro(segments);
  const breadcrumbItems = buildListingBreadcrumbs(segments);

  const flatSearchParams: Record<string, string | undefined> = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="mt-3 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-kubi-gray">{intro}</p>

        <div className="mt-8">
          <FilterBar filters={filters} />
        </div>

        <p className="mt-6 text-sm text-kubi-gray">
          {result.total} {result.total === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>

        <div className="mt-4">
          {result.items.length > 0 ? (
            <ListingView properties={result.items} />
          ) : (
            <div className="rounded-card border border-dashed border-kubi-gray-300 p-10 text-center text-kubi-gray">
              Nenhum imóvel encontrado com esses filtros no momento. Fale com a Kubi — talvez
              tenhamos uma oportunidade que ainda não está no site.
            </div>
          )}
        </div>

        <Pagination
          basePath={canonicalPath(segments)}
          searchParams={flatSearchParams}
          page={result.page}
          totalPages={result.totalPages}
        />
      </Container>
    </main>
  );
}
