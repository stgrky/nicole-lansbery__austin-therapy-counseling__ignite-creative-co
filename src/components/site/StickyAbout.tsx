"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { HomePage } from "@/sanity/types";

type Props = {
  home: HomePage;
};

/**
 * Sticky-scroll about teaser: the copy column pins while the image
 * column parallax-scrolls past it. Editorial pattern that immediately
 * communicates "this is not Squarespace."
 */
export function StickyAbout({ home }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["8%", "-8%"]
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[var(--color-background)] py-24 md:py-32"
    >
      <Container className="grid gap-12 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                About
              </p>
            </Reveal>
            {home.aboutTeaserHeading ? (
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                  {home.aboutTeaserHeading}
                </h2>
              </Reveal>
            ) : null}
            {home.aboutTeaserBody ? (
              <Reveal delay={0.16}>
                <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                  {home.aboutTeaserBody}
                </p>
              </Reveal>
            ) : null}
            <Reveal delay={0.24}>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Read more about my approach
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-7">
          <motion.div
            style={{ y }}
            className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <SanityImg
              image={home.aboutTeaserImage}
              alt={
                home.aboutTeaserImage?.alt ?? home.aboutTeaserHeading ?? ""
              }
              width={1100}
              height={1400}
              className="aspect-[5/6] w-full object-cover md:aspect-[4/5]"
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
