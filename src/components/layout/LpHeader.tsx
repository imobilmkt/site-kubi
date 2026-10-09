import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/** Header enxuto das landing pages de Ads: só a logo, sem menu, para não tirar o foco da conversão. */
export function LpHeader() {
  return (
    <header className="border-b border-kubi-gray-200 py-4">
      <Container className="flex justify-center sm:justify-start">
        <Link href="/">
          <Image
            src="/brand/kubi-logo-horizontal-black.png"
            alt={`${siteConfig.name} — ${siteConfig.alternateName}`}
            width={145}
            height={42}
            priority
            className="h-auto w-auto"
          />
        </Link>
      </Container>
    </header>
  );
}
