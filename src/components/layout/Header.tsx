"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/config/nav";
import { buildWhatsappUrl, siteConfig } from "@/config/site";
import { trackWhatsappClick } from "@/lib/analytics/dataLayer";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const whatsappHref = buildWhatsappUrl(
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de mais informações.`,
  );

  return (
    <header className="sticky top-0 z-30 border-b border-kubi-gray-200 bg-kubi-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" aria-label={`${siteConfig.name} — página inicial`}>
          <Logo layout="horizontal" tone="dark" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {mainNav.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-kubi-black hover:text-kubi-orange-dark"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.25 7.5 10 12.25l4.75-4.75" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                    <ul className="rounded-card border border-kubi-gray-200 bg-kubi-white p-2 shadow-xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-kubi-black hover:bg-kubi-gray-50 hover:text-kubi-orange-dark"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-kubi-black hover:text-kubi-orange-dark"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick(undefined, "header")}
            className="hidden rounded-full bg-kubi-orange px-5 py-2.5 text-sm font-semibold text-kubi-white transition-colors hover:bg-kubi-orange-dark sm:inline-block"
          >
            Falar no WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-kubi-black lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <nav
          className="border-t border-kubi-gray-200 bg-kubi-white lg:hidden"
          aria-label="Principal (mobile)"
        >
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-kubi-black hover:bg-kubi-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick(undefined, "header_mobile")}
              className="mt-2 rounded-full bg-kubi-orange px-5 py-3 text-center text-sm font-semibold text-kubi-white"
            >
              Falar no WhatsApp
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
