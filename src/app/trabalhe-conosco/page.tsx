import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TrabalheConoscoForm } from "@/components/forms/TrabalheConoscoForm";

export const metadata: Metadata = {
  title: "Trabalhe conosco — Seja um corretor parceiro",
  description:
    "Quer ser corretor parceiro da Kubi Imóveis em Brasília? Conheça a oportunidade e candidate-se.",
  alternates: { canonical: "/trabalhe-conosco" },
};

const reasons = [
  {
    title: "Marca de alto padrão",
    description:
      "Atenda um público exigente com o respaldo de uma marca posicionada em exclusividade e sofisticação.",
  },
  {
    title: "Suporte documental completo",
    description:
      "Conte com uma estrutura jurídica e documental que já analisa cada detalhe além do exigido por lei.",
  },
  {
    title: "Captação e divulgação",
    description:
      "Trabalhe com imóveis bem fotografados e divulgados nos canais certos, sem depender só do seu networking.",
  },
];

export default function TrabalheConoscoPage() {
  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Trabalhe conosco", url: "/trabalhe-conosco" }]} />

        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
              Seja um corretor parceiro da Kubi
            </h1>
            <p className="mt-4 max-w-2xl text-kubi-gray">
              Buscamos corretores que compartilham da nossa visão: atendimento exclusivo,
              segurança documental e compromisso de ser sempre solução para o cliente. Se
              isso combina com você, queremos te conhecer.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-card border border-kubi-gray-200 p-5">
                  <h2 className="font-heading font-semibold text-kubi-black">{r.title}</h2>
                  <p className="mt-2 text-sm text-kubi-gray">{r.description}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-card border border-kubi-gray-200 p-6">
              <h2 className="font-heading text-xl font-semibold text-kubi-black">
                Candidate-se
              </h2>
              <div className="mt-4">
                <TrabalheConoscoForm />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
