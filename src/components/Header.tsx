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
};

export function Header({ practiceName, logo }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-subtle)]/60 bg-[var(--color-background)]/85 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className="flex items-center text-[var(--color-foreground)]"
          aria-label={practiceName}
        >
          {logo?.asset ? (
            <SanityImg
              image={logo}
              alt={logo.alt ?? practiceName}
              width={320}
              height={80}
              className="h-9 w-auto object-contain md:h-10"
            />
          ) : (
            <span className="font-serif text-xl tracking-tight">
              {practiceName}
            </span>
          )}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm text-white transition hover:bg-[var(--color-accent-strong)] md:inline-flex"
        >
          Book a consult
        </Link>
      </Container>
      <Container className="flex justify-between gap-4 pb-3 md:hidden">
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {NAV_LINKS.map((link) => (
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
