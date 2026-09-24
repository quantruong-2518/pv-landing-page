import type { MetadataRoute } from "next";

import { getPublishedAt } from "@/lib/content/store";
import { LOCALES, LOCALE_TAGS } from "@/lib/i18n/config";
import { absolute, PUBLIC_PRODUCT_SLUGS, routes } from "@/lib/routes";

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
    // One entry per *public* product line, derived from PUBLIC_PRODUCT_SLUGS
    // rather than hand-written literals — adding a fifth line only means
    // adding it to that list, and a slug in HIDDEN_PRODUCT_SLUGS (routes.ts)
    // never gets listed as a public URL. Priority sits just under the hub
    // (0.9): each page is a real ranking target for its own product subject,
    // but the hub is still the page most readers and crawlers should land on
    // first.
    ...PUBLIC_PRODUCT_SLUGS.map((slug) => ({
      url: absolute(routes.product(locale, slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: languagesFor((forLocale) => routes.product(forLocale, slug)) },
    })),
  ]);
}
