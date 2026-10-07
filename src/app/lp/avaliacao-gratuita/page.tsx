import { Container } from "@/components/ui/Container";
import { AvaliacaoForm } from "@/components/forms/AvaliacaoForm";

const bullets = [
  "100% gratuita e sem compromisso",
  "Baseada em dados reais do mercado da sua região",
  "Retorno em até 2 dias úteis",
];

export default function LpAvaliacaoGratuitaPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
            Quanto vale o seu imóvel? Avaliação gratuita em Brasília
          </h1>
          <p className="mt-4 text-kubi-gray">
            Preencha os dados abaixo e receba uma avaliação criteriosa, feita por quem
            conhece cada bairro de Brasília como ninguém.
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
          <AvaliacaoForm />
        </div>
      </Container>
    </main>
  );
}
