import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade da Kubi Imóveis: quais dados coletamos, por quê, e como exercer seus direitos previstos na LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Política de Privacidade", url: "/politica-de-privacidade" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-kubi-gray">Última atualização: [PREENCHER DATA]</p>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-heading">
          <p>
            Esta Política de Privacidade descreve como a {siteConfig.legalName} (
            &ldquo;{siteConfig.name}&rdquo;, &ldquo;nós&rdquo;), inscrita sob CRECI-DF{" "}
            {siteConfig.creci}, com sede em {siteConfig.address.full}, coleta, usa,
            compartilha e protege dados pessoais de visitantes e clientes do site{" "}
            {siteConfig.domain}, em conformidade com a Lei Geral de Proteção de Dados
            Pessoais (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>1. Quais dados coletamos</h2>
          <ul>
            <li>
              <strong>Dados fornecidos por você</strong>: nome, e-mail, telefone/WhatsApp e
              demais informações enviadas nos formulários do site (contato, agendamento de
              visita, captação de imóvel, avaliação, trabalhe conosco).
            </li>
            <li>
              <strong>Dados de navegação</strong>: páginas visitadas, dispositivo, origem do
              acesso e identificadores de campanha (UTMs, gclid, gbraid, wbraid, fbclid),
              coletados somente após consentimento para cookies de marketing/analytics.
            </li>
            <li>
              <strong>Dados de imóveis de terceiros</strong>: quando você anuncia um imóvel
              conosco, coletamos os dados do imóvel e, se aplicável, dados de contato de
              coproprietários informados por você.
            </li>
          </ul>

          <h2>2. Para que usamos seus dados</h2>
          <ul>
            <li>Responder solicitações de contato, visita, avaliação e captação;</li>
            <li>Operacionalizar a administração de locação, quando contratada;</li>
            <li>Enviar comunicações sobre o andamento do seu atendimento;</li>
            <li>
              Medir o desempenho de campanhas de marketing (Google Ads, Meta Ads) e do
              próprio site, quando há consentimento para cookies não essenciais;
            </li>
            <li>Cumprir obrigações legais e regulatórias aplicáveis à atividade imobiliária.</li>
          </ul>

          <h2>3. Com quem compartilhamos</h2>
          <p>
            Podemos compartilhar dados com: (i) nosso CRM de gestão imobiliária, para
            atendimento e gestão de leads; (ii) provedores de analytics e publicidade
            (Google Tag Manager, Google Analytics, Google Ads, Meta Ads), apenas após
            consentimento; (iii) Cloudflare Turnstile, para proteção anti-spam dos
            formulários; (iv) autoridades públicas, quando exigido por lei.
          </p>

          <h2>4. Cookies e Consent Mode</h2>
          <p>
            Usamos cookies essenciais (necessários ao funcionamento do site) e cookies não
            essenciais (analytics e publicidade), estes últimos carregados apenas após seu
            consentimento no banner de cookies, em conformidade com o Google Consent Mode
            v2. Veja detalhes na nossa{" "}
            <a href="/politica-de-cookies" target="_blank" rel="noopener noreferrer">
              Política de Cookies
            </a>
            .
          </p>

          <h2>5. Seus direitos como titular de dados</h2>
          <p>Nos termos da LGPD, você pode solicitar, a qualquer momento:</p>
          <ul>
            <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
            <li>Eliminação dos dados tratados com seu consentimento;</li>
            <li>Revogação do consentimento, a qualquer momento;</li>
            <li>Informação sobre com quem compartilhamos seus dados.</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato pelo e-mail{" "}
            <a href={`mailto:${siteConfig.contact.email}`} target="_blank" rel="noopener noreferrer">
              {siteConfig.contact.email}
            </a>
            .
          </p>

          <h2>6. Retenção e segurança</h2>
          <p>
            Mantemos seus dados pelo tempo necessário ao cumprimento das finalidades
            descritas nesta política ou de obrigações legais, adotando medidas técnicas e
            administrativas razoáveis para protegê-los contra acessos não autorizados e
            situações de perda, alteração ou vazamento.
          </p>

          <h2>7. Alterações desta política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. Recomendamos a revisão
            frequente desta página.
          </p>

          <h2>8. Contato</h2>
          <p>
            Dúvidas sobre esta política podem ser enviadas para{" "}
            <a href={`mailto:${siteConfig.contact.email}`} target="_blank" rel="noopener noreferrer">
              {siteConfig.contact.email}
            </a>{" "}
            ou para o endereço {siteConfig.address.full}.
          </p>

          <p className="mt-10 text-sm text-kubi-gray">
            [PREENCHER] Este texto é um modelo inicial e deve ser revisado por um
            advogado antes da publicação definitiva, incluindo a definição de um encarregado
            de dados (DPO), se aplicável.
          </p>
        </div>
      </Container>
    </main>
  );
}
