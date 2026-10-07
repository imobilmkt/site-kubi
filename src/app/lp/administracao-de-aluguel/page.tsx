import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const bullets = [
  "Cobrança e repasse do aluguel sempre em dia",
  "Vistoria de entrada e saída com registro fotográfico",
  "Contrato revisado juridicamente e suporte durante toda a locação",
];

export default function LpAdministracaoDeAluguelPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
            Administradora de aluguel em Brasília: seu imóvel rendendo sem dor de cabeça
          </h1>
          <p className="mt-4 text-kubi-gray">
            Fale com a equipe de administração da Kubi e receba uma proposta sob medida
            para o seu imóvel.
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
          <ContactForm formType="contato" title="Quero administrar meu imóvel" />
        </div>
      </Container>
    </main>
  );
}
