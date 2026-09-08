"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useId, useRef, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CrmSubmitError, submitLeadToCrm } from "@/lib/contact/crm";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * The enquiry form.
 *
 * The design mock only flipped a local flag on submit. Here submitting is a
 * real mutation straight against the PV One CRM intake (see
 * `@/lib/contact/crm`), plus things the mock had no reason to carry:
 *
 *  - field ids are namespaced with `useId`, so the form can appear twice on a
 *    page without two inputs claiming the same label;
 *  - the outcome is announced in an `aria-live` region *and* as a toast — the
 *    inline line is what a reader who missed the toast will still find;
 *  - failure says so, and distinguishes invalid input, rate limiting and a
 *    dead network instead of one generic message for all three;
 *  - a honeypot field (`website`) rides along for the CRM to judge — a bot's
 *    DOM scraper fills every input it finds, a human never sees this one.
 *
 * Both the submit label and the privacy note come from the CMS, which is why
 * they arrive as props rather than from the dictionary.
 */
export function ContactForm({
  locale,
  submitLabel,
  note,
}: {
  locale: Locale;
  submitLabel: string;
  note: string;
}) {
  const copy = dictionary.home.contact.form;
  const uid = useId();
  const field = (name: string) => `${uid}-${name}`;
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema(locale)),
    defaultValues: { fullName: "", company: "", email: "", phone: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: ContactInput) =>
      submitLeadToCrm({
        company: values.company,
        contactName: values.fullName,
        email: values.email.trim().toLowerCase(),
        phone: values.phone ?? "",
        pain: values.message,
        website: honeypotRef.current?.value ?? "",
      }),
    onSuccess: () => {
      toast.success(copy.success[locale]);
      reset();
    },
    onError: (error) => toast.error(describeError(error, locale, copy)),
  });

  return (
    // A flex column so the note/submit row can be pushed to the bottom: the
    // contact section is a full-height block and the photo card opposite
    // bottom-anchors its mini-stats the same way, so the two columns' last rows
    // stay on one line instead of drifting apart by the section's spare height.
    // Inert wherever the form is the tallest thing in its row.
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      noValidate
      className="flex flex-col"
    >
      {/* Off-screen rather than hidden, so a bot's DOM scraper still finds it.
          Read straight off the ref at submit time — it is not part of the
          zod-validated form state. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-x-col sm:grid-cols-2">
        <Field id={field("fullName")} label={copy.fullName.label[locale]} error={errors.fullName?.message}>
          <Input
            id={field("fullName")}
            autoComplete="name"
            maxLength={120}
            placeholder={copy.fullName.placeholder[locale]}
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
        </Field>

        <Field id={field("company")} label={copy.company.label[locale]} error={errors.company?.message}>
          <Input
            id={field("company")}
            autoComplete="organization"
            maxLength={200}
            placeholder={copy.company.placeholder[locale]}
            aria-invalid={Boolean(errors.company)}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid gap-x-col sm:grid-cols-2">
        <Field id={field("email")} label={copy.email.label[locale]} error={errors.email?.message}>
          <Input
            id={field("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder={copy.email.placeholder[locale]}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>

        <Field id={field("phone")} label={copy.phone.label[locale]}>
          <Input
            id={field("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder={copy.phone.placeholder[locale]}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field id={field("message")} label={copy.message.label[locale]} error={errors.message?.message}>
        <Textarea
          id={field("message")}
          rows={5}
          maxLength={1000}
          placeholder={copy.message.placeholder[locale]}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-7">
        <span className="max-w-[38ch] text-note text-faint">{note}</span>
        <Button type="submit" variant="primary" size="xl" mono={false} disabled={mutation.isPending}>
          <span>{mutation.isPending ? copy.sending[locale] : submitLabel}</span>
          <span aria-hidden>→</span>
        </Button>
      </div>

      <p aria-live="polite" className="mt-5 font-mono text-kicker">
        {mutation.isSuccess ? <span className="text-accent">{copy.success[locale]}</span> : null}
        {mutation.isError ? (
          <span className="text-accent-hover">{describeError(mutation.error, locale, copy)}</span>
        ) : null}
      </p>
    </form>
  );
}

/** Maps a CRM submit outcome to the reader's language; unrecognised errors fall back to the generic failure copy. */
function describeError(error: unknown, locale: Locale, copy: typeof dictionary.home.contact.form): string {
  if (error instanceof CrmSubmitError) {
    switch (error.kind) {
      case "invalid":
        return copy.invalidBody[locale];
      case "rate-limited": {
        const minutes = Math.max(1, Math.ceil((error.retryAfterSeconds ?? 60) / 60));
        return copy.rateLimitBody[locale].replace("{minutes}", String(minutes));
      }
      case "network":
        return copy.networkErrorBody[locale];
      case "unavailable":
        return error.title ?? copy.failure[locale];
    }
  }
  return copy.failure[locale];
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 py-6">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {error ? (
        <span role="alert" className="text-note text-accent-hover">
          {error}
        </span>
      ) : null}
    </div>
  );
}
