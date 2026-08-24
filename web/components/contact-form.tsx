"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/types";
import { MAIL_HREF, SITE } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Client-side by necessity: form state + a submit-time swap to a thank-you
 * panel. There is no backend in this lab (docs/00-brief.md), so "submit"
 * hands the filled-in fields to the visitor's own mail client via `mailto:`.
 * Every CTA on the site routes here; this form is the only thing that mails.
 */
export function ContactForm({ c }: { c: SiteContent }) {
  const { form } = c.contact;
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // The panel is shorter than the form it replaces, so without this the
  // confirmation renders above the scroll position and is never seen.
  useEffect(() => {
    if (!submitted) return;
    panelRef.current?.focus();
    panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [submitted]);

  function update(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // The form is `noValidate`: iOS Safari draws no native bubble, so the page
    // owns the error. The wording is still the browser's own localized message,
    // never a string invented here.
    const invalid: Record<string, string> = {};
    for (const el of Array.from(e.currentTarget.elements)) {
      const field = el as HTMLInputElement | HTMLTextAreaElement;
      if (!field.id || typeof field.checkValidity !== "function") continue;
      if (!field.checkValidity()) invalid[field.id] = field.validationMessage;
    }
    if (Object.keys(invalid).length > 0) {
      setErrors(invalid);
      document.getElementById(Object.keys(invalid)[0])?.focus();
      return;
    }
    setErrors({});

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
      <div ref={panelRef} tabIndex={-1} className="scroll-mt-6 focus:outline-none">
        <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">{form.successTitle}</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{form.successBody}</p>

        {/* The page shows these nowhere else since the pre-form block was dropped,
            so successBody's fallback clause points at this panel (backlog #28).
            The office picture used to close this panel; it moved to the left
            column on 2026-08-24 (GM) — two pending frames were on screen at once
            after submit, and the photograph is evidence for the decision to
            write, not a thank-you note. */}
        <dl className="mt-5 flex flex-wrap gap-x-10 border-t border-line pt-4">
          <div>
            <dt className={LABEL}>{c.labels.call}</dt>
            <dd>
              <a href={SITE.contact.phoneHref} className={CONTACT_LINK}>
                {SITE.contact.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className={LABEL}>{c.labels.email}</dt>
            <dd>
              <a href={MAIL_HREF} className={CONTACT_LINK}>
                {SITE.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    );
  }

  /** Shared wiring for one control: styling, and the error it currently owns. */
  function control(id: keyof typeof values) {
    const invalid = Boolean(errors[id]);
    return {
      id,
      value: values[id],
      onChange: update(id),
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `${id}-error` : undefined,
      className: cn(INPUT, invalid && "border-fg"),
    };
  }

  return (
    // `gap-5`, not `gap-6`: 16px controls are 4px taller each, and this block is
    // still one screen.
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="name" label={form.nameLabel} required error={errors.name}>
        <input type="text" required autoComplete="name" {...control("name")} />
      </Field>

      <Field id="company" label={form.companyLabel} required error={errors.company}>
        <input type="text" required autoComplete="organization" {...control("company")} />
      </Field>

      <Field id="email" label={form.emailLabel} required error={errors.email}>
        <input type="email" required autoComplete="email" {...control("email")} />
      </Field>

      <Field
        id="phone"
        label={form.phoneLabel}
        optionalLabel={form.optionalLabel}
        error={errors.phone}
      >
        <input type="tel" autoComplete="tel" {...control("phone")} />
      </Field>

      <Field
        id="message"
        label={form.messageLabel}
        required
        error={errors.message}
        className="sm:col-span-2"
      >
        <textarea required rows={4} placeholder={form.messagePlaceholder} {...control("message")} />
      </Field>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium tracking-wide text-primary-fg transition-colors hover:opacity-90 sm:px-6"
        >
          {c.contact.ctaPrimary}
        </button>
      </div>
    </form>
  );
}

/* `text-base`, not `text-sm`: anything under 16px makes iOS Safari zoom the page
   on focus and never zoom back. It also lifts the control to 46px, over the 44px
   touch floor. `line-strong` carries the 3:1 the old hairline border missed. */
const INPUT =
  "mt-1.5 w-full border border-line-strong bg-transparent px-3 py-2.5 text-base text-fg placeholder:text-subtle focus:border-primary focus:outline-none";

/* One step above the site's mono data label (FactRow, footer): 10.4px is fine
   for a fact you read once and a poor size for a field you have to fill in. */
const LABEL = "font-mono text-xs uppercase tracking-[0.14em] text-subtle";

/** 44px touch floor, same as the header and footer links. */
const CONTACT_LINK = "inline-flex min-h-11 items-center font-mono text-sm text-fg hover:text-accent";

function Field({
  id,
  label,
  required,
  optionalLabel,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  /** The browser's own localized validationMessage — never a string written here. */
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // Bottom-anchored column. Grid items stretch to the tallest cell in their
    // row, so a label that wraps to two lines used to carry its own control
    // that much lower than its neighbour's. Pinning the label-control pair to
    // the bottom aligns the controls at any width, and keeps the label next to
    // the field it names rather than opening a hole between them.
    <div className={cn("flex flex-col justify-end", className)}>
      <label htmlFor={id} className={LABEL}>
        {label}
        {required ? " *" : optionalLabel ? ` · ${optionalLabel}` : ""}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium leading-snug text-fg">
          {error}
        </p>
      ) : null}
    </div>
  );
}
