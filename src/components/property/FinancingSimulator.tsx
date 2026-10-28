"use client";

import Link from "@/components/ui/Link";
import { useMemo, useState } from "react";
import { formatBRL } from "@/lib/format";

function monthlyPayment(principal: number, annualRatePct: number, years: number) {
  const months = years * 12;
  const i = annualRatePct / 100 / 12;
  if (i === 0) return principal / months;
  return (principal * (i * Math.pow(1 + i, months))) / (Math.pow(1 + i, months) - 1);
}

export function FinancingSimulator({ salePrice }: { salePrice: number }) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [years, setYears] = useState(30);
  const [annualRate, setAnnualRate] = useState(10.9);

  const { financed, installment } = useMemo(() => {
    const financedAmount = salePrice * (1 - downPaymentPct / 100);
    return {
      financed: financedAmount,
      installment: monthlyPayment(financedAmount, annualRate, years),
    };
  }, [salePrice, downPaymentPct, years, annualRate]);

  return (
    <div className="rounded-card border border-kubi-gray-200 p-6">
      <h3 className="font-heading text-lg font-semibold text-kubi-black">
        Simulador de financiamento
      </h3>
      <p className="mt-1 text-xs text-kubi-gray">
        Estimativa simples para referência — as condições reais dependem da análise de
        crédito e da instituição financeira escolhida.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block text-kubi-gray">Entrada</span>
          <select
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full rounded-lg border border-kubi-gray-300 px-3 py-2"
          >
            {[10, 20, 30, 40, 50].map((pct) => (
              <option key={pct} value={pct}>
                {pct}%
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-kubi-gray">Prazo</span>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-kubi-gray-300 px-3 py-2"
          >
            {[10, 15, 20, 25, 30, 35].map((y) => (
              <option key={y} value={y}>
                {y} anos
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-kubi-gray">Taxa estimada (a.a.)</span>
          <input
            type="number"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full rounded-lg border border-kubi-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="mt-5 rounded-lg bg-kubi-gray-50 p-4">
        <p className="text-sm text-kubi-gray">Valor financiado: {formatBRL(financed)}</p>
        <p className="mt-1 font-heading text-2xl font-semibold text-kubi-black">
          ~{formatBRL(installment)}/mês
        </p>
      </div>

      <Link
        href="/financiamento-imobiliario"
        className="mt-4 inline-block text-sm font-semibold text-kubi-orange-dark hover:underline"
      >
        Saiba mais sobre financiamento imobiliário →
      </Link>
    </div>
  );
}
