/**
 * The consent record: what is stored in the browser, and the only module that
 * knows how it is encoded.
 *
 * Legal frame this implements — GDPR art. 4(11) and 7, ePrivacy art. 5(3), and
 * Nghị định 13/2023/NĐ-CP art. 11 all say the same three things: consent is a
 * clear affirmative act, refusing must cost no more effort than accepting, and
 * it can be withdrawn at any time. Three consequences show up in the code:
 *
 *  - no optional category may default to `true`, here or anywhere downstream;
 *  - nothing in an optional category may run before a record exists — which is
 *    why the analytics loader reads this state instead of the layout mounting
 *    a script and asking afterwards;
 *  - the record carries a version and a timestamp. Consent only covers what was
 *    asked at the moment it was asked, and a controller has to be able to say
 *    when it was given.
 */

export const CONSENT_COOKIE = "pv_consent";

/**
 * Bump when a category is added, or when an existing one starts doing something
 * the visitor was not told about. An older record then no longer counts as an
 * answer and the banner asks again — re-consent, not silent carry-over.
 */
export const CONSENT_VERSION = 1;

/**
 * 180 days. The CNIL guidance most EU banners follow puts the ceiling at 6
 * months for how long a refusal or an approval may be remembered before the
 * question is asked again.
 */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

/**
 * Categories the visitor actually decides. "Necessary" is deliberately not one
 * of them: the consent cookie itself and the CMS session cookie are what make
 * the site work, and offering a switch that cannot be turned off is a dark
 * pattern in its own right.
 */
export const OPTIONAL_CATEGORIES = ["analytics"] as const;

export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];

export type ConsentChoices = Record<OptionalCategory, boolean>;

/** The state before any answer, and the state a refusal writes. */
export const DENY_ALL: ConsentChoices = { analytics: false };

export const GRANT_ALL: ConsentChoices = { analytics: true };

export interface ConsentRecord extends ConsentChoices {
  /** Version of the category set the visitor was shown when they answered. */
  v: number;
  /** ISO 8601 — the "when was this given" a data-protection audit asks for. */
  ts: string;
}

/**
 * Cookies written by a category, to be removed the moment it is switched off.
 * Withdrawal that leaves the cookies in place is not withdrawal.
 *
 * `_ga` / `_ga_<container>` are GA4's client-id cookies and `_gid` is the
 * legacy daily one — matched by prefix because the container suffix is part of
 * the name.
 */
export const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid"] as const;

function decode(raw: string): ConsentRecord | null {
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    if (typeof parsed !== "object" || parsed === null) return null;

    const record = parsed as Partial<ConsentRecord>;
    // A record from an older category set is not an answer to the current
    // question, so it is treated as no answer at all rather than upgraded.
    if (record.v !== CONSENT_VERSION) return null;

    return {
      v: CONSENT_VERSION,
      ts: typeof record.ts === "string" ? record.ts : new Date().toISOString(),
      // Anything that is not literally `true` reads as a refusal: a corrupted
      // or hand-edited cookie must fail closed.
      analytics: record.analytics === true,
    };
  } catch {
    return null;
  }
}

/** The stored answer, or null when the visitor has not answered this version. */
export function readConsent(): ConsentRecord | null {
  if (typeof document === "undefined") return null;

  const prefix = `${CONSENT_COOKIE}=`;
  const raw = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length);

  return raw ? decode(raw) : null;
}

/** Persists an answer and returns the record that was written. */
export function writeConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = { ...choices, v: CONSENT_VERSION, ts: new Date().toISOString() };

  // `Secure` only over https. The dev build is served over plain http from the
  // WSL box's IP (CLAUDE.md §5), where a Secure cookie is silently dropped and
  // the banner would then reappear on every page load.
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}` +
    `; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;

  return record;
}

/**
 * Removes cookies left behind by a category the visitor just switched off.
 *
 * A cookie can only be deleted with the Domain and Path it was created with,
 * and gtag writes `_ga` on the registrable domain (`.pebblevina.com`) while
 * this document is on `www.` — so the expiry is repeated for the host and for
 * every parent domain up to the registrable one. Overshooting is harmless: an
 * expiry for a cookie that does not exist does nothing.
 */
export function eraseCookies(prefixes: readonly string[]): void {
  if (typeof document === "undefined") return;

  const labels = window.location.hostname.split(".");
  const domains = [
    undefined, // host-only, exactly as document.cookie would set it
    ...labels.map((_, index) => `.${labels.slice(index).join(".")}`),
  ];

  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name || !prefixes.some((prefix) => name.startsWith(prefix))) continue;

    for (const domain of domains) {
      document.cookie =
        `${name}=; Path=/; Max-Age=0; SameSite=Lax` + (domain ? `; Domain=${domain}` : "");
    }
  }
}
