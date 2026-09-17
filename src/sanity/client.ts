import { createClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

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
  const result = await sanityClient.fetch<T | null>(query, params);
  if (result !== null) return result;

  // A caller that passes null is saying "nothing" is a valid answer — e.g. a
  // blog post that doesn't exist, which then 404s. Any other null means a
  // document the page depends on is missing, and that must not fall back to
  // the persona either.
  if (fallback === null) return fallback;
  throw new Error(`[sanity] expected a document and got none: ${query.slice(0, 80)}`);
}
