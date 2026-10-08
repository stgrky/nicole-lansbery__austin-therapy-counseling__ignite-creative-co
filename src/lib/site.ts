/**
 * The practice's real address on the web. Canonical URLs, the sitemap, and
 * structured data all point here — including while the site is still being
 * reviewed on its *.vercel.app preview, which is kept out of search results
 * (see next.config.ts) so Google only ever indexes the real domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://austintherapycounseling.com").replace(/\/$/, "");

/**
 * True only on the production deployment.
 *
 * Preview builds are served from *.vercel.app with the same content and the
 * same robots rules as the real site, so without this a half-finished preview
 * can be crawled and indexed, and then compete with the live domain for the
 * practice's own name. Vercel sets VERCEL_ENV to "production", "preview" or
 * "development"; it is absent on a plain local build, which is also not
 * production.
 */
export const IS_PRODUCTION_DEPLOYMENT = process.env.VERCEL_ENV === "production";
