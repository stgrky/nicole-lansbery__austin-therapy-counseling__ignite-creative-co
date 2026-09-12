import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Pagination } from "@/components/Pagination";
import { PostWidget } from "@/components/PostWidget";
import { SanityImg } from "@/components/SanityImg";
import { demoBlogIndex } from "@/lib/demo-posts";
import { formatDateLong } from "@/lib/format";
import { defaultRecentPosts } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { blogIndexQuery, recentPostsQuery } from "@/sanity/queries";
import type { BlogIndexResult, RecentPost } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

function parsePage(raw: string | undefined) {
  const parsed = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export default async function BlogIndexRoute({ searchParams }: BlogPageProps) {
  const { page: rawPage } = await searchParams;
  const page = parsePage(rawPage);

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [{ posts, total }, recent] = await Promise.all([
    safeFetch<BlogIndexResult>(
      blogIndexQuery,
      { start, end },
      isSanityConfigured ? { posts: [], total: 0 } : demoBlogIndex(start, end)
    ),
    safeFetch<RecentPost[]>(recentPostsQuery, {}, defaultRecentPosts),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  // Out of range page (e.g. ?page=99 when only 1 page exists) → 404,
  // but page 1 with no posts is a valid empty state.
  if (page > 1 && page > totalPages) {
    notFound();
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              The clinical library
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              Evidence, explained plainly.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
              What the research actually says about assessment, anxiety, OCD,
              and trauma — translated from journal-speak into language you can
              use.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── POSTS + SIDEBAR ── */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {posts.length === 0 ? (
                <Reveal>
                  <p className="rounded-2xl border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-8 text-[var(--color-muted)]">
                    No posts yet. Once posts are published in the Studio, they
                    show up here.
                  </p>
                </Reveal>
              ) : (
                <>
                  {/* MERIDIAN: the clinical register — structured rows,
                      date + category up top, no card fluff */}
                  <div className="border-t border-[var(--color-subtle)]">
                    {posts.map((post, index) => (
                      <Reveal
                        key={post._id}
                        delay={Math.min(0.08 * index, 0.32)}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group grid gap-2 border-b border-[var(--color-subtle)] py-7 transition-colors hover:bg-[var(--color-surface)] md:grid-cols-[150px_1fr] md:gap-8 md:py-8"
                        >
                          <div className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                            {post.publishedAt ? (
                              <time dateTime={post.publishedAt}>
                                {formatDateLong(post.publishedAt)}
                              </time>
                            ) : null}
                            {post.categories?.length ? (
                              <p className="mt-1.5 font-medium text-[var(--color-accent-strong)]">
                                {post.categories
                                  .map((c) => c.title)
                                  .join(" · ")}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex gap-5">
                            <div className="hidden h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:block">
                              <SanityImg
                                image={post.featuredImage}
                                alt={post.featuredImage?.alt ?? post.title ?? ""}
                                width={160}
                                height={160}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="font-serif text-2xl font-semibold leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent-strong)]">
                                {post.title}
                              </h2>
                              {post.excerpt ? (
                                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                                  {post.excerpt}
                                </p>
                              ) : null}
                              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-strong)]">
                                Read the article
                                <span
                                  aria-hidden
                                  className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                  →
                                </span>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal>
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      basePath="/blog"
                    />
                  </Reveal>
                </>
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal delay={0.2}>
                  <PostWidget posts={recent} variant="recent" />
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
