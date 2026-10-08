import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { AboutSticky } from "@/components/site/AboutSticky";
import { CredentialBadges } from "@/components/site/CredentialBadges";
import { defaultAboutPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { aboutPageQuery } from "@/sanity/queries";
import type { AboutPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAbout();
  return {
    title: seo?.title || "About",
    ...(seo?.description ? { description: seo.description } : {}),
    alternates: { canonical: "/about" },
  };
}

async function getAbout() {
  return safeFetch<AboutPage>(aboutPageQuery, {}, defaultAboutPage);
}

export default async function AboutPageRoute() {
  const about = await getAbout();

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              About
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              {about.heading ?? "About me"}
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* ── PORTRAIT + INTRO (sticky-scroll editorial moment) ── */}
      <AboutSticky portrait={about.portrait} intro={about.intro} />

      {/* ── HOW I WORK — practice principles ── */}
      {about.showPrinciples !== false && (about.principles?.length ?? 0) > 0 ? (
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                How I work
              </p>
            </Reveal>
            {about.principlesHeading ? (
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.3rem]">
                  {about.principlesHeading}
                </h2>
              </Reveal>
            ) : null}
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {(about.principles ?? []).map((principle, i) => (
              <Reveal key={principle.title ?? i} delay={0.08 * i} className="h-full">
                <div className="h-full rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-background)] p-7 shadow-[var(--shadow-card)]">
                  <h3 className="font-serif text-xl font-semibold leading-tight text-[var(--color-foreground)]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      ) : null}

      {/* ── CAREER TIMELINE ── */}
      {about.showTimeline !== false && (about.timeline?.length ?? 0) > 0 ? (
      <section className="bg-[var(--color-background)] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                The path here
              </p>
            </Reveal>
            {about.timelineHeading ? (
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.3rem]">
                  {about.timelineHeading}
                </h2>
              </Reveal>
            ) : null}
            <div className="mt-12">
              {(about.timeline ?? []).map((stop, i, arr) => (
                <Reveal key={stop.title ?? i} delay={0.08 * i}>
                  <div className="relative flex gap-6 pb-10 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span
                        className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-[var(--color-accent)]"
                        style={{
                          background:
                            i === arr.length - 1
                              ? "var(--color-accent)"
                              : "var(--color-surface)",
                        }}
                        aria-hidden
                      />
                      {i < arr.length - 1 ? (
                        <span
                          aria-hidden
                          className="mt-1 w-px flex-1 bg-[var(--color-subtle)]"
                        />
                      ) : null}
                    </div>
                    <div className="-mt-0.5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                        {stop.period}
                      </p>
                      <h3 className="mt-1.5 font-serif text-lg font-semibold leading-tight text-[var(--color-foreground)]">
                        {stop.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {stop.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
      ) : null}

      {/* ── LONG-FORM BODY ── */}
      {about.body?.length ? (
        <section className="bg-[var(--color-background)] py-16 md:py-24">
          <Container>
            <Reveal>
              <article className="prose-serif mx-auto max-w-2xl text-lg text-[var(--color-foreground)]">
                <PortableTextRenderer value={about.body} />
              </article>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── CREDENTIALS ── */}
      {about.credentials?.length ? (
        <section
          // When badges follow, the card hands most of its trailing space to
          // them so the badge reads as attached to the credentials rather than
          // marooned between two sections.
          className={`bg-[var(--color-background)] ${
            about.credentialBadges?.length ? "pb-10 md:pb-12" : "pb-20 md:pb-28"
          }`}
        >
          <Container>
            <Reveal>
              <div
                className="mx-auto max-w-2xl rounded-2xl p-8 md:p-10"
                style={{ background: "var(--color-accent-soft)" }}
              >
                <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                  Credentials &amp; training
                </p>
                <ul className="mt-6 grid gap-3 text-base text-[var(--color-foreground)] sm:grid-cols-2">
                  {about.credentials.map((cred) => (
                    <li
                      key={cred}
                      className="flex items-start gap-3 leading-snug"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ background: "var(--color-accent-strong)" }}
                      />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── CREDENTIAL BADGES ── centred on their own, below the card ── */}
      <CredentialBadges badges={about.credentialBadges} />

      {/* ── CLOSING CTA ── */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              Ready to begin?
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
              If any of this sounds like a fit, let&apos;s talk.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              A brief consult is the easiest way to know whether we&apos;re a
              good match. No pressure, no pitch.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(74,106,93,0.5)] transition hover:bg-[var(--color-accent-strong)]"
            >
              Reach Out
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
