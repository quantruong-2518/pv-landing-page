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
 * Business decision 2026-09-24: E-Series (E10 / E20, "GP-GPU / GP-DSA") is
 * pulled from the public site — no page, no catalogue card, no JSON-LD, no
 * mention in generated text — while its content, dictionary copy and the
 * `ESeriesCards` component all stay in the codebase so it can come back with
 * a one-line change here. `PRODUCT_SLUGS` keeps listing every line (the CMS
 * still edits E-Series content); every public-facing surface must read
 * `PUBLIC_PRODUCT_SLUGS` / `isPublicProduct` instead.
 */
export const HIDDEN_PRODUCT_SLUGS = ["e-series"] as const satisfies readonly ProductSlug[];
export type HiddenProductSlug = (typeof HIDDEN_PRODUCT_SLUGS)[number];

export const PUBLIC_PRODUCT_SLUGS = PRODUCT_SLUGS.filter(
  (slug): slug is Exclude<ProductSlug, HiddenProductSlug> =>
    !(HIDDEN_PRODUCT_SLUGS as readonly ProductSlug[]).includes(slug),
);

export function isPublicProduct(slug: ProductSlug): boolean {
  return !(HIDDEN_PRODUCT_SLUGS as readonly ProductSlug[]).includes(slug);
}

/**
 * Every internal URL is built here. Changing the URL shape — dropping the
 * locale prefix, moving products under /san-pham — is then one edit, not a
 * grep across components.
 */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  products: (locale: Locale) => `/${locale}/products`,
  product: (locale: Locale, slug: ProductSlug) => `/${locale}/products/${slug}`,
  /** Static siblings of `[product]/page.tsx` — Next resolves a static segment
   *  before the dynamic one at the same level, so `/products/software` never
   *  reaches `isProductSlug` in that file (DARK-BUILD-brief PART B). */
  productSoftware: (locale: Locale) => `/${locale}/products/software`,
  productTraining: (locale: Locale) => `/${locale}/products/training`,
  bio: (locale: Locale) => `/${locale}/bio`,
  news: (locale: Locale) => `/${locale}/news`,

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

/**
 * Software and training used to be sections on `/products` itself
 * (`#phan-mem` / `#dao-tao`, `routes.anchors.software` / `.training`) — the
 * P2 solution cards (catalogue.tsx) and the home solutions row that names
 * "CRM" (solutions-list.tsx) both linked into them. DARK-BUILD-brief PART B
 * gives each its own page and removes those sections from the hub, so both
 * call sites resolve through this map instead of the anchor. Keyed by the
 * same anchor id `catalog.other[].anchor` / `solutions.rows[].anchor`
 * (dictionary.ts) already store, so neither CMS-adjacent list has to change.
 */
export const SOLUTION_ANCHOR_TO_ROUTE: Partial<Record<AnchorId, (locale: Locale) => string>> = {
  [routes.anchors.software]: routes.productSoftware,
  [routes.anchors.training]: routes.productTraining,
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
