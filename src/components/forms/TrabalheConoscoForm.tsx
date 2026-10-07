"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  trabalheConoscoFormSchema,
  type TrabalheConoscoFormValues,
} from "@/lib/leads/schemas";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { FieldWrapper, HoneypotField, inputClassName } from "./fields";
import { FormErrorMessage, FormSuccessMessage } from "./FormStatusMessage";
import { Turnstile } from "./Turnstile";

export function TrabalheConoscoForm() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const { submit, status, errorMessage, isSubmitting } = useLeadSubmit("trabalhe_conosco");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrabalheConoscoFormValues>({ resolver: zodResolver(trabalheConoscoFormSchema) });

  async function onSubmit(values: TrabalheConoscoFormValues) {
    const ok = await submit({ ...values, turnstileToken });
    if (ok) reset();
  }

  if (status === "success") {
    return (
      <FormSuccessMessage>
        Recebemos sua candidatura! Se o seu perfil combinar com uma oportunidade atual, a
        diretoria da Kubi entrará em contato.
      </FormSuccessMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <HoneypotField register={register} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Nome completo" htmlFor="name" required error={errors.name}>
          <input id="name" className={inputClassName} {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Telefone/WhatsApp" htmlFor="phone" required error={errors.phone}>
          <input id="phone" type="tel" className={inputClassName} {...register("phone")} />
        </FieldWrapper>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="E-mail" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" className={inputClassName} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="CRECI (se já possuir)" htmlFor="creci" error={errors.creci}>
          <input id="creci" className={inputClassName} {...register("creci")} />
        </FieldWrapper>
      </div>

      <FieldWrapper
        label="Link do currículo ou LinkedIn (opcional)"
        htmlFor="linkedinOrCv"
        error={errors.linkedinOrCv}
      >
        <input id="linkedinOrCv" className={inputClassName} {...register("linkedinOrCv")} />
      </FieldWrapper>

      <FieldWrapper
        label="Conte sua experiência no mercado imobiliário"
        htmlFor="experience"
        required
        error={errors.experience}
      >
        <textarea id="experience" rows={4} className={inputClassName} {...register("experience")} />
      </FieldWrapper>

      <Turnstile onToken={setTurnstileToken} />

      {status === "error" && errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-kubi-orange px-6 py-3 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Quero fazer parte da Kubi"}
      </button>
    </form>
  );
}
