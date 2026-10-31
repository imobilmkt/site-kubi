import { Container } from "@/components/ui/Container";

const stats = [
  { value: "+150", label: "Imóveis administrados" },
  { value: "+500", label: "Negócios fechados" },
  { value: "+10 anos", label: "De experiência no mercado de Brasília" },
  { value: "+500", label: "Clientes satisfeitos" },
];

export function StatsSection() {
  return (
    <section className="border-y border-kubi-gray-200 py-12">
      <Container className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-kubi-gray">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
