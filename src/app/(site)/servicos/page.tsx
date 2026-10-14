import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesHub } from "@/components/content/ServicesHub";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça os serviços complementares da Kubi Imóveis em Brasília: arquitetura, serviços jurídicos, correspondente bancário, despachante, contratos, seguro, consórcio imobiliário, treinamento de vendas e avaliação de imóvel.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Serviços", url: "/servicos" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Serviços
        </h1>
        <p className="mt-3 max-w-2xl text-kubi-gray">
          Além de comprar, vender e alugar imóveis, a Kubi conecta você a uma rede de
          parceiros especializados para resolver tudo o que envolve o seu imóvel — do
          projeto à documentação. Clique no ícone de um serviço para conhecer os detalhes,
          ou fale direto com a nossa equipe pelo WhatsApp.
        </p>

        <div className="mt-10">
          <ServicesHub />
        </div>
      </Container>
    </main>
  );
}
