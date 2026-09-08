import type { Locale } from "@/lib/i18n/config";

/**
 * Every internal URL is built here. Changing the URL shape — dropping the
 * locale prefix, moving products under /san-pham — is then one edit, not a
 * grep across components.
 */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  products: (locale: Locale) => `/${locale}/products`,
  bio: (locale: Locale) => `/${locale}/bio`,

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

    /** /bio only. Same rule as above: Vietnamese slugs in both locales. */
    bioWork: "linh-vuc",
    bioTech: "huong-cong-nghe",
    bioFigures: "con-so",
    bioTimeline: "lo-trinh",
    bioPartners: "hop-tac",
    bioLegal: "phap-nhan",
  },
} as const;

export type AnchorId = (typeof routes.anchors)[keyof typeof routes.anchors];

/** `/vi#lien-he` — an anchor on the current page. */
export const anchor = (id: AnchorId) => `#${id}`;

/** `/vi/products#mint` — an anchor on another page. */
export const homeAnchor = (locale: Locale, id: AnchorId) => `${routes.home(locale)}#${id}`;
export const productAnchor = (locale: Locale, id: AnchorId) => `${routes.products(locale)}#${id}`;
export const bioAnchor = (locale: Locale, id: AnchorId) => `${routes.bio(locale)}#${id}`;

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
 * everything SEO-facing (canonical, hreflang, sitemap, JSON-LD @id, the robots
 * `host` line) reads it.
 *
 * `www.` is not cosmetic. Measured against production on 2026-09-08:
 *
 *   pebblevina.com      A 216.198.79.1    Vercel; 308s to www, but the
 *                                         certificate it serves has exactly one
 *                                         SAN — www.pebblevina.com
 *   pebblevina.com      A 162.255.119.15  Namecheap URL Forwarding; does not
 *                                         answer on 443 at all
 *   www.pebblevina.com                    Vercel, valid Let's Encrypt cert
 *
 * https://pebblevina.com therefore fails the hostname check on one address and
 * times out on the other, at random per DNS answer — which is what visitors
 * were seeing as "Your connection is not private". Naming the apex in canonical
 * and hreflang told search engines and every social crawler that the broken
 * host was the real one.
 *
 * `www` is already the primary domain in Vercel, so it is the host the metadata
 * should name. Move this back to the apex only after the apex has its own
 * certificate — see README, "Tên miền và chứng chỉ".
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pebblevina.com").replace(
  /\/$/,
  "",
);

export const absolute = (path: string) => `${siteUrl}${path}`;
