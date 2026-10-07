import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { getProperties } from "@/lib/properties";

export default async function LpImoveisLagoSulPage() {
  const { items } = await getProperties({
    purpose: "venda",
    neighborhoods: ["lago-sul"],
    pageSize: 3,
    sort: "relevance",
  });

  return (
    <main className="py-10 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
              Casas à venda no Lago Sul
            </h1>
            <p className="mt-4 text-kubi-gray">
              Fale com um corretor especialista no Lago Sul e receba uma seleção de
              imóveis dentro do seu perfil — inclusive oportunidades que ainda não estão
              publicadas no site.
            </p>
          </div>

          <div className="rounded-card border border-kubi-gray-200 p-6">
            <ContactForm
              formType="contato"
              title="Quero ver imóveis no Lago Sul"
              messagePlaceholder="Conte o que você procura: quartos, área, faixa de preço..."
            />
          </div>
        </div>

        {items.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-xl font-semibold text-kubi-black">
              Algumas oportunidades no Lago Sul
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {items.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
