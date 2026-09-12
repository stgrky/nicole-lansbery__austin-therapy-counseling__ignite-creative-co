"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Loop duration in seconds */
  duration?: number;
  /** Vertical travel in px */
  distance?: number;
};

/**
 * Gentle vertical float — used for hero imagery to give it a soft,
 * breathing presence without the more obvious motion of a Ken Burns
 * zoom. Distance is tiny by design.
 */
export function Float({
  children,
  className,
  duration = 8,
  distance = 5,
}: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0, distance, 0] }}
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
