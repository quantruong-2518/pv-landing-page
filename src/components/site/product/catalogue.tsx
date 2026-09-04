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
        <span className="min-w-0 flex-1 text-[0.9375rem] text-contact">
          {copy.exploreLine[locale]}
        </span>
        {/* whitespace-normal: `hint` is a full sentence, not a short label —
            `Kicker`'s default nowrap forced this off the edge of a phone
            viewport (see ProductKicker in primitives.tsx for the same fix). */}
        <Kicker className="whitespace-normal text-faint">{content.hint[locale]}</Kicker>
      </div>

      <div className="flex items-baseline gap-4 pt-4">
        <Kicker className="text-accent">{copy.groupProducts[locale]}</Kicker>
        <Kicker className="text-faint">{copy.groupChipLine[locale]}</Kicker>
      </div>

      <div className="-mx-5 grid gap-x-col sm:grid-cols-2 lg:grid-cols-4">
        {copy.hardware.map((card, index) => (
          <Reveal key={card.name} delay={index * 0.06} className="h-full">
            <Link
              href={anchor(card.anchor as AnchorId)}
              className="flex h-full flex-col gap-4 px-5 pt-6 pb-7 text-ink transition-colors hover:bg-accent/9"
            >
              <Kicker className="tracking-[0.09em] text-accent">{card.badge}</Kicker>
              <span className="font-heading text-[clamp(1.375rem,1.9vw,1.75rem)]">
                {card.name}
              </span>
              <VignetteImage
                src={card.image}
                alt={card.name}
                fit="contain"
                sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 22vw"
              />
              <span className="text-card text-body">{card.body[locale]}</span>
              <span aria-hidden className="mt-auto pt-2 font-mono text-[0.75rem] text-accent">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="-mx-5 grid gap-x-col sm:grid-cols-2">
        {copy.other.map((card) => (
          <Link
            key={card.anchor}
            href={anchor(card.anchor as AnchorId)}
            className="flex flex-col gap-3.5 px-5 pt-6 pb-7 text-ink transition-colors hover:bg-accent/9"
          >
            <Kicker className="tracking-[0.09em] text-accent">{card.badge[locale]}</Kicker>
            <span className="font-heading text-[clamp(1.25rem,1.7vw,1.625rem)]">
              {card.name[locale]}
            </span>
            <span className="max-w-[46ch] text-card text-body">{card.body[locale]}</span>
            <span aria-hidden className="font-mono text-[0.75rem] text-accent">
              →
            </span>
          </Link>
        ))}
      </div>

      <ol className="mt-[clamp(22px,2.4vw,36px)] grid grid-cols-2 gap-x-col sm:grid-cols-3 lg:grid-cols-5">
        {copy.timeline.map((entry) => (
          <li key={entry.when} className="flex flex-col gap-1.5 py-5">
            <span className="font-mono text-[0.75rem] text-accent">{entry.when}</span>
            <span className="text-sm text-muted">{entry.what[locale]}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
