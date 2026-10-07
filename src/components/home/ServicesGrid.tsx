import Link from "next/link";
import { Container } from "@/components/ui/Container";

const services = [
  {
    href: "/comprar-imovel",
    title: "Compra e venda",
    description: "Encontramos o imóvel certo e cuidamos de toda a negociação, do início à escritura.",
  },
  {
    href: "/administracao-de-imoveis",
    title: "Locação e administração",
    description: "Gestão completa de aluguel para proprietários: cobrança, repasse, vistoria e contratos.",
  },
  {
    href: "/anuncie-seu-imovel",
    title: "Anuncie seu imóvel",
    description: "Captação profissional com fotos, divulgação e atendimento dedicado a quem vende ou aluga.",
  },
  {
    href: "/intermediacao-imobiliaria",
    title: "Intermediação e assessoria",
    description: "Análise documental completa — vamos além do exigido por lei para sua segurança.",
  },
  {
    href: "/financiamento-imobiliario",
    title: "Financiamento e crédito",
    description: "Encontramos as melhores condições de financiamento junto aos principais bancos.",
  },
  {
    href: "/consorcio-imobiliario",
    title: "Consórcio imobiliário",
    description: "Alternativa sem juros para conquistar seu imóvel com planejamento.",
  },
  {
    href: "/avaliacao-de-imovel",
    title: "Avaliação de imóvel",
    description: "Avaliação gratuita e criteriosa para você vender, alugar ou só saber o valor de mercado.",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
            Soluções completas para o seu imóvel
          </h2>
          <p className="mt-2 text-kubi-gray">
            Da compra à administração, cuidamos de cada etapa com exclusividade e segurança
            documental.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group rounded-card border border-kubi-gray-200 p-6 transition-colors hover:border-kubi-black"
            >
              <h3 className="font-heading text-lg font-semibold text-kubi-black">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-kubi-gray">{service.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-kubi-orange-dark">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
