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
  if (!sanityClient) return fallback;
  try {
    const result = await sanityClient.fetch<T | null>(query, params);
    return result ?? fallback;
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallback:", error);
    return fallback;
  }
}
