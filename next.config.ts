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
  // www and the bare domain would otherwise serve the same site at two
  // addresses, which splits Google's view of it. Her canonical is the bare
  // domain (see SITE_URL), so www redirects to it.
  //
  // The host pattern is ANCHORED (^...$) on purpose. Unanchored, the bare
  // domain also matches "www.austintherapycounseling.com" as a substring and
  // redirects to itself forever. That exact bug was hit on a sister repo.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "^www\\.austintherapycounseling\\.com$" }],
        destination: "https://austintherapycounseling.com/:path*",
        permanent: true,
      },
    ];
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
