import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PostCard } from "@/components/PostCard";
import { CredentialsGrid } from "@/components/site/CredentialsGrid";
import { CtaBanner } from "@/components/site/CtaBanner";
import { FaqSection } from "@/components/site/FaqSection";
import { GoodFit } from "@/components/site/GoodFit";
import { LogisticsBand } from "@/components/site/LogisticsBand";
import { GroveHero } from "@/components/site/GroveHero";
import { StickyAbout } from "@/components/site/StickyAbout";
import { TestimonialRotator } from "@/components/site/TestimonialRotator";
import { WhatToExpect } from "@/components/site/WhatToExpect";
import {
  defaultAboutPage,
  defaultContactPage,
  defaultHomePage,
  defaultPosts,
  defaultServicesPage,
  defaultSiteSettings,
  defaultTestimonials,
} from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import {
  aboutPageQuery,
  allPostsQuery,
  contactPageQuery,
  featuredTestimonialsQuery,
  homePageQuery,
  servicesPageQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import type {
  AboutPage,
  ContactPage,
  HomePage,
  PostListItem,
  ServicesPage,
  SiteSettings,
  Testimonial,
} from "@/sanity/types";

async function getHome() {
  return safeFetch<HomePage>(homePageQuery, {}, defaultHomePage);
}

async function getRecentBlogPosts() {
  const posts = await safeFetch<PostListItem[]>(allPostsQuery, {}, defaultPosts);
  return posts.slice(0, 3);
}

async function getTestimonials() {
  return safeFetch<Testimonial[]>(
    featuredTestimonialsQuery,
    {},
    defaultTestimonials
  );
}

export default async function HomePageRoute() {
  // Grove's home is warm and relational: it composes settings, about, services,
  // and contact alongside the home doc. Everything resolves to defaults when
  // Sanity is unconfigured (Grove renders entirely from site-defaults for now).
  const [home, settings, about, services, contact, recentPosts, testimonials] =
    await Promise.all([
      getHome(),
      safeFetch<SiteSettings>(siteSettingsQuery, {}, defaultSiteSettings),
      safeFetch<AboutPage>(aboutPageQuery, {}, defaultAboutPage),
      safeFetch<ServicesPage>(servicesPageQuery, {}, defaultServicesPage),
      safeFetch<ContactPage>(contactPageQuery, {}, defaultContactPage),
      getRecentBlogPosts(),
      getTestimonials(),
    ]);

  return (
    <>
      <GroveHero home={home} settings={settings} />

      <CredentialsGrid about={about} services={services} />

      {home.showGoodFit !== false ? <GoodFit home={home} /> : null}

      <WhatToExpect
        heading={home.whatToExpectHeading}
        intro={home.whatToExpectIntro}
        steps={home.whatToExpectSteps}
      />

      <StickyAbout home={home} />

      <TestimonialRotator testimonials={testimonials} />

      <LogisticsBand home={home} contact={contact} />

      {home.showFaq !== false ? <FaqSection home={home} /> : null}

      <CtaBanner
        ctaLabel={home.primaryCta?.label ?? "Request an appointment"}
        ctaHref={home.primaryCta?.href ?? "/contact"}
      />

      {recentPosts.length > 0 ? (
        <section className="bg-[var(--color-background)] py-24 md:py-32">
          <Container>
            <div className="flex items-end justify-between">
              <Reveal>
                <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                  From the blog
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-[var(--color-accent-strong)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  All posts →
                </Link>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {recentPosts.map((post, i) => (
                <Reveal
                  key={post._id}
                  delay={0.1 + i * 0.1}
                  className="h-full"
                >
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
