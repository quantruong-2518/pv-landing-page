import { LOCALES, LOCALE_TAGS, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import {
  absolute,
  external,
  PRODUCT_SLUG_TO_CONTENT_KEY,
  PUBLIC_PRODUCT_SLUGS,
  routes,
  siteUrl,
  type ProductSlug,
} from "@/lib/routes";

/**
 * Structured data.
 *
 * This is the part of the page an answer engine can quote without guessing, so
 * it repeats what the page already says and adds nothing it does not.
 *
 * One rule holds throughout: a chip that has not shipped is not offered for
 * sale. Roadmap parts carry no `offers` and say so in `additionalProperty`
 * instead — ESPRESSO (Q3/2026) and the enterprise software (12/2026) are
 * announcements, and marking them purchasable would be a false claim in a
 * machine-readable field, which is the worst place to make one.
 */

const ORGANISATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

/**
 * Shared by every page-level node below. `dateModified` has to come from the
 * caller's own record of when the content last changed (e.g. a CMS
 * document's `updatedAt`) — this file has no store access and must not
 * default to `new Date()`, which would print "just edited" on every build
 * whether or not anything changed. That is a false freshness signal in a
 * field search engines read as fact.
 */
export interface DatedPageOptions {
  /** ISO 8601 timestamp, e.g. `content.updatedAt.toISOString()`. */
  dateModified: string;
}

export function organisationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANISATION_ID,
    name: "Pebble Vina",
    legalName: dictionary.footer.legalEntity,
    url: absolute(routes.home(locale)),
    logo: absolute("/images/logo.png"),
    image: absolute("/images/semiconductor-rd-headquarters-v2.png"),
    description: dictionary.meta.organisation[locale],
    taxID: dictionary.footer.taxCode,
    email: external.email,
    telephone: external.phone,
    // `external.social` is empty until someone supplies the company's own
    // profile URLs (see routes.ts) — an empty `sameAs: []` would be noise a
    // crawler has to discard, so the key is omitted entirely until then.
    ...(external.social.length > 0 ? { sameAs: external.social } : {}),
    address: {
      "@type": "PostalAddress",
      // One entry per locale rather than a vi/not-vi ternary: a Korean reader
      // gets a Korean address, and adding a language means adding a row here
      // instead of nesting a second condition.
      streetAddress: {
        vi: "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy",
        en: "Office O1912, 19th floor, Landmark 72 Tower, Zone E6, Cau Giay New Urban Area",
        ko: "꺼우저이 신도시 E6구역, Landmark 72 Tower 19층 O1912호",
      }[locale],
      addressLocality: { vi: "Phường Yên Hoà", en: "Yen Hoa Ward", ko: "옌호아동" }[locale],
      addressRegion: { vi: "Hà Nội", en: "Hanoi", ko: "하노이" }[locale],
      addressCountry: "VN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: external.phone,
        email: external.email,
        availableLanguage: [...LOCALES],
        areaServed: "VN",
      },
    ],
    // The parent/technology partner is a real, verifiable entity — naming it
    // is how a reader checks the PIM claims.
    parentOrganization: {
      "@type": "Organization",
      name: "Pebble Square Inc.",
      url: external.parent,
      // Same URL as `url` above — it is already in routes.ts and verifiable,
      // unlike the profile links `external.social` is still waiting on.
      sameAs: external.parent,
    },
    knowsAbout: [
      "Processing-in-Memory",
      "Analog PIM",
      "Digital PIM",
      "Edge AI",
      "On-device AI",
      "AI inference",
      "AI semiconductor design",
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absolute(routes.home(locale)),
    name: "Pebble Vina",
    inLanguage: LOCALE_TAGS[locale],
    publisher: { "@id": ORGANISATION_ID },
  };
}

export interface WebPageOptions extends DatedPageOptions {
  /** Path under /public to the image the home page actually leads with
   *  (e.g. the CMS `hero.image` field) — passed in rather than hardcoded so
   *  this file never has to guess what is currently rendered. */
  image: string;
}

/**
 * Home page. Describes the page itself — separate from `Organization` (who)
 * and `WebSite` (what site) — so an answer engine has a node to point at when
 * it quotes this specific URL instead of the site in general.
 */
