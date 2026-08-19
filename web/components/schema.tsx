import type { LandingContent } from "@/content/types";
import { SITE } from "@/content/site";

/**
 * JSON-LD. `Organization` để answer engine biết pháp nhân là ai và mẹ là ai;
 * `FAQPage` là tài sản GEO mạnh nhất của trang (docs/03-structure.md §2, khối 10).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Nội dung do ta sinh từ content tĩnh, không có input người dùng.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(c: LandingContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    taxID: SITE.taxId,
    url: SITE.url,
    description: c.meta.description,
    email: SITE.contact.email,
    telephone: "+84345913369",
    address: {
      "@type": "PostalAddress",
      streetAddress: c.locale === "vi" ? SITE.office.vi : SITE.office.en,
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: SITE.parent.name,
      url: SITE.parent.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seongnam",
        addressRegion: "Gyeonggi-do",
        addressCountry: "KR",
      },
    },
  };
}

export function faqSchema(c: LandingContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
