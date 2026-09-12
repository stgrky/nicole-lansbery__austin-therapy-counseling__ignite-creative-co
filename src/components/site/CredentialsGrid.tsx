import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { AboutPage, ServicesPage } from "@/sanity/types";

type Props = {
  about: AboutPage;
  services: ServicesPage;
};

/**
 * MERIDIAN signature section — the credentials/specialties grid.
 * Where Grove tells a warm story, Meridian shows its receipts: a disciplined
 * grid of qualifications and a numbered breakdown of clinical focus areas.
 */
export function CredentialsGrid({ about, services }: Props) {
  const credentials = about.credentials ?? [];
  const specialties = services.services ?? [];

  if (credentials.length === 0 && specialties.length === 0) return null;

  return (
    <section className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        {/* Areas of focus — numbered, structured */}
        {specialties.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <Reveal>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                    Clinical focus
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.15] text-[var(--color-foreground)] md:text-[2.3rem]">
                    Areas of practice
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                    A deliberately narrow scope — depth over breadth, and
                    honest referrals for anything outside it.
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-3">
                {specialties.map((service, i) => (
                  <Reveal
                    key={service.title}
                    delay={0.08 * i}
                    className="h-full"
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-surface)] p-7 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full font-serif text-lg font-semibold text-[var(--color-accent-strong)]"
                        style={{ background: "var(--color-accent-soft)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-serif text-lg font-semibold leading-tight text-[var(--color-foreground)]">
                        {service.title}
                      </h3>
                      {service.description ? (
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                          {service.description}
                        </p>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {/* Credentials — a disciplined receipt grid */}
        {credentials.length > 0 ? (
          <div className="mt-16 md:mt-20">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                Credentials
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {credentials.map((credential, i) => (
                <Reveal key={credential} delay={0.05 * i} className="h-full">
                  <div className="flex h-full items-start gap-3 rounded-xl border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-5">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                    <p className="text-sm font-medium leading-snug text-[var(--color-foreground)]">
                      {credential}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
