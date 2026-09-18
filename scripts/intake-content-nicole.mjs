/**
 * Nicole's intake answers (Google Form, received 2026-09-18) → her site.
 *
 * Sources, and nothing else:
 *   - Her six FAQ answers, used VERBATIM.
 *   - Her ideal-client answer → the "who I work with" section.
 *   - Her keyword list + FAQ language → service cards and search listings
 *     (the "keyword-tailored content" her SEO Setup add-on covers).
 *   - Her schedule answer → contact hours; licensed in Texas only.
 *   - The SEO/analytics/contact-form add-ons in her signed agreement.
 *
 * Where copy is composed rather than quoted, it restates her own claims in
 * her own terms. Nothing here adds a credential, training, fee, or service
 * she didn't state. Deliberately left out: her group-practice history (told to
 * Grant privately, not for publication) and fees (not provided — that section
 * stays a placeholder for her).
 *
 * Run: node --env-file=.env.local scripts/intake-content-nicole.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-09-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

let k = 0;
const key = () => `n${(k += 1)}`;

// ── Her FAQ answers, verbatim ────────────────────────────────────────────────
const faqs = [
  {
    question: "Do you provide therapy for clients transitioning from inpatient care or an RTC?",
    answer:
      "Yes. Transitioning home after hospitalization or a Residential Treatment Center (RTC) is a critical time. I provide specialized step-down therapy to help clients and their families navigate this shift safely. I frequently collaborate with psychiatrists and treatment centers to ensure a seamless continuum of care, focusing on stabilizing impulsive behaviors, managing suicidal thoughts, and building a life worth living.",
  },
  {
    question: "What is the difference between standard DBT and Radically Open DBT (RO-DBT)?",
    answer:
      "Standard Dialectical Behavior Therapy (DBT) is highly effective for clients who struggle with emotional dysregulation, impulsive behaviors, chaotic relationships, or Borderline Personality Disorder (BPD). It focuses on gaining control over intense emotions. Radically Open DBT (RO-DBT), on the other hand, is designed for clients who struggle with \"overcontrol,\" which can show up as treatment-resistant depression, severe perfectionism, or rigidity. During our intake, we will determine which approach fits your specific needs.",
  },
  {
    question: "Can you help parents navigating a high-conflict divorce?",
    answer:
      "Absolutely. High-conflict divorce can be incredibly destabilizing for both the parents and the children. I offer specialized family therapy and co-parenting support, utilizing frameworks like \"New Ways for Families.\" Whether you need a court-involved therapist, help navigating a blended family transition, or support for kids going through a divorce, my goal is to help you reduce conflict and establish healthy, protective boundaries.",
  },
  {
    question: "What is SPACE therapy?",
    answer:
      "SPACE stands for Supportive Parenting for Anxious Childhood Emotions. It is a unique, evidence-based parent-child therapy where the work is done primarily with the parents, rather than the child. It is highly effective for parents trying to support a child or teen with severe anxiety, OCD, or emotional outbursts, helping parents shift their responses to promote their child's independence and emotional regulation.",
  },
  {
    question: "Do you have experience treating self-harm and suicidal ideation?",
    answer:
      "Yes. Many clients and families feel overwhelmed when facing non-suicidal self-injury (NSSI) or chronic suicidal thoughts. As a clinician with extensive experience in high-acuity care, I provide a structured, non-judgmental environment. Using evidence-based practices like DBT and EMDR, we work together to understand the root of the pain, reduce harmful behaviors, and develop effective distress tolerance skills.",
  },
  {
    question: "Do you offer clinical supervision or consultation for other therapists?",
    answer:
      "Yes. I am a board-approved clinical supervisor offering Texas LPC Supervision and LMFT Supervision. In addition to working with associates, I provide DBT consultation, case conceptualization for complex family systems, and guest lecturing for group practices and clinical training programs.",
  },
].map((f) => ({ _key: key(), ...f }));

// ── Service cards: her focus areas, in her FAQ language ──────────────────────
const services = [
  {
    title: "DBT for BPD and emotional dysregulation",
    icon: "\u{1F33F}",
    description:
      "Dialectical Behavior Therapy for emotional dysregulation, impulsive behaviors, chaotic relationships, and Borderline Personality Disorder: a skills class, individual therapy with a diary card and skills practice, and phone coaching for help using skills in the moment.",
  },
  {
    title: "Self-harm and suicidal thoughts",
    icon: "\u{1F90D}",
    description:
      "A structured, non-judgmental place to work on non-suicidal self-injury (NSSI) and chronic suicidal thoughts. Using DBT and EMDR, we work to understand the root of the pain, reduce harmful behaviors, and build distress tolerance skills.",
  },
  {
    title: "Step-down care after hospitalization or an RTC",
    icon: "\u{1F331}",
    description:
      "Specialized step-down therapy for the critical transition home from a hospital, Residential Treatment Center, or IOP — for clients and their families — working alongside psychiatrists and treatment centers for a seamless continuum of care.",
  },
  {
    title: "Radically Open DBT (RO-DBT)",
    icon: "\u{1F343}",
    description:
      "For people who struggle with overcontrol, which can show up as treatment-resistant depression, severe perfectionism, or rigidity. At intake we'll determine whether standard DBT or RO-DBT fits your needs.",
  },
  {
    title: "Family therapy and high-conflict divorce",
    icon: "\u{1F3E1}",
    description:
      "Family systems therapy, co-parenting support using frameworks like New Ways for Families, court-involved work, blended-family transitions, and support for kids going through a divorce. Also SPACE, for parents of a child or teen with severe anxiety, OCD, or emotional outbursts.",
  },
  {
    title: "Clinical supervision and DBT consultation",
    icon: "\u{1F4DA}",
    description:
      "Board-approved Texas LPC and LMFT supervision for associates, plus DBT consultation, case conceptualization for complex family systems, and guest lecturing for group practices and clinical training programs.",
  },
].map((s) => ({ _key: key(), ...s }));

const patches = {
  siteSettings: {
    footerText:
      "Austin Therapy and Counseling PLLC · Nicole Lansbery, LPC-S, LMFT-S — Licensed Professional Counselor Supervisor and Licensed Marriage and Family Therapist Supervisor in Texas. The words here are for reflection, not a replacement for care. If you're in crisis, call or text 988 — someone is there, any hour.",
  },

  homePage: {
    heroSubhead:
      "DBT for BPD, emotional dysregulation, and self-harm — and family therapy for the people around them, including families navigating a high-conflict divorce. In person in Austin, and by telehealth anywhere in Texas.",
    aboutTeaserBody:
      "Most of my work is DBT with people who have often “failed” other treatments, and family systems work with the people who love them. I'm also a board-approved clinical supervisor, and I love teaching and training other clinicians.",
    showGoodFit: true,
    goodFitHeading: "Who I work with most.",
    goodFitIntro: "Therapy works best when the fit is right. These are the people I most love working with.",
    goodFitForLabel: "You might be a great fit if you're…",
    goodFitFor: [
      "Young, and just figured out you have BPD — often after other treatments have “failed”",
      "Dealing with behavioral dyscontrol, impulsive behaviors, or relationship chaos",
      "Ready to see real improvement, and haven't been able to figure out how",
      "Willing to commit to DBT: a skills class, weekly or biweekly individual therapy with a diary card and skills practice, phone coaching when you need it, and considering medication management",
    ],
    showFaq: true,
    faqHeading: "Questions people often ask.",
    faqs,
    seo: {
      title: "DBT Therapist in Austin, TX · Austin Therapy and Counseling",
      description:
        "DBT for BPD, emotional dysregulation, and self-harm, plus family therapy and high-conflict divorce support. In person in Austin; telehealth across Texas.",
    },
  },

  aboutPage: {
    intro:
      "I'm a Licensed Professional Counselor Supervisor and Licensed Marriage and Family Therapist Supervisor in Austin, Texas. I work with people struggling with emotional dysregulation, impulsive behaviors, and relationship chaos — often young adults with BPD who have “failed” other treatments — and with the families around them. My work draws on DBT, Radically Open DBT, family systems therapy, EMDR, and SPACE.",
    credentials: [
      "Licensed Professional Counselor Supervisor (LPC-S) — Texas",
      "Licensed Marriage and Family Therapist Supervisor (LMFT-S) — Texas",
      "Board-approved clinical supervisor for LPC and LMFT associates",
    ],
    seo: {
      title: "About Nicole Lansbery, LPC-S",
      description:
        "Board-approved clinical supervisor in Austin, TX, working with BPD, emotional dysregulation, and families through DBT, RO-DBT, EMDR, and SPACE.",
    },
  },

  servicesPage: {
    intro:
      "DBT, family therapy, and support for families in conflict — in person in Austin, and by telehealth anywhere in Texas.",
    services,
    seo: {
      title: "DBT & Family Therapy Services",
      description:
        "DBT for BPD and self-harm, step-down care after hospitalization, RO-DBT, family therapy, SPACE, co-parenting, and LPC/LMFT supervision in Austin.",
    },
  },

  contactPage: {
    intro:
      "Reaching out is a brave first step, and it can be a small one. Send a note below or call the office — you'll hear back from me personally. I'm licensed in Texas, so telehealth is available to anyone located in Texas.",
    hours: [
      { _key: key(), day: "Mon, Tue, Wed & Fri", time: "In person or telehealth" },
      { _key: key(), day: "Thursday", time: "Telehealth only" },
    ],
    seo: {
      title: "Contact & Book a Consultation",
      description:
        "Contact Austin Therapy and Counseling at 8400 N. Mopac Expy, Austin. In person Mon, Tue, Wed & Fri; telehealth across Texas Monday through Friday.",
    },
  },
};

for (const [id, fields] of Object.entries(patches)) {
  await client.patch(id).set(fields).commit();
  console.log(`   ✓ ${id} (${Object.keys(fields).length} fields)`);
}
const check = await client.fetch(`{
  "faqs": count(*[_id=="homePage"][0].faqs),
  "services": count(*[_id=="servicesPage"][0].services),
  "placeholders": count(*[_id in ["homePage","aboutPage","servicesPage","contactPage"] && pt::text(body) match "Replace" ]) 
}`);
console.log("\n", check);
