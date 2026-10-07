import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site da Kubi Imóveis.",
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosDeUsoPage() {
  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Termos de Uso", url: "/termos-de-uso" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Termos de Uso
        </h1>
        <p className="mt-2 text-sm text-kubi-gray">Última atualização: [PREENCHER DATA]</p>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-heading">
          <h2>1. Aceitação dos termos</h2>
          <p>
            Ao acessar e utilizar o site {siteConfig.domain}, você concorda com estes
            Termos de Uso. Caso não concorde, recomendamos que não utilize o site.
          </p>

          <h2>2. Sobre o conteúdo do site</h2>
          <p>
            As informações sobre imóveis publicadas no site — preços, metragens,
            características e disponibilidade — têm caráter informativo e estão sujeitas a
            alteração sem aviso prévio. A confirmação final de qualquer condição comercial
            deve ser feita diretamente com um corretor da {siteConfig.name}.
          </p>

          <h2>3. Simuladores e estimativas</h2>
          <p>
            O simulador de financiamento disponível nas páginas de imóvel apresenta valores
            meramente estimados, sem compromisso, e não substitui a simulação oficial feita
            junto a uma instituição financeira.
          </p>

          <h2>4. Propriedade intelectual</h2>
          <p>
            Marca, logotipo, textos, fotografias e demais conteúdos do site são de
            titularidade da {siteConfig.legalName} ou de terceiros licenciados, sendo vedada
            a reprodução sem autorização prévia.
          </p>

          <h2>5. Uso adequado do site</h2>
          <p>
            Você se compromete a não utilizar o site para fins ilícitos, não enviar
            conteúdo ofensivo pelos formulários e não tentar acessar áreas restritas ou
            comprometer a segurança da plataforma.
          </p>

          <h2>6. Links para sites de terceiros</h2>
          <p>
            O site pode conter links para serviços de terceiros (como WhatsApp e Google
            Maps). Não nos responsabilizamos pelo conteúdo ou pelas práticas de privacidade
            desses serviços.
          </p>

          <h2>7. Limitação de responsabilidade</h2>
          <p>
            A {siteConfig.name} envida esforços para manter as informações do site
            atualizadas, mas não garante a ausência de erros ou omissões.
          </p>

          <h2>8. Alterações destes termos</h2>
          <p>
            Estes Termos de Uso podem ser atualizados a qualquer momento, sendo a versão
            vigente sempre a publicada nesta página.
          </p>

          <h2>9. Contato</h2>
          <p>
            Dúvidas sobre estes termos podem ser enviadas para{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>

          <p className="mt-10 text-sm text-kubi-gray">
            [PREENCHER] Este texto é um modelo inicial e deve ser revisado por um advogado
            antes da publicação definitiva.
          </p>
        </div>
      </Container>
    </main>
  );
}
