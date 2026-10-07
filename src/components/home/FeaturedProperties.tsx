import Link from "next/link";
import { getFeaturedProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Container } from "@/components/ui/Container";

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties(8);
  if (properties.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
              Imóveis em destaque
            </h2>
            <p className="mt-2 text-kubi-gray">
              Seleção exclusiva de imóveis de alto padrão em Brasília.
            </p>
          </div>
          <Link
            href="/imoveis/venda"
            className="hidden shrink-0 text-sm font-semibold text-kubi-orange-dark hover:underline sm:block"
          >
            Ver todos os imóveis →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
