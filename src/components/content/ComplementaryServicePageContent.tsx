import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceIcon } from "@/components/content/ServiceIcon";
import { ServiceWhatsappCta } from "@/components/content/ServiceWhatsappCta";
import type { ComplementaryService } from "@/lib/content/complementary-services";

export function ComplementaryServicePageContent({ service }: { service: ComplementaryService }) {
  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: service.title, url: service.href }]} />

        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-kubi-gray-50 text-kubi-black">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>
              <div>
                {service.tag && (
                  <span className="mb-1 inline-block rounded-full bg-kubi-orange/15 px-3 py-1 text-xs font-semibold text-kubi-orange-dark">
                    {service.tag}
                  </span>
                )}
                <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-kubi-gray">{service.description}</p>

            {service.highlights && (
              <ul className="mt-8 space-y-4">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 rounded-card border border-kubi-gray-200 p-4"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kubi-orange" />
                    <span className="text-sm text-kubi-black/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-card border border-kubi-gray-200 p-6">
              <ServiceWhatsappCta
                slug={service.slug}
                eyebrow={service.title}
                title={`Quero saber mais sobre ${service.title}`}
              />
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
