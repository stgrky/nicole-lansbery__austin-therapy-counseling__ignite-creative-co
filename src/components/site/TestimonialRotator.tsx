"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { EASE_EDITORIAL } from "@/components/motion/easings";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/sanity/types";

type Props = {
  testimonials: Testimonial[];
  /** Seconds between rotations. Default 7. */
  intervalSec?: number;
};

export function TestimonialRotator({
  testimonials,
  intervalSec = 7,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, intervalSec * 1000);
    return () => clearInterval(id);
  }, [reduceMotion, intervalSec, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <section className="relative bg-[var(--color-accent-soft)] py-24 md:py-32">
      <Container className="text-center">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
            In their words
          </p>
        </Reveal>

        <div className="relative mx-auto mt-10 min-h-[180px] max-w-3xl md:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            >
              <blockquote className="font-serif text-2xl leading-[1.4] italic text-[var(--color-foreground)] md:text-[1.9rem]">
                <span
                  aria-hidden
                  className="mr-1 text-3xl text-[var(--color-accent-strong)]/40"
                >
                  &ldquo;
                </span>
                {current.quote}
                <span
                  aria-hidden
                  className="ml-1 text-3xl text-[var(--color-accent-strong)]/40"
                >
                  &rdquo;
                </span>
              </blockquote>
              <figcaption className="mt-7 text-sm font-medium text-[var(--color-foreground)]">
                {current.attribution ?? "A client"}
                {current.context ? (
                  <span className="text-[var(--color-muted)]">
                    {" · "}
                    {current.context}
                  </span>
                ) : null}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 ? (
          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t._id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="group h-1.5 w-8 overflow-hidden rounded-full bg-white/60"
              >
                <motion.span
                  className="block h-full"
                  style={{ background: "var(--color-accent)" }}
                  initial={false}
                  animate={{ width: i === index ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </button>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
