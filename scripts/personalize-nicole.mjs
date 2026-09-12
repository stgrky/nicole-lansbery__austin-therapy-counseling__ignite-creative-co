/**
 * Replace the Grove demo persona with Austin Therapy and Counseling's real details.
 *
 * Rule this script follows, deliberately: every factual claim about Nicole is
 * either something verified from her own live site / intake call, or it is not
 * on the page at all. Nothing about a licensed clinician -- credentials, license
 * numbers, fees, specialties, career history, testimonials -- gets invented to
 * fill a slot. Where a section needs facts we don't have, the section is turned
 * OFF rather than filled with plausible-looking copy, and she switches it on in
 * her Studio once she's written it.
 *
 * Verified facts come from austintherapycounseling.com (scraped 2026-09-12) and
 * the intake call notes: practice name, her name and post-nominals, tagline,
 * phone, suite address, and the Trust & Safety paragraph, which is her own
 * writing and is carried over verbatim.
 *
 * Run: node --env-file=.env.local scripts/personalize-nicole.mjs
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
const key = () => `k${(k += 1)}`;

// A placeholder should say what belongs here and be impossible to mistake for
// finished copy when she looks at the preview.
const TODO = (what) => `[Replace this] ${what}`;

const EMAIL = "nicole@austintherapycounseling.com";
const PHONE = "(512) 960-9782";
const ADDRESS = "8400 N. Mopac Expy, Ste. 301, Austin, TX 78759";

/** Her own Trust & Safety copy, from her existing site. */
const trustAndSafety = [
  {
    _type: "block",
    _key: key(),
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: "Trust & Safety", marks: [] }],
  },
  {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: key(),
        marks: [],
        text:
          "Your privacy and safety are my top priorities. All sessions are confidential and protected by HIPAA regulations and professional ethical standards. I provide a judgment-free, inclusive space where you can be yourself without fear. My practice welcomes clients of all backgrounds, identities, and experiences.",
      },
    ],
  },
];

