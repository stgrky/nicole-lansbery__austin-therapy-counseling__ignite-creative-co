"use client";

import dynamic from "next/dynamic";

import { isSanityConfigured } from "@/sanity/env";

const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        color: "#6b7280",
      }}
    >
      Loading Studio…
    </div>
  ),
});

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "3rem",
          maxWidth: 640,
          margin: "0 auto",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
          Sanity Studio is not configured yet
        </h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> in your <code>.env.local</code>,
          then restart <code>npm run dev</code>.
        </p>
      </main>
    );
  }

  return <Studio />;
}
