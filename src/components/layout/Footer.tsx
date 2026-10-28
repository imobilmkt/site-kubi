import Image from "next/image";
import Link from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import {
  contentLinks,
  institutionalLinks,
  legalLinks,
  serviceLinks,
} from "@/config/nav";
import { siteConfig } from "@/config/site";
import { neighborhoods } from "@/lib/properties/neighborhoods";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-kubi-white/60">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-kubi-white/85 transition-colors hover:text-kubi-orange"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const currentYear = await getCurrentYear();
  const neighborhoodLinks = neighborhoods.map((n) => ({
    href: `/bairros/${n.slug}`,
    label: n.name,
  }));

  return (
    <footer className="bg-kubi-black text-kubi-white">
      <Container className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Image
            src="/brand/kubi-logo-stack-white.png"
            alt={`${siteConfig.name} — ${siteConfig.alternateName}`}
            width={97}
            height={104}
            className="h-auto w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-kubi-white/70">{siteConfig.description}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Kubi Imóveis"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-kubi-white/25 text-kubi-white transition-colors hover:border-kubi-orange hover:text-kubi-orange"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33Zm0 1.98c-3.17 0-3.52.01-4.76.07-1.03.05-1.6.22-1.97.36-.5.19-.85.42-1.22.79-.37.37-.6.72-.79 1.22-.14.37-.3.94-.36 1.97-.06 1.24-.07 1.6-.07 4.76s.01 3.52.07 4.76c.05 1.03.22 1.6.36 1.97.19.5.42.85.79 1.22.37.37.72.6 1.22.79.37.14.94.3 1.97.36 1.24.06 1.6.07 4.76.07s3.52-.01 4.76-.07c1.03-.05 1.6-.22 1.97-.36.5-.19.85-.42 1.22-.79.37-.37.6-.72.79-1.22.14-.37.3-.94.36-1.97.06-1.24.07-1.6.07-4.76s-.01-3.52-.07-4.76c-.05-1.03-.22-1.6-.36-1.97a3 3 0 0 0-.79-1.22 3 3 0 0 0-1.22-.79c-.37-.14-.94-.3-1.97-.36-1.24-.06-1.6-.07-4.76-.07Zm0 3.37a5.45 5.45 0 1 1 0 10.9 5.45 5.45 0 0 1 0-10.9Zm0 1.98a3.47 3.47 0 1 0 0 6.94 3.47 3.47 0 0 0 0-6.94Zm5.66-2.2a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0Z" />
              </svg>
            </a>
          </div>
        </div>

        <FooterColumn title="Institucional" links={institutionalLinks} />
        <FooterColumn title="Serviços" links={serviceLinks} />
        <FooterColumn
          title="Guia de bairros"
          links={[{ href: "/bairros", label: "Ver todos os bairros" }, ...neighborhoodLinks.slice(0, 5)]}
        />
        <FooterColumn
          title="Conteúdo"
          links={[...contentLinks, ...legalLinks]}
        />
      </Container>

      <div className="border-t border-kubi-white/10 py-8">
        <Container className="flex flex-col gap-4 text-sm text-kubi-white/70 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-medium text-kubi-white">
              {siteConfig.name} <span className="text-kubi-white/50">({siteConfig.alternateName})</span>
            </p>
            <p>{siteConfig.address.full}</p>
            <p>
              {siteConfig.contact.phone} · {siteConfig.contact.email} · CRECI-DF{" "}
              {siteConfig.creci}
            </p>
            <p>{siteConfig.businessHours.display}</p>
          </div>
          <p className="text-xs text-kubi-white/50">
            © {currentYear} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
