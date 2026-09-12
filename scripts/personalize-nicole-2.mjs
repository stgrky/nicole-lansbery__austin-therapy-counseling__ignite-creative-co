/**
 * Second personalisation pass: content that renders but does not show up in a
 * naive innerText scan.
 *
 * Grove's home page ships an FAQ section switched ON, and its demo answers
 * state a practice's insurance policy, office location, and confidentiality
 * practices. Those are claims about how Nicole runs her practice, and none of
 * them were verified -- they cannot ship under her name. They also sat inside
 * collapsed <details> elements, so they were invisible to a rendered-text check
 * and only surfaced when reading the raw HTML.
 *
 * The section is also emitting FAQPage structured data, and FAQ is an SEO Setup
 * add-on deliverable rather than a standard template feature. So it goes off
 * here by default; if Nicole bought SEO Setup it gets switched back on and
 * populated from her own answers.
 *
 * Run: node --env-file=.env.local scripts/personalize-nicole-2.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-09-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

await client
  .patch("homePage")
  .set({ showFaq: false })
  // Emptied rather than left hidden: a hidden field is still fetched, still
  // shipped in the page payload, and one toggle away from being published.
  .unset(["faqs", "faqHeading", "faqIntro", "practiceFacts", "goodFitFor", "goodFitReferOut"])
  .commit();

console.log("✓ homePage: FAQ off, persona FAQ/practice-facts/good-fit content cleared");

const html = await client.fetch(`*[_id == "homePage"][0]`);
const blob = JSON.stringify(html);
const leaks = ["Nora", "Bennett", "Portland", "Oregon", "LCSW", "L-9042"].filter((s) =>
  blob.includes(s),
);
console.log(
  leaks.length ? `⚠ still present in homePage: ${leaks.join(", ")}` : "✓ homePage document is persona-free",
);
