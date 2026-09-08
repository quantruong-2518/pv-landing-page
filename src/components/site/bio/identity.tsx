import Link from "next/link";

import { DataCell, SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { external, homeAnchor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * § 06 — the legal block, drawn as a stamp.
 *
 * The four corner ticks are the sheet's closing gesture and the only ornament
 * on the page; they are `border-accent` on a hairline `border-ink/20` frame, so
 * they cost one token and no new colour. The block itself is a description
 * list: "MÃ SỐ THUẾ / 0111545175" is a label-value pair to a screen reader as
 * much as to the eye.
 *
 * Nothing here is retyped either — the entity, tax code and address come from
 * `dictionary.footer`, the phone and email from `routes.external`, so the
 * footer, the JSON-LD, /llms.txt and this block cannot disagree.
 */
export function BioIdentity({
  content,
  locale,
}: {
  content: HomeContent["contact"];
  locale: Locale;
}) {
  const copy = dictionary.bio;
  const footer = dictionary.footer;

  return (
    <Section
      id={routes.anchors.bioLegal}
      labelledBy="bio-legal-title"
      // The band both other pages close on: navy over the semiconductor
      // texture, with its own portrait crop below 640px. The sheet ends on the
      // same surface the rest of the site ends on.
      className="band-contact"
    >
      <SectionMark
        mark={copy.sections.legal.mark}
        total={SHEET_TOTAL}
        title={copy.sections.legal.title[locale]}
        headingId="bio-legal-title"
      />

      <div className="mt-[clamp(26px,3vw,44px)] grid gap-row gap-x-col lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative border border-ink/20 p-[clamp(18px,2.2vw,34px)]">
          <Corner className="-top-px -left-px border-t-2 border-l-2" />
          <Corner className="-top-px -right-px border-t-2 border-r-2" />
          <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
          <Corner className="-right-px -bottom-px border-r-2 border-b-2" />

          <dl className="grid gap-x-col sm:grid-cols-2">
            <DataCell label={copy.identity.entityLabel[locale]}>{footer.legalEntity}</DataCell>
            <DataCell label={copy.identity.taxLabel[locale]}>
              <span className="font-mono">{footer.taxCode}</span>
            </DataCell>
            <DataCell label={copy.legal.addressLabel[locale]} className="sm:col-span-2">
              <address className="not-italic">{footer.address[locale]}</address>
            </DataCell>
            {/* `flex items-center max-lg:min-h-11` on all three links: measured
                at 390px these were 108×20, 188×19 and 149×19 — a phone number
                and an email address are exactly the rows a reader taps, and
                they were the smallest targets on the page. Same treatment the
                footer already applies to its own contact links, and stopped at
                `lg` for the same reason: it is a touch minimum, and the desktop
                stamp keeps its line rhythm. */}
            <DataCell label={copy.legal.phoneLabel[locale]}>
              <a
                href={`tel:${external.phone}`}
                className="flex items-center font-mono transition-colors hover:text-accent max-lg:min-h-11"
              >
                {external.phoneDisplay}
              </a>
            </DataCell>
            <DataCell label={copy.legal.emailLabel[locale]}>
              <a
                href={`mailto:${external.email}`}
                className="flex items-center transition-colors hover:text-accent max-lg:min-h-11"
              >
                {external.email}
              </a>
            </DataCell>
            <DataCell label={copy.identity.partnerLabel[locale]} className="sm:col-span-2">
              <a
                href={external.parent}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
              >
                {copy.identity.partnerValue} ↗
              </a>
            </DataCell>
          </dl>
        </div>

        {/* Closing column: the invitation the home contact block already makes,
            then the route to the form that answers it. */}
        <div className="flex flex-col justify-between gap-[clamp(20px,2.4vw,34px)]">
          <p className="max-w-[38ch] text-lead text-body">{content.lead[locale]}</p>
          <div className="flex flex-col items-start gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={homeAnchor(locale, routes.anchors.contact)}>
                {copy.cta.contact[locale]}
              </Link>
            </Button>
            <span className="font-mono text-label text-faint">{footer.copyright[locale]}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** One corner tick of the stamp frame. Purely decorative, hence `aria-hidden`. */
function Corner({ className }: { className: string }) {
  return <span aria-hidden className={cn("absolute size-4 border-accent", className)} />;
}
