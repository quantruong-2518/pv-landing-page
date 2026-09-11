import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, GroupRule, Kicker, VignetteImage } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import {
  anchor,
  PRODUCT_SLUG_TO_ANCHOR,
  PRODUCT_SLUGS,
  routes,
  type AnchorId,
  type ProductSlug,
} from "@/lib/routes";

/**
 * `catalog.hardware[].anchor` (dictionary.ts, owned by the copy agent) is a
 * bare anchor id such as `"mint"` left over from when these four cards linked
 * to a section on this same page. The correspondence between that id and its
 * `ProductSlug` is owned by `PRODUCT_SLUG_TO_ANCHOR` (routes.ts), so it is
 * inverted here rather than assumed identical — this is what lets a hardware
 * card link straight to the chip's own page instead of a page anchor that no
 * longer exists.
 */
const ANCHOR_TO_PRODUCT_SLUG = new Map<AnchorId, ProductSlug>(
  PRODUCT_SLUGS.map((slug) => [PRODUCT_SLUG_TO_ANCHOR[slug], slug]),
);

/**
 * Catalogue hero: heading, then every product as a card that jumps to its own
 * detail section, then the five-point roadmap strip.
 *
 * The roadmap strip is the honest part of this page — it is where "in
 * production", "PoC" and "roadmap" are stated as dates rather than implied by
 * how confidently a card is written.
 */
export function Catalogue({
  content,
  locale,
}: {
  content: ProductContent["catalog"];
  locale: Locale;
}) {
  const copy = dictionary.product.catalog;

  return (
    <Section
      id={routes.anchors.top}
      labelledBy="catalogue-title"
      screen
      spend="between"
      className="glow-catalogue bg-night-deep pt-[clamp(38px,4.2vw,72px)] pb-0"
    >
      <div className="grid items-end gap-row gap-x-col pb-[clamp(22px,2.6vw,38px)] lg:grid-cols-2">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow>{content.eyebrow[locale]}</Eyebrow>
          <h1
            id="catalogue-title"
            className="max-w-[22ch] font-heading text-h1-catalogue text-balance"
          >
            {content.title[locale]}
          </h1>
        </div>
        <p className="max-w-[56ch] text-lead text-body">{content.lead[locale]}</p>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-4 py-[18px]">
        <span className="min-w-0 flex-1 text-card text-contact">{copy.exploreLine[locale]}</span>
        {/* whitespace-normal: `hint` is a full sentence, not a short label —
            `Kicker`'s default nowrap forced this off the edge of a phone
            viewport (see ProductKicker in primitives.tsx for the same fix). */}
        <Kicker className="whitespace-normal text-faint">{content.hint[locale]}</Kicker>
      </div>

      {/* Three groups, three rules. Only the first of them was named before;
          see the note on `groupSolutions` in dictionary.ts. */}
      <GroupRule label={copy.groupProducts[locale]} meta={copy.groupChipLine[locale]} />

      {/* Subgrid, not a flex column per card: the five bands (badge, name,
          render, body, arrow) are shared tracks of the outer grid, so every
          card's render starts on the same line however many lines its name
          takes. "PAPAYA / PAPAYA FLEX" wraps to two at 1440 and "E-SERIES ·
          E10 / E20" joins it at 1024 — measured 41px of drift before this.
          The row gap lives on the parent because a subgrid takes its gutters
          from the grid it borrows tracks from. */}
      <div className="-mx-5 grid gap-x-col gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.hardware.map((card, index) => {
          // catalog.hardware only ever lists the four product lines, so this
          // always resolves; the page-anchor fallback only protects against
          // that invariant breaking, rather than throwing at render time.
          const slug = ANCHOR_TO_PRODUCT_SLUG.get(card.anchor as AnchorId);
          const href = slug ? routes.product(locale, slug) : anchor(card.anchor as AnchorId);

          return (
            <Reveal key={card.name} delay={index * 0.06} className="row-span-5 grid grid-rows-subgrid">
              <Link
                href={href}
                className="row-span-5 grid grid-rows-subgrid px-5 pt-6 pb-7 text-ink transition-colors hover:bg-accent/9"
              >
                <Kicker className="text-accent">{card.badge}</Kicker>
                <span className="font-heading text-card-title">{card.name}</span>
                <VignetteImage
                  src={card.image}
                  alt={card.imageAlt[locale]}
                  fit="contain"
                  sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 22vw"
                  priority={index === 0}
                />
                <span className="text-card text-body">{card.body[locale]}</span>
                <span aria-hidden className="font-mono text-kicker text-accent">
                  →
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <GroupRule label={copy.groupSolutions[locale]} meta={copy.groupSolutionsLine[locale]} />

      <div className="-mx-5 mt-[clamp(16px,1.8vw,26px)] grid gap-x-col gap-y-3.5 sm:grid-cols-2">
        {copy.other.map((card) => (
          <Link
            key={card.anchor}
            href={anchor(card.anchor as AnchorId)}
            className="row-span-4 grid grid-rows-subgrid px-5 pt-6 pb-7 text-ink transition-colors hover:bg-accent/9"
          >
            <Kicker className="text-accent">{card.badge[locale]}</Kicker>
            <span className="font-heading text-card-title">{card.name[locale]}</span>
            <span className="max-w-[46ch] text-card text-body">{card.body[locale]}</span>
            <span aria-hidden className="font-mono text-kicker text-accent">
              →
            </span>
          </Link>
        ))}
      </div>

      <GroupRule label={copy.groupTimeline[locale]} meta={copy.groupTimelineLine[locale]} />

      <ol className="mt-[clamp(16px,1.8vw,26px)] grid grid-cols-2 gap-x-col sm:grid-cols-3 lg:grid-cols-5">
        {copy.timeline.map((entry) => (
          <li key={entry.when} className="flex flex-col gap-1.5 py-5">
            <span className="font-mono text-kicker text-accent">{entry.when}</span>
            <span className="text-note text-muted">{entry.what[locale]}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
