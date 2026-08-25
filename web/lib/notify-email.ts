import { Resend } from "resend";
import { SITE } from "@/content/site";
import type { ContactInput } from "@/lib/contact-submission";

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
 * Notify the team by email that a submission landed. Called after `insert()`
 * already succeeded — a delivery failure here must never be allowed to turn a
 * saved submission into a user-facing error, so the caller wraps this in its
 * own try/catch rather than this function swallowing anything itself.
 */
export async function notifyContactSubmission(input: ContactInput): Promise<void> {
  const resend = new Resend(env("RESEND_API_KEY"));

  const lines = [
    `Name: ${input.name}`,
    `Company: ${input.company}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    "",
    input.message,
  ].filter((line): line is string => line !== null);

  const { error } = await resend.emails.send({
    from: env("RESEND_FROM_EMAIL"),
    to: SITE.contact.email,
    replyTo: input.email,
    subject: `New contact form submission — ${input.company || input.name}`,
    text: lines.join("\n"),
  });

  if (error) throw new Error(error.message);
}
