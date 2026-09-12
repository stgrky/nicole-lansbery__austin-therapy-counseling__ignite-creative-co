import type {
  AboutPage,
  Announcement,
  ContactPage,
  HomePage,
  PostListItem,
  RecentPost,
  ServicesPage,
  SiteSettings,
  Testimonial,
} from "@/sanity/types";

/**
 * GROVE — Warm & Relational.
 * Demo persona: Nora Bennett, LCSW (fictional). Gentle, human, unhurried — the
 * warm origin the other four templates deliberately diverged from. Sage palette
 * + Cormorant serif. The voice signals safety and companionship where Meridian
 * signals clinical rigor.
 */

export const defaultSiteSettings: SiteSettings = {
  practiceName: "Nora Bennett, LCSW",
  tagline: "Warm, relational therapy in Portland & online.",
  palette: "sage",
  fontPairing: "cormorant",
  email: "hello@example.com",
  phone: "(503) 555-0164",
  addressLine: "1820 SE Hawthorne Blvd, Suite 4, Portland, OR",
  socialLinks: [],
  footerText:
    "Licensed Clinical Social Worker (OR #L-9042). The words here are for reflection, not a replacement for care. If you're in crisis, call or text 988 — someone is there, any hour.",
  stickyCta: { label: "Book a consultation", href: "/contact" },
};

export const defaultHomePage: HomePage = {
  heroEyebrow: "Welcoming new clients · In person & online in Oregon",
  heroHeading: "A gentle place to feel like yourself again.",
  heroSubhead:
    "I'm Nora — a therapist for the tender, tangled, in-between parts of being human. Together we'll make room for what feels heavy and find your footing at a pace that stays kind. In person in Portland, and online anywhere in Oregon.",
  heroImage: {
    demoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=760&h=900&fit=crop&q=80",
    alt: "Nora Bennett, LCSW",
  },
  primaryCta: { label: "Book a free consultation", href: "/contact" },
  secondaryCta: { label: "Meet Nora", href: "/about" },
  whatToExpectHeading: "Starting is the hardest part. Here's how gentle it can be.",
  whatToExpectIntro:
    "No forms to decode, no leap of faith required. Reaching out can be small and low-stakes — we go one step at a time.",
  whatToExpectSteps: [
    {
      icon: "1",
      title: "Say hello.",
      body:
        "Send a note or book a free 20-minute call. Tell me as much or as little as you like — there's no script, and nothing you need to have figured out first.",
    },
    {
      icon: "2",
      title: "A first session that breathes.",
      body:
        "We spend the first session getting to know each other. You set the pace; I'll ask gentle questions and mostly listen. If we're not the right fit, I'll happily point you toward someone who is.",
    },
    {
      icon: "3",
      title: "Steady support, your pace.",
      body:
        "From there we meet weekly or every other week. Some seasons are about untangling something specific; others are simply about having a steady place to think out loud. Both are welcome.",
    },
  ],
  aboutTeaserHeading: "Hi, I'm Nora.",
  aboutTeaserBody:
    "I've spent fifteen years sitting with people through anxiety, big life changes, grief, and the quiet weight of not feeling quite like yourself. My work is warm and collaborative — less about fixing you (you're not broken) and more about helping you feel understood, steadier, and more at home in your own life.",
  aboutTeaserImage: {
    demoUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1400&fit=crop&q=80",
    alt: "A warm, softly lit sitting room with plants and natural light",
  },
  pricingHeading: "Fees & the practical bits.",
  pricingIntro:
    "Money should never be the reason you don't reach out. Here's everything up front, plainly.",
  sessionFee: "$150 per 50-minute session · sliding scale available",
  insuranceNote:
    "I'm an out-of-network provider, which keeps your care private and fully yours. I provide a monthly superbill for reimbursement, and many PPO plans cover a portion of out-of-network therapy. Not sure what your plan does? I'm glad to help you figure it out before we begin.",
  slidingScaleNote:
    "I hold a handful of reduced-fee spots for folks who need them, no lengthy justification required. If cost is a barrier, just ask — we'll find something that works.",
  showPracticeFacts: false,
  practiceFacts: [
    { label: "Works with", value: "Adults & young adults (16+)" },
    { label: "Focus", value: "Anxiety · Transitions · Relationships" },
    { label: "Format", value: "In person (Portland) · Online (OR)" },
    { label: "New clients", value: "Currently welcoming a few" },
  ],
  showGoodFit: true,
  goodFitHeading: "Let's make sure we're a good fit — it matters more than anything.",
  goodFitIntro:
    "Therapy works best when the relationship feels right. Here's who I tend to help most, and when I'll happily walk you to someone better suited.",
  goodFitForLabel: "We might be a lovely fit if you're…",
  goodFitFor: [
    "Navigating anxiety, overwhelm, or the low hum of burnout",
    "Standing at a threshold — a move, a breakup, new parenthood, a career turn, a loss",
    "Someone who looks 'fine' on the outside and carries a lot on the inside",
    "Wanting a warm, collaborative therapist rather than a blank wall",
  ],
  goodFitReferLabel: "I'll help you find someone better suited for…",
  goodFitReferOut: [
    "Children under 16 — I can point you to wonderful child specialists",
    "Active substance dependence that needs a specialized program",
    "Psychiatric medication management (I'll gladly coordinate with a great prescriber)",
    "Immediate crisis — if you're in danger, please call or text 988 right now",
  ],
  showFaq: true,
  faqHeading: "A few things people often wonder.",
  faqIntro:
    "Anything I didn't cover here, we can talk through on our first call — no question is too small.",
  faqs: [
    {
      question: "What's the first session actually like?",
      answer:
        "Honestly? Mostly a conversation. You don't need to prepare or perform. I'll ask what brought you in and what you're hoping for, you can ask me anything, and we'll get a feel for whether it clicks. A lot of people feel a little lighter just having said things out loud.",
    },
    {
      question: "Do you take insurance?",
      answer:
        "I'm out-of-network, which keeps our work private and flexible. I'll give you a monthly superbill to send to your insurer — many PPO plans reimburse a meaningful portion of out-of-network therapy. If you'd like, I'll help you check your benefits before we start so there are no surprises.",
    },
    {
      question: "How long will I be in therapy?",
      answer:
        "There's no set answer, and I won't keep you longer than you need. Some people come for a specific season and wrap up in a few months; others value having an ongoing place to land. We'll check in regularly about how it's going and what you want.",
    },
    {
      question: "In person or online?",
      answer:
        "Whatever feels easier for you. My office is a cozy room in Southeast Portland, and I also meet clients over secure video anywhere in Oregon. Plenty of people mix the two depending on their week.",
    },
    {
      question: "Is what I say private?",
      answer:
        "Yes. What you share stays between us, with only the narrow legal exceptions around safety that I'll explain clearly before we begin. This is your space.",
    },
  ],
};

