import type { Metadata } from "next";

import { LOCALES, LOCALE_TAGS, otherLocales, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { absolute, siteUrl } from "@/lib/routes";

/**
 * Per-page metadata.
 *
 * Both languages are separate URLs, so every page declares its own canonical
 * plus the full hreflang set. `x-default` points at Vietnamese: the company is
 * Vietnamese and that is the page a locale-less visitor should land on.
 */
type PageKey = "home" | "products" | "bio";

const PATHS: Record<PageKey, (locale: Locale) => string> = {
  home: (locale) => `/${locale}`,
  products: (locale) => `/${locale}/products`,
  bio: (locale) => `/${locale}/bio`,
};

function languageAlternates(page: PageKey): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[LOCALE_TAGS[locale]] = absolute(PATHS[page](locale));
  }
  alternates["x-default"] = absolute(PATHS[page]("vi"));
  return alternates;
}

/**
 * The `<link rel="alternate" type="text/plain">` pointing at /llms.txt.
 *
 * It is declared here rather than only in the layout because Metadata objects
 * merge *shallowly*: a page that sets `alternates` replaces the layout's
 * `alternates` wholesale, `types` included (generate-metadata.md, "Merging" —
 * "Duplicate keys are replaced based on their ordering"). Every one of the nine
 * public pages sets `alternates.canonical` below, so a `types` entry that lived
 * only in the layout would be dropped on exactly the pages that need to
 * advertise the file. Pulling the shared nested field into a variable is the
 * remedy that doc prescribes.
 */
const LLMS_TXT_ALTERNATE: NonNullable<Metadata["alternates"]>["types"] = {
  "text/plain": [{ title: "llms.txt — Pebble Vina for AI assistants", url: absolute("/llms.txt") }],
};

export function buildMetadata(page: PageKey, locale: Locale): Metadata {
  const copy = dictionary.meta[page];
  const url = absolute(PATHS[page](locale));

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title[locale],
    description: copy.description[locale],
    alternates: {
      canonical: url,
      languages: languageAlternates(page),
      types: LLMS_TXT_ALTERNATE,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Pebble Vina",
      title: copy.title[locale],
      description: copy.description[locale],
      locale: LOCALE_TAGS[locale].replace("-", "_"),
      // Tells a social crawler the other two languages exist for this same
      // page, so it can offer the right one instead of only ever the
      // locale that happened to get crawled first.
      alternateLocale: otherLocales(locale).map((other) => LOCALE_TAGS[other].replace("-", "_")),
      // No `images` here on purpose: an explicit `images` entry in
      // generateMetadata overrides the `opengraph-image.tsx` file convention
      // under `src/app/(public)/[locale]/`, which renders the correct
      // 1200x630 crop and injects the tag itself. The image this used to
      // hardcode — ai-semiconductor-hero-v2.png — is actually 1536x1024, so
      // the width/height declared here were wrong and every social card
      // cropped off-centre.
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title[locale],
      description: copy.description[locale],
      // Same reasoning as openGraph.images above: leave this to the
      // twitter-image.tsx file convention rather than overriding it.
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
