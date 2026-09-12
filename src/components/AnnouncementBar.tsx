"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { EASE_EDITORIAL } from "@/components/motion/easings";
import type { Announcement, AnnouncementVariant } from "@/sanity/types";

type Props = {
  announcement: Announcement;
};

const VARIANT_STYLES: Record<
  AnnouncementVariant,
  { background: string; color: string; linkColor: string; ringColor: string }
> = {
  info: {
    background: "var(--color-accent-soft)",
    color: "var(--color-accent-strong)",
    linkColor: "var(--color-accent-strong)",
    ringColor: "rgba(107,142,127,0.25)",
  },
  accent: {
    background: "var(--color-accent)",
    color: "#ffffff",
    linkColor: "#ffffff",
    ringColor: "rgba(255,255,255,0.35)",
  },
  urgent: {
    background: "#b9532a",
    color: "#ffffff",
    linkColor: "#ffffff",
    ringColor: "rgba(255,255,255,0.4)",
  },
};

/**
 * Announcement banner that renders site-wide. Driven entirely by the
 * "Announcement Banner" singleton in Sanity Studio — therapist controls
 * everything (enabled, message, link, variant, date window) without code.
 *
 * If the document is disabled, missing a message, or outside its date
 * window, this returns null and renders nothing.
 *
 * Visitors can dismiss the banner for the session; the dismiss key is
 * tied to the document's _updatedAt, so editing the message re-shows
 * the banner to previously-dismissed visitors.
 */
export function AnnouncementBar({ announcement }: Props) {
  const reduceMotion = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);

  const dismissKey =
    announcement._id && announcement._updatedAt
      ? `announcement-dismissed:${announcement._id}:${announcement._updatedAt}`
      : null;

  useEffect(() => {
    if (!dismissKey) return;
    try {
      if (window.sessionStorage.getItem(dismissKey) === "1") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage can throw in private mode — fall back to in-memory only.
    }
  }, [dismissKey]);

  if (!announcement.enabled) return null;
  if (!announcement.message) return null;

  const now = Date.now();
  if (
    announcement.startDate &&
    new Date(announcement.startDate).getTime() > now
  ) {
    return null;
  }
  if (announcement.endDate && new Date(announcement.endDate).getTime() < now) {
    return null;
  }

  const variant: AnnouncementVariant = announcement.variant ?? "info";
  const styles = VARIANT_STYLES[variant];

  function handleDismiss() {
    setDismissed(true);
    if (!dismissKey) return;
    try {
      window.sessionStorage.setItem(dismissKey, "1");
    } catch {
      // sessionStorage unavailable — dismiss is in-memory for this page load.
    }
  }

  const hasLink = !!(announcement.linkLabel && announcement.linkHref);

  return (
    <AnimatePresence initial={false}>
      {!dismissed ? (
        <motion.div
          role="region"
          aria-label="Site announcement"
          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
          style={{ background: styles.background, color: styles.color }}
          className="overflow-hidden"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5 text-sm">
            <p className="flex-1 leading-snug">
              <span>{announcement.message}</span>
              {hasLink ? (
                <>
                  {" "}
                  <a
                    href={announcement.linkHref!}
                    className="ml-1 inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
                    style={{ color: styles.linkColor }}
                  >
                    {announcement.linkLabel}
                    <span aria-hidden>→</span>
                  </a>
                </>
              ) : null}
            </p>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="flex-shrink-0 rounded-full p-1.5 transition-opacity hover:opacity-80 focus-visible:opacity-80 focus-visible:outline-none focus-visible:ring-2"
              style={{
                ["--tw-ring-color" as string]: styles.ringColor,
                color: styles.color,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
