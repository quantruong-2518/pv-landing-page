import type { MetadataRoute } from "next";

import { getPublishedAt } from "@/lib/content/store";
import { LOCALES, LOCALE_TAGS } from "@/lib/i18n/config";
import { absolute, routes } from "@/lib/routes";

/**
 * Sitemap.
 *
 * Every page appears once per locale, and each entry declares the other
 * language through `alternates.languages` — the sitemap is the second place,
 * after the page head, where hreflang has to agree with itself.
 *
 * `lastModified` used to be `new Date()`, stamped fresh on every build — every
 * URL then claimed to have changed at every deploy, including deploys that
 * touched no content at all. A crawler that notices `lastmod` always equal to
 * "now" learns to distrust it, which is worse than shipping no `lastmod`.
 * `getPublishedAt()` (`src/lib/content/store.ts`) is the one honest value on
 * hand: the last time the CMS document was actually written, falling back to
 * the seed copy's own last hand-edit date if nothing has been published yet.
 * One timestamp for every URL because the store publishes the document as a
 * whole — see `saveSection`/`resetSection` — not per page.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getPublishedAt();

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
    {
      url: absolute(routes.bio(locale)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: languagesFor(routes.bio) },
    },
  ]);
}
