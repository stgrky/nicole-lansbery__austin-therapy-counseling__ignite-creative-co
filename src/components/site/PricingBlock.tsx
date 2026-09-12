"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePage } from "@/sanity/types";

type Props = {
  home: HomePage;
};

export function PricingBlock({ home }: Props) {
  if (
    !home.sessionFee &&
    !home.insuranceNote &&
    !home.slidingScaleNote
  )
    return null;

  return (
    <section className="relative bg-[var(--color-surface)] py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                Fees &amp; insurance
              </p>
            </Reveal>
            {home.pricingHeading ? (
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                  {home.pricingHeading}
                </h2>
              </Reveal>
            ) : null}
            {home.pricingIntro ? (
              <Reveal delay={0.16}>
                <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                  {home.pricingIntro}
                </p>
              </Reveal>
            ) : null}
          </div>

          <div className="md:col-span-7 md:pl-10">
            <dl className="divide-y divide-[var(--color-subtle)]/70">
              {home.sessionFee ? (
                <Reveal delay={0.1}>
                  <div className="grid gap-2 py-6 md:grid-cols-[140px_1fr] md:gap-8">
                    <dt className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-muted)]">
                      Session fee
                    </dt>
                    <dd className="font-serif text-xl text-[var(--color-foreground)] md:text-2xl">
                      {home.sessionFee}
                    </dd>
                  </div>
                </Reveal>
              ) : null}
              {home.insuranceNote ? (
                <Reveal delay={0.18}>
                  <div className="grid gap-2 py-6 md:grid-cols-[140px_1fr] md:gap-8">
                    <dt className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-muted)]">
                      Insurance
                    </dt>
                    <dd className="text-base leading-relaxed text-[var(--color-foreground)]">
                      {home.insuranceNote}
                    </dd>
                  </div>
                </Reveal>
              ) : null}
              {home.slidingScaleNote ? (
                <Reveal delay={0.26}>
                  <div className="grid gap-2 py-6 md:grid-cols-[140px_1fr] md:gap-8">
                    <dt className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-muted)]">
                      Sliding scale
                    </dt>
                    <dd className="text-base leading-relaxed text-[var(--color-foreground)]">
                      {home.slidingScaleNote}
                    </dd>
                  </div>
                </Reveal>
              ) : null}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
