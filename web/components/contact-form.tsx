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
  skin = "site",
}: {
  c: SiteContent;
  successHeadingAs?: "h2" | "h3";
  /**
   * `artboard` is the HOME contact section (Canva page 8): one column, rules
   * instead of boxes, and every size in `em` so the form scales with the canvas
   * that sets the em around it.
   */
  skin?: SkinName;
}) {
  const s = SKINS[skin];
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
        <SuccessHeading className={s.success}>{form.successTitle}</SuccessHeading>
        <p className={s.successBody}>{form.successBody}</p>
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
      className: cn(s.input, invalid && s.invalid),
    };
  }

  return (
    // Two compact contact pairs keep all five controls in the phone viewport.
    <form onSubmit={handleSubmit} noValidate className={s.form}>
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

      <Field id="name" label={form.nameLabel} required error={errors.name} skin={s}>
        <input name="contactName" type="text" required maxLength={120} autoComplete="name" placeholder={form.namePlaceholder} {...control("name")} />
      </Field>

      <Field id="company" label={form.companyLabel} required error={errors.company} skin={s}>
        <input name="company" type="text" required maxLength={200} autoComplete="organization" placeholder={form.companyPlaceholder} {...control("company")} />
      </Field>

      <Field id="email" label={form.emailLabel} required error={errors.email} skin={s}>
        <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder={form.emailPlaceholder} {...control("email")} />
      </Field>

      <Field
        id="phone"
        label={form.phoneLabel}
        optionalLabel={form.optionalLabel}
        error={errors.phone}
        skin={s}
      >
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          maxLength={40}
          pattern={"(?=(?:\\D*\\d){8,15}\\D*$)[\\d\\s+\\.\\(\\)\\-]+"}
          autoComplete="tel"
          placeholder={form.phonePlaceholder}
          {...control("phone")}
        />
      </Field>

      <Field
        id="message"
        label={form.messageLabel}
        optionalLabel={form.optionalLabel}
        error={errors.message}
        className={s.wide}
        skin={s}
      >
        <textarea
          name="pain"
          maxLength={1000}
          rows={3}
          placeholder={form.messagePlaceholder}
          {...control("message")}
          className={cn(s.textarea || s.input, errors.message && s.invalid)}
        />
      </Field>

      <div className={s.actions}>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={cn(s.button, pending && "opacity-60")}
        >
          {c.contact.ctaPrimary}
        </button>
        {submitError ? (
          <p role="alert" className={s.error}>
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
        <p className={s.note}>{form.privacyNote}</p>
      </div>
    </form>
  );
}

type SkinName = "site" | "artboard";

/* `text-base`, not `text-sm`: anything under 16px makes iOS Safari zoom the page
   on focus and never zoom back. It also lifts the control to 46px, over the 44px
   touch floor. `line-strong` carries the 3:1 the old hairline border missed.

   The artboard skin sizes in `em` on purpose — CONTACT on HOME lives inside a
   canvas that scales with the viewport, and a px control inside it would be the
   one element that refuses to scale. */
const SKINS = {
  site: {
    form: "grid grid-cols-2 gap-3 sm:gap-4",
    label: "font-mono text-xs uppercase tracking-[0.14em] text-subtle",
    input:
      "mt-1.5 w-full border border-line-strong bg-transparent px-3 py-2.5 text-base text-fg placeholder:text-subtle focus:border-primary focus:outline-none",
    textarea: "",
    invalid: "border-fg",
    wide: "col-span-2",
    actions: "col-span-2 flex flex-wrap items-center gap-4",
    button:
      "inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium tracking-wide text-primary-fg transition-colors hover:opacity-90 sm:w-auto sm:px-6",
    note: "hidden",
    error: "text-sm font-medium leading-snug text-fg",
    success: "text-2xl font-semibold leading-snug sm:text-3xl",
    successBody: "mt-3 max-w-md text-base leading-relaxed text-muted",
  },
  artboard: {
    form: "text-art-navy-deep grid grid-cols-1 gap-[0.6em]",
    label: "text-[1.03em] font-extrabold",
    input:
      "border-art-navy-deep/25 focus:border-art-blue mt-[0.3em] w-full border-0 border-b bg-transparent pb-[0.4em] text-[0.97em] font-light placeholder:text-art-navy-deep/55 focus:outline-none",
    textarea:
      "border-art-navy-deep/25 focus:border-art-blue mt-[0.3em] w-full rounded-[0.35em] border bg-transparent p-[0.6em] text-[0.97em] font-light placeholder:text-art-navy-deep/55 focus:outline-none",
    invalid: "border-art-blue-bright",
    wide: "",
    actions: "mt-[0.35em] flex flex-col gap-[0.55em]",
    button:
      "bg-art-blue flex w-full items-center justify-center gap-[0.5em] rounded-[0.4em] py-[0.8em] text-[1.15em] font-bold text-white transition-opacity hover:opacity-90",
    note: "text-art-navy-deep/85 text-center text-[0.78em] font-light",
    error: "text-[0.9em] font-medium leading-snug",
    success: "text-[1.6em] font-extrabold leading-snug",
    successBody: "mt-[0.6em] text-[1em] font-light leading-relaxed",
  },
} as const;

function Field({
  id,
  label,
  required,
  optionalLabel,
  error,
  className,
  skin,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  /** The browser's own localized validationMessage — never a string written here. */
  error?: string;
  className?: string;
  skin: (typeof SKINS)[SkinName];
  children: React.ReactNode;
}) {
  return (
    // Bottom-anchored column. Grid items stretch to the tallest cell in their
    // row, so a label that wraps to two lines used to carry its own control
    // that much lower than its neighbour's. Pinning the label-control pair to
    // the bottom aligns the controls at any width, and keeps the label next to
    // the field it names rather than opening a hole between them.
    <div className={cn("flex flex-col justify-end", className)}>
      <label htmlFor={id} className={skin.label}>
        {label}
        {required ? " *" : optionalLabel ? ` · ${optionalLabel}` : ""}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className={cn("mt-1.5", skin.error)}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
