/**
 * Locale model.
 *
 * The design mock swapped languages by rewriting `textContent` from `data-en`
 * attributes, which leaves one URL for two languages — invisible to search and
 * to answer engines. Here each language is its own prefixed route (`/vi`,
 * `/en`, `/ko`) so every language gets indexed, gets hreflang, and renders on
 * the server.
 *
 * Vietnamese is the source language: it is the one the company writes and
 * reviews, and English and Korean are translations of it. Anything added here
 * has to be added in all three — the `Localized` type is what enforces that.
 */
export const LOCALES = ["vi", "en", "ko"] as const;

export type Locale = (typeof LOCALES)[number];

/** The language the copy is authored in, and the target of `x-default`. */
export const DEFAULT_LOCALE: Locale = "vi";

/** BCP 47 tags for <html lang>, hreflang and OpenGraph. */
export const LOCALE_TAGS: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-US",
  ko: "ko-KR",
};

/** Two-letter code shown in the switcher and in the CMS column headings. */
export const LOCALE_LABELS: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
  ko: "KO",
};

/**
 * The language's name in itself. A reader who cannot read the current page is
 * exactly the reader the switcher is for, so the list must be legible to them:
 * "한국어", not "Korean".
 */
export const LOCALE_NAMES: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
  ko: "한국어",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Every language except the one being read — the switcher's destinations. */
export function otherLocales(locale: Locale): Locale[] {
  return LOCALES.filter((candidate) => candidate !== locale);
}

/** A string that exists in every locale. Enforced by the type, not by review. */
export type Localized = Record<Locale, string>;

/** Pick one language out of a `Localized` value. */
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}
