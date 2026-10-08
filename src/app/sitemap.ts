import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { sanityClient } from "@/sanity/client";

/** XML sitemap — part of the SEO Setup add-on. Blog posts are listed as published. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
  if (!sanityClient) return pages;

  const posts = await sanityClient.fetch<{ slug: string; updated: string }[]>(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }`,
    {},
    // Fresh on every request, so a newly published post is listed right away.
    { cache: "no-store" },
  );
  // The index only earns a place once something is on it.
  if (posts.length === 0) return pages;
  return [
    ...pages,
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.5 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
