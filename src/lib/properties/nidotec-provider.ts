/* eslint-disable @typescript-eslint/no-unused-vars -- esqueleto: parâmetros e
   constantes serão usados quando o mapeamento real for implementado (ver TODOs). */
import type { PropertyProvider } from "./provider";
import type { Property, PropertyFilters, PropertyListResult } from "./types";

/**
 * Esqueleto do provider que vai consumir o CRM Nidotec.
 *
 * IMPORTANTE: nenhum endpoint, payload ou campo abaixo é real — são apenas
 * placeholders estruturais para o dia em que a documentação oficial da API
 * Nidotec for recebida. Não chame nenhuma URL daqui até substituir
 * `NIDOTEC_API_BASE_URL`/`NIDOTEC_API_TOKEN` por valores reais e mapear os
 * campos conforme a documentação.
 *
 * A integração pode ocorrer de duas formas (ver TODOs):
 *   1. API REST própria da Nidotec (preferencial, se existir).
 *   2. Feed XML no padrão de portais (VivaReal/ZAP/OLX) — formato comum em
 *      imobiliárias que ainda não têm API própria.
 * A camada `mapNidotecPropertyToProperty` abaixo é o ÚNICO lugar que deve
 * conhecer o formato bruto da Nidotec — o restante do app sempre consome o
 * tipo `Property` já normalizado.
 */

const NIDOTEC_API_BASE_URL = process.env.NIDOTEC_API_BASE_URL ?? "";
const NIDOTEC_API_TOKEN = process.env.NIDOTEC_API_TOKEN ?? "";
const NIDOTEC_FEED_URL = process.env.NIDOTEC_FEED_URL ?? "";

/**
 * TODO(integração Nidotec): substituir por tipo real assim que a
 * documentação da API/feed for recebida.
 */
type NidotecRawProperty = Record<string, unknown>;

/**
 * TODO(integração Nidotec): implementar o mapeamento campo a campo entre o
 * formato retornado pela Nidotec (REST ou XML já parseado) e o nosso modelo
 * `Property` (src/lib/properties/types.ts). Sugestão de abordagem:
 *   1. Pedir à Nidotec um payload de exemplo de um imóvel completo.
 *   2. Preencher esta função campo a campo, documentando no comentário ao
 *      lado de cada linha a chave original da Nidotec.
 *   3. Rodar `npm run validate:jsonld` (ver README) contra um imóvel real
 *      mapeado para garantir que o schema.org gerado continua válido.
 */
function mapNidotecPropertyToProperty(_raw: NidotecRawProperty): Property {
  throw new Error(
    "NidotecProvider.mapNidotecPropertyToProperty: mapeamento ainda não implementado. " +
      "Aguardando documentação da API/feed da Nidotec.",
  );
}

function assertConfigured() {
  if (!NIDOTEC_API_BASE_URL && !NIDOTEC_FEED_URL) {
    throw new Error(
      "NidotecProvider: nenhuma origem de dados configurada. Defina " +
        "NIDOTEC_API_BASE_URL (+ NIDOTEC_API_TOKEN) para integração via REST, " +
        "ou NIDOTEC_FEED_URL para integração via feed XML.",
    );
  }
}

export class NidotecProvider implements PropertyProvider {
  async list(_filters: PropertyFilters): Promise<PropertyListResult> {
    assertConfigured();
    // TODO(integração Nidotec — REST):
    //   const res = await fetch(`${NIDOTEC_API_BASE_URL}/imoveis?${toQueryString(filters)}`, {
    //     headers: { Authorization: `Bearer ${NIDOTEC_API_TOKEN}` },
    //     next: { revalidate: 3600, tags: ["properties"] },
    //   });
    //   const json = await res.json();
    //   return { items: json.data.map(mapNidotecPropertyToProperty), ... };
    //
    // TODO(integração Nidotec — feed XML):
    //   const xml = await fetch(NIDOTEC_FEED_URL, { next: { revalidate: 3600 } }).then(r => r.text());
    //   const parsed = parseVivaRealLikeFeed(xml); // implementar parser compatível
    //   return { items: parsed.map(mapNidotecPropertyToProperty), ... };
    throw new Error("NidotecProvider.list: não implementado.");
  }

  async getBySlug(_slug: string): Promise<Property | null> {
    assertConfigured();
    // TODO(integração Nidotec): buscar por slug/código no endpoint de detalhe.
    throw new Error("NidotecProvider.getBySlug: não implementado.");
  }

  async getByCode(_code: string): Promise<Property | null> {
    assertConfigured();
    throw new Error("NidotecProvider.getByCode: não implementado.");
  }

  async listFeatured(_limit?: number): Promise<Property[]> {
    assertConfigured();
    throw new Error("NidotecProvider.listFeatured: não implementado.");
  }

  async listSimilar(_property: Property, _limit?: number): Promise<Property[]> {
    assertConfigured();
    throw new Error("NidotecProvider.listSimilar: não implementado.");
  }

  async listAll(): Promise<Property[]> {
    assertConfigured();
    throw new Error("NidotecProvider.listAll: não implementado.");
  }
}
