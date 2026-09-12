import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePage } from "@/sanity/types";

/**
 * MERIDIAN — honest-fit section. Clinical practices earn trust by naming who
 * they serve AND who they'd refer elsewhere. Two soft columns, no hedging.
 * All copy is editable in Studio (homePage.goodFit*); hidden via showGoodFit.
 */
export function GoodFit({ home }: { home: HomePage }) {
  const forItems = home.goodFitFor ?? [];
  const referItems = home.goodFitReferOut ?? [];
  if (forItems.length === 0 && referItems.length === 0) return null;

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              Honest fit
            </p>
          </Reveal>
          {home.goodFitHeading ? (
            <Reveal delay={0.06}>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.15] text-[var(--color-foreground)] md:text-[2.3rem]">
                {home.goodFitHeading}
              </h2>
            </Reveal>
          ) : null}
          {home.goodFitIntro ? (
            <Reveal delay={0.12}>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
                {home.goodFitIntro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {forItems.length > 0 ? (
            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-background)] p-8 shadow-[var(--shadow-card)]">
                <h3 className="font-serif text-xl font-semibold text-[var(--color-foreground)]">
                  {home.goodFitForLabel ?? "We're likely a good fit if you're…"}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {forItems.map((item, i) => (
                    <li key={item ?? i} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[var(--color-accent-strong)]"
                        style={{ background: "var(--color-accent-soft)" }}
                      >
                        ✓
                      </span>
                      <span className="text-[15px] leading-relaxed text-[var(--color-foreground)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          {referItems.length > 0 ? (
            <Reveal delay={0.18} className="h-full">
              <div className="h-full rounded-2xl border border-[var(--color-subtle)]/50 bg-[var(--color-background)]/60 p-8">
                <h3 className="font-serif text-xl font-semibold text-[var(--color-muted)]">
                  {home.goodFitReferLabel ??
                    "I'll refer you to someone better suited for…"}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {referItems.map((item, i) => (
                    <li key={item ?? i} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-subtle)] text-[11px] text-[var(--color-muted)]"
                      >
                        →
                      </span>
                      <span className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
