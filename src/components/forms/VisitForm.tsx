"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { visitFormSchema, type VisitFormValues } from "@/lib/leads/schemas";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { FieldWrapper, HoneypotField, inputClassName } from "./fields";
import { FormErrorMessage, FormSuccessMessage } from "./FormStatusMessage";
import { Turnstile } from "./Turnstile";

export function VisitForm({ propertyCode }: { propertyCode: string }) {
  const [turnstileToken, setTurnstileToken] = useState("");
  const { submit, status, errorMessage, isSubmitting } = useLeadSubmit("visita");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: { propertyCode },
  });

  async function onSubmit(values: VisitFormValues) {
    const ok = await submit({ ...values, turnstileToken });
    if (ok) reset({ propertyCode });
  }

  if (status === "success") {
    return (
      <FormSuccessMessage>
        Solicitação de visita enviada! Um corretor vai confirmar o melhor horário com você.
      </FormSuccessMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <HoneypotField register={register} />
      <input type="hidden" {...register("propertyCode")} />

      <FieldWrapper label="Nome completo" htmlFor="visit-name" required error={errors.name}>
        <input id="visit-name" className={inputClassName} {...register("name")} />
      </FieldWrapper>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="E-mail" htmlFor="visit-email" required error={errors.email}>
          <input id="visit-email" type="email" className={inputClassName} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="WhatsApp" htmlFor="visit-phone" required error={errors.phone}>
          <input id="visit-phone" type="tel" className={inputClassName} {...register("phone")} />
        </FieldWrapper>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Data preferida" htmlFor="preferredDate" required error={errors.preferredDate}>
          <input id="preferredDate" type="date" className={inputClassName} {...register("preferredDate")} />
        </FieldWrapper>
        <FieldWrapper label="Horário preferido" htmlFor="preferredTime" required error={errors.preferredTime}>
          <input id="preferredTime" type="time" className={inputClassName} {...register("preferredTime")} />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Observações (opcional)" htmlFor="visit-message" error={errors.message}>
        <textarea id="visit-message" rows={3} className={inputClassName} {...register("message")} />
      </FieldWrapper>

      <Turnstile onToken={setTurnstileToken} />

      {status === "error" && errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-kubi-orange px-6 py-3 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Agendar visita"}
      </button>
    </form>
  );
}
