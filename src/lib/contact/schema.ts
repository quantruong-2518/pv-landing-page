import { z } from "zod";

import { LOCALES, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * One definition of a valid enquiry, used by the form and by the route handler.
 *
 * The client version carries the reader's language in its messages; the server
 * version does not, because nobody reads a 400 body. What matters is that both
 * enforce the same rules — a browser that skips the form cannot post a shape
 * the API would accept but the CRM would not.
 */
export function contactSchema(locale: Locale) {
  const errors = dictionary.home.contact.form.errors;

  return z.object({
    fullName: z.string().trim().min(1, errors.fullName[locale]),
    company: z.string().trim().min(1, errors.company[locale]),
    email: z.email(errors.email[locale]),
    phone: z.string().trim().optional().or(z.literal("")),
    message: z.string().trim().min(1, errors.message[locale]),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;

/** Server-side shape: the same rules plus the locale the enquiry came from. */
export const contactRequestSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  locale: z.enum(LOCALES),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
