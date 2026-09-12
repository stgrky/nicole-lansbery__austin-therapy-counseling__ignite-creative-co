"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Soft pill that follows the cursor with lerp lag. Desktop / fine-pointer
 * only. Auto-hides when the cursor leaves the viewport or stops moving for
 * a while. Disabled for users with prefers-reduced-motion.
 */
export function CursorHalo() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 110, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 110, damping: 18, mass: 0.5 });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle at center, rgba(107,142,127,0.32) 0%, rgba(107,142,127,0.0) 70%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    />
  );
}
