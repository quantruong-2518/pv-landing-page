import type { MetadataRoute } from "next";

import { LOCALES, LOCALE_TAGS } from "@/lib/i18n/config";
import { absolute, routes } from "@/lib/routes";

/**
 * Sitemap.
 *
 * Every page appears once per locale, and each entry declares the other
 * language through `alternates.languages` — the sitemap is the second place,
 * after the page head, where hreflang has to agree with itself.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languagesFor = (path: (locale: (typeof LOCALES)[number]) => string) =>
    Object.fromEntries(LOCALES.map((locale) => [LOCALE_TAGS[locale], absolute(path(locale))]));

  return LOCALES.flatMap((locale) => [
    {
      url: absolute(routes.home(locale)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: languagesFor(routes.home) },
    },
    {
      url: absolute(routes.products(locale)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages: languagesFor(routes.products) },
    },
  ]);
}
