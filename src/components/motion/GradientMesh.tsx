"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
};

/**
 * Painterly, slow-breathing gradient backdrop. Sage-toned blobs that drift
 * over a soft cream surface. Use as an absolute-positioned background
 * inside a relative container.
 */
export function GradientMesh({ className }: Props) {
  const reduceMotion = useReducedMotion();

  const blobBase =
    "absolute aspect-square rounded-full blur-3xl opacity-70 mix-blend-multiply";

  if (reduceMotion) {
    return (
      <div className={`pointer-events-none overflow-hidden ${className ?? ""}`}>
        <div
          className={`${blobBase} -left-24 top-8 w-[55%]`}
          style={{ background: "rgba(107,142,127,0.5)" }}
        />
        <div
          className={`${blobBase} right-0 -bottom-12 w-[50%]`}
          style={{ background: "rgba(232,239,235,0.85)" }}
        />
        <div
          className={`${blobBase} left-1/3 -bottom-24 w-[45%]`}
          style={{ background: "rgba(74,106,93,0.32)" }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className={`${blobBase} w-[55%]`}
        style={{ background: "rgba(107,142,127,0.5)" }}
        initial={{ x: "-15%", y: "5%" }}
        animate={{
          x: ["-15%", "12%", "-8%", "-15%"],
          y: ["5%", "18%", "-4%", "5%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${blobBase} w-[50%]`}
        style={{ background: "rgba(232,239,235,0.85)" }}
        initial={{ x: "30%", y: "60%" }}
        animate={{
          x: ["30%", "55%", "20%", "30%"],
          y: ["60%", "45%", "70%", "60%"],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${blobBase} w-[45%]`}
        style={{ background: "rgba(74,106,93,0.32)" }}
        initial={{ x: "20%", y: "70%" }}
        animate={{
          x: ["20%", "5%", "35%", "20%"],
          y: ["70%", "50%", "85%", "70%"],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
