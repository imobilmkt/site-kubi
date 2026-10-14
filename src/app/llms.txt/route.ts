import { siteConfig } from "@/config/site";
import { neighborhoods } from "@/lib/properties/neighborhoods";
import { servicePages } from "@/lib/content/service-pages";
import { complementaryServices } from "@/lib/content/complementary-services";


/**
 * llms.txt — descrição curta e estruturada do site para agentes e modelos
 * de IA (GPTBot, ClaudeBot, PerplexityBot etc.), seguindo a convenção
 * https://llmstxt.org. Ver também /llms-full.txt para uma versão mais
 * completa, e robots.ts para a liberação explícita desses rastreadores.
 */
export async function GET() {
  const regions = siteConfig.areaServed.join(", ");

  const serviceLines = servicePages
    .map((s) => `- [${s.title}](${siteConfig.url}/${s.slug}): ${s.metaDescription}`)
    .join("\n");

  const servicePageSlugs = new Set(servicePages.map((s) => s.slug));
  const complementaryServiceLines = complementaryServices
    .filter((s) => !servicePageSlugs.has(s.slug))
    .map((s) => `- [${s.title}](${siteConfig.url}${s.href}): ${s.description}`)
    .join("\n");

  const neighborhoodLines = neighborhoods
    .map((n) => `- [${n.name}](${siteConfig.url}/bairros/${n.slug})`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.slogan}. ${siteConfig.description}

${siteConfig.name} (nome registrado no Google Meu Negócio: ${siteConfig.alternateName}) é uma imobiliária de alto padrão sediada no Lago Sul, em Brasília/DF, Brasil. CRECI-DF ${siteConfig.creci}. Atende as seguintes regiões do Distrito Federal: ${regions}.

Contato: ${siteConfig.contact.phone} (telefone/WhatsApp), ${siteConfig.contact.email}. Endereço: ${siteConfig.address.full}. Horário de atendimento: ${siteConfig.businessHours.display}.

## Serviços

${serviceLines}
${complementaryServiceLines}
- [Serviços complementares (visão geral)](${siteConfig.url}/servicos)

## Imóveis

- [Comprar imóveis](${siteConfig.url}/imoveis/venda): listagem de imóveis à venda em Brasília, com filtros por tipo, bairro, preço, quartos e vagas.
- [Alugar imóveis](${siteConfig.url}/imoveis/locacao): listagem de imóveis para locação em Brasília.
- Cada imóvel tem página própria com ficha técnica completa, preço, condomínio, IPTU, fotos, localização aproximada e código de referência.

## Guia de bairros de Brasília

${neighborhoodLines}

## Outros conteúdos

- [Blog](${siteConfig.url}/blog): artigos sobre comprar, vender, alugar, investir, financiamento, documentação e bairros de Brasília.
- [Perguntas frequentes](${siteConfig.url}/faq)
- [Sobre a Kubi](${siteConfig.url}/sobre)
- [Equipe](${siteConfig.url}/equipe)
- [Contato](${siteConfig.url}/contato)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
