import { Container } from "@/components/ui/Container";

const pillars = [
  {
    title: "Atendimento exclusivo",
    description:
      "Cada cliente é acompanhado de perto, do primeiro contato à assinatura — sem respostas padronizadas.",
  },
  {
    title: "Segurança documental",
    description:
      "Analisamos cada detalhe da documentação além do exigido por lei, para que seu negócio seja conduzido com máxima tranquilidade.",
  },
  {
    title: "Solução completa",
    description:
      "Do crédito à compra, da escolha certa ao investimento — cuidamos de toda a jornada, não só do imóvel.",
  },
];

export function SssSection() {
  return (
    <section className="bg-kubi-black py-16 text-kubi-white sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kubi-orange">
            Sistema SSS
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
            Seremos Sempre Solução
          </h2>
          <p className="mt-4 text-kubi-white/80">
            Somos uma imobiliária que reconhece o quanto cada imóvel é especial. Para nós,
            exclusividade não é apenas sobre vender: é garantir a melhor oportunidade para
            quem compra e o investimento certo para quem deseja multiplicar o patrimônio. De
            uma forma ou de outra, vamos nos conectar à sua necessidade — porque todo imóvel
            é especial, porque é seu.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="font-heading text-lg font-semibold text-kubi-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-kubi-white/70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
