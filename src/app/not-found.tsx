import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/**
 * Replaces Next.js's bare "404 | This page could not be found." That page had
 * no header, no links, and no practice name — a dead end for anyone following
 * an old link (her previous site's addresses stop existing at launch) or a
 * mistyped one. Rendered inside the root layout, so the site's fonts and
 * colours apply; the header and footer belong to the (site) group and don't.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[var(--color-background)] px-6 py-24">
      <div className="max-w-md text-center">
        <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
          Page not found
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)]">
          This page isn&rsquo;t here.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
          The link may be old, or the address may have a typo. Everything on the site is a click
          away from the home page.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
          >
            Go to the home page
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-subtle)] px-6 py-3 text-sm font-medium text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
          >
            Get in touch
          </Link>
        </div>
        <p className="mt-10 text-xs text-[var(--color-muted)]">
          If you&rsquo;re in crisis, call or text <strong>988</strong> to reach the Suicide &amp; Crisis
          Lifeline.
        </p>
      </div>
    </main>
  );
}
