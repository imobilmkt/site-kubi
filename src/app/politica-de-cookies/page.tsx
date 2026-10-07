import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Quais cookies o site da Kubi Imóveis utiliza e como gerenciar suas preferências de consentimento.",
  alternates: { canonical: "/politica-de-cookies" },
};

const cookieTable = [
  {
    category: "Essenciais",
    purpose: "Funcionamento básico do site (ex.: preferência de consentimento salva).",
    requiresConsent: "Não",
  },
  {
    category: "Analytics",
    purpose: "Medir uso do site via Google Analytics (páginas vistas, origem do tráfego).",
    requiresConsent: "Sim",
  },
  {
    category: "Publicidade",
    purpose: "Mensurar e otimizar campanhas no Google Ads e Meta Ads.",
    requiresConsent: "Sim",
  },
];

export default function PoliticaDeCookiesPage() {
  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Política de Cookies", url: "/politica-de-cookies" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Política de Cookies
        </h1>
        <p className="mt-2 text-sm text-kubi-gray">Última atualização: [PREENCHER DATA]</p>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-heading">
          <p>
            Cookies são pequenos arquivos armazenados no seu navegador que ajudam o site a
            funcionar corretamente e a entender como ele é utilizado. Esta página explica
            quais cookies o site da {siteConfig.name} utiliza.
          </p>

          <h2>Categorias de cookies</h2>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-kubi-gray-200">
                <th className="py-2 pr-4 font-semibold text-kubi-black">Categoria</th>
                <th className="py-2 pr-4 font-semibold text-kubi-black">Finalidade</th>
                <th className="py-2 font-semibold text-kubi-black">Exige consentimento?</th>
              </tr>
            </thead>
            <tbody>
              {cookieTable.map((row) => (
                <tr key={row.category} className="border-b border-kubi-gray-100">
                  <td className="py-2 pr-4 text-kubi-black">{row.category}</td>
                  <td className="py-2 pr-4 text-kubi-gray-700">{row.purpose}</td>
                  <td className="py-2 text-kubi-gray-700">{row.requiresConsent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-heading">
          <h2>Como gerenciamos seu consentimento</h2>
          <p>
            Ao visitar o site pela primeira vez, você vê um banner com duas opções: aceitar
            todos os cookies ou manter apenas os essenciais. Enquanto você não escolhe, os
            cookies de analytics e publicidade permanecem bloqueados — implementamos isso de
            forma compatível com o Google Consent Mode v2.
          </p>
          <p>
            Você pode alterar sua escolha a qualquer momento limpando os dados de navegação
            do seu navegador para este site, o que faz o banner aparecer novamente.
          </p>

          <h2>Cookies de terceiros</h2>
          <p>
            Quando você aceita cookies não essenciais, serviços como Google Analytics,
            Google Ads e Meta Ads podem definir cookies próprios no seu navegador, sujeitos
            às respectivas políticas de privacidade dessas empresas.
          </p>

          <h2>Mais informações</h2>
          <p>
            Para entender como tratamos seus dados pessoais de forma mais ampla, consulte
            nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.
          </p>
        </div>
      </Container>
    </main>
  );
}
