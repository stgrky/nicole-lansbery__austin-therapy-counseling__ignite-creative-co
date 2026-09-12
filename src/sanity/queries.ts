import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  practiceName,
  tagline,
  palette,
  fontPairing,
  logo,
  favicon,
  email,
  phone,
  addressLine,
  socialLinks,
  footerText,
  stickyCta
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroEyebrow,
  heroHeading,
  heroSubhead,
  heroImage,
  primaryCta,
  secondaryCta,
  whatToExpectHeading,
  whatToExpectIntro,
  whatToExpectSteps,
  aboutTeaserHeading,
  aboutTeaserBody,
  aboutTeaserImage,
  pricingHeading,
  pricingIntro,
  sessionFee,
  insuranceNote,
  slidingScaleNote,
  showPracticeFacts,
  practiceFacts,
  showGoodFit,
  goodFitHeading,
  goodFitIntro,
  goodFitForLabel,
  goodFitFor,
  goodFitReferLabel,
  goodFitReferOut,
  showFaq,
  faqHeading,
  faqIntro,
  faqs
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial"] | order(coalesce(displayOrder, 9999) asc, _createdAt desc)[0...5]{
  _id,
  quote,
  attribution,
  context,
  displayOrder
}`;

export const announcementQuery = groq`*[_type == "announcement"][0]{
  _id,
  _updatedAt,
  enabled,
  message,
  linkLabel,
  linkHref,
  variant,
  startDate,
  endDate
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heading,
  intro,
  body,
  portrait,
  credentials,
  credentialBadges,
  showPrinciples,
  principlesHeading,
  principles,
  showTimeline,
  timelineHeading,
  timeline
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  heading,
  intro,
  services[]{
    title,
    description,
    icon
  },
  showTreatmentArc,
  treatmentArcHeading,
  treatmentArcIntro,
  treatmentArc,
  showFees,
  feesHeading,
  fees,
  feesNote
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heading,
  intro,
  email,
  phone,
  addressLine,
  schedulingUrl,
  hours,
  showNextSteps,
  nextStepsHeading,
  nextSteps,
  crisisNote
}`;

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  publishedAt,
  author->{
    _id,
    name,
    photo,
    isGuestContributor
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

export const blogIndexQuery = groq`{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    author->{
      _id,
      name,
      photo,
      isGuestContributor
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  },
  "total": count(*[_type == "post" && defined(slug.current)])
}`;

export const recentPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage,
  publishedAt
}`;

export const similarPostsQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  slug.current != $slug &&
  count(categories[@._ref in $categoryIds]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage,
  publishedAt
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  publishedAt,
  updatedAt,
  body,
  author->{
    _id,
    name,
    photo,
    bio,
    credentials,
    isGuestContributor,
    isLicensedClinician
  },
  clinicalReviewer->{
    _id,
    name,
    credentials,
    isLicensedClinician
  },
  editor->{
    _id,
    name,
    credentials,
    isLicensedClinician
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

