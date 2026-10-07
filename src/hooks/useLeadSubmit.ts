"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { getAttribution } from "@/lib/analytics/attribution";
import { trackFormSubmit, type FormType } from "@/lib/analytics/dataLayer";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/** Envia qualquer formulário para /api/leads, anexando página e atribuição (UTMs/clickids). */
export function useLeadSubmit(formType: FormType) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pathname = usePathname();

  async function submit(data: Record<string, unknown>) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          data,
          page: pathname,
          attribution: getAttribution(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErrorMessage(
          body?.error ?? "Não foi possível enviar o formulário. Tente novamente.",
        );
        setStatus("error");
        return false;
      }

      trackFormSubmit(formType, { page: pathname });
      setStatus("success");
      return true;
    } catch {
      setErrorMessage("Não foi possível enviar o formulário. Verifique sua conexão.");
      setStatus("error");
      return false;
    }
  }

  return { submit, status, errorMessage, isSubmitting: status === "submitting" };
}
