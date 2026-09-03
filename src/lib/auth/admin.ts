import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Access control for the CMS.
 *
 * The handoff is explicit that /admin must not be public, and the design mock
 * has no auth at all. This is the smallest thing that is actually a gate: a
 * shared password checked in constant time, exchanged for an HMAC-signed
 * httpOnly cookie that both the page and the content API verify.
 *
 * It is a single shared credential, so it is right for an internal tool behind
 * a small team and wrong the moment per-editor accounts or an audit trail
 * matter. Swap it for real sessions before it guards anything else.
 *
 * Configuration:
 *   ADMIN_PASSWORD  required in production — no password, no CMS.
 *   ADMIN_SECRET    optional; signing key, falls back to ADMIN_PASSWORD.
 */
const COOKIE_NAME = "pv_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function password(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

function secret(): string {
  return process.env.ADMIN_SECRET ?? password() ?? "pv-landing-lab-development";
}

/**
 * In development an unset password leaves the CMS open, so a fresh clone is
 * usable without setup. In production it locks the CMS instead — failing shut
 * is the only safe direction for a missing credential.
 */
export function isAuthDisabled(): boolean {
  return process.env.NODE_ENV !== "production" && !password();
}

function tokenFor(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Verify the request's session cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
  if (isAuthDisabled()) return true;
  if (!password()) return false;

  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(cookie) && safeEqual(cookie!, tokenFor("admin"));
}

/** Exchange the shared password for a session cookie. Returns false on a miss. */
export async function signInAdmin(candidate: string): Promise<boolean> {
  const expected = password();
  if (!expected || !safeEqual(candidate, expected)) return false;

  (await cookies()).set(COOKIE_NAME, tokenFor("admin"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return true;
}

export async function signOutAdmin(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

/** True when the CMS cannot be used at all because no password is configured. */
export function isAdminLocked(): boolean {
  return !isAuthDisabled() && !password();
}
