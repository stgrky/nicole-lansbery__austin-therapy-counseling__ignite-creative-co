import { cubicBezier } from "framer-motion";

/**
 * Slow, editorial out-curve used across the site for premium-feeling
 * motion. Reaches into the upper register quickly, then settles long —
 * the "intentional, considered" feel that matches the therapy voice.
 *
 * The bare 4-number tuple `[0.22, 1, 0.36, 1]` widens to `number[]` at
 * the call site and trips framer-motion v12's stricter Easing type
 * (Vercel TypeScript build blocks it). Wrapping in cubicBezier() returns
 * a typed EasingFunction that framer-motion accepts directly.
 */
export const EASE_EDITORIAL = cubicBezier(0.22, 1, 0.36, 1);
