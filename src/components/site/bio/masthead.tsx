import Image from "next/image";
import Link from "next/link";

import { DataCell } from "@/components/site/bio/sheet";
import { Eyebrow } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { LOCALE_TAGS, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { external, homeAnchor, routes } from "@/lib/routes";

/**
 * The cover of the sheet.
 *
 * Three things make it read as a document rather than a hero: the drafting grid
 * behind it (`.bio-grid`, faded out before it reaches the type), the mono rail
 * turned on its side down the left edge, and the mark set in a bordered tile at
 * the top like a stamp on a file.
 *
 * The rail is a grid column, not an absolutely positioned element in the
 * gutter — `--spacing-gutter` bottoms out at 34px on a 1024px viewport, which is
 * not enough room for it, and a rail that overlaps the wordmark at one
 * breakpoint is worse than no rail.
 *
 * The picture is not optional. The first cut of this page opened on roughly
 * 700px of unbroken type on a phone, which is not what the rest of the site
 * does and not what a profile is read like. It sits in its own column from
 * `lg` and as a band underneath below that, so the cover has a visual anchor at
 * every width without becoming a second copy of the home hero.
 *
 * Every value in the identity list is already published elsewhere on the site:
 * `footer.legalEntity`, `footer.taxCode`, the city out of `footer.address`, and
 * the technology partner named in the organisation JSON-LD.
 */
export function BioMasthead({ locale }: { locale: Locale }) {
  const copy = dictionary.bio;
  const footer = dictionary.footer;

  return (
    <Section
      id={routes.anchors.top}
      labelledBy="bio-title"
      screen
      spend="between"
      className="glow-bio-mast overflow-hidden bg-night-deep"
    >
      <div aria-hidden className="bio-grid pointer-events-none absolute inset-0" />

      <div className="relative grid gap-x-col lg:grid-cols-[auto_1fr]">
        <div className="hidden lg:flex lg:items-start lg:self-stretch lg:border-r lg:border-ink/14 lg:pr-[clamp(14px,1.4vw,22px)]">
          <span className="bio-spine font-mono text-label whitespace-nowrap text-faint">
            {copy.spine[locale]}
          </span>
        </div>

        <div className="flex flex-col gap-[clamp(22px,2.6vw,36px)]">
          {/* Sheet header: two cells that are facts about this document rather
              than about the company — the page names itself and the language
              it is written in. The header nav already carries the mark, so the
              sheet does not repeat it as a second stamp. */}
          <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-col gap-y-1.5 border-b border-ink/14 pb-4 font-mono text-label">
            <span className="text-faint">
              {copy.sheet.doc}
              {/* `text-faint`, not `text-dim`: 3.65:1 against 5.3:1 on
                  night-deep at this 11px mono size. */}
              <span aria-hidden className="mx-2.5 text-faint">
                /
              </span>
              <span className="text-accent">{copy.sheet.docValue}</span>
            </span>
            <span className="text-faint">
              {copy.sheet.locale}
              {/* `text-faint`, not `text-dim`: 3.65:1 against 5.3:1 on
                  night-deep at this 11px mono size. */}
              <span aria-hidden className="mx-2.5 text-faint">
                /
              </span>
              <span className="text-muted">{LOCALE_TAGS[locale]}</span>
            </span>
          </div>

          <div className="grid items-start gap-row gap-x-col lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-[clamp(20px,2.4vw,32px)]">
              <Eyebrow>{copy.eyebrow[locale]}</Eyebrow>

              {/*
                The wordmark is the H1. It is set at display size because on a
                profile sheet the company's name *is* the headline — the
                descriptor underneath, the same one the home page title carries,
                keeps the heading meaningful to a crawler reading text rather
                than size.

                That descriptor is deliberately not `text-h3`: at weight 700
                directly under a 48px black wordmark it read as a second
                headline and the two fought. Medium weight at lead size lets the
                wordmark win, which is the whole point of setting it that large.
              */}
              <h1 className="flex flex-col" id="bio-title">
                <span className="font-heading text-[clamp(3rem,12vw,8rem)] leading-[0.84] tracking-[-0.03em]">
                  PEBBLE
                </span>
                <span className="font-heading text-[clamp(3rem,12vw,8rem)] leading-[0.84] tracking-[-0.03em] text-accent">
                  VINA
                </span>
                <span
                  aria-hidden
                  className="mt-[clamp(18px,2.2vw,30px)] block h-px w-[clamp(56px,7vw,110px)] bg-accent"
                />
                <span className="mt-[clamp(14px,1.8vw,24px)] max-w-[32ch] font-sans text-lead-hero font-medium text-ink/85">
                  {copy.title[locale]}
                </span>
              </h1>

              <p className="max-w-[52ch] text-lead text-body">{footer.tagline[locale]}</p>

              <dl className="grid gap-x-col sm:grid-cols-2">
                <DataCell index="01" label={copy.identity.entityLabel[locale]}>
                  {footer.legalEntity}
                </DataCell>
                <DataCell index="02" label={copy.identity.taxLabel[locale]}>
                  <span className="font-mono">{footer.taxCode}</span>
                </DataCell>
                <DataCell index="03" label={copy.identity.hqLabel[locale]}>
                  {copy.identity.hqValue[locale]}
                </DataCell>
                <DataCell index="04" label={copy.identity.partnerLabel[locale]}>
                  {/* `flex items-center max-lg:min-h-11` is the footer's fix for
                      the same problem, applied for the same reason: at the
                      sheet's density this link is a 19px-tall line, well under
                      the 44px a thumb needs, and the guidance is a minimum for
                      touch — not for the pointer, so it stops at `lg` and the
                      desktop rhythm of the identity list is untouched. */}
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

              {/* Full width below `sm` so the two do not sit at two different
                  ragged widths on a phone, which is how they read before.
                  `outline` rather than `ghost` for the secondary. That started
                  as a workaround — `ghost` was a bare `bg-ink/8` wash, a 3%
                  luminance step that vanished on night-deep — and `ghost` has
                  since been given its own accent hairline, so either would read
                  now. It stays `outline` because this pair is a masthead, not a
                  section CTA: a neutral hairline lets the primary carry the
                  accent alone. */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href={routes.products(locale)}>{copy.cta.catalogue[locale]}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href={homeAnchor(locale, routes.anchors.contact)}>
                    {copy.cta.contact[locale]}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Framed, not full-bleed: the home page already owns the
                edge-to-edge photograph, and a hairline frame is what makes this
                one read as a plate in a document. `lg:absolute` lets it fill
                the height of the type column beside it. */}
            <div className="relative border border-ink/14 lg:self-stretch">
              <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
                <Image
                  src={copy.cover.photo}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