const patches = {
  siteSettings: {
    practiceName: "Austin Therapy and Counseling",
    tagline: "Brave. Bold. Balanced.",
    email: EMAIL,
    phone: PHONE,
    addressLine: ADDRESS,
    footerText:
      "Nicole Lansbery, LPC-S, LMFT-S — Licensed Professional Counselor Supervisor and Licensed Marriage and Family Therapist Supervisor in Texas. The words here are for reflection, not a replacement for care. If you're in crisis, call or text 988 — someone is there, any hour.",
  },

  homePage: {
    heroEyebrow: "Nicole Lansbery, LPC-S, LMFT-S · Austin, Texas",
    heroHeading: "Brave. Bold. Balanced.",
    heroSubhead: TODO(
      "a short welcome, two or three sentences — who you work with, and what it's like to sit with you.",
    ),
    // The demo hero image is a stock portrait captioned as the therapist. It
    // cannot stand in for Nicole even temporarily. The hero hides the image
    // slot entirely when this is unset.
    heroImage: null,
    secondaryCta: { label: "Meet Nicole", href: "/about" },
    // Generalised: the demo promised a free 20-minute call, which is a specific
    // offer we have not confirmed she makes.
    whatToExpectSteps: [
      {
        _key: key(),
        icon: "1",
        title: "Say hello.",
        body: "Send a note through the contact form or call the office. Tell me as much or as little as you like — there's nothing you need to have figured out first.",
      },
      {
        _key: key(),
        icon: "2",
        title: "A first session that breathes.",
        body: "We spend the first session getting to know each other. You set the pace. If we're not the right fit, I'll gladly point you toward someone who is.",
      },
      {
        _key: key(),
        icon: "3",
        title: "Steady support, your pace.",
        body: "From there we find a rhythm that works for you — some seasons are about untangling something specific, others are about having a steady place to think out loud.",
      },
    ],
    aboutTeaserHeading: "Hi, I'm Nicole.",
    aboutTeaserBody: TODO(
      "a short paragraph about your background and how you work. This is the teaser on the home page — the fuller version lives on the About page.",
    ),
    // Fees, insurance and sliding-scale terms are hers to state. Left blank
    // rather than guessed; fill them in and the section fills itself.
    sessionFee: "",
    insuranceNote: "",
    slidingScaleNote: "",
    pricingIntro: TODO("your fees and payment details, stated plainly."),
    showGoodFit: false,
    showPracticeFacts: false,
  },

  aboutPage: {
    heading: "Meet Nicole",
    intro: TODO(
      "your introduction — who you are, who you work with, and how you approach the work. A paragraph or two.",
    ),
    portrait: null,
    body: trustAndSafety,
    // Only the two credentials her own site states. Everything else -- degrees,
    // license numbers, certifications, training -- is hers to add.
    credentials: [
      "Licensed Professional Counselor Supervisor (LPC-S) — Texas",
      "Licensed Marriage and Family Therapist Supervisor (LMFT-S) — Texas",
    ],
    // Both sections make claims about how she practises and where she trained.
    // Off until she writes them.
    showPrinciples: false,
    showTimeline: false,
  },

  servicesPage: {
    intro: TODO(
      "a sentence or two about the kind of work you do and who you see.",
    ),
    services: [
      {
        _key: key(),
        title: TODO("a focus area"),
        description: TODO("what this looks like in your work and who it helps."),
        icon: "\u{1F33F}",
      },
      {
        _key: key(),
        title: TODO("a focus area"),
        description: TODO("what this looks like in your work and who it helps."),
        icon: "\u{1F343}",
      },
      {
        _key: key(),
        title: TODO("a focus area"),
        description: TODO("what this looks like in your work and who it helps."),
        icon: "\u{1F90D}",
      },
    ],
    treatmentArc: [
      {
        _key: key(),
        title: "A first conversation",
        detail: "by phone or email",
        body: "A chance to hear what's bringing you in and see whether we feel like a fit — both ways.",
      },
      {
        _key: key(),
        title: "Settling in",
        detail: "first few sessions",
        body: "We get to know each other and map what's going on and what you're hoping for.",
      },
      {
        _key: key(),
        title: "The steady middle",
        detail: "ongoing",
        body: "The real work — untangling, practising, and having a reliable place to land.",
      },
      {
        _key: key(),
        title: "Whenever you're ready",
        detail: "no fixed end",
        body: "We taper off when you feel steadier, with the door open if you'd like to come back.",
      },
    ],
    showFees: false,
    feesNote: "",
  },

  contactPage: {
    email: EMAIL,
    phone: PHONE,
    addressLine: ADDRESS,
    intro:
      "Reaching out is a brave first step, and it can be a small one. Send a note below or call the office — you'll hear back from me personally.",
    // Her site publishes no hours. The card hides itself when this is empty.
    hours: [],
    nextSteps: [
      {
        _key: key(),
        when: "First",
        title: "A personal reply",
        body: "You hear back from me — a real note, not an autoresponder.",
      },
      {
        _key: key(),
        when: "Then",
        title: "A first conversation",
        body: "We talk through what's bringing you in, any questions you have, and whether we feel like a good fit.",
      },
      {
        _key: key(),
        when: "If it feels right",
        title: "Your first session",
        body: "I'll send intake paperwork ahead of time through a secure portal.",
      },
    ],
  },
};

/** Fabricated content that must never appear under a real clinician's name. */
const DELETE_IDS = [
  "default-1", "default-2", "default-3",            // invented testimonials
  "demo-post-1", "demo-post-2", "demo-post-3",      // invented clinical articles
  "demo-post-4", "demo-post-5",
  "demo-author",                                    // "Nora Bennett, LCSW"
];

async function run() {
  console.log(`→ Personalising ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`);

  for (const [id, fields] of Object.entries(patches)) {
    const unset = Object.entries(fields)
      .filter(([, v]) => v === null)
      .map(([f]) => f);
    const set = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== null),
    );
    let tx = client.patch(id).set(set);
    if (unset.length) tx = tx.unset(unset);
    await tx.commit();
    console.log(
      `   ✓ ${id} (${Object.keys(set).length} set${unset.length ? `, ${unset.length} cleared` : ""})`,
    );
  }

  console.log("");
  const tx = client.transaction();
  DELETE_IDS.forEach((id) => tx.delete(id));
  await tx.commit();
  console.log(`   ✗ deleted ${DELETE_IDS.length} demo-persona documents`);

  const left = await client.fetch(
    `*[_type in ["post","testimonial","author"]]{_id}`,
  );
  console.log(
    left.length
      ? `\n⚠ ${left.length} persona doc(s) still present: ${left.map((d) => d._id).join(", ")}`
      : "\n✓ No demo posts, testimonials, or authors remain.",
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
