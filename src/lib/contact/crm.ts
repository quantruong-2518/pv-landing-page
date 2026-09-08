/**
 * Browser client for the PV One CRM lead intake.
 *
 * The form posts straight here instead of round-tripping through an API
 * route: the endpoint is public by design (no key ships to the browser), so
 * there is nothing a server hop would protect. This restores the integration
 * that existed before the Next.js 16 rebuild reset the repo — see git commit
 * a103f00, "refactor(contact): post leads straight to the PV One CRM intake".
 */

const CRM_API_URL = (process.env.NEXT_PUBLIC_PV_ONE_CRM_API_URL ?? "https://pvone-crm-api.fly.dev")
  .trim()
  .replace(/\/+$/, "");
const CRM_LANDING_PAGE = (process.env.NEXT_PUBLIC_PV_ONE_CRM_LANDING_PAGE ?? "pv-one-main").trim();

/** Forwarded as query params when present; the CRM attributes the lead's channel with them. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export interface CrmLeadPayload {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  pain: string;
  /** Honeypot value read off the DOM at submit time; empty for a human. */
  website: string;
}

export type CrmSubmitErrorKind = "invalid" | "rate-limited" | "network" | "unavailable";

export class CrmSubmitError extends Error {
  readonly kind: CrmSubmitErrorKind;
  readonly retryAfterSeconds?: number;
  readonly title?: string;

  constructor(kind: CrmSubmitErrorKind, options?: { retryAfterSeconds?: number; title?: string }) {
    super(`CRM submit failed: ${kind}`);
    this.kind = kind;
    this.retryAfterSeconds = options?.retryAfterSeconds;
    this.title = options?.title;
  }
}

/** Landing-page slug must be lowercase-kebab: it is matched against PV_INTAKE_LANDING_PAGES on the CRM. */
function isConfigured(): boolean {
  return Boolean(CRM_API_URL) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(CRM_LANDING_PAGE);
}

export async function submitLeadToCrm(payload: CrmLeadPayload): Promise<void> {
  if (!isConfigured()) {
    throw new CrmSubmitError("unavailable");
  }

  const query = new URLSearchParams({ from: "landingpage", landingPage: CRM_LANDING_PAGE });
  const pageQuery = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = pageQuery.get(key);
    if (value) query.set(key, value);
  }

  let response: Response;
  try {
    response = await fetch(`${CRM_API_URL}/sales/leads/intake?${query.toString()}`, {
      method: "POST",
      credentials: "omit",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new CrmSubmitError("network");
  }

  if (response.status === 202) return;

  if (response.status === 429) {
    const retryAfter = Number(response.headers.get("Retry-After") ?? 60);
    throw new CrmSubmitError("rate-limited", {
      retryAfterSeconds: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60,
    });
  }

  if (response.status === 400) {
    throw new CrmSubmitError("invalid");
  }

  const problem = (await response.json().catch(() => null)) as { title?: unknown } | null;
  throw new CrmSubmitError("unavailable", {
    title: typeof problem?.title === "string" ? problem.title : undefined,
  });
}
