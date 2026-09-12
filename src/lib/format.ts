export function formatDate(input?: string) {
  if (!input) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(input));
  } catch {
    return "";
  }
}

/** Editorial long form: "June 4, 2026". Used in the post-detail byline. */
export function formatDateLong(input?: string) {
  if (!input) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(input));
  } catch {
    return "";
  }
}
