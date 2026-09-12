import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { PostListItem } from "@/sanity/types";

import { GuestBadge } from "./GuestBadge";
import { SanityImg } from "./SanityImg";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
      {post.slug ? (
        <Link href={`/blog/${post.slug}`} className="block">
          <SanityImg
            image={post.featuredImage}
            alt={post.featuredImage?.alt ?? post.title ?? ""}
            width={1200}
            height={720}
            className="h-56 w-full object-cover md:h-64"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        </Link>
      ) : (
        <SanityImg
          image={post.featuredImage}
          alt={post.featuredImage?.alt ?? post.title ?? ""}
          width={1200}
          height={720}
          className="h-56 w-full object-cover md:h-64"
        />
      )}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          {post.author?.photo ? (
            <SanityImg
              image={post.author.photo}
              alt={post.author.name ?? ""}
              width={32}
              height={32}
              className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
            />
          ) : null}
          {post.author?.name ? (
            <span className="whitespace-nowrap">{post.author.name}</span>
          ) : null}
          {post.author?.isGuestContributor ? <GuestBadge /> : null}
          {post.publishedAt ? (
            <time
              dateTime={post.publishedAt}
              className="whitespace-nowrap before:mr-2 before:content-['·']"
            >
              {formatDate(post.publishedAt)}
            </time>
          ) : null}
        </div>
        <h2 className="mt-4 line-clamp-2 font-serif text-2xl leading-tight text-[var(--color-foreground)]">
          {post.slug ? (
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-[var(--color-accent-strong)]"
            >
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h2>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-[var(--color-muted)]">
            {post.excerpt}
          </p>
        ) : null}
        {post.slug ? (
          <Link
            href={`/blog/${post.slug}`}
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-[var(--color-accent-strong)] hover:text-[var(--color-foreground)]"
          >
            Read more →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
