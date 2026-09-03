import type { Locale } from "@/lib/i18n/config";

/**
 * Every internal URL is built here. Changing the URL shape — dropping the
 * locale prefix, moving products under /san-pham — is then one edit, not a
 * grep across components.
 */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  products: (locale: Locale) => `/${locale}/products`,

  /** In-page anchors. Slugs stay Vietnamese in both locales so a link shared
   *  from the VI page still lands correctly on the EN page. */
  anchors: {
    top: "top",
    pim: "cong-nghe-pim",
    solutions: "giai-phap",
    news: "tin-tuc",
    contact: "lien-he",
    mint: "mint",
    papaya: "papaya",
    espresso: "espresso",
    eSeries: "e-series",
    software: "phan-mem",
    training: "dao-tao",
  },
} as const;

export type AnchorId = (typeof routes.anchors)[keyof typeof routes.anchors];

/** `/vi#lien-he` — an anchor on the current page. */
export const anchor = (id: AnchorId) => `#${id}`;

/** `/vi/products#mint` — an anchor on another page. */
export const homeAnchor = (locale: Locale, id: AnchorId) => `${routes.home(locale)}#${id}`;
export const productAnchor = (locale: Locale, id: AnchorId) => `${routes.products(locale)}#${id}`;

export const admin = {
  root: "/admin",
} as const;

export const external = {
  parent: "https://www.pebble-square.com",
  email: "contact@pebblevina.com",
  phone: "+84345913369",
  phoneDisplay: "0345 913 369",
} as const;

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the deploy environment;
 * everything SEO-facing (canonical, hreflang, sitemap, JSON-LD @id) reads it.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pebblevina.com").replace(
  /\/$/,
  "",
);

export const absolute = (path: string) => `${siteUrl}${path}`;
