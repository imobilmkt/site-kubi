import { Container } from "@/components/ui/Container";
import { buildWhatsappUrl, siteConfig } from "@/config/site";

export function FinalCta() {
  const href = buildWhatsappUrl(
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de falar com um corretor.`,
  );

  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-5 rounded-2xl bg-kubi-black px-6 py-14 text-center sm:px-16">
        <h2 className="font-heading text-2xl font-semibold text-kubi-white sm:text-3xl">
          Pronto para encontrar seu próximo espaço de vida?
        </h2>
        <p className="max-w-xl text-kubi-white/75">
          Fale agora com a equipe Kubi pelo WhatsApp e receba atendimento exclusivo, do
          primeiro contato à assinatura.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-kubi-orange px-8 py-3.5 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark"
        >
          Falar no WhatsApp
        </a>
      </Container>
    </section>
  );
}
