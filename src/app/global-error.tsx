"use client";

import { useEffect } from "react";

/**
 * Replaces Next.js's built-in "This page couldn't load" screen.
 *
 * The usual cause on a site like this isn't a bug in the page: it's a piece of
 * the page's code that didn't download — an ad or privacy blocker refusing the
 * request, a dropped connection on a phone, a tab left open across a deploy.
 * A fresh load fixes all of those, so for that kind of failure the page
 * reloads itself once. The timestamp stops it looping if it keeps failing.
 *
 * Anything else gets a calm page with a way forward. This replaces the root
 * layout entirely, so it can't rely on the site's styles or content — hence the
 * inline styles and no practice details.
 */

const RELOADED_AT = "icc-reloaded-after-load-failure";

function isLoadFailure(error: Error | undefined) {
  return (
    error?.name === "ChunkLoadError" ||
    /Loading chunk|Failed to load chunk|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
      error?.message ?? "",
    )
  );
}

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    if (!isLoadFailure(error)) return;
    try {
      const last = Number(sessionStorage.getItem(RELOADED_AT) ?? 0);
      if (Date.now() - last < 30_000) return;
      sessionStorage.setItem(RELOADED_AT, String(Date.now()));
    } catch {
      return; // storage blocked: don't risk a reload loop
    }
    window.location.reload();
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f5f0",
          color: "#1f2a24",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: 24,
        }}
      >
        <title>This page didn&rsquo;t load</title>
        <main style={{ maxWidth: 440, textAlign: "center", lineHeight: 1.6 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: 30, margin: "0 0 12px" }}>
            This page didn&rsquo;t load.
          </h1>
          <p style={{ margin: "0 0 28px", color: "#5b6660" }}>
            It&rsquo;s usually a hiccup in the connection. Reloading almost always fixes it.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: "#5f7f6f",
                color: "#fff",
                border: 0,
                borderRadius: 999,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reload the page
            </button>
            {/* A plain link on purpose: this page shows when the site's own
                code may be what failed, and a full page load is the fix. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                border: "1px solid #c9d2cc",
                borderRadius: 999,
                padding: "11px 22px",
                fontSize: 15,
                color: "#1f2a24",
                textDecoration: "none",
              }}
            >
              Go to the home page
            </a>
          </div>
          <p style={{ marginTop: 36, fontSize: 13, color: "#5b6660" }}>
            If you&rsquo;re in crisis, call or text <strong>988</strong> to reach the Suicide &amp; Crisis Lifeline.
          </p>
        </main>
      </body>
    </html>
  );
}
