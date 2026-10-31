import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { OfficeMap } from "@/components/content/OfficeMap";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Kubi Imóveis em Brasília: endereço no Lago Sul, telefone, WhatsApp, horário de atendimento e formulário de contato.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address.full,
  )}`;

  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Contato", url: "/contato" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Fale com a Kubi
        </h1>
        <p className="mt-3 max-w-2xl text-kubi-gray">
          Estamos à disposição para tirar dúvidas sobre compra, venda, locação ou
          administração do seu imóvel em Brasília.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-1">
            <div>
              <h2 className="font-heading text-lg font-semibold text-kubi-black">Endereço</h2>
              <p className="mt-2 text-sm text-kubi-black/85">{siteConfig.address.full}</p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-kubi-orange-dark hover:underline"
              >
                Como chegar →
              </a>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-kubi-black">Telefone</h2>
              <a href={siteConfig.contact.phoneHref} className="mt-2 block text-sm text-kubi-black/85">
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-kubi-black">E-mail</h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 block text-sm text-kubi-black/85"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-kubi-black">
                Horário de atendimento
              </h2>
              <p className="mt-2 text-sm text-kubi-black/85">{siteConfig.businessHours.display}</p>
            </div>

            <OfficeMap />
          </div>

          <div className="lg:col-span-2">
            <div className="max-w-xl rounded-card border border-kubi-gray-200 p-6">
              <ContactForm formType="contato" title="Envie uma mensagem" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
