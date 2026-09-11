import { LOCALES, LOCALE_TAGS, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { absolute, external, routes, siteUrl } from "@/lib/routes";

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

interface ProductEntry {
  name: string;
  anchor: string;
  description: string;
  image: string;
  status: ProductStatus;
  /** Headline figures, rendered as `PropertyValue` so they stay quotable. */
  properties: ReadonlyArray<{ name: string; value: string }>;
}

const STATUS_LABEL: Record<ProductStatus, Record<Locale, string>> = {
  shipped: { vi: "Đang sản xuất", en: "In production", ko: "양산 중" },
  poc: { vi: "Proof of concept", en: "Proof of concept", ko: "Proof of concept" },
  roadmap: { vi: "Trong lộ trình", en: "On the roadmap", ko: "로드맵 단계" },
};

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
 */
function buildProductItemList(locale: Locale, content: ProductCatalogueContent) {
  const entries: ProductEntry[] = [
    {
      name: "MINT",
      anchor: routes.anchors.mint,
      description: content.mint.description,
      image: content.mint.image,
      status: "shipped",
      properties: [
        { name: "Performance", value: "30 GOPS" },
        { name: "Efficiency", value: "17.6 TOPS/W" },
        { name: "Die area", value: "5 × 5 mm²" },
      ],
    },
    {
      name: "PAPAYA / PAPAYA FLEX",
      anchor: routes.anchors.papaya,
      description: content.papaya.description,
      image: content.papaya.image,
      status: "poc",
      properties: [
        { name: "Performance", value: "0.5 TOPS" },
        { name: "Efficiency", value: "30 TOPS/W" },
        { name: "Die area", value: "5 × 5 mm²" },
      ],
    },
    {
      name: "ESPRESSO",
      anchor: routes.anchors.espresso,
      description: content.espresso.description,
      image: content.espresso.image,
      status: "roadmap",
      properties: [
        { name: "Performance", value: "160 TOPS" },
        { name: "Efficiency", value: "16 TOPS/W" },
        { name: "Die area", value: "20 × 23 mm²" },
        { name: "4-chip card", value: "640 TOPS" },
      ],
    },
    {
      name: "E-Series E10 / E20",
      anchor: routes.anchors.eSeries,
      description: content.eseries.description,
      image: content.eseries.image,
      status: "roadmap",
      properties: [
        { name: "E10 compute", value: "512T FP8/INT8, 32 AI cores" },
        { name: "E10 memory", value: "48 GB" },
        { name: "E20 compute", value: "1024T FP8/INT8, 64 AI cores" },
        { name: "E20 memory", value: "96 GB" },
      ],
    },
  ];

  return {
    name: dictionary.meta.products.title[locale],
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: entry.name,
        url: `${absolute(routes.products(locale))}#${entry.anchor}`,
        image: absolute(entry.image),
        description: entry.description,
        category: "AI semiconductor",
        brand: { "@id": ORGANISATION_ID },
        manufacturer: { "@id": ORGANISATION_ID },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: locale === "vi" ? "Trạng thái" : "Status",
            value: STATUS_LABEL[entry.status][locale],
          },
          ...entry.properties.map((property) => ({
            "@type": "PropertyValue",
            name: property.name,
            value: property.value,
          })),
        ],
      },
    })),
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
