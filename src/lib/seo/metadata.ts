import type { Metadata } from "next";

import { LOCALES, LOCALE_TAGS, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { absolute, siteUrl } from "@/lib/routes";

/**
 * Per-page metadata.
 *
 * Both languages are separate URLs, so every page declares its own canonical
 * plus the full hreflang set. `x-default` points at Vietnamese: the company is
 * Vietnamese and that is the page a locale-less visitor should land on.
 */
type PageKey = "home" | "products";

const PATHS: Record<PageKey, (locale: Locale) => string> = {
  home: (locale) => `/${locale}`,
  products: (locale) => `/${locale}/products`,
};

function languageAlternates(page: PageKey): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[LOCALE_TAGS[locale]] = absolute(PATHS[page](locale));
  }
  alternates["x-default"] = absolute(PATHS[page]("vi"));
  return alternates;
}

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
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Pebble Vina",
      title: copy.title[locale],
      description: copy.description[locale],
      locale: LOCALE_TAGS[locale].replace("-", "_"),
      images: [
        {
          // The hero render is the only 3840x2160 asset in the bundle and is
          // the picture the company leads with everywhere else.
          url: "/images/chip-hero.png",
          width: 1200,
          height: 630,
          alt: "Pebble Vina",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title[locale],
      description: copy.description[locale],
      images: ["/images/chip-hero.png"],
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
