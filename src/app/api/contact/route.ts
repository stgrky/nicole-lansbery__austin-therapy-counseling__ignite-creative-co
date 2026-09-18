import { NextRequest, NextResponse } from "next/server";

import { buildNotification, sendViaPaubox, validateInquiry } from "@/lib/paubox";

/**
 * Contact form handler.
 *
 * Email only, and only through the practice's own Paubox account (see
 * src/lib/paubox.ts for why). Nothing is stored — not in Sanity, not in logs —
 * because a therapy contact form receives health information regardless of
 * what it asks for.
 *
 * Needs, in Vercel:
 *   PAUBOX_API_KEY        the practice's Paubox API key
 *   CONTACT_NOTIFY_EMAIL  the inbox that receives inquiries
 *   CONTACT_FROM_EMAIL    an address on the Paubox-verified domain, e.g.
 *                         "Website inquiry <website@practice.com>"
 *
 * If any are missing, or Paubox refuses the message, the visitor sees an error
 * and is pointed to email the practice directly. A lost inquiry that looked
 * like it sent is the one outcome this must never produce.
 */
export async function POST(request: NextRequest) {
  const checked = validateInquiry(await request.json().catch(() => null));
  if (!checked.ok) {
    return NextResponse.json({ error: checked.error }, { status: 400 });
  }

  const apiKey = process.env.PAUBOX_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Not sent: PAUBOX_API_KEY, CONTACT_NOTIFY_EMAIL, and CONTACT_FROM_EMAIL must all be set.",
    );
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 502 });
  }

  const result = await sendViaPaubox(buildNotification(checked.inquiry, { from, to }), apiKey);
  if (!result.ok) {
    // Paubox's own error only — never the inquiry.
    console.error("[contact] Paubox refused the message:", result.status, result.detail);
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
