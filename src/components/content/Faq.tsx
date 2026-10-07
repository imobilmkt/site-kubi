import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";

export type FaqItem = { question: string; answer: string };

/** Lista de perguntas frequentes com <details>/<summary> nativos (acessível, sem JS) + JSON-LD FAQPage. */
export function Faq({ items, title = "Perguntas frequentes" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;

  return (
    <section>
      <JsonLd data={faqJsonLd(items)} />
      <h2 className="font-heading text-2xl font-semibold text-kubi-black">{title}</h2>
      <div className="mt-6 divide-y divide-kubi-gray-200 border-y border-kubi-gray-200">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-kubi-black marker:content-none">
              {item.question}
              <span className="shrink-0 text-xl text-kubi-gray-300 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-kubi-gray-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
