"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

import { EASE_EDITORIAL } from "./easings";

type Props = {
  children: ReactNode;
  /** Stagger delay in seconds before this element animates */
  delay?: number;
  /** How far it travels (px) before settling */
  distance?: number;
  /** Duration in seconds */
  duration?: number;
  /** Apply once only? Defaults to true. */
  once?: boolean;
  /** Tailwind classes on the wrapper */
  className?: string;
  /** Render as block; pass "inline-block" if needed inside text */
  as?: "div" | "span";
};

/**
 * Scroll-triggered fade + lift. The atom of our motion system.
 * Respects prefers-reduced-motion automatically.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  duration = 0.9,
  once = true,
  className,
  as = "div",
}: Props) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: EASE_EDITORIAL,
      }}
    >
      {children}
    </Component>
  );
}
