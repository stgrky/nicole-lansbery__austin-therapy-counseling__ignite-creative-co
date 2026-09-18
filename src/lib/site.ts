/**
 * The practice's real address on the web. Canonical URLs, the sitemap, and
 * structured data all point here — including while the site is still being
 * reviewed on its *.vercel.app preview, which is kept out of search results
 * (see next.config.ts) so Google only ever indexes the real domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://austintherapycounseling.com").replace(/\/$/, "");
