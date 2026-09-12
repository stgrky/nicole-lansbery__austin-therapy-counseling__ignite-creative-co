import type { AuthorRef } from "@/sanity/types";

import { GuestBadge } from "./GuestBadge";
import { PortableTextRenderer } from "./PortableTextRenderer";
import { SanityImg } from "./SanityImg";

export function AuthorCard({ author }: { author?: AuthorRef }) {
  if (!author) return null;
  const isGuest = !!author.isGuestContributor;

  return (
    <section
      aria-label={isGuest ? "About this guest contributor" : "About the author"}
      className="mt-12 rounded-2xl bg-[var(--color-accent-soft)] p-8"
    >
      <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
        {isGuest ? "About this guest contributor" : "About the author"}
      </p>
      <div className="mt-5 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        {author.photo ? (
          <SanityImg
            image={author.photo}
            alt={author.name ?? ""}
            width={120}
            height={120}
            className="h-24 w-24 flex-none rounded-full object-cover"
          />
        ) : null}
        <div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <p className="font-serif text-xl text-[var(--color-foreground)]">
              {author.name}
            </p>
            {isGuest ? <GuestBadge size="md" /> : null}
          </div>
          {author.credentials ? (
            <p className="text-sm text-[var(--color-muted)]">
              {author.credentials}
            </p>
          ) : null}
          {author.bio?.length ? (
            <div className="mt-3 text-sm">
              <PortableTextRenderer value={author.bio} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
