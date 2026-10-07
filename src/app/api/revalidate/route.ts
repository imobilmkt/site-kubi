import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { PROPERTIES_TAG, propertyTag } from "@/lib/properties";

/**
 * Endpoint que o CRM Nidotec deve chamar sempre que um imóvel for criado,
 * alterado ou removido, para disparar revalidação sob demanda (ISR) das
 * páginas afetadas — sem esperar a revalidação periódica de segurança
 * (1h, configurada via cacheLife em src/lib/properties/index.ts).
 *
 * Autenticação: header `Authorization: Bearer <REVALIDATE_TOKEN>`.
 *
 * Body (JSON), todos os campos opcionais:
 *   { "slug": "casa-5-suites-lago-sul-qi-11-KB1001" }  // revalida 1 imóvel + listagens
 *   { "all": true }                                     // revalida todos os imóveis
 *
 * Exemplo de chamada pelo CRM:
 *   curl -X POST https://seusite.com/api/revalidate \
 *     -H "Authorization: Bearer $REVALIDATE_TOKEN" \
 *     -H "Content-Type: application/json" \
 *     -d '{"slug":"casa-5-suites-lago-sul-qi-11-KB1001"}'
 */
export async function POST(request: NextRequest) {
  const token = process.env.REVALIDATE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "REVALIDATE_TOKEN não configurado no servidor." },
      { status: 500 },
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { slug?: string; code?: string; all?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    // body vazio é aceitável quando `all` é implícito, mas exigimos JSON válido se enviado
  }

  const revalidated: string[] = [];

  if (body.slug) {
    revalidateTag(propertyTag(body.slug), "max");
    revalidated.push(propertyTag(body.slug));
  }
  if (body.code) {
    revalidateTag(propertyTag(body.code), "max");
    revalidated.push(propertyTag(body.code));
  }

  // Sempre revalida a tag geral: cobre listagens, páginas de categoria e a home.
  revalidateTag(PROPERTIES_TAG, "max");
  revalidated.push(PROPERTIES_TAG);

  revalidatePath("/sitemap.xml");
  revalidatePath("/sitemap-imoveis.xml");

  return NextResponse.json({ revalidated, now: Date.now() });
}
