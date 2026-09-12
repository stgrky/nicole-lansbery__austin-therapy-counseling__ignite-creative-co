import type { PortableTextBlock } from "@portabletext/react";

import type {
  BlogIndexResult,
  PostDetail,
  PostListItem,
  RecentPost,
} from "@/sanity/types";

/**
 * GROVE demo blog — five warm, relational posts by the demo persona.
 * Serves as the defaults fallback (no Sanity needed) so every blog surface
 * renders, and doubles as seed content when Grove's Sanity project is
 * provisioned. Voice: warm, plainspoken, human — a hand on the shoulder.
 */

let keyCounter = 0;
const key = () => `demo-${(keyCounter += 1)}`;

function para(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

function h2(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

const AUTHOR = {
  _id: "demo-author",
  name: "Nora Bennett, LCSW",
  credentials: "Licensed Clinical Social Worker · Portland, OR",
  photo: {
    demoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&q=80",
    alt: "Nora Bennett",
  },
  bio: [
    para(
      "Nora is a relational therapist in Portland who works with anxiety, life transitions, grief, and self-worth. She writes here the way she works — warmly, plainly, and without jargon."
    ),
  ],
};

function cat(title: string): { _id: string; title: string; slug: string } {
  return {
    _id: `demo-cat-${title}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""),
  };
}

export const demoPosts: PostDetail[] = [
  {
    _id: "demo-post-1",
    title: "Starting therapy when you don't know where to start",
    slug: "starting-therapy-when-you-dont-know-where-to-start",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&h=960&fit=crop&q=80",
      alt: "Warm sunlight filtering through green leaves",
    },
    excerpt:
      "If the idea of therapy feels big and vague and slightly terrifying, you're in good company. A gentle guide to taking the first step when you can't quite name what's wrong.",
    publishedAt: "2026-06-30",
    author: AUTHOR,
    categories: [cat("Getting Started")],
    body: [
      para(
        "Sometimes people arrive able to name exactly what's wrong. Just as often, they can't — only that something feels off, heavy, stuck. If that's you, I want you to know: you don't need the right words to begin. 'I'm not sure, I just don't feel like myself' is a perfectly good place to start."
      ),
      h2("You don't have to have a reason"),
      para(
        "There's a quiet myth that therapy is only for crises — that you need a Big Enough Problem to earn a seat. You don't. Feeling low, anxious, numb, or simply worn down is reason enough. So is wanting to understand yourself a little better."
      ),
      h2("What the first step can look like"),
      para(
        "It can be as small as sending a two-line message. From there, most therapists — me included — offer a free call so you can get a feel for us before committing to anything. No pressure, no obligation; just a conversation to see if it's a fit."
      ),
      para(
        "The hardest part is almost always the reaching out. Once you've done that, you'll usually find the rest is gentler than you feared."
      ),
    ],
  },
  {
    _id: "demo-post-2",
    title: "The quiet kind of anxiety no one talks about",
    slug: "the-quiet-kind-of-anxiety",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&h=960&fit=crop&q=80",
      alt: "A cozy chair by a window with soft light",
    },
    excerpt:
      "Not every anxious person looks anxious. Sometimes it's the high-functioning, always-fine, secretly-exhausted kind. On the anxiety that hides in plain sight.",
    publishedAt: "2026-06-16",
    author: AUTHOR,
    categories: [cat("Anxiety")],
    body: [
      para(
        "When we picture anxiety, we picture panic — a racing heart, a shaking hand. But a lot of anxiety is quieter than that. It looks like being 'on top of everything.' It looks like replaying a conversation for the tenth time, lying awake mentally solving tomorrow, or a low background hum of dread you can't quite explain."
      ),
      h2("High-functioning doesn't mean fine"),
      para(
        "Plenty of people carry real anxiety while looking completely put-together. They meet the deadlines, answer the texts, show up smiling — and come home depleted. If that's you, the fact that you're coping doesn't mean you're okay, and it doesn't mean you don't deserve support."
      ),
      para(
        "In therapy, we gently turn down the volume: making room for the worry instead of fighting it, loosening the grip of 'what if,' and building a kinder, steadier relationship with your own mind. You don't have to white-knuckle your way through anymore."
      ),
    ],
  },
  {
    _id: "demo-post-3",
    title: "How to sit with a big life change",
    slug: "how-to-sit-with-a-big-life-change",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&h=960&fit=crop&q=80",
      alt: "Sunlight through a quiet forest of tall trees",
    },
    excerpt:
      "Even the changes we choose can knock the wind out of us. A few gentle thoughts on grief, thresholds, and finding your footing when the ground shifts.",
    publishedAt: "2026-06-02",
    author: AUTHOR,
    categories: [cat("Transitions")],
    body: [
      para(
        "Big transitions have a strange way of grieving us, even when they're good. A new baby, a new city, a new job, the end of a relationship — each one asks us to let go of a version of life we knew how to live. It makes sense to feel unmoored. You're not doing it wrong."
      ),
      h2("Two things can be true"),
      para(
        "You can be excited and terrified. Relieved and heartbroken. Grateful and lost. Transitions rarely hand us one clean feeling; they hand us a tangle. Part of the work is simply making room for all of it, without rushing to tidy it up."
      ),
      para(
        "The footing comes back — slowly, and not by force. Often it helps to name what you've lost, honor it, and let the new shape of your life arrive at its own pace. If you're in the middle of one of these thresholds, therapy can be a steady place to stand while the ground settles."
      ),
    ],
  },
  {
    _id: "demo-post-4",
    title: "You're allowed to take up space",
    slug: "youre-allowed-to-take-up-space",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=1600&h=960&fit=crop&q=80",
      alt: "A warm, inviting corner with a soft blanket and books",
    },
    excerpt:
      "For everyone who's ever apologized for existing, softened themselves to be easier, or worried they're 'too much.' A note on self-worth.",
    publishedAt: "2026-05-19",
    author: AUTHOR,
    categories: [cat("Self-Worth")],
    body: [
      para(
        "A lot of the people I sit with share a quiet belief: that they're somehow too much and not enough at the same time. Too needy, too sensitive, too emotional — and also not successful enough, not calm enough, not worthy of the space they take up. It's an exhausting way to live."
      ),
      h2("Where it comes from"),
      para(
        "Usually this isn't a character flaw; it's a lesson. Somewhere along the way, many of us learned that love felt safest when we were small, easy, low-maintenance. That made sense then. It costs a lot now."
      ),
      para(
        "In therapy, we gently question that old lesson — not to blame anyone, but to loosen its grip. You're allowed to have needs. You're allowed to take up space. You're allowed to be a full, inconvenient, wonderful human. We practice believing it a little more each week."
      ),
    ],
  },
  {
    _id: "demo-post-5",
    title: "What 'good fit' really means in therapy",
    slug: "what-good-fit-really-means",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=1600&h=960&fit=crop&q=80",
      alt: "Two people in warm conversation across a table",
    },
    excerpt:
      "The research is clear that the relationship matters more than the method. How to tell whether a therapist is right for you — and permission to keep looking.",
    publishedAt: "2026-05-05",
    author: AUTHOR,
    categories: [cat("Finding a Therapist")],
    body: [
      para(
        "If you take one thing from anything I write, let it be this: the single best predictor of whether therapy helps isn't the therapist's technique or credentials. It's whether you feel safe with them. The relationship is the medicine."
      ),
      h2("What a good fit feels like"),
      para(
        "You feel heard, not judged. You can disagree with them without it getting weird. You leave most sessions a little lighter or a little clearer — not every time, but often. And you sense they genuinely like you. That felt sense of safety isn't a luxury; it's the working ingredient."
      ),
      h2("Permission to keep looking"),
      para(
        "If a therapist doesn't feel right, it's okay to say so, and it's okay to try someone else. A good therapist won't be wounded by it — we want you with the person who can actually help. Shopping around isn't rude; it's wise. You deserve to feel at home in the room."
      ),
    ],
  },
];

export const demoPostList: PostListItem[] = demoPosts.map(
  ({ body: _body, ...rest }) => rest
);

export const demoRecentPosts: RecentPost[] = demoPosts
  .slice(0, 3)
  .map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    featuredImage: p.featuredImage,
    publishedAt: p.publishedAt,
  }));

export function demoBlogIndex(start: number, end: number): BlogIndexResult {
  return { posts: demoPostList.slice(start, end), total: demoPostList.length };
}

export function demoPostBySlug(slug: string): PostDetail | null {
  return demoPosts.find((p) => p.slug === slug) ?? null;
}

export function demoSimilar(slug: string): PostListItem[] {
  return demoPostList.filter((p) => p.slug !== slug).slice(0, 3);
}
