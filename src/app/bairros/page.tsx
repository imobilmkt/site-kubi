import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { neighborhoods } from "@/lib/properties/neighborhoods";
import { neighborhoodImages } from "@/lib/properties/neighborhood-images";

export const metadata: Metadata = {
  title: "Guia de bairros de Brasília",
  description:
    "Guia completo dos bairros de Brasília: Lago Sul, Lago Norte, Asa Sul, Asa Norte, Sudoeste, Noroeste, Park Way, Jardim Botânico e Águas Claras.",
  alternates: { canonical: "/bairros" },
};

export default function BairrosIndexPage() {
  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Guia de bairros", url: "/bairros" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Guia de bairros de Brasília
        </h1>
        <p className="mt-3 max-w-2xl text-kubi-gray">
          Conhecemos cada região de Brasília como ninguém. Explore o perfil, a
          infraestrutura e a faixa de preço de cada bairro antes de decidir onde morar.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => {
            const image = neighborhoodImages[n.slug];
            return (
              <Link
                key={n.slug}
                href={`/bairros/${n.slug}`}
                className="group overflow-hidden rounded-card border border-kubi-gray-200"
              >
                <div className="relative aspect-[4/3] bg-kubi-gray-100">
                  {image && (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-heading text-lg font-semibold text-kubi-black">
                    {n.name}
                  </h2>
                  <p className="mt-1 text-sm text-kubi-gray">{n.priceRangeHint}</p>
                  <p className="mt-2 text-sm text-kubi-black/80">{n.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
