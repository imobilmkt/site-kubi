import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/content/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-kubi-gray-50 py-16 sm:py-20">
      <Container>
        <h2 className="font-heading text-2xl font-semibold text-kubi-black sm:text-3xl">
          Quem confia na Kubi
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, index) => (
            <blockquote
              key={index}
              className="rounded-card border border-kubi-gray-200 bg-kubi-white p-6"
            >
              <p className="text-sm text-kubi-black">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-kubi-gray">
                <span className="font-semibold text-kubi-black">{t.author}</span> — {t.context}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
