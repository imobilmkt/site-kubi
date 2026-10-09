import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sobre a Kubi Imóveis",
  description:
    "Conheça a história, a missão e os valores da Kubi Imóveis — imobiliária de alto padrão em Brasília/DF. Entenda o Sistema SSS e o significado da nossa marca.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Sobre a Kubi", url: "/sobre" }]} />

        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Sobre a Kubi Imóveis
        </h1>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold text-kubi-black">
            Como começamos
          </h2>
          <p className="mt-4 text-kubi-black/85">
            A Kubi começou no momento em que percebemos algo simples, mas essencial:
            fazíamos as coisas de um jeito diferente. Enquanto muitos pensavam em
            resultados, nós pensávamos em pessoas. Descobrimos que o que realmente nos
            movia não era estar em primeiro lugar, mas colocar nossos clientes e parceiros
            lá.
          </p>
          <p className="mt-4 text-kubi-black/85">
            Foi assim que nos unimos — para somar o que cada um tinha de melhor e criar
            algo completo, humano e verdadeiro. Nasceu da vontade de servir com
            propósito, de construir relações sólidas e experiências que vão além da
            venda. Desde o início, nossa meta é a mesma: fazer com que cada pessoa que
            passe pela Kubi sinta que está no lugar certo, porque aqui, tudo começa com
            confiança.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold text-kubi-black">
            De onde vem o nome &ldquo;Kubi&rdquo;
          </h2>
          <p className="mt-4 text-kubi-black/85">
            Brasília tem uma identidade única, e nada a conecta mais à sua origem do que
            a figura de Juscelino Kubitschek. Ao escolhermos &ldquo;Kubi&rdquo;, fazemos
            uma referência sutil e elegante ao criador da cidade, trazendo credibilidade
            e pertencimento — um elo com a própria história de Brasília.
          </p>
          <p className="mt-4 text-kubi-black/85">
            Ao mesmo tempo, &ldquo;Kubi&rdquo; traz um conceito direto com o nosso
            negócio: o cubo, o metro cúbico, o espaço habitável. É uma metáfora para o
            que vendemos — imóveis, arquitetura, ambientes — e representa solidez,
            estrutura e equilíbrio. Um nome curto, moderno e memorável, que une história,
            conceito e sofisticação em quatro letras.
          </p>
        </section>

        <section className="mt-12 grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-kubi-black">Missão</h2>
            <p className="mt-2 text-sm text-kubi-black/80">
              Levar ao nosso cliente nosso expertise e uma solução completa para o seu
              patrimônio, com muita dedicação e exclusividade no atendimento — e não só
              no imóvel.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-kubi-black">Visão</h2>
            <p className="mt-2 text-sm text-kubi-black/80">
              Alcançar um patamar de corretagem diferente do atual. Inovar. Ser completo.
              Ser solução.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-kubi-black">Valores</h2>
            <p className="mt-2 text-sm text-kubi-black/80">
              Compromisso com a excelência: não abrimos mão de um serviço completo,
              transparente e de alta qualidade, analisando cada detalhe da documentação
              além do exigido por lei.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-card bg-kubi-black p-8 text-kubi-white">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kubi-orange">
            Sistema SSS
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">Seremos Sempre Solução</h2>
          <p className="mt-4 text-kubi-white/80">
            Somos uma imobiliária que reconhece o quanto cada imóvel é especial.
            Acreditamos que toda experiência imobiliária merece dedicação e
            exclusividade. Exclusividade, para nós, não é apenas sobre vender: é sobre
            garantir a melhor oportunidade para o comprador e o investimento certo para
            quem deseja multiplicar o patrimônio.
          </p>
          <p className="mt-4 text-kubi-white/80">
            Nos desenvolvemos para sermos completos, do crédito à compra, da escolha
            certa ao investimento — estamos preparados para oferecer uma experiência
            completa, transparente e feita sob medida para você. De uma forma ou de
            outra, iremos nos conectar à sua necessidade. Para nós, todo imóvel é
            especial, porque é seu.
          </p>
        </section>

        <section className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <Image
            src="/brand/kubi-logo-stack-black.png"
            alt="Símbolo da Kubi Imóveis"
            width={131}
            height={140}
            className="h-auto w-auto shrink-0"
          />
          <div>
            <h2 className="font-heading text-2xl font-semibold text-kubi-black">
              O significado da nossa logo
            </h2>
            <p className="mt-4 text-kubi-black/85">
              O símbolo da Kubi nasce da observação atenta de Brasília: as Asas do Plano
              Piloto, a Catedral Metropolitana, a Bandeira do Distrito Federal e as
              icônicas &ldquo;tesourinhas&rdquo; — os cruzamentos viários que são marca
              registrada da cidade — se encontram em uma composição única, em forma de
              cubo, que carrega o brilho de um ponto central: a atenção exclusiva que
              dedicamos a cada cliente.
            </p>
          </div>
        </section>

        <section className="mt-12 border-t border-kubi-gray-200 pt-8 text-sm text-kubi-gray">
          <p>
            {siteConfig.name} ({siteConfig.alternateName}) — CRECI-DF {siteConfig.creci}.{" "}
            {siteConfig.address.full}
          </p>
        </section>
      </Container>
    </main>
  );
}
