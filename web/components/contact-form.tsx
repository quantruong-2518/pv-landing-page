"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/types";
import { SITE } from "@/content/site";
import { Figure } from "@/components/ui";

/**
 * Client-side by necessity: form state + a submit-time swap to a thank-you
 * panel. There is no backend in this lab (docs/00-brief.md), so "submit"
 * hands the filled-in fields to the visitor's own mail client via `mailto:`.
 * Every CTA on the site routes here; this form is the only thing that mails.
 */
export function ContactForm({ c }: { c: SiteContent }) {
  const { form } = c.contact;
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function update(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Consultation request — ${values.company || values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Company: ${values.company}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      "",
      values.message,
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">{form.successTitle}</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{form.successBody}</p>
        <Figure
          media={c.contact.media}
          ratio="aspect-[3/2]"
          sizes="(min-width: 1024px) 25vw, 100vw"
          pendingLabel={c.ui.imagePending}
          className="mt-6"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field id="name" label={form.nameLabel} required>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          className={INPUT}
        />
      </Field>

      <Field id="company" label={form.companyLabel} required>
        <input
          id="company"
          type="text"
          required
          autoComplete="organization"
          value={values.company}
          onChange={update("company")}
          className={INPUT}
        />
      </Field>

      <Field id="email" label={form.emailLabel} required>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          className={INPUT}
        />
      </Field>

      <Field id="phone" label={form.phoneLabel} optionalLabel={form.optionalLabel}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={update("phone")}
          className={INPUT}
        />
      </Field>

      <Field id="message" label={form.messageLabel} required className="sm:col-span-2">
        <textarea
          id="message"
          required
          rows={4}
          placeholder={form.messagePlaceholder}
          value={values.message}
          onChange={update("message")}
          className={INPUT}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium tracking-wide text-primary-fg transition-colors hover:opacity-90 sm:px-6"
        >
          {c.contact.ctaPrimary}
        </button>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">{form.requiredNote}</p>
      </div>
    </form>
  );
}

const INPUT =
  "mt-1.5 w-full border border-line bg-transparent px-3 py-2.5 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none";

function Field({
  id,
  label,
  required,
  optionalLabel,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
        {label}
        {required ? " *" : optionalLabel ? ` · ${optionalLabel}` : ""}
      </label>
      {children}
    </div>
  );
}
