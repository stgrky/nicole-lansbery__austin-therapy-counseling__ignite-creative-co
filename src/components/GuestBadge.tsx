type Props = {
  /** Tailwind size preset */
  size?: "sm" | "md";
  className?: string;
};

/**
 * Small sage pill that flags an author as a guest contributor. Rendered
 * next to author names on post cards and author bios.
 */
export function GuestBadge({ size = "sm", className }: Props) {
  const sizing =
    size === "md"
      ? "px-2.5 py-1 text-[11px]"
      : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium uppercase tracking-[0.14em] ${sizing} ${className ?? ""}`}
      style={{
        background: "var(--color-accent-soft)",
        color: "var(--color-accent-strong)",
      }}
    >
      Guest
    </span>
  );
}
