"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/types";
import { MAIL_HREF, SITE } from "@/content/site";
import { cn } from "@/lib/cn";

const CRM_API_URL = (
  process.env.NEXT_PUBLIC_PV_ONE_CRM_API_URL ?? "https://pvone-crm-api.fly.dev"
).trim().replace(/\/+$/, "");
const CRM_LANDING_PAGE = (process.env.NEXT_PUBLIC_PV_ONE_CRM_LANDING_PAGE ?? "pv-one-main").trim();
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/**
 * Client-side by necessity: form state + a submit-time swap to a thank-you
 * panel. The public CRM intake endpoint receives the lead directly from the
 * browser; no API key or secret is shipped with the request.
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
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    setSubmitError(null);
    setPending(true);

    // Not React state: a bot fills every input it finds via the DOM, a human
    // never sees this one to type into. Read it straight off the element.
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      if (!CRM_API_URL || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(CRM_LANDING_PAGE)) {
        setSubmitError(form.errorBody);
        return;
      }

      const query = new URLSearchParams({
        from: "landingpage",
        landingPage: CRM_LANDING_PAGE,
      });
      const pageQuery = new URLSearchParams(window.location.search);
      for (const key of UTM_KEYS) {
        const value = pageQuery.get(key);
        if (value) query.set(key, value);
      }

      const res = await fetch(`${CRM_API_URL}/sales/leads/intake?${query.toString()}`, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: values.company,
          contactName: values.name,
          email: values.email.trim().toLowerCase(),
          phone: values.phone,
          pain: values.message,
          website,
        }),
      });

      if (res.status === 202) {
        setValues({ name: "", company: "", email: "", phone: "", message: "" });
        setSubmitted(true);
        return;
      }

      if (res.status === 429) {
        const retryAfter = Number(res.headers.get("Retry-After") ?? 60);
        const waitSeconds = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60;
        setSubmitError(form.rateLimitBody.replace("{minutes}", String(Math.ceil(waitSeconds / 60))));
        return;
      }

      const problem = await res.json().catch(() => null) as { title?: unknown } | null;
      setSubmitError(
        res.status === 400
          ? form.invalidBody
          : typeof problem?.title === "string" && problem.title
            ? problem.title
            : form.errorBody,
      );
    } catch {
      setSubmitError(form.networkErrorBody);
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
      {/* Off-screen rather than type="hidden", so simple form-filling bots still
          see it. It is unreachable by keyboard and hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="name" label={form.nameLabel} required error={errors.name}>
        <input name="contactName" type="text" required maxLength={120} autoComplete="name" {...control("name")} />
      </Field>

      <Field id="company" label={form.companyLabel} required error={errors.company}>
        <input name="company" type="text" required maxLength={200} autoComplete="organization" {...control("company")} />
      </Field>

      <Field id="email" label={form.emailLabel} required error={errors.email}>
        <input name="email" type="email" required maxLength={254} autoComplete="email" {...control("email")} />
      </Field>

      <Field
        id="phone"
        label={form.phoneLabel}
        optionalLabel={form.optionalLabel}
        error={errors.phone}
      >
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          maxLength={40}
          pattern={"(?=(?:\\D*\\d){8,15}\\D*$)[\\d\\s+\\.\\(\\)\\-]+"}
          autoComplete="tel"
          {...control("phone")}
        />
      </Field>

      <Field
        id="message"
        label={form.messageLabel}
        optionalLabel={form.optionalLabel}
        error={errors.message}
        className="col-span-2"
      >
        <textarea name="pain" maxLength={1000} rows={3} placeholder={form.messagePlaceholder} {...control("message")} />
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
            {submitError}{" "}
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
