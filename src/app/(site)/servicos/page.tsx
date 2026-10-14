import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesHub } from "@/components/content/ServicesHub";

export const metadata: Metadata = {
  title: "Todos os serviços",
  description:
    "Todos os serviços da Kubi Imóveis em Brasília: comprar, alugar, anunciar, administração, intermediação, financiamento, consórcio e avaliação de imóvel, além de arquitetura, jurídico, correspondente bancário, despachante, contratos, seguro e treinamento de vendas.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Serviços", url: "/servicos" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Todos os serviços
        </h1>
        <p className="mt-3 max-w-2xl text-kubi-gray">
          Da compra e venda à administração do imóvel, e de uma rede de parceiros
          especializados para resolver tudo o que envolve o seu patrimônio — do projeto à
          documentação. Clique no ícone de um serviço para conhecer os detalhes, ou fale
          direto com a nossa equipe pelo WhatsApp.
        </p>

        <div className="mt-10">
          <ServicesHub />
        </div>
      </Container>
    </main>
  );
}
