import type { ServicePageDef } from "@/lib/content/service-pages";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Faq } from "@/components/content/Faq";
import { ContactForm } from "@/components/forms/ContactForm";
import { CaptacaoForm } from "@/components/forms/CaptacaoForm";
import { AvaliacaoForm } from "@/components/forms/AvaliacaoForm";
import { testimonials } from "@/lib/content/testimonials";

function ServiceForm({ def }: { def: ServicePageDef }) {
  switch (def.formType) {
    case "captacao":
      return <CaptacaoForm />;
    case "avaliacao":
      return <AvaliacaoForm />;
    default:
      return <ContactForm formType={def.formType} title={def.formTitle} />;
  }
}

export function ServicePageContent({ def }: { def: ServicePageDef }) {
  const proof = testimonials.slice(0, 2);

  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: def.eyebrow, url: `/${def.slug}` }]} />

        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kubi-orange">
              {def.eyebrow}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
              {def.title}
            </h1>
            <p className="mt-4 max-w-2xl text-kubi-gray">{def.intro}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {def.benefits.map((b) => (
                <div key={b.title} className="rounded-card border border-kubi-gray-200 p-5">
                  <h3 className="font-heading font-semibold text-kubi-black">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-kubi-gray">{b.description}</p>
                </div>
              ))}
            </div>

            {def.steps && (
              <div className="mt-12">
                <h2 className="font-heading text-2xl font-semibold text-kubi-black">
                  Como funciona
                </h2>
                <ol className="mt-6 space-y-6">
                  {def.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kubi-black text-sm font-semibold text-kubi-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-kubi-black">{step.title}</h3>
                        <p className="mt-1 text-sm text-kubi-gray">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {proof.map((t, i) => (
                <blockquote key={i} className="rounded-card bg-kubi-gray-50 p-5">
                  <p className="text-sm text-kubi-black">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-3 text-xs text-kubi-gray">
                    <span className="font-semibold text-kubi-black">{t.author}</span> —{" "}
                    {t.context}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-12">
              <Faq items={def.faq} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-card border border-kubi-gray-200 p-6">
              <ServiceForm def={def} />
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
