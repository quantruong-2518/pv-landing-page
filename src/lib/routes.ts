import type { Locale } from "@/lib/i18n/config";

/**
 * The four product lines, each getting its own page at
 * `/[locale]/products/<slug>` instead of sharing `/[locale]/products#<anchor>`
 * with the other three — one URL cannot rank for four different product
 * subjects. Order is cosmetic here (it is not used to render anything); the
 * page that lists them decides display order.
 */
export const PRODUCT_SLUGS = ["mint", "papaya", "espresso", "e-series"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/**
 * Every internal URL is built here. Changing the URL shape — dropping the
 * locale prefix, moving products under /san-pham — is then one edit, not a
 * grep across components.
 */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  products: (locale: Locale) => `/${locale}/products`,
  product: (locale: Locale, slug: ProductSlug) => `/${locale}/products/${slug}`,
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
    bioFaq: "hoi-dap",
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

/**
 * A product's URL slug does not match the key its CMS section is stored
 * under (`src/lib/content/schema.ts`, `productContentSchema`): the slug
 * `e-series` reads better in a URL than the schema's `eseries`, and the
 * schema key predates the slug. Resolving through this map means the schema
 * key never has to be guessed or re-typed at each call site — `getPageContent
 * ("product").<key>` always uses `PRODUCT_SLUG_TO_CONTENT_KEY[slug]`.
 */
export const PRODUCT_SLUG_TO_CONTENT_KEY: Record<ProductSlug, "mint" | "papaya" | "espresso" | "eseries"> =
  {
    mint: "mint",
    papaya: "papaya",
    espresso: "espresso",
    "e-series": "eseries",
  };

/**
 * A product's URL slug does not match the anchor id it used before it had
 * its own page (`routes.anchors`, e.g. `eSeries: "e-series"` is keyed by a
 * camelCase property name, not the slug). The home page still links into
 * these anchors on the hub, so this map is how a caller converts a slug into
 * the anchor it needs without re-deriving the correspondence by hand.
 */
export const PRODUCT_SLUG_TO_ANCHOR: Record<ProductSlug, AnchorId> = {
  mint: routes.anchors.mint,
  papaya: routes.anchors.papaya,
  espresso: routes.anchors.espresso,
  "e-series": routes.anchors.eSeries,
};

export const admin = {
  root: "/admin",
} as const;

export const external = {
  parent: "https://www.pebble-square.com",
  email: "contact@pebblevina.com",
  phone: "+84345913369",
  phoneDisplay: "0345 913 369",

  /**
   * Feeds `Organization.sameAs` in `src/lib/seo/jsonld.ts`, which is how
   * Google ties this site to a known entity elsewhere on the web. Only the
   * company's own profiles belong here — its LinkedIn page, its YouTube
   * channel, its Crunchbase entry — never a directory or article a third
   * party runs about the company. Empty for now because nobody has supplied
   * these URLs yet; do not guess them in. Fill in as `["https://...", ...]`
   * once they exist.
   */
  social: [] as const,
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
