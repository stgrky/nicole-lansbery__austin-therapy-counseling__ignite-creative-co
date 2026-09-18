import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PracticeScheduler } from "@/components/PracticeScheduler";
import { defaultContactPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/queries";
import type { ContactPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContact();
  return {
    title: seo?.title || "Contact",
    ...(seo?.description ? { description: seo.description } : {}),
    alternates: { canonical: "/contact" },
  };
}

async function getContact() {
  return safeFetch<ContactPage>(contactPageQuery, {}, defaultContactPage);
}

export default async function ContactPageRoute() {
  const contact = await getContact();
  const hasScheduler = Boolean(contact.schedulingUrl);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {contact.heading ?? "Get in touch"}
            </h1>
          </Reveal>
          {contact.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                {contact.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── SCHEDULER (if configured) ── */}
      {hasScheduler ? (
        <section className="bg-[var(--color-background)] py-16 md:py-20">
          <Container>
            <Reveal>
              <p className="mb-6 text-center text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                Pick a time below
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <PracticeScheduler url={contact.schedulingUrl!} />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-md text-center text-sm text-[var(--color-muted)]">
                Prefer to talk first? Email or call — details just below.
              </p>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── CONTACT METHODS ── */}
      <section className="bg-[var(--color-background)] py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                  Reach out directly
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                  More than one way to start a conversation.
                </h2>
              </Reveal>

              <dl className="mt-10 space-y-6">
                {contact.email ? (
                  <Reveal delay={0.16}>
                    <div className="grid gap-1 md:grid-cols-[140px_1fr] md:gap-8">
                      <dt className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-muted)]">
                        Email
                      </dt>
                      <dd>
                        <a
                          className="text-lg text-[var(--color-foreground)] underline-offset-4 transition hover:text-[var(--color-accent-strong)] hover:underline"
                          href={`mailto:${contact.email}`}
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  </Reveal>
                ) : null}
                {contact.phone ? (
                  <Reveal delay={0.22}>
                    <div className="grid gap-1 md:grid-cols-[140px_1fr] md:gap-8">
                      <dt className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-muted)]">
                        Phone
                      </dt>
                      <dd>
                        <a
                          className="text-lg text-[var(--color-foreground)] underline-offset-4 transition hover:text-[var(--color-accent-strong)] hover:underline"
                          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  </Reveal>
                ) : null}
                {contact.addressLine ? (
                  <Reveal delay={0.28}>
                    <div className="grid gap-1 md:grid-cols-[140px_1fr] md:gap-8">
                      <dt className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-muted)]">
                        Office
                      </dt>
                      <dd className="text-lg text-[var(--color-foreground)]">
                        {contact.addressLine}
                      </dd>
                    </div>
                  </Reveal>
                ) : null}
              </dl>

              {!hasScheduler ? (
                <Reveal delay={0.36}>
                  <p className="mt-10 text-sm italic text-[var(--color-muted)]">
                    I read every email personally.
                  </p>
                </Reveal>
              ) : null}
            </div>

            <div className="md:col-span-5">
              {contact.hours?.length ? (
                <Reveal delay={0.2}>
                  <div
                    className="rounded-2xl p-8"
                    style={{ background: "var(--color-accent-soft)" }}
                  >
                    <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                      Hours
                    </p>
                    <p className="mt-3 font-serif text-2xl text-[var(--color-foreground)]">
                      When I&apos;m in.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {contact.hours.map((entry, index) => (
                        <li
                          key={`${entry.day}-${index}`}
                          className="flex items-baseline justify-between gap-4 border-b border-[var(--color-foreground)]/10 pb-3 last:border-0 last:pb-0"
                        >
                          <span className="text-sm font-medium text-[var(--color-foreground)]">
                            {entry.day}
                          </span>
                          <span className="text-sm text-[var(--color-foreground)]/70">
                            {entry.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>

          {/* ── MESSAGE FORM ── */}
          <div className="mx-auto mt-16 max-w-2xl md:mt-20">
            <Reveal>
              <p className="text-center text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                Or send a message
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-center font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                Write to me directly.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── AFTER YOU REACH OUT ── */}
      {contact.showNextSteps !== false && (contact.nextSteps?.length ?? 0) > 0 ? (
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                After you reach out
              </p>
            </Reveal>
            {contact.nextStepsHeading ? (
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.3rem]">
                  {contact.nextStepsHeading}
                </h2>
              </Reveal>
            ) : null}
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {(contact.nextSteps ?? []).map((step, i) => (
              <Reveal key={step.title ?? i} delay={0.08 * i} className="h-full">
                <div className="h-full rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-background)] p-7 text-left shadow-[var(--shadow-card)]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
                    {step.when}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-tight text-[var(--color-foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          {contact.crisisNote ? (
            <Reveal delay={0.2}>
              <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-[var(--color-muted)]">
                <strong className="font-semibold text-[var(--color-foreground)]">
                  In crisis?
                </strong>{" "}
                {contact.crisisNote}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>
      ) : null}

      {/* ── SOFT CROSSLINK ── */}
      <section className="bg-[var(--color-background)] py-16 md:py-20">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              Want the fuller picture of how treatment unfolds?{" "}
              <Link
                href="/services"
                className="font-medium text-[var(--color-accent-strong)] underline underline-offset-4 hover:text-[var(--color-foreground)]"
              >
                See how every engagement is structured
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
