import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Kicker, VignetteImage } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { anchor, routes, type AnchorId } from "@/lib/routes";

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

      <div className="flex items-baseline gap-4 pt-4">
        <Kicker className="text-accent">{copy.groupProducts[locale]}</Kicker>
        <Kicker className="text-faint">{copy.groupChipLine[locale]}</Kicker>
      </div>

      {/* Subgrid, not a flex column per card: the five bands (badge, name,
          render, body, arrow) are shared tracks of the outer grid, so every
          card's render starts on the same line however many lines its name
          takes. "PAPAYA / PAPAYA FLEX" wraps to two at 1440 and "E-SERIES ·
          E10 / E20" joins it at 1024 — measured 41px of drift before this.
          The row gap lives on the parent because a subgrid takes its gutters
          from the grid it borrows tracks from. */}
      <div className="-mx-5 grid gap-x-col gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.hardware.map((card, index) => (
          <Reveal key={card.name} delay={index * 0.06} className="row-span-5 grid grid-rows-subgrid">
            <Link
              href={anchor(card.anchor as AnchorId)}
              className="row-span-5 grid grid-rows-subgrid px-5 pt-6 pb-7 text-ink transition-colors hover:bg-accent/9"
            >
              <Kicker className="text-accent">{card.badge}</Kicker>
              <span className="font-heading text-card-title">{card.name}</span>
              <VignetteImage
                src={card.image}
                alt={card.name}
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
        ))}
      </div>

      <div className="-mx-5 grid gap-x-col gap-y-3.5 sm:grid-cols-2">
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

      <ol className="mt-[clamp(22px,2.4vw,36px)] grid grid-cols-2 gap-x-col sm:grid-cols-3 lg:grid-cols-5">
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
