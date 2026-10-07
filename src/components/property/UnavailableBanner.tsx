import type { Property } from "@/lib/properties/types";

const MESSAGES: Partial<Record<Property["status"], string>> = {
  vendido: "Este imóvel já foi vendido.",
  alugado: "Este imóvel já foi alugado.",
  reservado: "Este imóvel está reservado no momento.",
};

export function UnavailableBanner({ status }: { status: Property["status"] }) {
  const message = MESSAGES[status];
  if (!message) return null;

  return (
    <div className="rounded-card border border-kubi-orange/30 bg-kubi-orange-light px-5 py-4 text-sm text-kubi-black">
      <strong className="font-semibold">{message}</strong> Veja abaixo imóveis semelhantes
      disponíveis, ou fale com a Kubi — podemos ter outras oportunidades que ainda não estão
      no site.
    </div>
  );
}
