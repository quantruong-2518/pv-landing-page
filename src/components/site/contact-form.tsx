"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useId, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/api/content";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * The enquiry form.
 *
 * The design mock only flipped a local flag on submit. Here submitting is a
 * real mutation against /api/contact, plus three things the mock had no reason
 * to carry:
 *
 *  - field ids are namespaced with `useId`, so the form can appear twice on a
 *    page without two inputs claiming the same label;
 *  - the outcome is announced in an `aria-live` region *and* as a toast — the
 *    inline line is what a reader who missed the toast will still find;
 *  - failure says so, instead of silently pretending the message was sent.
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
    mutationFn: (values: ContactInput) => submitContact({ ...values, locale }),
    onSuccess: () => {
      toast.success(copy.success[locale]);
      reset();
    },
    onError: () => toast.error(copy.failure[locale]),
  });

  return (
    <form onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate>
      <div className="grid gap-x-col sm:grid-cols-2">
        <Field id={field("fullName")} label={copy.fullName.label[locale]} error={errors.fullName?.message}>
          <Input
            id={field("fullName")}
            autoComplete="name"
            placeholder={copy.fullName.placeholder[locale]}
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
        </Field>

        <Field id={field("company")} label={copy.company.label[locale]} error={errors.company?.message}>
          <Input
            id={field("company")}
            autoComplete="organization"
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
            placeholder={copy.phone.placeholder[locale]}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field id={field("message")} label={copy.message.label[locale]} error={errors.message?.message}>
        <Textarea
          id={field("message")}
          rows={5}
          placeholder={copy.message.placeholder[locale]}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-5 pt-7">
        <span className="max-w-[38ch] text-[0.8125rem] leading-[1.6] text-faint">{note}</span>
        <Button type="submit" variant="primary" size="xl" mono={false} disabled={mutation.isPending}>
          <span>{mutation.isPending ? copy.sending[locale] : submitLabel}</span>
          <span aria-hidden>→</span>
        </Button>
      </div>

      <p aria-live="polite" className="mt-5 font-mono text-[0.75rem] tracking-[0.09em]">
        {mutation.isSuccess ? <span className="text-accent">{copy.success[locale]}</span> : null}
        {mutation.isError ? <span className="text-accent-hover">{copy.failure[locale]}</span> : null}
      </p>
    </form>
  );
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
        <span role="alert" className="text-[0.8125rem] text-accent-hover">
          {error}
        </span>
      ) : null}
    </div>
  );
}