export function webPageJsonLd(locale: Locale, options: WebPageOptions) {
  const url = absolute(routes.home(locale));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: dictionary.meta.home.title[locale],
    description: dictionary.meta.home.description[locale],
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANISATION_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absolute(options.image),
    },
    dateModified: options.dateModified,
  };
}

/**
 * /bio. `AboutPage` is the type for a page *about* the publisher, and it says
 * so by pointing `about` and `mainEntity` at the organisation node the same
 * page already carries — no facts are restated in the markup, only linked.
 * There is no `offers` anywhere on this page and there must not be: /bio names
 * roadmap parts alongside shipped ones.
 */
export function aboutPageJsonLd(locale: Locale, options: DatedPageOptions) {
  const url = absolute(routes.bio(locale));

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#aboutpage`,
    url,
    name: dictionary.meta.bio.title[locale],
    description: dictionary.meta.bio.description[locale],
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANISATION_ID },
    mainEntity: { "@id": ORGANISATION_ID },
    dateModified: options.dateModified,
  };
}

export interface StandalonePageOptions extends DatedPageOptions {
  /** Absolute path under the site root — `routes.productSoftware(locale)` /
   *  `routes.productTraining(locale)`, already locale-resolved by the caller. */
  path: string;
  title: string;
  description: string;
  /** Path under /public — the page's own hero image (`content.software.image`
   *  / `.training.image`, CMS-owned). */
  image: string;
}

/**
 * `/products/software` and `/products/training` (DARK-BUILD-brief PART B) —
 * same `WebPage` shape as `webPageJsonLd` above, generalised to take its
 * path/title/description/image rather than reading `dictionary.meta.home`
 * directly, since two pages now need it. No `offers` anywhere on either
 * node: both describe a roadmap item (CLAUDE.md § 2), and `WebPage` never
 * carries one regardless.
 */
export function standalonePageJsonLd(locale: Locale, options: StandalonePageOptions) {
  const url = absolute(options.path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.title,
    description: options.description,
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANISATION_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absolute(options.image),
    },
    dateModified: options.dateModified,
  };
}

export interface NewsPageOptions extends DatedPageOptions {
  /** Already resolved to one locale and newest-first, matching the page's
   *  own render order — `NewsPage` (news/news-page.tsx) builds this list. */
  items: ReadonlyArray<{
    /** Stable id for the node's own `@id` fragment — the story's ISO date is
     *  unique across `home.news.items` (dictionary.ts) today; a real slug
     *  would replace this if articles ever get their own URLs. */
    id: string;
    /** ISO 8601 (yyyy-mm-dd) — `NewsPage`'s own `toIsoDate` conversion. */
    datePublished: string;
    headline: string;
    description: string;
    image: string;
  }>;
}

/**
 * `/news` (DARK-BUILD-brief PART B). `CollectionPage` wrapping an `ItemList`
 * of `NewsArticle` nodes, the same shape `collectionPageJsonLd` gives the
 * product catalogue — except each entry's `mainEntityOfPage` points back at
 * this one page's `#webpage` fragment instead of a `url` of its own: there is
 * no per-article route yet (this file's `NewsPage` doc comment), so nothing
 * here claims one.
 */
export function newsPageJsonLd(locale: Locale, options: NewsPageOptions) {
  const url = absolute(routes.news(locale));
  const webpageId = `${url}#webpage`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collectionpage`,
    url,
    name: dictionary.meta.news.title[locale],
    description: dictionary.meta.news.description[locale],
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: options.dateModified,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: options.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "NewsArticle",
          "@id": `${url}#${item.id}`,
          headline: item.headline,
          datePublished: item.datePublished,
          description: item.description,
          image: absolute(item.image),
          mainEntityOfPage: { "@id": webpageId },
          publisher: { "@id": ORGANISATION_ID },
        },
      })),
    },
  };
}

