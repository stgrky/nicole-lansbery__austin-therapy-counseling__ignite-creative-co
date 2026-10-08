import { createClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";
import { publishedPostCountQuery } from "./queries";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  // Demo mode: no Sanity project, so the template's persona content renders.
  if (!sanityClient) return fallback;

  // On a connected site the fallback IS the demo persona — another therapist's
  // name, license number, fees, and bio. It must never render under a client's
  // practice name, so a failed request is allowed to throw (an error page is
  // honest; someone else's credentials are not).
  // Never let Next save a Sanity answer into its fetch cache. Studio edits
  // must show up immediately, and a cached answer outlives the content it
  // describes: a build run before content was seeded cached "no site settings"
  // for a year, and every later build read that instead of asking Sanity.
  const result = await sanityClient.fetch<T | null>(query, params, { cache: "no-store" });
  if (result !== null) return result;

  // A caller that passes null is saying "nothing" is a valid answer — e.g. a
  // blog post that doesn't exist, which then 404s. Any other null means a
  // document the page depends on is missing, and that must not fall back to
  // the persona either.
  if (fallback === null) return fallback;
  throw new Error(`[sanity] expected a document and got none: ${query.slice(0, 80)}`);
}

/**
 * True when the practice has at least one published post.
 *
 * Returns false rather than throwing if Sanity is unreachable: a blog link
 * that leads to an empty page is a worse failure than a blog that is briefly
 * hidden, and this runs on every page render.
 */
export async function hasPublishedPosts(): Promise<boolean> {
  if (!sanityClient) return false;
  try {
    const count = await sanityClient.fetch<number>(
      publishedPostCountQuery,
      {},
      { cache: "no-store" },
    );
    return (count ?? 0) > 0;
  } catch {
    return false;
  }
}
