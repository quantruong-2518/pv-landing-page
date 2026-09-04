import { LOCALE_TAGS, type Locale } from "@/lib/i18n/config";
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
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "vi"
        ? "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy"
        : "Office O1912, 19th floor, Landmark 72 Tower, Zone E6, Cau Giay New Urban Area",
      addressLocality: locale === "vi" ? "Phường Yên Hoà" : "Yen Hoa Ward",
      addressRegion: locale === "vi" ? "Hà Nội" : "Hanoi",
      addressCountry: "VN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: external.phone,
        email: external.email,
        availableLanguage: ["vi", "en"],
        areaServed: "VN",
      },
    ],
    // The parent/technology partner is a real, verifiable entity — naming it
    // is how a reader checks the PIM claims.
    parentOrganization: {
      "@type": "Organization",
      name: "Pebble Square Inc.",
      url: external.parent,
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
  shipped: { vi: "Đang sản xuất", en: "In production" },
  poc: { vi: "Proof of concept", en: "Proof of concept" },
  roadmap: { vi: "Trong lộ trình", en: "On the roadmap" },
};

export function productCatalogueJsonLd(locale: Locale, content: {
  mint: { title: string; description: string; image: string };
  papaya: { title: string; description: string; image: string };
  espresso: { title: string; description: string; image: string };
  eseries: { title: string; description: string; image: string };
}) {
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
    "@context": "https://schema.org",
    "@type": "ItemList",
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

/** Render helper — one <script> per document, escaped for inline JSON. */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
