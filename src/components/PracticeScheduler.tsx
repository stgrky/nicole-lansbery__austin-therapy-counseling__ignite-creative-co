"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  url: string;
};

type Provider = "calendly" | "cal" | "generic";

function detectProvider(url: string): Provider {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.endsWith("calendly.com")) return "calendly";
    if (host.endsWith("cal.com")) return "cal";
    return "generic";
  } catch {
    return "generic";
  }
}

/**
 * Build an embed-friendly URL. Both Calendly and Cal.com strip their normal
 * page chrome when given the right query parameter — the result is an
 * inline booking widget that feels native to the host page instead of
 * looking like a full webpage in an iframe.
 */
function toEmbedUrl(url: string, provider: Provider): string {
  try {
    const u = new URL(url);
    if (provider === "calendly") {
      u.searchParams.set("embed_type", "Inline");
      u.searchParams.set("embed_domain", "true");
      u.searchParams.set("hide_landing_page_details", "1");
      u.searchParams.set("background_color", "ffffff");
      u.searchParams.set("text_color", "1f2937");
      u.searchParams.set("primary_color", "6b8e7f");
    } else if (provider === "cal") {
      u.searchParams.set("embed", "true");
      u.searchParams.set("layout", "month_view");
    }
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Inline embed of a Calendly or Cal.com booking page. Falls back to a
 * generic iframe for unknown providers (works as long as the destination
 * permits iframing).
 *
 * Mobile-tall (980px) so the picker doesn't get cramped on phones;
 * desktop-shorter (640px) so it sits comfortably above the fold.
 */
export function PracticeScheduler({ url }: Props) {
  const provider = useMemo(() => detectProvider(url), [url]);
  const embedUrl = useMemo(() => toEmbedUrl(url, provider), [url, provider]);
  const [loaded, setLoaded] = useState(false);

  // Reset the loaded state when the URL changes (live Studio edits).
  useEffect(() => {
    setLoaded(false);
  }, [embedUrl]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--color-subtle)]/60 bg-white shadow-[var(--shadow-card)]">
      <div
        aria-hidden={loaded}
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "var(--color-accent-soft)" }}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-current border-r-transparent"
            style={{ color: "var(--color-accent-strong)" }}
          />
          <p className="text-sm text-[var(--color-accent-strong)]">
            Loading available times…
          </p>
        </div>
      </div>

      <iframe
        title="Schedule a session"
        src={embedUrl}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="block h-[980px] w-full border-0 md:h-[640px]"
      />
    </div>
  );
}
