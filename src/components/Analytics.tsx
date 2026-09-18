"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";

import { track } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GA4 plus the conversions the Advanced Analytics add-on promises: phone-call
 * clicks, email clicks, and booking clicks. Form submissions are tracked where
 * they succeed (ContactForm), since a click on "send" isn't a lead until the
 * message actually goes through.
 *
 * One listener on the document, so every phone number and booking link on the
 * site counts — header, footer, contact page — without wiring each one.
 * Renders nothing until NEXT_PUBLIC_GA_ID is set.
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("phone_call_click", { link_location: where(link!) });
      else if (href.startsWith("mailto:")) track("email_click", { link_location: where(link!) });
      else if (href === "/contact" || href.startsWith("/contact#") || link?.dataset.booking === "true")
        track("booking_click", { link_location: where(link!), link_text: (link!.textContent ?? "").trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null;
}

/** Which part of the page the click came from, for comparing CTAs in GA. */
function where(link: Element) {
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  return window.location.pathname;
}
