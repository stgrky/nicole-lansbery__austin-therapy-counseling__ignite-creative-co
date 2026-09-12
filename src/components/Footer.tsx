import Link from "next/link";

import type { SiteSettings } from "@/sanity/types";

import { Container } from "./Container";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[var(--color-subtle)]/60 bg-[var(--color-surface)]">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-[var(--color-foreground)]">
            {settings.practiceName}
          </p>
          {settings.tagline ? (
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {settings.tagline}
            </p>
          ) : null}
        </div>
        <div className="space-y-2 text-sm text-[var(--color-muted)]">
          <p className="font-medium text-[var(--color-foreground)]">Contact</p>
          {settings.email ? (
            <p>
              <a
                href={`mailto:${settings.email}`}
                className="hover:text-[var(--color-foreground)]"
              >
                {settings.email}
              </a>
            </p>
          ) : null}
          {settings.phone ? (
            <p>
              <a
                href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                className="hover:text-[var(--color-foreground)]"
              >
                {settings.phone}
              </a>
            </p>
          ) : null}
          {settings.addressLine ? <p>{settings.addressLine}</p> : null}
        </div>
        <div className="space-y-2 text-sm text-[var(--color-muted)]">
          <p className="font-medium text-[var(--color-foreground)]">Site</p>
          <p>
            <Link href="/about" className="hover:text-[var(--color-foreground)]">
              About
            </Link>
          </p>
          <p>
            <Link
              href="/services"
              className="hover:text-[var(--color-foreground)]"
            >
              Services
            </Link>
          </p>
          <p>
            <Link href="/blog" className="hover:text-[var(--color-foreground)]">
              Blog
            </Link>
          </p>
          <p>
            <Link
              href="/contact"
              className="hover:text-[var(--color-foreground)]"
            >
              Contact
            </Link>
          </p>
        </div>
      </Container>
      <div className="border-t border-[var(--color-subtle)]/60">
        <Container className="flex flex-col gap-2 py-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.practiceName}. All rights reserved.
          </p>
          {settings.footerText ? <p>{settings.footerText}</p> : null}
        </Container>
      </div>
    </footer>
  );
}
