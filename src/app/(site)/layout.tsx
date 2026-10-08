import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PracticeStructuredData } from "@/components/PracticeStructuredData";
import { StickyCta } from "@/components/site/StickyCta";
import { defaultAnnouncement, defaultSiteSettings } from "@/lib/site-defaults";
import { hasPublishedPosts, safeFetch } from "@/sanity/client";
import { announcementQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Announcement, SiteSettings } from "@/sanity/types";

// Render every request fresh against Sanity so content edits in Studio
// (publish/edit/delete) reflect on the live site immediately. The therapist
// who owns this site should never need a developer to push an update.
export const dynamic = "force-dynamic";

async function getSiteSettings(): Promise<SiteSettings> {
  return safeFetch<SiteSettings>(siteSettingsQuery, {}, defaultSiteSettings);
}

async function getAnnouncement(): Promise<Announcement> {
  return safeFetch<Announcement>(announcementQuery, {}, defaultAnnouncement);
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetched here rather than in each component so the nav, the footer and the
  // page all agree within a single render.
  const [settings, announcement, showBlog] = await Promise.all([
    getSiteSettings(),
    getAnnouncement(),
    hasPublishedPosts(),
  ]);
  return (
    <>
      {/* No cursor-follow effect on Meridian — restraint IS the clinical
          signature. (Per Steven: retire the halo-on-every-site habit.) */}
      <PracticeStructuredData settings={settings} />
      <AnnouncementBar announcement={announcement} />
      <Header
        practiceName={settings.practiceName ?? "Therapy Practice"}
        logo={settings.logo}
        logoAspectRatio={settings.logoAspectRatio}
        ctaLabel={settings.stickyCta?.label}
        ctaHref={settings.stickyCta?.href}
        showBlog={showBlog}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} showBlog={showBlog} />
      <StickyCta
        label={settings.stickyCta?.label}
        href={settings.stickyCta?.href}
      />
    </>
  );
}
