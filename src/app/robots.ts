import type { MetadataRoute } from "next";

import { IS_PRODUCTION_DEPLOYMENT, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A preview is the same site under a different name. Crawling one indexes an
  // unfinished copy that then competes with the real domain.
  if (!IS_PRODUCTION_DEPLOYMENT) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
