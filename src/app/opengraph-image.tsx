import { readFile } from "node:fs/promises";

import { ImageResponse } from "next/og";

import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/types";

/**
 * The social share card.
 *
 * The site already emitted `og:title` and `og:description`, so a shared link
 * previewed as a line of text with an empty space where the picture goes.
 * This route is the picture.
 *
 * Why the logo is composited onto a ground rather than used directly as the
 * `og:image`: her logo is a transparent PNG. Pointed at straight it renders
 * on whatever each platform puts behind transparency, which on LinkedIn and
 * iMessage in dark mode is near-black. Drawing it onto her own pale sage here
 * means the card looks the same everywhere.
 *
 * The logo box is fitted from the asset's real dimensions rather than given
 * fixed width and height, because her logo is a wide horizontal lockup
 * (almost 3:1) and the next client's will not be. Satori has no
 * `object-fit: contain` worth relying on, so the arithmetic is done here.
 */
export const alt = "Austin Therapy and Counseling";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The `sage` palette, which is `:root` in globals.css.
const BACKGROUND = "#fbfaf7";
const WASH = "#e8efeb";
const ACCENT = "#6b8e7f";
const MUTED = "#6b7280";
const FOREGROUND = "#1f2937";

const FALLBACK_NAME = "Austin Therapy and Counseling";

/**
 * The line under the logo. Deliberately NOT her `tagline` from Sanity: her
 * logo artwork already has "Brave. Bold. Balanced." set into it, so reading
 * the tagline printed it twice on one card and read as a bug. This says what
 * the practice actually does instead, which is the useful thing for someone
 * meeting it for the first time in a feed. Drawn from her own meta
 * description, so it stays consistent with what search results show.
 */
const CARD_LINE =
  "DBT, family therapy, and high-conflict divorce support in Austin";

/** The box the logo is fitted inside, centred. */
const LOGO_BOX = { width: 660, height: 300 };

type Branding = {
  practiceName: string;
  tagline: string;
  logo: { url: string; width: number; height: number } | null;
};

type SettingsShape = {
  practiceName?: string;
  logo?: SiteSettings["logo"];
  logoDimensions?: { width?: number; height?: number } | null;
};

/**
 * Revalidated hourly rather than read live: a scraper waiting on a Sanity
 * round trip is the slow path, and a slow card is a missing card. An hour is
 * close enough that a logo swapped in Studio appears without a deploy.
 */
async function loadBranding(): Promise<Branding> {
  const fallback: Branding = {
    practiceName: FALLBACK_NAME,
    tagline: CARD_LINE,
    logo: null,
  };

  if (!sanityClient) return fallback;

  try {
    const settings = await sanityClient.fetch<SettingsShape | null>(
      `*[_type == "siteSettings"][0]{
         practiceName,
         logo,
         "logoDimensions": logo.asset->metadata.dimensions
       }`,
      {},
      { next: { revalidate: 3600 } }
    );
    if (!settings) return fallback;

    const url =
      urlFor(settings.logo)?.width(1320).fit("max").format("png").url() ?? null;
    const w = settings.logoDimensions?.width;
    const h = settings.logoDimensions?.height;

    return {
      practiceName: settings.practiceName ?? FALLBACK_NAME,
      tagline: CARD_LINE,
      logo: url && w && h ? { url, width: w, height: h } : null,
    };
  } catch {
    // A card carrying her name beats a 500, which a scraper shows as the same
    // empty space this route exists to fill.
    return fallback;
  }
}

/** Largest size that fits the box without distorting the artwork. */
function fitInside(
  natural: { width: number; height: number },
  box: { width: number; height: number }
) {
  const scale = Math.min(box.width / natural.width, box.height / natural.height);
  return {
    width: Math.round(natural.width * scale),
    height: Math.round(natural.height * scale),
  };
}

export default async function OpengraphImage() {
  const [{ practiceName, tagline, logo }, display] = await Promise.all([
    loadBranding(),
    // Satori cannot use the webfonts `next/font` loads for the site, so the
    // display face is read from disk. `new URL(..., import.meta.url)` rather
    // than a `process.cwd()` join: it is the form Next's file tracing follows,
    // so the .ttf is actually bundled into the deployed function.
    readFile(new URL("./_og-fonts/CormorantGaramond-Medium.ttf", import.meta.url)),
  ]);

  const logoSize = logo ? fitInside(logo, LOGO_BOX) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 90px",
          backgroundColor: BACKGROUND,
          backgroundImage: `linear-gradient(170deg, ${BACKGROUND} 0%, ${WASH} 100%)`,
        }}
      >
        {logo && logoSize ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo.url}
            alt=""
            width={logoSize.width}
            height={logoSize.height}
          />
        ) : (
          <div
            style={{
              display: "flex",
              fontFamily: "Display",
              fontSize: 64,
              color: FOREGROUND,
              textAlign: "center",
            }}
          >
            {practiceName}
          </div>
        )}

        <div
          style={{
            width: 72,
            height: 2,
            marginTop: 40,
            backgroundColor: ACCENT,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "Display",
            fontSize: 30,
            letterSpacing: "0.01em",
            color: MUTED,
            textAlign: "center",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Display", data: display, style: "normal", weight: 500 },
      ],
    }
  );
}
