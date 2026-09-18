import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // The *.vercel.app address is where the practice reviews the site before
  // launch, and it stays reachable afterwards. Keep it out of search results
  // so Google indexes only the real domain and never sees a half-finished
  // draft or a duplicate of the live site. Matching on the host means this
  // needs no switch at launch.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
