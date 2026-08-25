import type { SiteContent } from "@/content/types";
import { SITE } from "@/content/site";

/** JSON-LD for Pebble Vina as its own legal entity. */
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
    legalName: SITE.legalName,
    // Registered under both names; the English one is what a foreign reader matches on.
    alternateName: SITE.legalNameEn,
    taxID: SITE.taxId,
    url: SITE.url,
    description: c.meta.home.description,
    email: SITE.contact.email,
    telephone: "+84345913369",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.office,
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
  };
}
