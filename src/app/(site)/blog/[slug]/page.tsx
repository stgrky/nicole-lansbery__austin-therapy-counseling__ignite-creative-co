import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorCard } from "@/components/AuthorCard";
import { Container } from "@/components/Container";
import { GuestBadge } from "@/components/GuestBadge";
import { Reveal } from "@/components/motion/Reveal";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { PostWidget } from "@/components/PostWidget";
import { ReviewerByline } from "@/components/ReviewerByline";
import { SanityImg } from "@/components/SanityImg";
import { demoPostBySlug, demoSimilar } from "@/lib/demo-posts";
import { formatDateLong } from "@/lib/format";
import { safeFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { postBySlugQuery, similarPostsQuery } from "@/sanity/queries";
import type { PostDetail, RecentPost } from "@/sanity/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// The demo posts exist so the template renders with no Sanity project at all.
// Once a real project is connected, "no such post" must 404 — otherwise every
// deleted demo post stays live at its old URL, published under the client's
// own practice name. Never fall back to demo content on a configured site.
async function getPost(slug: string) {
  // Falls back to the demo post for this slug when Sanity is unconfigured.
  return safeFetch<PostDetail | null>(
    postBySlugQuery,
    { slug },
    isSanityConfigured ? null : demoPostBySlug(slug)
  );
}

async function getSimilar(slug: string, categoryIds: string[]) {
  if (!categoryIds.length) return isSanityConfigured ? [] : demoSimilar(slug);
  return safeFetch<RecentPost[]>(
    similarPostsQuery,
    { slug, categoryIds },
    isSanityConfigured ? [] : demoSimilar(slug)
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const categoryIds = (post.categories ?? []).map((cat) => cat._id);
  const similar = await getSimilar(slug, categoryIds);

  return (
    <Container className="py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <Reveal>
            <SanityImg
              image={post.featuredImage}
              alt={post.featuredImage?.alt ?? post.title ?? ""}
              width={1400}
              height={840}
              priority
              className="aspect-[5/3] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-muted)]">By</span>
                <div className="flex items-center gap-2">
                  {post.author?.photo ? (
                    <SanityImg
                      image={post.author.photo}
                      alt={post.author?.name ?? ""}
                      width={32}
                      height={32}
                      className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                    />
                  ) : null}
                  {post.author?.name ? (
                    <span className="whitespace-nowrap font-medium text-[var(--color-foreground)]">
                      {post.author.name}
                    </span>
                  ) : null}
                  {post.author?.isGuestContributor ? <GuestBadge /> : null}
                </div>
                {post.publishedAt || post.updatedAt ? (
                  <time
                    dateTime={post.updatedAt ?? post.publishedAt}
                    className="whitespace-nowrap before:mr-3 before:text-[var(--color-subtle)] before:content-['|']"
                  >
                    {post.updatedAt
                      ? `Updated ${formatDateLong(post.updatedAt)}`
                      : formatDateLong(post.publishedAt!)}
                  </time>
                ) : null}
              </div>
              {post.clinicalReviewer ? (
                <ReviewerByline
                  reviewer={post.clinicalReviewer}
                  label="Clinically reviewed by"
                  showVerifiedBadge
                />
              ) : post.editor ? (
                <ReviewerByline
                  reviewer={post.editor}
                  label="Edited by"
                />
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[var(--color-foreground)] md:text-[3rem]">
              {post.title}
            </h1>
          </Reveal>

          {/* MERIDIAN: excerpt as a journal-style abstract */}
          {post.excerpt ? (
            <Reveal delay={0.18}>
              <div
                className="mt-7 border-l-4 p-6"
                style={{
                  borderColor: "var(--color-accent)",
                  background: "var(--color-accent-soft)",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
                  In brief
                </p>
                <p className="mt-2 text-base leading-relaxed text-[var(--color-foreground)]">
                  {post.excerpt}
                </p>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.24}>
            <div className="prose-serif mt-12 text-lg text-[var(--color-foreground)]">
              <PortableTextRenderer value={post.body} />
            </div>
          </Reveal>

          <Reveal>
            <AuthorCard author={post.author} />
          </Reveal>
        </article>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.2}>
              <PostWidget posts={similar} variant="related" />
            </Reveal>
          </div>
        </aside>
      </div>
    </Container>
  );
}
