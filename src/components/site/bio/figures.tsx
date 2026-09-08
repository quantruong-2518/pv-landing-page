import { Reveal } from "@/components/motion/reveal";
import { SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary, type Spec } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * § 03 — the figure wall.
 *
 * This is the section a profile page most easily gets wrong: eight large
 * numbers in a grid read as eight things that exist today. Two rules keep it
 * honest and both are structural, not editorial.
 *
 * First, no figure is retyped. Every cell reads its value out of the spec
 * tables the product page renders, so a correction there lands here and the
 * two can never disagree.
 *
 * Second, every cell carries the part it belongs to *and* that part's status
 * line — "ANALOG · SẢN XUẤT 05/2023", "DIGITAL · ROADMAP Q3/2026" — in the same
 * card, not in a legend somewhere above. A number cannot be read off this page
 * without the date attached to it.
 *
 * PAPAYA FLEX's ~50× / ~100× / ~25× figures are deliberately absent: they are
 * comparisons against a named part under stated benchmark conditions, and a
 * grid cell has no room for the measurement that produced them. They stay on
 * the product page, where they are shown with it.
 */

interface Figure {
  value: string;
  unit?: string;
  label: string;
  /** The part the figure belongs to. */
  source: string;
  /** That part's status line — always a date, except the core-capability cell. */
  status: string;
}

export function BioFigures({ content, locale }: { content: HomeContent["core"]; locale: Locale }) {
  const copy = dictionary.bio;
  const { mint, papaya, espresso } = dictionary.product;

  // Card 02 of the home core block is the one whose figure the CMS owns; its
  // label travels with it so the two pages describe 400K the same way.
  const coreCard = dictionary.home.core.cards[1];

  const fromSpec = (spec: Spec, source: string, status: string): Figure => ({
    value: spec.value,
    unit: spec.unit,
    label: spec.label,
    source,
    status,
  });

  const figures: Figure[] = [
    {
      value: content.stat,
      label: coreCard.label?.[locale] ?? "",
      source: copy.figures.coreSource,
      status: copy.figures.coreStatus[locale],
    },
    ...mint.specs.map((spec) => fromSpec(spec, "MINT", mint.meta[locale])),
    // PAPAYA's first two specs only: the third is die area, already shown for
    // MINT, and the fourth is a comparison that needs its footnote.
    ...papaya.specs.slice(0, 2).map((spec) => fromSpec(spec, "PAPAYA", papaya.meta[locale])),
    fromSpec(espresso.specs[0], "ESPRESSO", espresso.meta[locale]),
    {
      value: espresso.cardValue,
      label: espresso.cardLabel[locale],
      source: "ESPRESSO",
      status: espresso.meta[locale],
    },
  ];

  return (
    <Section
      id={routes.anchors.bioFigures}
      labelledBy="bio-figures-title"
      className="glow-bio-figures bg-night-deep"
    >
      <SectionMark
        mark={copy.sections.figures.mark}
        total={SHEET_TOTAL}
        title={copy.sections.figures.title[locale]}
        lead={copy.figures.lead[locale]}
        headingId="bio-figures-title"
      />

      {/* Two columns from the narrowest width, not from `sm`: eight figures in
          a single mobile column is a screen and a half of scrolling for what is
          meant to be read as one wall. The values are short enough — the status
          line is the only thing that wraps, and it may. */}
      <div className="mt-[clamp(26px,3vw,44px)] grid grid-cols-2 gap-x-col lg:grid-cols-4">
        {figures.map((figure, index) => (
          <Reveal
            key={`${figure.source}-${figure.label}`}
            delay={(index % 4) * 0.06}
            className="flex h-full flex-col gap-2.5 border-t border-ink/14 pt-5 pb-7"
          >
            {/* `uppercase`: seven of these labels come from the spec tables and
                are already caps ("01 PERFORMANCE"); the 400K one comes from the
                home core card and is sentence case. One mono label slot, one
                casing. */}
            <span className="font-mono text-label text-accent uppercase">{figure.label}</span>
            <span className="font-heading text-stat-lg text-ink">{figure.value}</span>
            {figure.unit ? (
              <span className="font-mono text-[0.6875rem] leading-[1.5] text-muted">
                {figure.unit}
              </span>
            ) : null}

            {/* Source and status sit at the foot of every card, on one baseline
                across the row — that is what `mt-auto` is doing here. */}
            <div className="mt-auto flex flex-col gap-1 pt-5">
              <span className="font-mono text-label text-faint">
                {copy.figures.sourceLabel[locale]}
              </span>
              <span className="text-[0.875rem] font-semibold text-ink">{figure.source}</span>
              <span className="font-mono text-[0.6875rem] leading-[1.6] text-muted">
                {figure.status}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
