import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { neighborhoods } from "@/lib/properties/neighborhoods";
import { neighborhoodImages } from "@/lib/properties/neighborhood-images";

export function NeighborhoodShowcase() {
  return (
    <section className="bg-kubi-gray-50 py-16 sm:py-20">
      <Container>
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
            Busque por região de Brasília
          </h2>
          <p className="mt-2 text-kubi-gray">
            Conhecemos cada bairro como ninguém. Explore os imóveis disponíveis por região.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {neighborhoods.slice(0, 10).map((n) => {
            const image = neighborhoodImages[n.slug];
            return (
              <Link
                key={n.slug}
                href={`/bairros/${n.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-card"
              >
                {image && (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-kubi-black/80 via-kubi-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 font-heading text-sm font-semibold text-kubi-white sm:text-base">
                  {n.name}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
