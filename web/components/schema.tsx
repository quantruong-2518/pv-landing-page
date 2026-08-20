import type { SiteContent } from "@/content/types";
import { SITE } from "@/content/site";

/** JSON-LD, so an answer engine knows which legal entity this is and whose subsidiary. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Generated from static content — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: c.locale === "vi" ? SITE.legalNameVi : SITE.legalName,
    taxID: SITE.taxId,
    url: SITE.url,
    description: c.meta.home.description,
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
