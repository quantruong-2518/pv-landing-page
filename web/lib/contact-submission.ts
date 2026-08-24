import { neon } from "@neondatabase/serverless";

/**
 * Server-only. Validation, rate limiting and the insert for the contact form.
 * Never import this from a "use client" module — it reads secrets from env.
 */

export const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  message: 4000,
  /** Whole request body, bytes. Read before parsing so a huge body is cheap to reject. */
  body: 16 * 1024,
} as const;

/** Submissions allowed from one IP inside RATE_WINDOW_MINUTES. */
export const RATE_LIMIT = 3;
export const RATE_WINDOW_MINUTES = 10;

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string;
};

/**
 * Conservative on purpose. This decides whether we accept a submission, not whether
 * an address is deliverable — only sending can settle that. Anything stricter starts
 * rejecting real addresses, which costs a lead.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const PHONE = /^[\d+()\-. ]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Returns the field names that failed. The API answers with this list and nothing
 * else — the client already knows what it sent, and an error that echoes input back
 * is a reflection surface.
 */
export function validate(raw: unknown): { input: ContactInput } | { errors: string[] } {
  if (typeof raw !== "object" || raw === null) return { errors: ["body"] };
  const body = raw as Record<string, unknown>;
  const errors: string[] = [];

  const name = clean(body.name);
  const company = clean(body.company);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const message = clean(body.message);

  if (name.length < 1 || name.length > LIMITS.name) errors.push("name");
  if (company.length < 1 || company.length > LIMITS.company) errors.push("company");
  if (email.length < 3 || email.length > LIMITS.email || !EMAIL.test(email)) errors.push("email");
  if (phone.length > LIMITS.phone || (phone.length > 0 && !PHONE.test(phone))) errors.push("phone");
  if (message.length < 1 || message.length > LIMITS.message) errors.push("message");

  if (errors.length > 0) return { errors };
  return { input: { name, company, email, phone: phone || null, message } };
}

function env(key: string): string {
  const value = process.env[key];
  // Fail closed. A missing salt would otherwise silently downgrade IP hashing to
  // something reversible, and a missing URL would surface as a driver error.
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

/**
 * Salted SHA-256, hex. Web Crypto so this runs on either runtime. The salt is what
 * makes it more than a lookup table — IPv4 is only 2^32 wide.
 */
export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`${env("CONTACT_IP_SALT")}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function db() {
  return neon(env("DATABASE_URL"));
}

/** True when this IP has already used up its allowance for the window. */
export async function isRateLimited(ipHash: string): Promise<boolean> {
  const sql = db();
  const rows = await sql`
    select count(*)::int as count
      from contact_submission
     where ip_hash = ${ipHash}
       and created_at > now() - make_interval(mins => ${RATE_WINDOW_MINUTES}::int)
  `;
  return (rows[0]?.count ?? 0) >= RATE_LIMIT;
}

export async function insert(
  input: ContactInput,
  meta: { ipHash: string; userAgent: string | null; sourcePage?: string },
): Promise<void> {
  const sql = db();
  // Tagged template — every ${} is a bound parameter, never string-concatenated.
  await sql`
    insert into contact_submission (name, company, email, phone, message, source_page, ip_hash, user_agent)
    values (
      ${input.name}, ${input.company}, ${input.email}, ${input.phone}, ${input.message},
      ${meta.sourcePage ?? "contact"}, ${meta.ipHash}, ${meta.userAgent}
    )
  `;
}
