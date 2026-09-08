import { z } from "zod";

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * Client-side validation for the enquiry form. The form posts straight to the
 * PV One CRM intake (`@/lib/contact/crm`), which enforces its own limits
 * server-side — a browser that skips the form cannot post a shape this schema
 * would reject but the CRM would accept.
 */
export function contactSchema(locale: Locale) {
  const errors = dictionary.home.contact.form.errors;

  return z.object({
    fullName: z.string().trim().min(1, errors.fullName[locale]).max(120),
    company: z.string().trim().min(1, errors.company[locale]).max(200),
    email: z.email(errors.email[locale]).max(254),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    message: z.string().trim().min(1, errors.message[locale]).max(1000),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;
