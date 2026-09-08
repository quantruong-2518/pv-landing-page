import { Reveal } from "@/components/motion/reveal";
import { SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { Section } from "@/components/site/section";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * § 04 — the product timeline.
 *
 * Same five entries the catalogue strip carries, drawn as a rail: a spine down
 * the left on a phone, a ruled row of five from `md` up. The direction change
 * is the point — five columns of dates on a 360px screen is four illegible
 * columns and a scrollbar.
 *
 * The mark on each entry is load-bearing. A filled square is something that has
 * happened (MINT in production, PAPAYA's PoC); a hollow one is a dated
 * announcement (ESPRESSO, the software platform, the training survey). The
 * legend says so in words, and `state` in the dictionary is what decides it —
 * not the shape of the sentence next to it.
 */

const MARKS = {
  done: "bg-accent",
  roadmap: "border border-accent",
} as const;

export function BioTimeline({ locale }: { locale: Locale }) {
  const copy = dictionary.bio;
  const timeline = dictionary.product.catalog.timeline;

  return (
    <Section id={routes.anchors.bioTimeline} labelledBy="bio-timeline-title" className="bg-navy">
      <SectionMark
        mark={copy.sections.timeline.mark}
        total={SHEET_TOTAL}
        title={copy.sections.timeline.title[locale]}
        headingId="bio-timeline-title"
      />

      <ul className="mt-[clamp(22px,2.4vw,34px)] flex flex-wrap gap-x-8 gap-y-2.5">
        {(["done", "roadmap"] as const).map((state) => (
          <li key={state} className="flex items-center gap-2.5">
            <span aria-hidden className={cn("block size-2", MARKS[state])} />
            <span className="font-mono text-label text-muted">
              {copy.timeline.legend[state][locale]}
            </span>
          </li>
        ))}
      </ul>

      <ol className="mt-[clamp(24px,2.8vw,40px)] grid gap-x-col md:grid-cols-5">
        {timeline.map((entry, index) => (
          <Reveal
            key={entry.when}
            as="li"
            delay={index * 0.06}
            className="relative border-l border-ink/14 pb-8 pl-6 last:pb-0 md:border-l-0 md:border-t md:pt-6 md:pb-0 md:pl-0"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 -left-1 block size-2 md:top-[-4px] md:left-0",
                MARKS[entry.state],
              )}
            />
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[0.9375rem] tracking-[0.06em] text-accent">
                {entry.when}
              </span>
              <span className="text-sm leading-[1.7] text-ink">{entry.what[locale]}</span>
              <span className="font-mono text-label text-faint">
                {copy.timeline.legend[entry.state][locale]}
              </span>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
