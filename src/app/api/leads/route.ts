import { NextRequest, NextResponse } from "next/server";
import { leadFormSchemas, leadRequestSchema } from "@/lib/leads/schemas";

/**
 * Endpoint único para todos os formulários do site (contato, visita,
 * captação, avaliação, trabalhe conosco, financiamento, consórcio).
 *
 * Fluxo: valida honeypot + schema do formulário → valida Turnstile (se
 * configurado) → encaminha o lead para LEADS_WEBHOOK_URL (quando definido).
 *
 * TODO(integração CRM Nidotec): quando a Nidotec tiver um endpoint de
 * criação de lead/oportunidade, encaminhar o payload normalizado para lá
 * também (ou no lugar do webhook genérico) — ver README § Nidotec.
 */

async function verifyTurnstile(token: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile não configurado ainda (ambiente de demonstração).
  if (!token) return false;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });
  const json = (await res.json()) as { success: boolean };
  return json.success;
}

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsedRequest = leadRequestSchema.safeParse(json);
  if (!parsedRequest.success) {
    return NextResponse.json(
      { error: "Requisição inválida.", issues: parsedRequest.error.issues },
      { status: 400 },
    );
  }

  const { formType, data, attribution, page } = parsedRequest.data;

  // Honeypot: campo invisível que só bots preenchem.
  if (typeof data.honeypot === "string" && data.honeypot.length > 0) {
    // Responde como sucesso para não revelar a defesa anti-spam ao bot.
    return NextResponse.json({ ok: true });
  }

  const schema = leadFormSchemas[formType];
  const parsedData = schema.safeParse(data);
  if (!parsedData.success) {
    return NextResponse.json(
      { error: "Dados do formulário inválidos.", issues: parsedData.error.issues },
      { status: 400 },
    );
  }

  const turnstileOk = await verifyTurnstile(
    typeof data.turnstileToken === "string" ? data.turnstileToken : undefined,
  );
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Falha na verificação anti-spam. Atualize a página e tente novamente." },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- descartados de propósito do payload encaminhado
  const { honeypot: _honeypot, turnstileToken: _turnstileToken, ...cleanData } = parsedData.data;

  const payload = {
    formType,
    page: page ?? null,
    submittedAt: new Date().toISOString(),
    data: cleanData,
    attribution: attribution ?? null,
  };

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Falha ao encaminhar lead para o webhook configurado:", error);
      return NextResponse.json(
        { error: "Não foi possível enviar seu formulário agora. Tente novamente em instantes." },
        { status: 502 },
      );
    }
  } else {
    // Sem webhook configurado ainda: registra no log do servidor para não perder o lead.
    console.info("[lead recebido — configure LEADS_WEBHOOK_URL]", payload);
  }

  return NextResponse.json({ ok: true });
}
