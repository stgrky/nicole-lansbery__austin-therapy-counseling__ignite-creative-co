import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePage } from "@/sanity/types";

/**
 * GROVE — intake FAQ. The questions every prospective client is quietly
 * asking before they email. Soft accordion cards, plain answers.
 * All copy editable in Studio (homePage.faqs); hidden via showFaq.
 *
 * Bundled exclusively with the SEO Setup add-on — not a standard feature
 * on any template. Emits FAQPage JSON-LD alongside the visible accordion;
 * Google deprecated the visual FAQ rich result in search on 2026-05-07
 * (already gov/health-only since 2023-08), so this markup no longer
 * produces an expandable search snippet — Google states it still uses it
 * to understand page content.
 */
export function FaqSection({ home }: { home: HomePage }) {
  const faqs = home.faqs ?? [];
  if (faqs.length === 0) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => faq.question && faq.answer)
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
  };

  return (
    <section className="bg-[var(--color-background)] py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                Common questions
              </p>
            </Reveal>
            {home.faqHeading ? (
              <Reveal delay={0.06}>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.15] text-[var(--color-foreground)] md:text-[2.3rem]">
                  {home.faqHeading}
                </h2>
              </Reveal>
            ) : null}
            {home.faqIntro ? (
              <Reveal delay={0.12}>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                  {home.faqIntro}
                </p>
              </Reveal>
            ) : null}
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question ?? i} delay={0.05 * i}>
                <details className="group rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-surface)] px-7 py-5 shadow-[var(--shadow-card)] [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer select-none items-center justify-between gap-4">
                    <span className="font-serif text-lg font-semibold text-[var(--color-foreground)]">
                      {faq.question}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      width="14"
                      height="14"
                      className="flex-shrink-0 text-[var(--color-accent-strong)] transition-transform duration-300 group-open:rotate-180"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 8l5 5 5-5"
                      />
                    </svg>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
