"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  avaliacaoFormSchema,
  type AvaliacaoFormInput,
  type AvaliacaoFormValues,
} from "@/lib/leads/schemas";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";
import { FieldWrapper, HoneypotField, inputClassName } from "./fields";
import { FormErrorMessage, FormSuccessMessage } from "./FormStatusMessage";
import { Turnstile } from "./Turnstile";
import { PROPERTY_TYPES } from "@/lib/properties/types";
import { neighborhoods } from "@/lib/properties/neighborhoods";

/** Formulário de avaliação gratuita de imóvel — usado em /avaliacao-de-imovel e na LP correspondente. */
export function AvaliacaoForm() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const { submit, status, errorMessage, isSubmitting } = useLeadSubmit("avaliacao");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvaliacaoFormInput, unknown, AvaliacaoFormValues>({
    resolver: zodResolver(avaliacaoFormSchema),
  });

  async function onSubmit(values: AvaliacaoFormValues) {
    const ok = await submit({ ...values, turnstileToken });
    if (ok) reset();
  }

  if (status === "success") {
    return (
      <FormSuccessMessage>
        Pedido de avaliação recebido! Nossa equipe vai analisar o imóvel e retornar com uma
        estimativa de valor de mercado.
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

      <FieldWrapper label="E-mail" htmlFor="email" required error={errors.email}>
        <input id="email" type="email" className={inputClassName} {...register("email")} />
      </FieldWrapper>

      <div className="grid gap-4 sm:grid-cols-3">
        <FieldWrapper label="Objetivo" htmlFor="purpose" required error={errors.purpose}>
          <select id="purpose" className={inputClassName} {...register("purpose")}>
            <option value="venda">Quero vender</option>
            <option value="locacao">Quero alugar</option>
            <option value="nao-sei">Só quero saber o valor</option>
          </select>
        </FieldWrapper>
        <FieldWrapper label="Tipo do imóvel" htmlFor="propertyType" required error={errors.propertyType}>
          <select id="propertyType" className={inputClassName} {...register("propertyType")}>
            {PROPERTY_TYPES.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Bairro/Região" htmlFor="neighborhood" required error={errors.neighborhood}>
          <select id="neighborhood" className={inputClassName} {...register("neighborhood")}>
            {neighborhoods.map((n) => (
              <option key={n.slug} value={n.name}>
                {n.name}
              </option>
            ))}
            <option value="Outra região de Brasília">Outra região de Brasília</option>
          </select>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Área aproximada (m²)" htmlFor="area" error={errors.area}>
        <input id="area" type="number" className={inputClassName} {...register("area")} />
      </FieldWrapper>

      <FieldWrapper label="Detalhes adicionais (opcional)" htmlFor="message" error={errors.message}>
        <textarea id="message" rows={3} className={inputClassName} {...register("message")} />
      </FieldWrapper>

      <Turnstile onToken={setTurnstileToken} />

      {status === "error" && errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-kubi-orange px-6 py-3 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Quero minha avaliação gratuita"}
      </button>
    </form>
  );
}
