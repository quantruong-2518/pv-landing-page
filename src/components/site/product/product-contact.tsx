import Link from "next/link";

import { Eyebrow } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { homeAnchor, routes } from "@/lib/routes";

/**
 * Closing contact band on the product page — the short version, with no form.
 * The form lives once, on the home page, so there is one place a lead can
 * arrive from and one thing to keep working.
 *
 * The design also had a "download catalogue" button. It is not here because
 * there is no catalogue file to download; add it back the day a PDF exists,
 * rather than shipping a button that does nothing.
 */
export function ProductContact({
  content,
  locale,
}: {
  content: ProductContent["contact"];
  locale: Locale;
}) {
  return (
    <Section
      id={routes.anchors.contact}
      labelledBy="product-contact-title"
      screen
      spend="between"
      className="band-contact bg-navy-lit py-section-lg"
    >
      <div className="grid grow content-end items-end gap-[clamp(26px,3vw,52px)] gap-x-col lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Eyebrow className="text-accent">{dictionary.product.contact.eyebrow[locale]}</Eyebrow>
          <h2
            id="product-contact-title"
            className="max-w-[22ch] font-heading text-h2 text-balance"
          >
            {content.title[locale]}
          </h2>
          <p className="max-w-[48ch] text-lead text-body">{content.lead[locale]}</p>
        </div>

        {/* Anchored to the outer edge of its column, not floating at the middle
            of the page. The design had two buttons here; with the catalogue
            download gone (no file to download) a single button left at
            `justify-self-start` sat in the dead centre of the band and read as
            something that had lost its neighbour. Against the right gutter it
            closes the row instead. */}
        <div className="justify-self-start lg:justify-self-end">
          <Button asChild variant="primary" size="xl" mono={false}>
            <Link href={homeAnchor(locale, routes.anchors.contact)}>{content.cta[locale]}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
