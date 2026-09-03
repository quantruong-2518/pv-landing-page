/**
 * Locale model.
 *
 * The design mock swapped languages by rewriting `textContent` from `data-en`
 * attributes, which leaves one URL for two languages — invisible to search and
 * to answer engines. Here each language is its own prefixed route (`/vi`,
 * `/en`) so both get indexed, get hreflang, and render on the server.
 */
export const LOCALES = ["vi", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "vi";

/** BCP 47 tags for <html lang>, hreflang and OpenGraph. */
export const LOCALE_TAGS: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-US",
};

/** Label shown in the header toggle — always the language you would switch to. */
export const LOCALE_LABELS: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The other locale — the toggle only ever has one destination today. */
export function otherLocale(locale: Locale): Locale {
  return locale === "vi" ? "en" : "vi";
}

/** A string that exists in every locale. Enforced by the type, not by review. */
export type Localized = Record<Locale, string>;

/** Pick one language out of a `Localized` value. */
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}
