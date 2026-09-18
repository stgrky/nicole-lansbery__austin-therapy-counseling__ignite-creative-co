/** A stable in-page anchor for a heading, e.g. "RO-DBT (Radically Open)" -> "ro-dbt-radically-open". */
export function anchorId(text: string | undefined) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
