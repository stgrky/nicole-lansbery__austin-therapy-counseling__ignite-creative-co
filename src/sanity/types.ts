import type { PortableTextBlock } from "@portabletext/react";
import type { Image as SanityImage, Slug } from "sanity";

export type SanityImageWithAlt = SanityImage & {
  alt?: string;
  caption?: string;
  // Demo-mode escape hatch: defaults can point at a plain URL so image
  // slots render without a Sanity backend. Ignored once real assets exist.
  demoUrl?: string;
};

export type PaletteName =
  | "sage"
  | "navy"
  | "terracotta"
  | "lavender"
  | "teal";

export type FontPairingName =
  | "cormorant"
  | "libre-franklin"
  | "fraunces"
  | "marcellus"
  | "plus-jakarta";

export interface SiteSettings {
  practiceName?: string;
  tagline?: string;
  palette?: PaletteName;
  fontPairing?: FontPairingName;
  logo?: SanityImageWithAlt;
  favicon?: SanityImageWithAlt;
  email?: string;
  phone?: string;
  addressLine?: string;
  socialLinks?: { label?: string; url?: string }[];
  footerText?: string;
  stickyCta?: { label?: string; href?: string };
}

export interface WhatToExpectStep {
  title?: string;
  body?: string;
  icon?: string;
}

export interface SeoFields {
  title?: string;
  description?: string;
}

export interface HomePage {
  seo?: SeoFields;
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubhead?: string;
  heroImage?: SanityImageWithAlt;
  primaryCta?: { label?: string; href?: string };
  secondaryCta?: { label?: string; href?: string };
  whatToExpectHeading?: string;
  whatToExpectIntro?: string;
  whatToExpectSteps?: WhatToExpectStep[];
  aboutTeaserHeading?: string;
  aboutTeaserBody?: string;
  aboutTeaserImage?: SanityImageWithAlt;
  pricingHeading?: string;
  pricingIntro?: string;
  sessionFee?: string;
  insuranceNote?: string;
  slidingScaleNote?: string;
  // Practice-facts panel
  showPracticeFacts?: boolean;
  practiceFacts?: { label?: string; value?: string }[];
  // Good-fit section
  showGoodFit?: boolean;
  goodFitHeading?: string;
  goodFitIntro?: string;
  goodFitForLabel?: string;
  goodFitFor?: string[];
  goodFitReferLabel?: string;
  goodFitReferOut?: string[];
  // FAQ
  showFaq?: boolean;
  faqHeading?: string;
  faqIntro?: string;
  faqs?: { question?: string; answer?: string }[];
}

export interface Testimonial {
  _id: string;
  quote?: string;
  attribution?: string;
  context?: string;
  displayOrder?: number;
}

export type AnnouncementVariant = "info" | "accent" | "urgent";

export interface Announcement {
  _id?: string;
  _updatedAt?: string;
  enabled?: boolean;
  message?: string;
  linkLabel?: string;
  linkHref?: string;
  variant?: AnnouncementVariant;
  startDate?: string;
  endDate?: string;
}

export interface AboutPage {
  seo?: SeoFields;
  heading?: string;
  intro?: string;
  body?: PortableTextBlock[];
  portrait?: SanityImageWithAlt;
  credentials?: string[];
  credentialBadges?: SanityImageWithAlt[];
  showPrinciples?: boolean;
  principlesHeading?: string;
  principles?: { title?: string; body?: string }[];
  showTimeline?: boolean;
  timelineHeading?: string;
  timeline?: { period?: string; title?: string; body?: string }[];
}

export interface ServiceItem {
  title?: string;
  description?: string;
  icon?: string;
}

export interface ServicesPage {
  seo?: SeoFields;
  heading?: string;
  intro?: string;
  services?: ServiceItem[];
  showTreatmentArc?: boolean;
  treatmentArcHeading?: string;
  treatmentArcIntro?: string;
  treatmentArc?: { title?: string; detail?: string; body?: string }[];
  showFees?: boolean;
  feesHeading?: string;
  fees?: { item?: string; detail?: string; price?: string }[];
  feesNote?: string;
}

export interface ContactPage {
  seo?: SeoFields;
  heading?: string;
  intro?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  schedulingUrl?: string;
  hours?: { day?: string; time?: string }[];
  showNextSteps?: boolean;
  nextStepsHeading?: string;
  nextSteps?: { when?: string; title?: string; body?: string }[];
  crisisNote?: string;
}

export interface AuthorRef {
  _id: string;
  name?: string;
  photo?: SanityImageWithAlt;
  bio?: PortableTextBlock[];
  credentials?: string;
  isGuestContributor?: boolean;
  isLicensedClinician?: boolean;
}

export interface CategoryRef {
  _id: string;
  title?: string;
  slug?: string;
}

export interface PostListItem {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  featuredImage?: SanityImageWithAlt;
  publishedAt?: string;
  author?: {
    _id: string;
    name?: string;
    photo?: SanityImageWithAlt;
    isGuestContributor?: boolean;
  };
  categories?: CategoryRef[];
}

export interface ReviewerRef {
  _id: string;
  name?: string;
  credentials?: string;
  isLicensedClinician?: boolean;
}

export interface PostDetail extends PostListItem {
  body?: PortableTextBlock[];
  author?: AuthorRef;
  updatedAt?: string;
  clinicalReviewer?: ReviewerRef;
  editor?: ReviewerRef;
}

export interface BlogIndexResult {
  posts: PostListItem[];
  total: number;
}

export interface RecentPost {
  _id: string;
  title?: string;
  slug?: string;
  featuredImage?: SanityImageWithAlt;
  publishedAt?: string;
}

export type SlugRef = Slug;