/**
 * FAQPage. `items` is already resolved to one locale — this file has no
 * business picking a language, only shaping data it was handed.
 *
 * Anchored to /bio because the FAQ copy is being added there as
 * `dictionary.bio.faq` (deliberately not imported here — see CLAUDE.md
 * instructions for this task). Move the anchor if the FAQ block lands on a
 * different page instead.
 *
 * Google only credits FAQPage markup when the questions and answers it
 * describes are visible on the rendered page — this must only ever be
 * called from a page that actually renders `items` as page content, never
 * as markup-only supplementary data invisible to a human reader.
 */
export function faqJsonLd(
  locale: Locale,
  items: ReadonlyArray<{ id: string; question: string; answer: string }>,
) {
  const url = absolute(routes.bio(locale));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      "@id": `${url}#${item.id}`,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}

/** Availability status as the site itself labels it. */
type ProductStatus = "shipped" | "poc" | "roadmap";

const STATUS_LABEL: Record<ProductStatus, Record<Locale, string>> = {
  shipped: { vi: "Đang sản xuất", en: "In production", ko: "양산 중" },
  poc: { vi: "Proof of concept", en: "Proof of concept", ko: "Proof of concept" },
  roadmap: { vi: "Trong lộ trình", en: "On the roadmap", ko: "로드맵 단계" },
};

interface ProductFacts {
  name: string;
  status: ProductStatus;
  /** Headline figures, rendered as `PropertyValue` so they stay quotable. */
  properties: ReadonlyArray<{ name: string; value: string }>;
}

/**
 * The facts about each product line that do not depend on the CMS — name,
 * shipping status, headline figures. Keyed by `ProductSlug` (routes.ts) so
 * both `buildProductItemList` (the /products catalogue) and
 * `productPageJsonLd` (each product's own page) describe the same chip the
 * same way; a figure changed here changes on both. Every figure is copied
 * unmodified from CLAUDE.md §2's approved list — do not add or infer new
 * ones here.
 */
const PRODUCT_FACTS: Record<ProductSlug, ProductFacts> = {
  mint: {
    name: "MINT",
    status: "shipped",
    properties: [
      { name: "Performance", value: "30 GOPS" },
      { name: "Efficiency", value: "17.6 TOPS/W" },
      { name: "Die area", value: "5 × 5 mm²" },
    ],
  },
  papaya: {
    name: "PAPAYA / PAPAYA FLEX",
    status: "poc",
    properties: [
      { name: "Performance", value: "0.5 TOPS" },
      { name: "Efficiency", value: "30 TOPS/W" },
      { name: "Die area", value: "5 × 5 mm²" },
    ],
  },
  espresso: {
    name: "ESPRESSO",
    status: "roadmap",
    properties: [
      { name: "Performance", value: "160 TOPS" },
      { name: "Efficiency", value: "16 TOPS/W" },
      { name: "Die area", value: "20 × 23 mm²" },
      { name: "4-chip card", value: "640 TOPS" },
    ],
  },
  "e-series": {
    name: "E-Series E10 / E20",
    status: "roadmap",
    properties: [
      { name: "E10 compute", value: "512T FP8/INT8, 32 AI cores" },
      { name: "E10 memory", value: "48 GB" },
      { name: "E20 compute", value: "1024T FP8/INT8, 64 AI cores" },
      { name: "E20 memory", value: "96 GB" },
    ],
  },
};

/** Shared by the ItemList entries and each product's own page so the status
 *  label and figures are built identically in both places. */
function productAdditionalProperties(locale: Locale, facts: ProductFacts) {
  return [
    {
      "@type": "PropertyValue",
      name: locale === "vi" ? "Trạng thái" : "Status",
      value: STATUS_LABEL[facts.status][locale],
    },
    ...facts.properties.map((property) => ({
      "@type": "PropertyValue",
      name: property.name,
      value: property.value,
    })),
  ];
}

/** Named so `collectionPageJsonLd` can share it without repeating the shape. */
export type ProductCatalogueContent = {
  mint: { title: string; description: string; image: string };
  papaya: { title: string; description: string; image: string };
  espresso: { title: string; description: string; image: string };
  eseries: { title: string; description: string; image: string };
};