export const defaultTestimonials: Testimonial[] = [
  {
    _id: "default-1",
    quote:
      "I put off therapy for years because it felt so daunting. Nora made the first session feel like talking to someone who already got it. A year in, I feel more like myself than I have in a long time.",
    attribution: "M., 34",
    context: "Anxiety & burnout",
    displayOrder: 1,
  },
  {
    _id: "default-2",
    quote:
      "After my divorce I felt completely unmoored. Nora didn't rush me or hand me a worksheet — she just sat with me until things slowly started to make sense again.",
    attribution: "D., 41",
    context: "Life transition",
    displayOrder: 2,
  },
  {
    _id: "default-3",
    quote:
      "Warm, real, and quietly perceptive. She notices the thing I didn't quite say and gently brings it back. I always leave our sessions feeling steadier.",
    attribution: "J., 28",
    context: "Relationships & self-worth",
    displayOrder: 3,
  },
];

export const defaultAboutPage: AboutPage = {
  heading: "Meet Nora",
  intro:
    "I'm a Licensed Clinical Social Worker who believes therapy should feel human — warm, honest, and unhurried. For fifteen years I've sat with people through anxiety, grief, big transitions, and the quiet sense of being a stranger to themselves. My approach is collaborative and relational: we go at your pace, we make room for the hard things, and we do it in a space that's safe enough to be real.",
  portrait: {
    demoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1000&h=1200&fit=crop&q=80",
    alt: "Nora Bennett, LCSW",
  },
  body: [],
  credentials: [
    "M.S.W., Clinical Social Work — Portland State University",
    "Licensed Clinical Social Worker, Oregon (#L-9042)",
    "Trained in Acceptance & Commitment Therapy (ACT)",
    "Trained in Emotionally Focused Therapy (EFT)",
    "Certified in Perinatal Mental Health (PMH-C)",
    "Continuing training in grief, attachment & trauma-informed care",
    "Member, National Association of Social Workers (NASW)",
  ],
  showPrinciples: true,
  principlesHeading: "What you can expect from me.",
  principles: [
    {
      title: "You set the pace",
      body: "We never go faster than feels safe. Some days we dig in; some days we just breathe. Both are doing the work.",
    },
    {
      title: "Warmth over judgment",
      body: "There's nothing you can say that will make me think less of you. This is a place to be fully, messily human.",
    },
    {
      title: "Collaborative, not prescriptive",
      body: "You're the expert on your life. I bring tools and perspective; together we find what actually helps you.",
    },
    {
      title: "Honest about fit",
      body: "If someone else would serve you better, I'll say so and help you find them. Your care matters more than my calendar.",
    },
  ],
  showTimeline: true,
  timelineHeading: "A little about the path here.",
  timeline: [
    {
      period: "Training",
      title: "M.S.W. — Portland State University",
      body: "Clinical training across community mental health and a hospital outpatient program, working with anxiety, depression, and grief.",
    },
    {
      period: "Community years",
      title: "Nonprofit & community clinics",
      body: "A decade meeting people from every walk of life — the season that taught me warmth and steadiness matter as much as technique.",
    },
    {
      period: "Specialization",
      title: "Perinatal & transitions work",
      body: "Deeper training in the big thresholds — new parenthood, loss, identity shifts — and the tender feelings that come with them.",
    },
    {
      period: "Today",
      title: "Private practice — Portland, OR",
      body: "A small, unhurried caseload and a cozy office, so each person gets the time and attention this work deserves.",
    },
  ],
};

