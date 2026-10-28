import Image from "next/image";
import Link from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import historyImage from "../../../public/hero/ponte-jk.jpg";

/**
 * Conteúdo extraído do Manual da Marca Kubi Imóveis (brand/Manual Kubi Imoveis.pdf),
 * seções "Como Começamos" e "Por que Kubi?". Versão completa em /sobre.
 */
export function HistorySection() {
  return (
    <section className="bg-kubi-white py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:order-2">
          <Image
            src={historyImage}
            alt="Ponte Juscelino Kubitschek sobre o Lago Paranoá, em Brasília"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover grayscale"
          />
        </div>

        <div className="lg:order-1">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kubi-orange">
            Nossa história
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
            De onde viemos — e de onde vem o nome Kubi
          </h2>
          <p className="mt-4 text-kubi-black/80">
            A Kubi começou no momento em que percebemos algo simples, mas essencial:
            fazíamos as coisas de um jeito diferente. Enquanto muitos pensavam em
            resultados, nós pensávamos em pessoas — e foi assim que nos unimos para criar
            algo completo, humano e verdadeiro, com a meta de fazer cada cliente sentir
            que está no lugar certo.
          </p>
          <p className="mt-4 text-kubi-black/80">
            O nome &ldquo;Kubi&rdquo; une essa história a Brasília: uma referência sutil a
            Juscelino Kubitschek, o criador da cidade, e ao mesmo tempo um conceito direto
            com o nosso negócio — o cubo, o metro cúbico, o espaço habitável. Solidez,
            estrutura e equilíbrio, em quatro letras.
          </p>
          <Link
            href="/sobre"
            className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-kubi-black underline decoration-kubi-orange decoration-2 underline-offset-4 hover:text-kubi-orange-dark"
          >
            Conheça nossa história completa
          </Link>
        </div>
      </Container>
    </section>
  );
}
