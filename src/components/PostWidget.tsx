import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { RecentPost } from "@/sanity/types";

import { SanityImg } from "./SanityImg";

interface PostWidgetProps {
  posts: RecentPost[];
  variant?: "recent" | "related";
}

export function PostWidget({ posts, variant = "recent" }: PostWidgetProps) {
  if (!posts.length) return null;
  return (
    <aside className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
      <h3 className="border-b border-[var(--color-subtle)]/60 pb-3 font-serif text-lg text-[var(--color-foreground)]">
        {variant === "related" ? "Related Posts" : "Recent Posts"}
      </h3>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="flex items-center gap-3">
            <SanityImg
              image={post.featuredImage}
              alt={post.featuredImage?.alt ?? post.title ?? ""}
              width={56}
              height={56}
              className="h-14 w-14 flex-none rounded-full object-cover"
            />
            <div className="min-w-0">
              {post.publishedAt ? (
                <p className="text-xs text-[var(--color-muted)]">
                  {formatDate(post.publishedAt)}
                </p>
              ) : null}
              {post.slug ? (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm leading-snug text-[var(--color-foreground)] hover:text-[var(--color-accent-strong)]"
                >
                  {post.title}
                </Link>
              ) : (
                <span className="text-sm">{post.title}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