/**
 * Builds the `ItemList` body that `collectionPageJsonLd` nests inside its
 * `mainEntity`. No `@context` here: that key belongs only on a document's
 * outermost node, never on a nested value.
 *
 * This used to be shared with a `productCatalogueJsonLd` that emitted the same
 * list as its own top-level node. That function is gone — the products page now
 * emits the list once, inside the page node — so if a second caller ever needs
 * a standalone `ItemList`, wrap this and add `@context` at the call site rather
 * than emitting both and asking a crawler which one counts.
 *
 * Each entry's `url` used to be a fragment on this same page
 * (`/products#mint`); now that every product line has its own page, it points
 * there instead — see `routes.product` / `PRODUCT_SLUG_TO_CONTENT_KEY`.
 *
 * Iterates PUBLIC_PRODUCT_SLUGS, not PRODUCT_SLUGS: a hidden line (routes.ts
 * HIDDEN_PRODUCT_SLUGS, e.g. "e-series") must not appear in this ItemList —
 * its page 404s, so listing it here would point a crawler at a dead URL.
 */
function buildProductItemList(locale: Locale, content: ProductCatalogueContent) {
  return {
    name: dictionary.meta.products.title[locale],
    itemListElement: PUBLIC_PRODUCT_SLUGS.map((slug, index) => {
      const facts = PRODUCT_FACTS[slug];
      const entryContent = content[PRODUCT_SLUG_TO_CONTENT_KEY[slug]];

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: facts.name,
          url: absolute(routes.product(locale, slug)),
          image: absolute(entryContent.image),
          description: entryContent.description,
          category: "AI semiconductor",
          brand: { "@id": ORGANISATION_ID },
          manufacturer: { "@id": ORGANISATION_ID },
          additionalProperty: productAdditionalProperties(locale, facts),
        },
      };
    }),
  };
}

export interface ProductPageOptions extends DatedPageOptions {
  slug: ProductSlug;
  /** CMS title, resolved to one locale. */
  title: string;
  /** CMS lead, resolved to one locale. */
  description: string;
  /** Path under /public to the product's chip render. */
  image: string;
}

/**
 * One product line's own page. `mainEntity` is the same `Product` the
 * catalogue's `ItemList` carries for this slug — same `name`, `category`,
 * `brand`/`manufacturer` @id references, and `additionalProperty` status and
 * figures from `PRODUCT_FACTS` — except `url` now points at this page instead
 * of a fragment on /products.
 *
 * No `offers` on this node, ever, and especially not for `espresso` or
 * `e-series`: both are roadmap parts (CLAUDE.md §2), and marking a chip that
 * has not shipped as purchasable is a false claim in a machine-readable
 * field. If a chip genuinely starts shipping, adding `offers` is a deliberate
 * human decision to make at that point — do not "restore" it here as a
 * simplification.
 */
export function productPageJsonLd(locale: Locale, options: ProductPageOptions) {
  const url = absolute(routes.product(locale, options.slug));
  const facts = PRODUCT_FACTS[options.slug];

  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": `${url}#itempage`,
    url,
    name: options.title,
    description: options.description,
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: options.dateModified,
    mainEntity: {
      "@type": "Product",
      name: facts.name,
      url,
      image: absolute(options.image),
      description: options.description,
      category: "AI semiconductor",
      brand: { "@id": ORGANISATION_ID },
      manufacturer: { "@id": ORGANISATION_ID },
      additionalProperty: productAdditionalProperties(locale, facts),
    },
  };
}

export interface CollectionPageOptions extends DatedPageOptions {
  content: ProductCatalogueContent;
}

/**
 * Products page. `mainEntity` nests the `ItemList` body directly rather than
 * pointing at a sibling node by `@id`: the ItemList has never been a node
 * other pages link into, so keeping it separate and cross-referencing it
 * would only add a lookup for a reader with nothing on the other end.
 * Nesting is the plainer signal here — "this page's main content is this
 * list" — with no address to keep in sync.
 */
export function collectionPageJsonLd(locale: Locale, options: CollectionPageOptions) {
  const url = absolute(routes.products(locale));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collectionpage`,
    url,
    name: dictionary.meta.products.title[locale],
    description: dictionary.meta.products.description[locale],
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: options.dateModified,
    mainEntity: {
      "@type": "ItemList",
      ...buildProductItemList(locale, options.content),
    },
  };
}

/** Render helper — one <script> per document, escaped for inline JSON. */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
