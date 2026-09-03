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
 * Cards are flex columns with the outcome pushed down by `mt-auto`, so the
 * three "→ ENERGY EFFICIENCY / HIGH THROUGHPUT / …" lines sit on one baseline
 * however unevenly the bodies wrap.
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

      <div className="grid gap-x-col sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.home.core.cards.map((card, index) => (
          <Reveal
            key={card.index}
            delay={index * 0.08}
            className="flex h-full flex-col gap-4 py-9"
          >
            <span className="font-mono text-[0.75rem] text-accent">{card.index}</span>

            {card.headline ? (
              <div className="font-heading text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.25] tracking-[-0.005em]">
                {card.headline[locale]}
              </div>
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
              <div className="font-mono text-[0.75rem] tracking-[0.1em] text-muted">
                {card.label[locale]}
              </div>
            ) : null}

            <p className="text-card text-body">{card.body[locale]}</p>

            <span className="mt-auto pt-4 font-mono text-[0.75rem] tracking-[0.1em] text-accent">
              {card.outcome}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
