"use client";

import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { HomePage, SiteSettings } from "@/sanity/types";

type Props = {
  home: HomePage;
  settings: SiteSettings;
};

/**
 * GROVE signature hero — soft, warm, and organic: the origin the other four
 * templates deliberately diverged from. A large Cormorant headline breathing in
 * open space beside a rounded, floating portrait over a gentle sage wash. Where
 * Meridian leads with a bordered facts panel, Grove leads with a face and a
 * feeling.
 */
export function GroveHero({ home, settings }: Props) {
  const hasImage = Boolean(home.heroImage?.demoUrl || home.heroImage?.asset);

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)]">
      {/* soft organic washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[38rem] w-[38rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--color-accent-soft)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--color-accent-soft)" }}
      />

      <Container
        className={`relative grid gap-16 py-20 md:items-center md:py-28 ${
          hasImage ? "md:grid-cols-[1.02fr_0.98fr]" : ""
        }`}
      >
        <div>
          {home.heroEyebrow ? (
            <Reveal distance={10} duration={0.7}>
              <p className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                {home.heroEyebrow}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.1} distance={18} duration={0.9}>
            <h1 className="mt-6 font-serif text-[2.9rem] font-normal leading-[1.03] tracking-[-0.015em] text-[var(--color-foreground)] md:text-[4.25rem]">
              {home.heroHeading}
            </h1>
          </Reveal>

          {home.heroSubhead ? (
            <Reveal delay={0.25} distance={16} duration={0.9}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                {home.heroSubhead}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.4} distance={12} duration={0.8}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              {home.primaryCta?.label ? (
                <MagneticButton
                  href={home.primaryCta.href ?? "/contact"}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_var(--color-accent-strong)] transition hover:bg-[var(--color-accent-strong)]"
                >
                  {home.primaryCta.label}
                  <span aria-hidden>→</span>
                </MagneticButton>
              ) : null}
              {home.secondaryCta?.label ? (
                <MagneticButton
                  href={home.secondaryCta.href ?? "/about"}
                  className="text-sm font-semibold text-[var(--color-foreground)] underline decoration-[var(--color-subtle)] decoration-1 underline-offset-[6px] transition hover:decoration-[var(--color-accent)]"
                >
                  {home.secondaryCta.label}
                </MagneticButton>
              ) : null}
            </div>
          </Reveal>
        </div>

        {hasImage ? (
          <Reveal delay={0.2} distance={26} duration={1.1}>
            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div className="overflow-hidden rounded-[2.75rem] shadow-[0_30px_60px_-30px_rgba(31,41,55,0.35)]">
                <SanityImg
                  image={home.heroImage}
                  alt={
                    home.heroImage?.alt ??
                    settings.practiceName ??
                    "A warm therapy space"
                  }
                  width={760}
                  height={900}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
              </div>
              {/* floating name chip — Grove's soft answer to Meridian's facts table */}
              <div className="absolute -bottom-6 left-6 rounded-2xl bg-[var(--color-surface)] px-6 py-4 shadow-[0_18px_40px_-20px_rgba(31,41,55,0.4)] md:-left-6">
                <p className="font-serif text-xl leading-tight text-[var(--color-foreground)]">
                  {settings.practiceName}
                </p>
                {settings.tagline ? (
                  <p className="mt-1 max-w-[15rem] text-sm leading-snug text-[var(--color-muted)]">
                    {settings.tagline}
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
