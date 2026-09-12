"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Loop duration in seconds */
  duration?: number;
  /** Max zoom (1.0 = none, 1.05 = subtle, 1.1 = obvious) */
  scale?: number;
};

/**
 * Wrap an image (or any element) to give it a slow, looping Ken-Burns
 * zoom. Pair with an `overflow-hidden` ancestor so the scale doesn't push
 * past the frame.
 */
export function KenBurns({
  children,
  className,
  duration = 14,
  scale = 1.06,
}: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: [1, scale, 1] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
