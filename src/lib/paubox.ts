/**
 * Contact-form notifications sent through the practice's own Paubox account.
 *
 * Why Paubox: a therapy practice's contact form receives health information no
 * matter what the form asks for, so the email carrying it needs a HIPAA
 * Business Associate Agreement. Paubox signs one on every tier; Resend does
 * not. Each practice has its own Paubox account (their BAA, their mail) and
 * ICC only holds the API key in the site's environment.
 *
 * API reference: https://docs.paubox.com/docs/paubox_email_api/messages
 *
 * Reply-To carries the visitor's own address, so hitting Reply answers the
 * person who wrote in. Paubox's docs say Reply-To "must match a verified
 * domain", but that isn't what it does: tested live on 2026-09-19 against a
 * verified grantkyle.com, a Reply-To on gmail.com was accepted AND delivered
 * intact. The "Reply to …" button stays as a second route to the same address.
 *
 * If Paubox ever does start enforcing that, the failure is visible rather than
 * silent: replies would fall back to the From address, which is a send-only
 * mailbox nobody reads, so they bounce instead of vanishing.
 *
 * Deliberately free of imports so it can be exercised directly with Node.
 */

export const PAUBOX_MESSAGES_URL = "https://api.paubox.com/v1/email/messages";

export type Inquiry = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

type Validated = { ok: true; inquiry: Inquiry } | { ok: false; error: string };

// Conservative on purpose: the address ends up in a mailto: link and a
// subject line, so anything unusual is refused rather than escaped around.
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function validateInquiry(raw: unknown): Validated {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (value: unknown, max: number) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

  const name = oneLine(text(body.name, 200));
  const email = oneLine(text(body.email, 200));
  const message = text(body.message, 5000);
  if (!name || !email || !message) {
    return { ok: false, error: "Please include your name, email, and a message." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please check your email address." };
  }
  const phone = oneLine(text(body.phone, 60));
  return { ok: true, inquiry: { name, email, message, ...(phone ? { phone } : {}) } };
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** The Paubox request body for one inquiry. */
export function buildNotification(inquiry: Inquiry, route: { from: string; to: string }) {
  const replyLink = `mailto:${inquiry.email}?subject=${encodeURIComponent("Re: your message")}`;
  const replyNote = `Reply to this email to answer ${inquiry.name} — your reply goes to ${inquiry.email}.`;

  const plain = [
    replyNote,
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    inquiry.phone ? `Phone: ${inquiry.phone}` : null,
    "",
    inquiry.message,
    "",
    "— Sent from the contact form on your website, delivered encrypted by Paubox.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#667085;vertical-align:top">${label}</td><td style="padding:4px 0">${value}</td></tr>`;

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.55;color:#1d2433;max-width:560px">
  <p style="margin:0 0 6px"><a href="${escapeHtml(replyLink)}" style="display:inline-block;background:#3f6b5a;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:600">Reply to ${escapeHtml(inquiry.name)}</a></p>
  <p style="margin:0 0 20px;font-size:13px;color:#667085">Or just hit Reply &mdash; either way your answer goes to ${escapeHtml(inquiry.email)}.</p>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("Name", escapeHtml(inquiry.name))}
    ${row("Email", `<a href="${escapeHtml(replyLink)}">${escapeHtml(inquiry.email)}</a>`)}
    ${inquiry.phone ? row("Phone", escapeHtml(inquiry.phone)) : ""}
  </table>
  <p style="margin:20px 0;white-space:pre-wrap;font-size:15px">${escapeHtml(inquiry.message)}</p>
  <p style="margin:24px 0 0;padding-top:12px;border-top:1px solid #e4e7ec;font-size:12px;color:#98a2b3">Sent from the contact form on your website, delivered encrypted by Paubox.</p>
</div>`;

  return {
    data: {
      message: {
        recipients: [route.to],
        headers: {
          from: route.from,
          // Bare address, no display name: the visitor's name is untrusted
          // input and has no business in a header that parsers split on.
          "reply-to": inquiry.email,
          // The visitor's address is in the subject so it's visible from the
          // inbox list, before the email is even opened.
          subject: oneLine(`Website inquiry from ${inquiry.name} (${inquiry.email})`).slice(0, 200),
        },
        content: { "text/plain": plain, "text/html": html },
      },
    },
  };
}

type SendResult = { ok: true; trackingId: string } | { ok: false; status: number; detail: string };

/**
 * Send one message. Never throws. On failure, `detail` holds only what Paubox
 * reported — the inquiry itself is never included, so it is safe to log.
 */
export async function sendViaPaubox(
  payload: ReturnType<typeof buildNotification>,
  apiKey: string,
  url: string = PAUBOX_MESSAGES_URL,
): Promise<SendResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Paubox's own format, not "Bearer".
        Authorization: `Token token=${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = (await response.json().catch(() => null)) as
      | { sourceTrackingId?: string; errors?: { title?: string; details?: string }[] }
      | null;
    if (response.ok) return { ok: true, trackingId: json?.sourceTrackingId ?? "" };
    const detail =
      json?.errors?.map((e) => [e.title, e.details].filter(Boolean).join(": ")).join("; ") ||
      response.statusText;
    return { ok: false, status: response.status, detail };
  } catch (error) {
    return { ok: false, status: 0, detail: error instanceof Error ? error.message : "network error" };
  }
}
