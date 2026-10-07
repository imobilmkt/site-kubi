import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/** Rodapé mínimo das landing pages: só NAP e CRECI (obrigatório), sem sitemap completo. */
export function LpFooter() {
  return (
    <footer className="border-t border-kubi-gray-200 py-6 text-center text-xs text-kubi-gray">
      <Container>
        <p>
          {siteConfig.name} — {siteConfig.address.full} — CRECI-DF {siteConfig.creci}
        </p>
      </Container>
    </footer>
  );
}
