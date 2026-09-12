"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_EDITORIAL } from "./easings";

type Props = {
  text: string;
  className?: string;
  /** Per-word stagger in seconds */
  stagger?: number;
  /** Initial Y offset for each word, in px */
  distance?: number;
  /** Whether to animate just once */
  once?: boolean;
};

/**
 * Splits a heading by words and reveals each one with a slow film-fade.
 * Use for the hero h1. Per-word entry produces an editorial, "intentional"
 * feel without the bouncy/showy quality of letter-by-letter.
 */
export function WordReveal({
  text,
  className,
  stagger = 0.06,
  distance = 16,
  once = true,
}: Props) {
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block whitespace-nowrap"
          variants={{
            hidden: { opacity: 0, y: distance },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.95, ease: EASE_EDITORIAL },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
