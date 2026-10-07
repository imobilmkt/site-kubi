"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/leads/schemas";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { FieldWrapper, HoneypotField, inputClassName } from "./fields";
import { FormErrorMessage, FormSuccessMessage } from "./FormStatusMessage";
import { Turnstile } from "./Turnstile";
import type { FormType } from "@/lib/analytics/dataLayer";

type ContactFormProps = {
  formType: Extract<FormType, "contato" | "financiamento" | "consorcio">;
  title?: string;
  description?: string;
  messagePlaceholder?: string;
  successMessage?: string;
};

/** Formulário curto de contato/interesse — reaproveitado em Contato, Financiamento, Consórcio e páginas de serviço. */
export function ContactForm({
  formType,
  title = "Fale com a Kubi",
  description,
  messagePlaceholder = "Conte o que você precisa...",
  successMessage = "Recebemos sua mensagem! Em breve um de nossos corretores entrará em contato.",
}: ContactFormProps) {
  const [turnstileToken, setTurnstileToken] = useState("");
  const { submit, status, errorMessage, isSubmitting } = useLeadSubmit(formType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  async function onSubmit(values: ContactFormValues) {
    const ok = await submit({ ...values, turnstileToken });
    if (ok) reset();
  }

  if (status === "success") {
    return <FormSuccessMessage>{successMessage}</FormSuccessMessage>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {title && <h3 className="font-heading text-xl font-semibold text-kubi-black">{title}</h3>}
      {description && <p className="text-sm text-kubi-gray">{description}</p>}

      <HoneypotField register={register} />

      <FieldWrapper label="Nome completo" htmlFor="name" required error={errors.name}>
        <input id="name" className={inputClassName} {...register("name")} />
      </FieldWrapper>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="E-mail" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" className={inputClassName} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Telefone/WhatsApp" htmlFor="phone" required error={errors.phone}>
          <input id="phone" type="tel" className={inputClassName} {...register("phone")} />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Mensagem" htmlFor="message" required error={errors.message}>
        <textarea
          id="message"
          rows={4}
          placeholder={messagePlaceholder}
          className={inputClassName}
          {...register("message")}
        />
      </FieldWrapper>

      <Turnstile onToken={setTurnstileToken} />

      {status === "error" && errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-kubi-orange px-6 py-3 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
