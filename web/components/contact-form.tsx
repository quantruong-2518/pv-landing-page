"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/types";
import { MAIL_HREF, SITE } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Client-side by necessity: form state + a submit-time swap to a thank-you
 * panel. "submit" posts to POST /api/contact, which saves the submission and
 * emails the team; nothing here talks to email directly. Every CTA on the
 * site routes here; this form is the only one that writes anywhere.
 */
export function ContactForm({
  c,
  successHeadingAs: SuccessHeading = "h2",
}: {
  c: SiteContent;
  successHeadingAs?: "h2" | "h3";
}) {
  const { form } = c.contact;
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [pending, setPending] = useState(false);
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    setSubmitError(false);
    setPending(true);

    // Not React state: a bot fills every input it finds via the DOM, a human
    // never sees this one to type into. Read it straight off the element.
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div ref={panelRef} tabIndex={-1} className="scroll-mt-6 focus:outline-none">
        <SuccessHeading className="text-2xl font-semibold leading-snug sm:text-3xl">
          {form.successTitle}
        </SuccessHeading>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{form.successBody}</p>
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
    // Two compact contact pairs keep all five controls in the phone viewport.
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-2 gap-3 sm:gap-4">
      {/* Honeypot: invisible to a person (off-screen, unreachable by Tab), but a
          bot's DOM scraper fills every input it finds. Matches the `website`
          check in app/api/contact/route.ts. Not part of `values` — read off the
          DOM at submit time so nothing has to render or track its state. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      />

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
        className="col-span-2"
      >
        <textarea required rows={3} placeholder={form.messagePlaceholder} {...control("message")} />
      </Field>

      <div className="col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={cn(
            "inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium tracking-wide text-primary-fg transition-colors hover:opacity-90 sm:w-auto sm:px-6",
            pending && "opacity-60",
          )}
        >
          {c.contact.ctaPrimary}
        </button>
        {submitError ? (
          <p role="alert" className="text-sm font-medium leading-snug text-fg">
            {form.errorBody}{" "}
            <a href={SITE.contact.phoneHref} className="underline">
              {SITE.contact.phone}
            </a>
            {" · "}
            <a href={MAIL_HREF} className="underline">
              {SITE.contact.email}
            </a>
          </p>
        ) : null}
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
