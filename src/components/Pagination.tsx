import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--color-subtle)]/60 pt-6 text-sm"
    >
      {hasPrev ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="inline-flex items-center gap-2 text-[var(--color-foreground)] hover:text-[var(--color-accent-strong)]"
          rel="prev"
        >
          ← Newer posts
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <span className="text-[var(--color-muted)]">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="inline-flex items-center gap-2 text-[var(--color-foreground)] hover:text-[var(--color-accent-strong)]"
          rel="next"
        >
          Older posts →
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
