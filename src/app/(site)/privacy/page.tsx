import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { defaultSiteSettings } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this website handles the information you share through it.",
  alternates: { canonical: "/privacy" },
};

const LEGAL_NAME = "Austin Therapy and Counseling PLLC";
const UPDATED = "September 18, 2026";

/**
 * Website privacy notice. Describes only what this site actually does, so it
 * stays accurate:
 *   - the contact form (Paubox, encrypted, not stored — see api/contact),
 *   - hosting (Vercel) and content (Sanity, which holds no visitor data),
 *   - Google Analytics, shown ONLY when NEXT_PUBLIC_GA_ID is set, so the page
 *     never claims tracking the site isn't doing, or omits tracking it is.
 * Change this page whenever any of those change.
 */
export default async function PrivacyPage() {
  const settings = await safeFetch<SiteSettings>(siteSettingsQuery, {}, defaultSiteSettings);
  const analyticsOn = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <section className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        <article className="prose-serif mx-auto max-w-2xl text-[var(--color-foreground)]">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
            Privacy
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight md:text-[3rem]">
            How this website handles your information
          </h1>
          <p className="text-sm text-[var(--color-muted)]">Last updated {UPDATED}</p>

          <p>
            This notice covers this website, run by {LEGAL_NAME}. It explains what the site collects
            when you visit or get in touch, and what happens to it. It does not describe how health
            information is handled if you become a client of the practice; that is covered
            separately.
          </p>

          <h2>When you send a message</h2>
          <p>
            The contact form asks for your name, email address, an optional phone number, and your
            message. When you send it, it goes as an encrypted email to the practice through Paubox, an
            email service built for healthcare privacy. It is not saved on this website or in any
            database behind it.
          </p>
          <p>
            Please share only what you&rsquo;re comfortable with. There will be time to talk in more
            detail privately.{" "}
            <strong>
              This form is not for emergencies. If you are in crisis, call or text 988 to reach the
              Suicide &amp; Crisis Lifeline.
            </strong>
          </p>

          {analyticsOn ? (
            <>
              <h2>Analytics</h2>
              <p>
                This site uses Google Analytics to understand how it is used &mdash; for example, which
                pages people visit, how they arrived, what kind of device and browser they use, and
                their general location (such as the city). Google Analytics uses cookies to do this.
                It also records when someone clicks a phone number, an email address, or a link to get
                in touch, so the practice can see whether the site is helping people reach it. Nothing
                you type into the contact form is sent to Google.
              </p>
              <p>
                To stop Google Analytics from collecting information about your visits on any site,
                you can install Google&rsquo;s{" "}
                <a href="https://tools.google.com/dlpage/gaoptout">opt-out browser add-on</a>. You can
                read how Google uses this information in{" "}
                <a href="https://policies.google.com/technologies/partner-sites">
                  How Google uses information from sites that use its services
                </a>
                .
              </p>
            </>
          ) : null}

          <h2>The services behind this site</h2>
          <p>
            The site is hosted by Vercel. Like any web host, it processes the technical information
            needed to deliver pages to your browser, such as your IP address. The site&rsquo;s text and
            images are managed in Sanity, which is used for the site&rsquo;s content only, not to
            collect information about visitors.
          </p>

          <h2>What the practice doesn&rsquo;t do</h2>
          <p>
            Your information is not sold, and it is not shared for advertising. This site does not use
            advertising trackers. It is not directed at children under 13.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about this notice, contact {settings.practiceName}
            {settings.email ? (
              <>
                {" "}at <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </>
            ) : null}
            {settings.phone ? <> or {settings.phone}</> : null}. If this notice changes, the date at
            the top will change with it.
          </p>
        </article>
      </Container>
    </section>
  );
}
