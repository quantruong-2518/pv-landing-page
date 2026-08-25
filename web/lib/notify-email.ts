import { Resend } from "resend";
import { SITE } from "@/content/site";
import type { ContactInput } from "@/lib/contact-submission";
import { contactEmailHtml, contactEmailText } from "@/lib/contact-email-template";
import { LOGO_CONTENT_ID, LOGO_PNG_BASE64 } from "@/lib/contact-email-assets";

/**
 * Server-only, same as contact-submission.ts: reads RESEND_API_KEY from env.
 * Never import this from a "use client" module.
 */

function env(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

/**
 * `name` and `company` are free text with no newline check upstream — bare
 * user input has no business landing in a header or subject line unescaped.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Notify the team by email that a submission landed. Called after `insert()`
 * already succeeded — a delivery failure here must never be allowed to turn a
 * saved submission into a user-facing error, so the caller wraps this in its
 * own try/catch rather than this function swallowing anything itself.
 *
 * Ships both a branded HTML view and a stable "Label: value" text fallback.
 * The `X-Contact-*` headers repeat the same fields verbatim — no CRM is
 * wired up yet, but an inbound-email rule can read these directly instead of
 * parsing prose once one exists.
 */
export async function notifyContactSubmission(input: ContactInput): Promise<void> {
  const resend = new Resend(env("RESEND_API_KEY"));
  const submittedAt = new Date();

  const { error } = await resend.emails.send({
    from: env("RESEND_FROM_EMAIL"),
    to: SITE.contact.email,
    replyTo: input.email,
    subject: `Yêu cầu liên hệ mới — ${headerSafe(input.company || input.name)}`,
    html: contactEmailHtml(input, submittedAt),
    text: contactEmailText(input, submittedAt),
    attachments: [
      {
        filename: "pebble-vina-mark.png",
        content: LOGO_PNG_BASE64,
        contentType: "image/png",
        inlineContentId: LOGO_CONTENT_ID,
      },
    ],
    headers: {
      "X-Contact-Name": headerSafe(input.name),
      "X-Contact-Company": headerSafe(input.company),
      "X-Contact-Email": input.email,
      ...(input.phone ? { "X-Contact-Phone": input.phone } : {}),
    },
  });

  if (error) throw new Error(error.message);
}
