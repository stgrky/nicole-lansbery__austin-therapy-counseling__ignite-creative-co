/**
 * Blog set-up for Nicole, and the address the site displays.
 *
 * - Displayed email → admin@ (her intake says inquiries go there; the site
 *   showed nicole@, so direct emails and form inquiries hit different inboxes).
 * - An author record for her, so she can publish under her own name.
 * - Categories swapped from the demo persona's topics to her focus areas.
 * - ONE sample post, so she can see the blog working. It is written by ICC,
 *   says so in its first line, and is about how to use the blog — not clinical
 *   content under her name. She edits it into a real post or deletes it
 *   before launch (flagged in CLIENTS.md so it can't slip through).
 *
 * Run: node --env-file=.env.local scripts/blog-sample-nicole.mjs
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
const key = () => `b${(k += 1)}`;
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const block = (style, ...children) => ({ _type: "block", _key: key(), style, markDefs: [], children });
const p = (...children) => block("normal", ...children.map((c) => (typeof c === "string" ? span(c) : c)));
const li = (text) => ({ ...block("normal", span(text)), listItem: "bullet", level: 1 });

const categories = [
  { _id: "cat-dbt", title: "DBT & emotion regulation", slug: "dbt" },
  { _id: "cat-families", title: "Families & parenting", slug: "families" },
  { _id: "cat-divorce", title: "Divorce & co-parenting", slug: "divorce" },
  { _id: "cat-clinicians", title: "For clinicians", slug: "for-clinicians" },
];

const body = [
  p(span("This is a sample post, written by Ignite Creative Co", ["strong"]), " so you can see how your blog looks before you write anything. Edit it into your first real post, or delete it before your site goes live."),
  block("h2", span("Writing a post")),
  p("In your editor, open ", span("Posts", ["strong"]), " and create a new one. Every post needs a title, a short excerpt, and a cover image. The excerpt shows on your blog page and often in Google results, so write it for someone deciding whether to click."),
  p("While you write, you can use:"),
  li("Headings, like the one above, to break a longer post into sections"),
  li("Bold and italic text"),
  li("Bulleted and numbered lists, like this one"),
  li("Quotes, for a key idea you want to stand out"),
  li("Images between paragraphs"),
  block("blockquote", span("A quote or a key idea looks like this. Use it sparingly, and it will stand out.")),
  block("h2", span("Ideas to start with")),
  p("Your intake answers already hold a few posts. Each of these grew from a question people ask you:"),
  li("Coming home from an RTC: what the first months can look like for a family"),
  li("DBT or RO-DBT? How to tell which one fits"),
  li("What SPACE asks of parents, and why it works with the parents first"),
  li("What to expect from DBT skills class"),
  block("h2", span("Publishing")),
  p("When a post is ready, click ", span("Publish", ["strong"]), ". It appears on your blog within seconds, and your newest posts also show on your home page. Posts help people find you on Google, and one thoughtful post a month is plenty."),
];

async function run() {
  const tx = client.transaction();

  // Displayed address: one inbox for everything.
  tx.patch("siteSettings", (patch) => patch.set({ email: "admin@austintherapycounseling.com" }));
  tx.patch("contactPage", (patch) => patch.set({ email: "admin@austintherapycounseling.com" }));

  // Her author record (her real name and post-nominals).
  tx.createOrReplace({
    _id: "author-nicole-lansbery",
    _type: "author",
    name: "Nicole Lansbery",
    slug: { _type: "slug", current: "nicole-lansbery" },
    credentials: "LPC-S, LMFT-S",
    isLicensedClinician: true,
    isGuestContributor: false,
  });

  // Categories: demo persona topics out, her focus areas in.
  for (const id of ["demo-cat-anxiety", "demo-cat-finding-a-therapist", "demo-cat-getting-started", "demo-cat-self-worth", "demo-cat-transitions"]) tx.delete(id);
  for (const c of categories) tx.createOrReplace({ _id: c._id, _type: "category", title: c.title, slug: { _type: "slug", current: c.slug } });

  tx.createOrReplace({
    _id: "sample-post",
    _type: "post",
    title: "Sample post: how your blog works",
    slug: { _type: "slug", current: "sample-post" },
    author: { _type: "reference", _ref: "author-nicole-lansbery" },
    publishedAt: new Date().toISOString(),
    excerpt: "A sample so you can see how posts look on your site. Edit it into your first real post, or delete it before launch.",
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-a9f2d92b76283bb5b007fa045a144fd3fc8ff81d-1600x960-jpg" },
      alt: "Sample cover image. Replace it with your own.",
    },
    body,
  });

  await tx.commit();
  const check = await client.fetch(`{
    "email": *[_id=="siteSettings"][0].email,
    "contactEmail": *[_id=="contactPage"][0].email,
    "author": *[_id=="author-nicole-lansbery"][0].name,
    "categories": *[_type=="category"].title,
    "post": *[_id=="sample-post"][0]{title, "slug": slug.current, "author": author->name}
  }`);
  console.log(JSON.stringify(check, null, 1));
}
run().catch((e) => { console.error(e.message); process.exit(1); });
