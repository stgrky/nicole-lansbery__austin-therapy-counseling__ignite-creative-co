import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import type { ContactPage, HomePage } from "@/sanity/types";

type Props = {
  home: HomePage;
  contact: ContactPage;
};

/**
 * MERIDIAN signature section — logistics & intake info, stated plainly.
 * Fees, insurance, hours, and location in one structured band on a dark
 * clinical ground. The "no surprises" answer to Grove's softer pricing prose.
 */
export function LogisticsBand({ home, contact }: Props) {
  const cells: { label: string; lines: string[] }[] = [];

  if (home.sessionFee) {
    cells.push({ label: "Fees", lines: home.sessionFee.split(" · ") });
  }
  if (home.insuranceNote) {
    cells.push({ label: "Insurance", lines: [home.insuranceNote] });
  }
  if (contact.hours && contact.hours.length > 0) {
    cells.push({
      label: "Office hours",
      lines: contact.hours.map((h) => `${h.day} — ${h.time}`),
    });
  }
  if (contact.addressLine) {
    cells.push({
      label: "Location",
      lines: [contact.addressLine, "Secure telehealth across Texas"],
    });
  }

  if (cells.length === 0) return null;

  return (
    <section className="bg-[var(--color-foreground)] py-20 md:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                Logistics & intake
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-[1.15] text-white md:text-[2.3rem]">
                {home.pricingHeading ?? "Fees, insurance & logistics."}
              </h2>
              {home.pricingIntro ? (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
                  {home.pricingIntro}
                </p>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton
              href={home.primaryCta?.href ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:bg-white/90"
            >
              {home.primaryCta?.label ?? "Request an appointment"}
              <span aria-hidden>→</span>
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell, i) => (
            <Reveal key={cell.label} delay={0.06 * i} className="h-full">
              <div className="h-full rounded-2xl bg-white/[0.07] p-7 backdrop-blur-sm">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                  {cell.label}
                </p>
                <div className="mt-3 space-y-1.5">
                  {cell.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm leading-relaxed text-white/85"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {home.slidingScaleNote ? (
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm italic leading-relaxed text-white/55">
              {home.slidingScaleNote}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
