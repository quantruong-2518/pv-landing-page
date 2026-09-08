import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * 02 — Core capability. Three cards, each ending in a mono outcome line.
 *
 * The three cards are not made of the same parts. Handoff 5.6 gives 01 and 02 a
 * figure plus a mono label and 03 a phrase — "không phải số" — with no label at
 * all. Built as three independent flex columns that produced three different
 * internal rhythms: a 44px figure beside a 28px phrase, and a label row on two
 * cards out of three, so the bodies started at three different heights and only
 * the outcome line was ever in line.
 *
 * Each card is therefore a `grid-rows-subgrid` spanning four of the section
 * grid's own rows — number, figure/headline, body, outcome. The four edges are
 * then shared by construction rather than by luck: whichever card and whichever
 * locale is tallest sizes each row and the other two follow it. It also retires
 * the `mt-auto` that used to hold the outcome line down, because the outcome is
 * now a row of its own.
 *
 * Card 02's figure is the one value here the CMS owns (`core.stat`); the other
 * two are fixed phrases, so only card 02 reads from content.
 */
export function CoreStats({ content, locale }: { content: HomeContent["core"]; locale: Locale }) {
  return (
    <Section labelledBy="core-title" className="glow-core bg-night-deep">
      <SectionHead
        eyebrow={content.eyebrow[locale]}
        title={content.title[locale]}
        lead={content.lead[locale]}
        headingId="core-title"
        className="pb-[clamp(24px,2.8vw,42px)]"
      />

      {/* The row gap lives on the parent because the parent owns the tracks the
       * cards subgrid into; the cards repeat it so their own sizing agrees. */}
      <div className="grid gap-x-col gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.home.core.cards.map((card, index) => (
          <Reveal
            key={card.index}
            delay={index * 0.08}
            className="row-span-4 grid grid-rows-subgrid gap-y-4 py-9"
          >
            <span className="font-mono text-kicker text-accent">{card.index}</span>

            {/* One slot holds whichever headline the card has, plus its label if
             * it has one. That is what puts the two figures and card 03's
             * phrase on a single top edge while the bodies below them still
             * start together — card 03 simply leaves the rest of the slot empty
             * instead of borrowing a label it was never written. */}
            <div className="flex flex-col gap-3.5">
              {card.headline ? (
                <div className="font-heading text-card-title">{card.headline[locale]}</div>
              ) : (
                <div
                  className={cn(
                    "font-heading text-stat-lg",
                    card.accent ? "text-accent" : "text-ink",
                  )}
                >
                  {card.fromCms ? content.stat : card.value}
                </div>
              )}

              {card.label ? (
                <div className="font-mono text-kicker text-muted">{card.label[locale]}</div>
              ) : null}
            </div>

            <p className="text-card text-body">{card.body[locale]}</p>

            <span className="pt-4 font-mono text-kicker text-accent">{card.outcome}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
