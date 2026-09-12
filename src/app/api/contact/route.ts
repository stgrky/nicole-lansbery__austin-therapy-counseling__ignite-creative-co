import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Email only, deliberately — no Sanity backup. A patient-facing contact form
 * can realistically receive PHI regardless of what the form asks for, and
 * Sanity's BAA status is unknown, so message content must never be written
 * there. Matches how ICC's own marketing site's form already works.
 */

const FROM =
  process.env.CONTACT_FROM_EMAIL ??
  "Website Inquiry <notifications@mail.ignitecreativeco.world>";

type Submission = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

async function notifyPractice(data: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !to) return false;

  const body = [
    `From: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to,
        // So the practice can simply hit reply and reach the visitor directly.
        reply_to: data.email,
        subject: `New message from ${data.name}`,
        text: body,
      }),
    });
    if (!response.ok) {
      console.error("[contact] Resend rejected:", await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Notification email failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { error: "Please include your name, email, and a message." },
      { status: 400 },
    );
  }

  const data: Submission = {
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    phone: body.phone ? String(body.phone).slice(0, 60) : undefined,
    message: String(body.message).slice(0, 5000),
  };

  const notified = await notifyPractice(data);

  if (!notified) {
    console.error("[contact] Notification email failed — message lost.");
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
