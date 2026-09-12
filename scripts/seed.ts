/**
 * Seed a Sanity project from this template's defaults.
 *
 * Reusable across every ICC template: it reads src/lib/site-defaults.ts +
 * src/lib/demo-posts.ts, uploads every `demoUrl` image to Sanity as a real
 * asset, adds the `_key`s Sanity requires on array-of-object items, and
 * createOrReplace's all documents (settings, pages, testimonials, author,
 * categories, posts). Idempotent — safe to re-run.
 *
 * Run:  node --env-file=.env.local --import tsx scripts/seed.ts
 */
import { createClient } from "@sanity/client";

import { demoPosts } from "../src/lib/demo-posts";
import {
  defaultAboutPage,
  defaultAnnouncement,
  defaultContactPage,
  defaultHomePage,
  defaultServicesPage,
  defaultSiteSettings,
  defaultTestimonials,
} from "../src/lib/site-defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-09-01",
  token,
  useCdn: false,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let keyCounter = 0;
const nextKey = () => `k${(keyCounter += 1)}`;

// demoUrl → uploaded asset _id
const assetCache = new Map<string, string>();

async function uploadImage(url: string, alt?: string) {
  let ref = assetCache.get(url);
  if (!ref) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = (url.split("/").pop() || "image").split("?")[0] + ".jpg";
    const asset = await client.assets.upload("image", buf, { filename });
    ref = asset._id;
    assetCache.set(url, ref);
    console.log(`   ↑ uploaded ${filename} → ${ref}`);
  }
  return {
    _type: "image",
    asset: { _type: "reference", _ref: ref },
    alt: alt ?? "",
  };
}

/**
 * Recursively: turn any `{ demoUrl, alt }` into an uploaded Sanity image, and
 * give every object that sits inside an array a stable `_key`.
 */
async function walk(node: unknown): Promise<unknown> {
  if (Array.isArray(node)) {
    const out: unknown[] = [];
    for (const item of node) {
      const t = await walk(item);
      if (t && typeof t === "object" && !Array.isArray(t)) {
        const obj = t as Record<string, unknown>;
        if (!obj._key) obj._key = nextKey();
      }
      out.push(t);
    }
    return out;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (typeof obj.demoUrl === "string") {
      return uploadImage(obj.demoUrl, obj.alt as string | undefined);
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = await walk(v);
    return out;
  }
  return node;
}

async function main() {
  console.log(`→ Seeding ${projectId}/${dataset}`);

  // ── Singletons ──
  const singletons: [string, unknown][] = [
    ["siteSettings", defaultSiteSettings],
    ["homePage", defaultHomePage],
    ["aboutPage", defaultAboutPage],
    ["servicesPage", defaultServicesPage],
    ["contactPage", defaultContactPage],
    ["announcement", defaultAnnouncement],
  ];
  for (const [type, doc] of singletons) {
    const body = (await walk(doc)) as Record<string, unknown>;
    await client.createOrReplace({ _id: type, _type: type, ...body });
    console.log(`   ✓ ${type}`);
  }

  // ── Testimonials ──
  for (const t of defaultTestimonials) {
    await client.createOrReplace({ ...t, _type: "testimonial" });
  }
  console.log(`   ✓ ${defaultTestimonials.length} testimonials`);

  // ── Author (single demo author across posts) ──
  const a = demoPosts[0].author;
  if (a) {
    const photo = (a as { photo?: { demoUrl: string; alt?: string } }).photo;
    await client.createOrReplace({
      _id: "demo-author",
      _type: "author",
      name: a.name,
      slug: { _type: "slug", current: slugify(a.name ?? "author") },
      credentials: (a as { credentials?: string }).credentials,
      bio: (a as { bio?: unknown }).bio,
      photo: photo ? await uploadImage(photo.demoUrl, photo.alt) : undefined,
      isLicensedClinician: true,
    });
    console.log(`   ✓ author ${a.name}`);
  }

  // ── Categories (unique across posts) ──
  const catBySafeId = new Map<string, { title?: string; slug: string }>();
  for (const p of demoPosts) {
    for (const c of p.categories ?? []) {
      const slug = c.slug ?? slugify(c.title ?? "category");
      const safeId = `demo-cat-${slug}`;
      if (!catBySafeId.has(safeId)) {
        catBySafeId.set(safeId, { title: c.title, slug });
        await client.createOrReplace({
          _id: safeId,
          _type: "category",
          title: c.title,
          slug: { _type: "slug", current: slug },
        });
      }
    }
  }
  console.log(`   ✓ ${catBySafeId.size} categories`);

  // ── Posts ──
  for (const p of demoPosts) {
    const fi = (p as { featuredImage?: { demoUrl: string; alt?: string } })
      .featuredImage;
    await client.createOrReplace({
      _id: p._id,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      publishedAt: p.publishedAt ? `${p.publishedAt}T09:00:00Z` : undefined,
      body: p.body,
      author: { _type: "reference", _ref: "demo-author" },
      featuredImage: fi ? await uploadImage(fi.demoUrl, fi.alt) : undefined,
      categories: (p.categories ?? []).map((c) => ({
        _type: "reference",
        _ref: `demo-cat-${c.slug ?? slugify(c.title ?? "category")}`,
        _key: nextKey(),
      })),
    });
  }
  console.log(`   ✓ ${demoPosts.length} posts`);

  console.log("✓ Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
