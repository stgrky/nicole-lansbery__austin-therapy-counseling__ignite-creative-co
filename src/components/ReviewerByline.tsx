import type { ReviewerRef } from "@/sanity/types";

type Props = {
  reviewer?: ReviewerRef | null;
  /**
   * Verbatim label that precedes the reviewer's name —
   * e.g. "Clinically reviewed by" or "Edited by".
   */
  label: string;
  /**
   * Show the sage verified-checkmark next to the reviewer's name when
   * they're a licensed clinician. Typically only true for clinical
   * reviews; editors don't get the check.
   */
  showVerifiedBadge?: boolean;
};

/**
 * Second-line byline used on post detail pages — e.g.
 * "Clinically reviewed by Dr. Jordan Sample, Ph.D., Licensed Psychologist (TX) ✓"
 * or "Edited by Casey Whitfield".
 *
 * Returns null when no reviewer or no name is set, so it's safe to drop
 * into any layout.
 */
export function ReviewerByline({ reviewer, label, showVerifiedBadge }: Props) {
  if (!reviewer?.name) return null;

  const credLabel = reviewer.credentials ? `, ${reviewer.credentials}` : "";
  const renderCheck = showVerifiedBadge && reviewer.isLicensedClinician;

  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-muted)]">
      <span>{label}</span>
      <span className="inline-flex items-center gap-1.5 font-medium text-[var(--color-foreground)]">
        {reviewer.name}
        {credLabel}
        {renderCheck ? <VerifiedCheck /> : null}
      </span>
    </p>
  );
}

function VerifiedCheck() {
  return (
    <span
      aria-label="Licensed clinician"
      title="Licensed clinician"
      className="inline-flex h-4 w-4 items-center justify-center rounded-full"
      style={{ background: "var(--color-accent)", color: "#ffffff" }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
