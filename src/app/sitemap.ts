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
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.5 },
  ];
  if (!sanityClient) return pages;

  const posts = await sanityClient.fetch<{ slug: string; updated: string }[]>(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }`,
    {},
    // Fresh on every request, so a newly published post is listed right away.
    { cache: "no-store" },
  );
  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
