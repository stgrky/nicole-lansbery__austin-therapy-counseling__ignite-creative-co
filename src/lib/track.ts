"use client";

import { sendGAEvent } from "@next/third-parties/google";

/**
 * Send a GA4 event, or do nothing when analytics isn't configured yet.
 *
 * Never pass form contents, names, emails, or anything a visitor typed: a
 * therapy practice's contact form can hold health information, and it must
 * not reach Google.
 */
export function track(event: string, params: Record<string, string> = {}) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", event, params);
}
