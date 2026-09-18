import { SITE_URL } from "@/lib/site";
import type { SiteSettings } from "@/sanity/types";

/**
 * schema.org description of the practice for search engines — part of the SEO
 * Setup add-on. Name, phone, and email come from Studio so they can't drift
 * from what's on the page.
 *
 * The postal address and specialties are fixed here: schema.org wants the
 * address in parts, and Studio stores it as one line. If the office moves,
 * update PRACTICE below as well as Site Settings.
 */
const PRACTICE = {
  legalName: "Austin Therapy and Counseling PLLC",
  clinician: "Nicole Lansbery",
  clinicianTitle: "Licensed Professional Counselor Supervisor (LPC-S) and Licensed Marriage and Family Therapist Supervisor (LMFT-S)",
  address: {
    streetAddress: "8400 N. Mopac Expy, Ste. 301",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78759",
    addressCountry: "US",
  },
  // From her intake answers, trimmed to the specialties she named.
  knowsAbout: [
    "Dialectical Behavior Therapy (DBT)",
    "Borderline Personality Disorder (BPD)",
    "Emotional dysregulation",
    "Self-harm and non-suicidal self-injury",
    "Suicidal ideation",
    "Radically Open DBT (RO-DBT)",
    "Step-down care after hospitalization or residential treatment",
    "Family systems therapy",
    "High-conflict divorce and co-parenting",
    "SPACE (Supportive Parenting for Anxious Childhood Emotions)",
    "EMDR",
    "LPC and LMFT clinical supervision",
  ],
};

export function PracticeStructuredData({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#practice`,
    name: settings.practiceName,
    legalName: PRACTICE.legalName,
    url: SITE_URL,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    address: { "@type": "PostalAddress", ...PRACTICE.address },
    areaServed: { "@type": "State", name: "Texas" },
    knowsAbout: PRACTICE.knowsAbout,
    founder: {
      "@type": "Person",
      name: PRACTICE.clinician,
      jobTitle: PRACTICE.clinicianTitle,
      worksFor: { "@id": `${SITE_URL}/#practice` },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
