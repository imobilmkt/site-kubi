import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { testimonials } from "@/lib/content/testimonials";

export const metadata: Metadata = {
  title: "Depoimentos de clientes",
  description:
    "Veja o que clientes da Kubi Imóveis dizem sobre comprar, vender, alugar e ter seu imóvel administrado em Brasília.",
  alternates: { canonical: "/depoimentos" },
};

export default function DepoimentosPage() {
  return (
    <main className="py-10">
      <Container className="max-w-4xl">
        <Breadcrumbs items={[{ name: "Depoimentos", url: "/depoimentos" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          O que nossos clientes dizem
        </h1>
        <p className="mt-3 text-kubi-gray">
          Depoimentos de quem já comprou, vendeu, alugou ou teve o imóvel administrado
          pela Kubi.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-card border border-kubi-gray-200 p-6">
              <p className="text-kubi-black">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-kubi-gray">
                <span className="font-semibold text-kubi-black">{t.author}</span> —{" "}
                {t.context}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </main>
  );
}
