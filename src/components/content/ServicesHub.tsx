"use client";

import Link from "next/link";
import { buildWhatsappUrl } from "@/config/site";
import { trackWhatsappClick } from "@/lib/analytics/dataLayer";
import { complementaryServices } from "@/lib/content/complementary-services";
import { ServiceIcon } from "@/components/content/ServiceIcon";

export function ServicesHub() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {complementaryServices.map((service) => {
        const whatsappHref = buildWhatsappUrl(service.whatsappMessage);

        return (
          <div
            key={service.slug}
            className="flex flex-col rounded-card border border-kubi-gray-200 p-6"
          >
            {service.tag && (
              <span className="mb-3 inline-block w-fit rounded-full bg-kubi-orange/15 px-3 py-1 text-xs font-semibold text-kubi-orange-dark">
                {service.tag}
              </span>
            )}

            <Link
              href={service.href}
              className="group flex items-center gap-4"
              aria-label={`Ver página de ${service.title}`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-kubi-gray-50 text-kubi-black transition-colors group-hover:bg-kubi-orange">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="font-heading text-lg font-semibold text-kubi-black group-hover:text-kubi-orange-dark">
                {service.title}
              </h3>
            </Link>

            <p className="mt-3 flex-1 text-sm text-kubi-gray">{service.description}</p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick(undefined, `servicos_${service.slug}`)}
              className="mt-5 inline-flex w-fit items-center rounded-full bg-kubi-orange px-5 py-2.5 text-sm font-semibold text-kubi-black transition-colors hover:bg-kubi-orange-dark hover:text-kubi-white"
            >
              Falar no WhatsApp
            </a>
          </div>
        );
      })}
    </div>
  );
}
