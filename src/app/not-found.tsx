import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { QuickSearchForm } from "@/components/home/QuickSearchForm";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";

export default function NotFound() {
  return (
    <main className="py-16">
      <Container className="text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kubi-orange">
          Erro 404
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Essa página não existe (ou o imóvel não está mais disponível)
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-kubi-gray">
          O link pode ter mudado ou o conteúdo não está mais no ar. Use a busca abaixo ou
          volte para a{" "}
          <Link href="/" className="font-semibold text-kubi-orange-dark hover:underline">
            página inicial
          </Link>
          .
        </p>

        <div className="mt-8 flex justify-center">
          <QuickSearchForm />
        </div>
      </Container>

      <div className="mt-8">
        <FeaturedProperties />
      </div>
    </main>
  );
}