export const defaultServicesPage: ServicesPage = {
  heading: "How I can help",
  intro:
    "Most of my work is individual therapy for adults and young adults. Whatever brings you in, we'll shape the work around you — here are the places people most often start.",
  services: [
    {
      title: "Anxiety & overwhelm",
      description:
        "For the racing mind, the tight chest, the endless mental to-do list. We'll turn down the volume on anxiety and build a steadier, kinder relationship with your own thoughts.",
      icon: "🌿",
    },
    {
      title: "Life transitions & grief",
      description:
        "Moves, breakups, new parenthood, career turns, loss. When the ground shifts, therapy is a place to find your footing and make meaning at your own pace.",
      icon: "🍃",
    },
    {
      title: "Relationships & self-worth",
      description:
        "Patterns that keep repeating, boundaries that feel impossible, the quiet belief that you're 'too much' or 'not enough.' We'll gently untangle it together.",
      icon: "🤍",
    },
  ],
  showTreatmentArc: true,
  treatmentArcHeading: "How we'll work together.",
  treatmentArcIntro:
    "No rigid program — just a gentle rhythm that gives the work room to breathe.",
  treatmentArc: [
    {
      title: "A free hello",
      detail: "20 minutes · no cost",
      body: "A relaxed call to hear what's on your mind and see if we feel like a fit — both ways.",
    },
    {
      title: "Settling in",
      detail: "first few sessions",
      body: "We get to know each other and gently map what's going on and what you're hoping for.",
    },
    {
      title: "The steady middle",
      detail: "weekly or biweekly",
      body: "The real work — untangling, practicing, and having a reliable place to land each week.",
    },
    {
      title: "Whenever you're ready",
      detail: "no fixed end",
      body: "We taper off when you feel steadier, with the door always open if you'd like to come back.",
    },
  ],
  showFees: true,
  feesHeading: "Fees at a glance",
  fees: [
    { item: "Individual session", detail: "50 minutes", price: "$150" },
    { item: "First consultation", detail: "20 minutes, phone or video", price: "Free" },
    { item: "Sliding scale", detail: "for those who need it", price: "Ask" },
    {
      item: "Monthly superbill",
      detail: "for out-of-network reimbursement",
      price: "Included",
    },
  ],
  feesNote:
    "A handful of reduced-fee spots are always reserved for folks who need them — please just ask, no lengthy explanation required.",
};

export const defaultContactPage: ContactPage = {
  heading: "Let's talk.",
  intro:
    "Reaching out is a brave first step, and it can be a small one. Send a note or book a free 20-minute call — you'll hear back from me personally, usually within a day.",
  email: "hello@example.com",
  phone: "(503) 555-0164",
  addressLine: "1820 SE Hawthorne Blvd, Suite 4, Portland, OR",
  hours: [
    { day: "Mon – Thu", time: "9:00 am – 6:00 pm" },
    { day: "Fri", time: "9:00 am – 1:00 pm" },
  ],
  showNextSteps: true,
  nextStepsHeading: "What happens after you reach out.",
  nextSteps: [
    {
      when: "Within a day",
      title: "A personal reply",
      body: "You hear back from me — a real note, not an autoresponder — with a few times for a free call.",
    },
    {
      when: "The first call",
      title: "20 easy minutes",
      body: "We talk through what's bringing you in, any questions you have, and whether we feel like a good fit.",
    },
    {
      when: "If it feels right",
      title: "Your first session",
      body: "Usually within a week or two. I'll send simple intake paperwork ahead of time through a secure portal.",
    },
  ],
  crisisNote:
    "I can't monitor messages around the clock. If you need support right now, call or text 988 — the Suicide & Crisis Lifeline, there for you 24/7.",
};

// Demo blog content (5 warm posts) — see src/lib/demo-posts.ts
export { demoPostList as defaultPosts, demoRecentPosts as defaultRecentPosts } from "./demo-posts";

export const defaultAnnouncement: Announcement = {
  enabled: false,
  message: "",
  variant: "info",
};
