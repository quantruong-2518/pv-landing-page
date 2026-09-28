import type { ReactNode } from "react";

import { CoreCarousel } from "@/components/site/home/core-carousel";
import { Eyebrow, MarkedText } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { splitLines } from "@/lib/content/markup";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * 03 — Core capability, rebuilt around the owner's four-capability brief
 * (2026-09-28): CIM/IMC, dual architecture, full-stack integration, silicon
 * validation.
 *
 * The previous layout was three full-width rows built to carry one loud figure
 * (`400K`) and two phrases. Four capabilities of unlike shape — a principle, a
 * pair, a stack, a track record — do not fit that: each one now gets a column
 * of the same anatomy, so they read as four answers to one question, and the
 * difference between them lives in the glyph and the evidence list underneath.
 *
 *   index · tag        what the capability is called
 *   glyph              a 120×72 drawing of it (square, hairline, no fill)
 *   title + body       the claim, with its keywords marked (lib/content/markup.ts)
 *   evidence list      the concrete parts of it, pinned to the card's foot
 *
 * `400K` left this section with the rows. It is still a CMS field (`core.stat`)
 * because `/bio` prints it; nothing here reads it.
 *
 * Four columns from `lg`, a 2×2 at `md`, a swipe carousel below
 * (`core-carousel.tsx`). The evidence list is `mt-auto`, so the four lists
 * share a baseline whatever the body length.
 */
export function CoreStats({ content, locale }: { content: HomeContent["core"]; locale: Locale }) {
  const titleLines = splitLines(content.title[locale]);
  const carousel = dictionary.product.shared.carousel;
  const carouselLabels = {
    previous: carousel.previous[locale],
    next: carousel.next[locale],
    pause: carousel.pause[locale],
    play: carousel.play[locale],
  };

  return (
    <Section
      labelledBy="core-title"
      screen
      spend="between"
      className="glow-core gap-[clamp(22px,2.6vw,32px)] bg-night-deep"
    >
      <div className="grid gap-row gap-x-col lg:grid-cols-2 lg:items-end">
        <div className="flex flex-col gap-[clamp(10px,1.4vw,18px)]">
          <Eyebrow>{content.eyebrow[locale]}</Eyebrow>
          <h2 id="core-title" className="font-heading text-h2 text-balance">
            {titleLines.map((line, index) => (
              // Lines after the first qualify the headline and are set in
              // `muted`. `block` only from `md`: on a phone a display line has
              // no room to break where a desktop layout wants it.
              <span key={index} className={cn("md:block", index > 0 && "text-muted")}>
                {index > 0 ? " " : null}
                <MarkedText value={line} />
              </span>
            ))}
          </h2>
        </div>

        <p className="max-w-[56ch] text-lead text-body">
          <MarkedText value={content.lead[locale]} />
        </p>
      </div>

      <CoreCarousel labels={carouselLabels}>
        {dictionary.home.core.pillars.map((pillar, index) => (
          <article
            key={pillar.index}
            className={cn(
              "relative flex flex-col gap-[clamp(12px,1.2vw,16px)] rounded-card border bg-marquee p-[clamp(18px,1.8vw,26px)]",
              // The first capability is the premise of the other three, so it
              // alone gets the accent frame.
              index === 0 ? "border-accent/40" : "border-ink/12",
            )}
          >
            <div className="flex items-baseline justify-between gap-3 font-mono text-kicker">
              <span className="text-accent">{pillar.index}</span>
              <span className="text-faint">{pillar.tag}</span>
            </div>

            <Glyph kind={pillar.kind} />

            <h3 className="text-h3 font-semibold">{pillar.title[locale]}</h3>
            <p className="text-card text-body">
              <MarkedText value={pillar.body[locale]} />
            </p>

            <ul className="mt-auto flex flex-col gap-3 border-t border-ink/12 pt-[clamp(12px,1.2vw,16px)]">
              {pillar.items.map((item) => (
                <li key={item.tag} className="flex flex-col gap-0.5">
                  <span className="font-mono text-label text-accent">{item.tag}</span>
                  <span className="text-note text-muted">{item.text[locale]}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </CoreCarousel>
    </Section>
  );
}

type GlyphKind = (typeof dictionary.home.core.pillars)[number]["kind"];

/**
 * One 120×72 line drawing per capability, in `currentColor` so the card's own
 * `text-accent` colours it. Hairline strokes and square caps only: the design
 * has no rounded corners, and a filled shape would be the loudest thing on a
 * card whose job is the sentence under it.
 */
function Glyph({ kind }: { kind: GlyphKind }) {
  const shapes: Record<GlyphKind, ReactNode> = {
    // A memory array with compute cells inside it: the one lit cell is the
    // point — the arithmetic happens in the array, not beside it.
    cim: (
      <>
        <rect x="6" y="6" width="108" height="60" />
        {[0, 1, 2].flatMap((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={18 + col * 24}
              y={16 + row * 16}
              width="12"
              height="8"
              opacity={row === 1 && col === 2 ? 1 : 0.35}
              fill={row === 1 && col === 2 ? "currentColor" : "none"}
            />
          )),
        )}
      </>
    ),
    // Two chips, two signals: the continuous wave of the analog line, the
    // square pulse of the digital one, echoing the PIM cards above.
    dual: (
      <>
        <rect x="4" y="6" width="52" height="60" />
        <rect x="64" y="6" width="52" height="60" />
        <path d="M10 36c6-16 12-16 18 0s12 16 18 0" opacity="0.9" />
        <path d="M70 46h8v-20h10v20h10v-20h6" opacity="0.9" />
      </>
    ),
    // Three layers, hardware at the bottom, joined by a spine.
    stack: (
      <>
        <rect x="16" y="6" width="88" height="16" opacity="0.5" />
        <rect x="16" y="28" width="88" height="16" opacity="0.75" />
        <rect x="16" y="50" width="88" height="16" />
        <path d="M60 22v6M60 44v6" strokeDasharray="2 2" />
      </>
    ),
    // Three bars stepping up, each capped by a square: measured, then higher.
    silicon: (
      <>
        <path d="M6 66h108" />
        <rect x="16" y="44" width="20" height="22" opacity="0.5" />
        <rect x="50" y="30" width="20" height="36" opacity="0.75" />
        <rect x="84" y="12" width="20" height="54" />
        <rect x="90" y="4" width="8" height="8" fill="currentColor" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 120 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      className="h-[clamp(56px,6vw,76px)] w-auto self-start text-accent"
    >
      {shapes[kind]}
    </svg>
  );
}
