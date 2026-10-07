import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Faq } from "@/components/content/Faq";
import { generalFaqItems } from "@/lib/content/general-faq";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Documentação para comprar imóvel, ITBI e escritura no DF, administração de aluguel, garantias locatícias e quanto custa anunciar — respondemos as principais dúvidas.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Perguntas frequentes", url: "/faq" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Perguntas frequentes
        </h1>
        <p className="mt-3 text-kubi-gray">
          Reunimos as dúvidas mais comuns de quem quer comprar, vender, alugar ou ter um
          imóvel administrado pela Kubi em Brasília.
        </p>

        <div className="mt-10">
          <Faq items={generalFaqItems} title={null} />
        </div>
      </Container>
    </main>
  );
}
