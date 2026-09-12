"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { SanityImageWithAlt } from "@/sanity/types";

type Props = {
  portrait?: SanityImageWithAlt;
  intro?: string;
  practiceLine?: string;
};

/**
 * Editorial sticky-scroll moment for the About page intro. The intro
 * copy pins on the left while the portrait floats past on the right
 * with a gentle parallax. Mirrors the homepage StickyAbout treatment
 * but built around the more personal About-page content.
 */
export function AboutSticky({ portrait, intro, practiceLine }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["10%", "-10%"]
  );

  return (
    <section
      ref={ref}
      className="bg-[var(--color-background)] py-20 md:py-28"
    >
      <Container className="grid gap-12 md:grid-cols-12 md:items-start">
        <div className="order-2 md:order-1 md:col-span-6">
          <div className="md:sticky md:top-28">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                Hi, I&apos;m the therapist behind this practice
              </p>
            </Reveal>
            {intro ? (
              <Reveal delay={0.08}>
                <p className="mt-6 font-serif text-2xl leading-[1.4] text-[var(--color-foreground)] md:text-[1.75rem]">
                  {intro}
                </p>
              </Reveal>
            ) : null}
            {practiceLine ? (
              <Reveal delay={0.18}>
                <p className="mt-8 text-base leading-relaxed text-[var(--color-muted)]">
                  {practiceLine}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-6">
          {portrait ? (
            <motion.div
              style={{ y }}
              className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
            >
              <SanityImg
                image={portrait}
                alt={portrait.alt ?? "Portrait"}
                width={1100}
                height={1400}
                className="aspect-[4/5] w-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
