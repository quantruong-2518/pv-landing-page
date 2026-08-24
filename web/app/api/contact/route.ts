import { NextResponse } from "next/server";
import { LIMITS, hashIp, insert, isRateLimited, validate } from "@/lib/contact-submission";

/**
 * POST /api/contact — store one contact-form submission.
 *
 * A public write endpoint, so it is treated as hostile input end to end: same-origin
 * only, capped body, server-side validation that ignores whatever the client
 * validated, a honeypot, and a per-IP rate limit. Nothing the caller sends is echoed
 * back and no submission content is ever logged.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Same shape for every rejection a caller is allowed to distinguish. */
function fail(status: number, error: string, fields?: string[]) {
  return NextResponse.json(fields ? { error, fields } : { error }, { status });
}

/** Vercel sets x-forwarded-for; the client-controlled portion is everything after the first hop. */
function clientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim() || null;
  return req.headers.get("x-real-ip");
}

/**
 * A form POST from another origin is either a mistake or a CSRF attempt. There is no
 * session to ride here, but a public writer with no origin check is a free relay.
 */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser client; the rate limit still applies
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, "forbidden");

  const raw = await req.text();
  // Checked before parsing: a multi-megabyte body should cost nothing to refuse.
  if (raw.length > LIMITS.body) return fail(413, "too_large");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "invalid_json");
  }

  // Honeypot. A hidden input no human sees; bots fill every field they find. Answer
  // 200 so the bot records success and does not come back to probe for the real path.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const result = validate(body);
  if ("errors" in result) return fail(400, "invalid_fields", result.errors);

  const ip = clientIp(req);
  if (!ip) return fail(400, "no_client_ip");

  try {
    const ipHash = await hashIp(ip);
    if (await isRateLimited(ipHash)) return fail(429, "rate_limited");

    await insert(result.input, {
      ipHash,
      userAgent: req.headers.get("user-agent")?.slice(0, 512) ?? null,
    });
  } catch (err) {
    // Log the failure, never the submission: the payload is personal data and logs
    // are not a lawful place to keep it. The caller gets nothing specific either —
    // driver messages leak schema and configuration.
    console.error("[contact] submission failed:", err instanceof Error ? err.message : "unknown");
    return fail(500, "server_error");
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
