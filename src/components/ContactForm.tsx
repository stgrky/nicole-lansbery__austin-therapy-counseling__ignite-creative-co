"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-8 text-center">
        <p className="font-serif text-xl text-[var(--color-foreground)]">
          Thank you for reaching out.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
          Your message has been received, and you&rsquo;ll hear back
          personally.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="mt-4">
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </div>
      <div className="mt-4">
        <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
          How can I help?
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-[15px] text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" ? (
        <p className="mt-3 text-sm text-red-700">
          Something went wrong. Please try again, or email directly using the
          address above.
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
        This form is not for emergencies. If you are in crisis, call or text 988
        to reach the Suicide &amp; Crisis Lifeline.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-[15px] text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
