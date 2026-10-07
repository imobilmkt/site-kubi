import { Container } from "@/components/ui/Container";
import { CaptacaoForm } from "@/components/forms/CaptacaoForm";

const bullets = [
  "Captação profissional: fotos, anúncio e divulgação qualificada",
  "Sem custo antecipado — você só paga quando o negócio é concluído",
  "Corretor dedicado do primeiro contato até a assinatura",
];

export default function LpAnuncieSeuImovelPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
            Anuncie seu imóvel com a Kubi e venda ou alugue mais rápido
          </h1>
          <p className="mt-4 text-kubi-gray">
            Preencha os dados do seu imóvel e receba, sem compromisso, uma proposta de
            captação com a estratégia certa para o seu caso.
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-kubi-black/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kubi-orange" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-kubi-gray-200 p-6">
          <CaptacaoForm />
        </div>
      </Container>
    </main>
  );
}
