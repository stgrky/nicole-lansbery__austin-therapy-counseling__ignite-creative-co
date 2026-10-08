import Link from "next/link";

import type { SanityImageWithAlt } from "@/sanity/types";

import { Container } from "./Container";
import { SanityImg } from "./SanityImg";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

type Props = {
  practiceName: string;
  logo?: SanityImageWithAlt;
  /** width / height of the uploaded file, from Sanity's asset metadata. */
  logoAspectRatio?: number;
  /** Shares siteSettings.stickyCta, so one edit changes both buttons. */
  ctaLabel?: string;
  ctaHref?: string;
  /** False until the first post is published, which hides the Blog link. */
  showBlog?: boolean;
};

/**
 * The height the logo renders at, doubled for retina. Everything else is
 * derived from the file's own aspect ratio, so a wide logo gets a wide box and
 * a square one gets a square box, and neither is ever trimmed to fit.
 */
const LOGO_BOX_HEIGHT = 80;

export function Header({
  practiceName,
  logo,
  logoAspectRatio,
  ctaLabel,
  ctaHref,
  showBlog = false,
}: Props) {
  // One list for both navs below, so they can never disagree about the blog.
  const navLinks = showBlog ? NAV_LINKS : NAV_LINKS.filter((l) => l.href !== "/blog");
  // Falls back to 4:1, a typical wordmark, when metadata is missing. Clamped
  // because an extreme ratio either way would push the nav around.
  const ratio = Math.min(Math.max(logoAspectRatio || 4, 0.5), 8);
  const logoWidth = Math.round(LOGO_BOX_HEIGHT * ratio);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-subtle)]/60 bg-[var(--color-background)]/85 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className="flex items-center text-[var(--color-foreground)]"
          aria-label={practiceName}
        >
          {logo?.asset ? (
            // fit="max" is the whole fix: the default is "crop", which asked
            // Sanity for a 320x80 box and center-trimmed anything that was not
            // already 4:1. A square logo lost everything outside the middle
            // band. "max" scales to fit and never trims, and the width above
            // comes from the file itself so the reserved box matches what
            // arrives — no stretch, no crop, no layout shift.
            <SanityImg
              image={logo}
              alt={logo.alt ?? practiceName}
              width={logoWidth}
              height={LOGO_BOX_HEIGHT}
              fit="max"
              className="h-9 w-auto md:h-10"
            />
          ) : (
            <span className="font-serif text-xl tracking-tight">
              {practiceName}
            </span>
          )}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Label and destination come from Site Settings, the same document
            the floating pill reads, so Nicole changes both in one place. The
            fallbacks are only for a dataset that has not set them. */}
        <Link
          href={ctaHref ?? "/contact"}
          className="hidden rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm text-white transition hover:bg-[var(--color-accent-strong)] md:inline-flex"
        >
          {ctaLabel ?? "Reach Out"}
        </Link>
      </Container>
      <Container className="flex justify-between gap-4 pb-3 md:hidden">
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
