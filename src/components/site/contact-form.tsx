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
import { cn } from "@/lib/utils";

/**
 * The mock's field box: 52px tall, 16px of horizontal padding.
 *
 * Only the metrics are set here. The look the client asked for across this
 * redesign — no border, a faint fill, a single hairline underneath, accent when
 * focused — is already what `ui/input.tsx` and `ui/textarea.tsx` do, and those
 * two are shared with the CMS screens, so this scopes what is specific to the
 * public form and leaves the rest alone.
 *
 * The one place this form does not follow the mock is the hairline's alpha: the
 * mock draws it at 16% ink, which `ui/input.tsx` measured at 1.5:1 against the
 * fill and raised to `ink/28` (2.31:1) — the strongest CLAUDE.md § 3 allows.
 * Copying the mock back would take the field's only visible edge below the point
 * where it can be found.
 */
const FIELD_BOX = "min-h-[52px] px-4";

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
    //
    // `lg:pl-gutter` is the left half of what used to be the grid's column gap:
    // the section runs the photograph straight into the form (see
    // `home/contact-section.tsx`), so the breathing room between the two halves
    // is padding inside them.
    //
    // The gap is the form's whole vertical rhythm now — the fields used to carry
    // `py-6` each, which is what made the four short fields read as four rows of
    // a list instead of the 2×2 block the design locks in.
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      noValidate
      className="flex flex-col gap-[18px] lg:gap-[22px] lg:pl-gutter"
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

      {/* One 2×2 block, not two rows of two: the row gap is the form's gap and
          the column gap is the mock's 24px, so the four short fields read as a
          single unit against the message box below them. */}
      <div className="grid gap-x-[clamp(16px,1.7vw,24px)] gap-y-[18px] sm:grid-cols-2 lg:gap-y-[22px]">
        <Field id={field("fullName")} label={copy.fullName.label[locale]} error={errors.fullName?.message}>
          <Input
            id={field("fullName")}
            autoComplete="name"
            maxLength={120}
            placeholder={copy.fullName.placeholder[locale]}
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
            className={FIELD_BOX}
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
            className={FIELD_BOX}
          />
        </Field>

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
            className={FIELD_BOX}
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
            className={FIELD_BOX}
          />
        </Field>
      </div>

      {/* The message box is the row that stretches: from `lg` the form is as tall
          as the photograph beside it, and the design spends the surplus on the
          textarea rather than on gaps. `min-h` is the mock's phone height, which
          is also the floor wherever there is no surplus to take. */}
      <Field
        id={field("message")}
        label={copy.message.label[locale]}
        error={errors.message?.message}
        className="flex-1"
      >
        <Textarea
          id={field("message")}
          rows={5}
          maxLength={1000}
          placeholder={copy.message.placeholder[locale]}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
          className={cn(FIELD_BOX, "min-h-[132px] flex-1")}
        />
      </Field>

      {/* Bottom row, and the outcome line under it. `mt-auto` is on the wrapper
          so the submit control lands on the same baseline as the mini-stats in
          the photo column opposite.
          `flex-col-reverse` below `sm`: the mock puts the full-width button
          first on a phone and the privacy note under it, while the reading and
          tab order stay note-then-button. */}
      <div className="mt-auto">
        <div className="flex flex-col-reverse gap-[18px] sm:flex-row sm:items-center sm:justify-between sm:gap-7">
          <span className="max-w-[42ch] text-note text-faint">{note}</span>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={mutation.isPending}
            className="min-h-[56px] w-full px-[34px] sm:w-auto"
          >
            {mutation.isPending ? copy.sending[locale] : submitLabel}
          </Button>
        </div>

        {/* `empty:mt-0` rather than `empty:hidden`: the live region has to stay
            rendered for a screen reader to announce into it, and an empty block
            is already 0px tall — so it costs the bottom row nothing until there
            is something to say. */}
        <p aria-live="polite" className="mt-5 font-mono text-kicker empty:mt-0">
          {mutation.isSuccess ? <span className="text-accent">{copy.success[locale]}</span> : null}
          {mutation.isError ? (
            <span className="text-accent-hover">{describeError(mutation.error, locale, copy)}</span>
          ) : null}
        </p>
      </div>
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
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  /** Only the message field uses this — it is the row that stretches. */
  className?: string;
}) {
  return (
    // The 9px label-to-field gap of the mock, and no vertical padding: the
    // spacing between fields belongs to the grid/form gap now, so a field can be
    // a grid cell without inventing height of its own.
    <div className={cn("flex flex-col gap-[9px]", className)}>
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
