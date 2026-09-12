import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { SanityImageWithAlt } from "@/sanity/types";

/** The tallest the badge is ever drawn (md:h-32), doubled for retina. */
const MAX_EDGE = 256;

/**
 * Sanity encodes an asset's pixel dimensions in its reference string:
 * `image-<hash>-164x180-png`. Reading them back matters here because badges
 * arrive in every shape — a round PSI seal, a wide AASECT wordmark — and
 * next/image needs the real aspect ratio to size its box. Hand it a square and
 * `object-contain` letterboxes a round badge and shrinks a wide one to a
 * sliver.
 *
 * Falls back to a square for an image with no parseable ref (demo defaults).
 */
function badgeBox(badge: SanityImageWithAlt) {
  const match = /-(\d+)x(\d+)-[a-z]+$/.exec(badge.asset?._ref ?? "");
  if (!match) return { width: MAX_EDGE, height: MAX_EDGE };
  const w = Number(match[1]);
  const h = Number(match[2]);
  // Never request more than the upload holds — `max` would not upscale anyway,
  // and asking for it just inflates the URL.
  const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}

/**
 * Certification and membership marks, centred on their own, the way practices
 * usually display them — standing apart rather than tucked into a list.
 * Hides itself when there are none, so a site with no badges renders exactly
 * as it did before this section existed.
 *
 * Upload these with transparent backgrounds. A badge saved as a JPEG carries a
 * baked-in white square that reads as a white box against any tinted section.
 */
export function CredentialBadges({
  badges,
}: {
  badges?: SanityImageWithAlt[];
}) {
  if (!badges?.length) return null;

  // No vertical padding of its own: the credentials card above tightens its
  // bottom padding when badges are present, and the section below carries its
  // own top padding. A third helping here strands the badge in the middle of a
  // large empty band.
  return (
    <section className="bg-[var(--color-background)]">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {badges.map((badge, i) => {
              const { width, height } = badgeBox(badge);
              return (
                <SanityImg
                  key={badge.asset?._ref ?? i}
                  image={badge}
                  alt={badge.alt ?? "Credential badge"}
                  width={width}
                  height={height}
                  fit="max"
                  className="h-28 w-auto object-contain md:h-32"
                  sizes="(min-width: 768px) 320px, 240px"
                />
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
