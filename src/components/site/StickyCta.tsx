"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { EASE_EDITORIAL } from "@/components/motion/easings";

type Props = {
  label?: string;
  href?: string;
};

/**
 * Floating "Book a free consult" pill that appears after the user scrolls
 * past ~70% of the viewport height. Disappears near the footer so it
 * doesn't compete with the final CTA. Disabled when prefers-reduced-motion
 * is set.
 */
export function StickyCta({ label, href }: Props) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!label || !href) return;

    function handle() {
      if (typeof window === "undefined") return;
      const scrolledPast = window.scrollY > window.innerHeight * 0.7;
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - 320;
      setVisible(scrolledPast && !nearBottom);
    }

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [label, href]);

  if (!label || !href) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={href}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_-12px_rgba(74,106,93,0.6)] backdrop-blur-md transition hover:bg-[var(--color-accent-strong)] sm:bottom-8 sm:right-8"
        >
          {label}
          <span aria-hidden>→</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
