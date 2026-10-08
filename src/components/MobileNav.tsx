"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The small-screen menu: an icon button beside the logo that drops a soft
 * panel across the width of the header.
 *
 * What it replaces was a second header row holding a wrapping list of text
 * links. That cost two rows of vertical space on the screen size with least to
 * spare, read like a sitemap rather than part of the site, and left no room
 * for the one button that matters, so phones got no call to action at all.
 *
 * Same shape as Austin Women's Counseling, which arrived at it the long way:
 * a plain list under the logo was legible but looked unfinished, and a
 * full-height overlay was far too much for five links.
 */

type NavLink = { href: string; label: string };

export function MobileNav({
  links,
  ctaLabel,
  ctaHref,
}: {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-subtle)] text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
      >
        {/* Three rules that become a cross, rather than swapping one icon for
            another: the movement says what the button did. */}
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {open ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full z-50 px-4 pb-4">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
            <ul className="space-y-5">
              {links.map((link) => {
                const current =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={current ? "page" : undefined}
                      className={`font-serif text-xl leading-tight transition ${
                        current
                          ? "text-[var(--color-accent-strong)]"
                          : "text-[var(--color-foreground)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-7 flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
