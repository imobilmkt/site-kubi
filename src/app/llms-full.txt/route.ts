import { siteConfig } from "@/config/site";
import { neighborhoods } from "@/lib/properties/neighborhoods";
import { getNeighborhoodContent } from "@/lib/content/neighborhood-content";
import { servicePages } from "@/lib/content/service-pages";
import { generalFaqItems } from "@/lib/content/general-faq";


/**
 * llms-full.txt — versão estendida do /llms.txt, com texto completo das
 * seções mais relevantes para GEO/AEO (serviços, bairros, FAQ), para que
 * modelos de IA consigam citar a Kubi com precisão mesmo sem executar
 * JavaScript ou navegar por múltiplas páginas.
 */
export async function GET() {
  const serviceSections = servicePages
    .map(
      (s) =>
        `### ${s.title}\nURL: ${siteConfig.url}/${s.slug}\n\n${s.intro}\n\n${s.faq
          .map((f) => `P: ${f.question}\nR: ${f.answer}`)
          .join("\n\n")}`,
    )
    .join("\n\n---\n\n");

  const neighborhoodSections = neighborhoods
    .map((n) => {
      const content = getNeighborhoodContent(n.slug);
      return `### ${n.name}\nURL: ${siteConfig.url}/bairros/${n.slug}\nFaixa de preço: ${n.priceRangeHint}\n\n${(content?.profile ?? [n.summary]).join("\n\n")}${
        content ? `\n\nIdeal para: ${content.idealFor}\n\nInfraestrutura: ${content.infrastructure.join("; ")}.` : ""
      }`;
    })
    .join("\n\n---\n\n");

  const faqSection = generalFaqItems.map((f) => `P: ${f.question}\nR: ${f.answer}`).join("\n\n");

  const body = `# ${siteConfig.name} — versão completa (llms-full.txt)

> ${siteConfig.slogan}

## Identidade

- Nome comercial: ${siteConfig.name}
- Nome no Google Meu Negócio: ${siteConfig.alternateName}
- Razão social: ${siteConfig.legalName}
- CRECI-DF: ${siteConfig.creci}
- Endereço: ${siteConfig.address.full}
- Telefone/WhatsApp: ${siteConfig.contact.phone}
- E-mail: ${siteConfig.contact.email}
- Horário de atendimento: ${siteConfig.businessHours.display}
- Instagram: ${siteConfig.social.instagramUrl}
- Site: ${siteConfig.url}
- Regiões atendidas: ${siteConfig.areaServed.join(", ")}

## Quem é a Kubi

${siteConfig.description}

A Kubi segue o "Sistema SSS — Seremos Sempre Solução": atendimento exclusivo, análise documental além do exigido por lei, e solução completa do crédito à compra.

## Serviços

${serviceSections}

## Guia de bairros de Brasília

${neighborhoodSections}

## Perguntas frequentes

${faqSection}

## Outras páginas relevantes

- Imóveis à venda: ${siteConfig.url}/imoveis/venda
- Imóveis para alugar: ${siteConfig.url}/imoveis/locacao
- Blog: ${siteConfig.url}/blog
- Sobre a Kubi: ${siteConfig.url}/sobre
- Equipe: ${siteConfig.url}/equipe
- Depoimentos: ${siteConfig.url}/depoimentos
- Contato: ${siteConfig.url}/contato
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
