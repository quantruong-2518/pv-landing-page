import Image from "next/image";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { MarkedText } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { splitLines } from "@/lib/content/markup";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * 02 — "Tại sao công nghệ PIM quan trọng đối với AI?", as locked in the 2026-09
 * review (canvas artboards "Tại sao PIM — Desktop" / "— Mobile").
 *
 * The section reads as a 50/50 split from `lg`: copy left, the DRAM↔NPU render
 * holding the whole right half with a label on each of the two parts the lead
 * paragraph names. Before this it was a full-bleed background image behind a
 * three-column card row, and the reviewer's verdict on that was "rất trống" —
 * the left column had ~310px of nothing in its middle and the three benefits
 * floated along the bottom edge.
 *
 * Below `lg` the render is not a background at all: it is a band of its own,
 * placed right after the sentence about data moving between DRAM and NPU, so it
 * illustrates the line the reader has just read. That is the same element —
 * `position` is what changes at the breakpoint, not the markup — which is why
 * the image is written once and the label coordinates carry two sets of
 * percentages.
 */
export function WhySection({ content, locale }: { content: HomeContent["why"]; locale: Locale }) {
  const copy = dictionary.home.why;
  // The CMS lead is one field carrying two paragraphs: the problem, then what
  // PIM does about it. An editor who removes the break gets one paragraph and
  // no highlight box, which is a degraded layout rather than a broken one.
  const [problem, solution] = splitLines(content.lead[locale]);

  return (
    <Section labelledBy="why-title" screen spend="between" className="overflow-hidden bg-navy">
      <div className="flex flex-col gap-[clamp(14px,1.6vw,20px)] lg:max-w-[46%]">
        <h2 id="why-title" className="font-heading text-h2 text-balance uppercase">
          {content.title[locale]}
        </h2>

        <p className="max-w-[58ch] text-lead text-body">
          <MarkedText value={problem} />
        </p>

        {/* Below `lg` an in-flow band the width of the viewport (the section's
            own gutter is cancelled); from `lg` the right half of the section,
            top to bottom. `inset-y-0 right-0` resolves against `Section`, which
            is `relative`, so the render bleeds past the gutter the copy keeps. */}
        <div className="relative -mx-gutter h-[260px] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[50%]">
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-[78%_center] lg:object-[right_center]"
          />
          <div aria-hidden className="scrim-why pointer-events-none absolute inset-0" />
          {/* Percentages, not pixels: the crop moves with the viewport, and a
              label pinned in px drifts off the part it names. Verified by
              render at 1440×900 and 390×844. */}
          <DiagramLabel className="top-[10%] left-[34%] lg:top-[7%] lg:left-[20%]">
            {copy.diagram.memory[locale]}
          </DiagramLabel>
          <DiagramLabel className="top-[74%] left-[38%] lg:top-[66%] lg:left-[25%]">
            {copy.diagram.processor[locale]}
          </DiagramLabel>
        </div>

        {solution ? (
          // The accent frame is a phone treatment: on a small screen this is the
          // answer to the paragraph above it and has to survive being read after
          // a 260px picture. From `lg` the two paragraphs are a pair again and
          // the frame would only box in half of it.
          <p className="max-w-[58ch] border border-accent/28 bg-accent/8 p-4 text-lead text-contact lg:border-0 lg:bg-transparent lg:p-0">
            <MarkedText value={solution} />
          </p>
        ) : null}
      </div>

      <div className="flex flex-col pt-[clamp(12px,1.4vw,20px)] lg:max-w-[46%]">
        {copy.cards.map((card, index) => (
          <Reveal
            key={card.index}
            delay={index * 0.08}
            className="relative overflow-hidden border-t border-ink/16 py-[clamp(16px,1.9vw,22px)] pr-[clamp(68px,8vw,116px)]"
          >
            {/* The reviewer picked the "giant numeral behind the row" option. It
                is vertically centred in its own right-hand gutter rather than
                bled off the corner: at 168px it was clipped by this row's own
                `overflow-hidden` and its outline crossed the paragraph, so what
                the screen showed was a fragment, not a number. */}
            <span
              aria-hidden
              className="why-index absolute top-1/2 right-0 -translate-y-1/2 font-heading text-[clamp(62px,7.2vw,104px)] leading-none tracking-[-0.03em]"
            >
              {card.index}
            </span>
            <div className="text-h3 font-semibold">{card.title[locale]}</div>
            <p className="mt-1.5 text-card text-body">{card.body[locale]}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** A mono tag with a square pointer, sitting on the part of the render it names. */
function DiagramLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("absolute flex items-center gap-1.5 lg:gap-2", className)}>
      <span className="border border-accent/50 bg-navy/85 px-2 py-1.5 font-mono text-label whitespace-nowrap">
        {children}
      </span>
      <span aria-hidden className="size-1.5 bg-accent lg:size-2" />
    </span>
  );
}
