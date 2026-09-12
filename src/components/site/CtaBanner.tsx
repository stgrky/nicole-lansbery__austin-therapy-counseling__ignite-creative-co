"use client";

import { Container } from "@/components/Container";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CtaBanner({
  heading = "Ready when you are",
  body = "Reach out to schedule a free consultation. I'll get back to you within two business days.",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
}: Props) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--color-accent-soft)]"
      style={{ background: "#f1f5f0" }}
    >
      <GradientMesh className="absolute inset-0 -z-10" />
      <Container className="relative py-24 text-center md:py-32">
        <Reveal>
          <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.6rem]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-foreground)]/70">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <MagneticButton
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_14px_40px_-16px_rgba(74,106,93,0.55)] transition hover:bg-[var(--color-accent-strong)]"
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
