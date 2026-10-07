import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";

/** Header enxuto das landing pages de Ads: só a logo, sem menu, para não tirar o foco da conversão. */
export function LpHeader() {
  return (
    <header className="border-b border-kubi-gray-200 py-4">
      <Container className="flex justify-center sm:justify-start">
        <Link href="/" aria-label="Kubi Imóveis — página inicial">
          <Logo layout="horizontal" tone="dark" />
        </Link>
      </Container>
    </header>
  );
}
