import { z } from "zod";

/**
 * Schemas de validação de cada formulário do site. O campo `honeypot` existe
 * em todos os formulários como proteção anti-spam: deve chegar vazio — bots
 * que preenchem todos os campos automaticamente acabam preenchendo-o também.
 */

const baseFields = {
  name: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone/WhatsApp válido com DDD."),
  honeypot: z.string().max(0, "Falha na validação.").optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
};

export const contactFormSchema = z.object({
  ...baseFields,
  subject: z.string().trim().min(2).optional(),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o que você precisa."),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const visitFormSchema = z.object({
  ...baseFields,
  propertyCode: z.string().trim().min(3, "Código do imóvel inválido."),
  preferredDate: z.string().trim().min(1, "Escolha uma data."),
  preferredTime: z.string().trim().min(1, "Escolha um horário."),
  message: z.string().trim().optional(),
});
export type VisitFormValues = z.infer<typeof visitFormSchema>;

export const captacaoFormSchema = z.object({
  ...baseFields,
  purpose: z.enum(["venda", "locacao", "ambos"]),
  propertyType: z.string().trim().min(2, "Selecione o tipo do imóvel."),
  neighborhood: z.string().trim().min(2, "Informe o bairro/região."),
  area: z.coerce.number().positive().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  askingPrice: z.coerce.number().positive().optional(),
  photosUrl: z.string().trim().url("Informe um link válido.").optional().or(z.literal("")),
  message: z.string().trim().optional(),
});
export type CaptacaoFormValues = z.infer<typeof captacaoFormSchema>;
/** Tipo de entrada (antes da coerção) — usar em useForm<> junto ao zodResolver. */
export type CaptacaoFormInput = z.input<typeof captacaoFormSchema>;

export const avaliacaoFormSchema = z.object({
  ...baseFields,
  purpose: z.enum(["venda", "locacao", "nao-sei"]),
  propertyType: z.string().trim().min(2, "Selecione o tipo do imóvel."),
  neighborhood: z.string().trim().min(2, "Informe o bairro/região."),
  area: z.coerce.number().positive().optional(),
  message: z.string().trim().optional(),
});
export type AvaliacaoFormValues = z.infer<typeof avaliacaoFormSchema>;
export type AvaliacaoFormInput = z.input<typeof avaliacaoFormSchema>;

export const trabalheConoscoFormSchema = z.object({
  ...baseFields,
  creci: z.string().trim().optional(),
  experience: z.string().trim().min(10, "Conte um pouco da sua experiência."),
  linkedinOrCv: z.string().trim().url("Informe um link válido.").optional().or(z.literal("")),
});
export type TrabalheConoscoFormValues = z.infer<typeof trabalheConoscoFormSchema>;

export const leadFormSchemas = {
  contato: contactFormSchema,
  visita: visitFormSchema,
  captacao: captacaoFormSchema,
  avaliacao: avaliacaoFormSchema,
  trabalhe_conosco: trabalheConoscoFormSchema,
  financiamento: contactFormSchema,
  consorcio: contactFormSchema,
} as const;

export type LeadFormType = keyof typeof leadFormSchemas;

export const leadRequestSchema = z.object({
  formType: z.enum([
    "contato",
    "visita",
    "captacao",
    "avaliacao",
    "trabalhe_conosco",
    "financiamento",
    "consorcio",
  ]),
  data: z.record(z.string(), z.unknown()),
  attribution: z.record(z.string(), z.unknown()).optional(),
  page: z.string().optional(),
});
