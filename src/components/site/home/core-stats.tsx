import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, MarkedText } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { splitLines } from "@/lib/content/markup";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * 02 — Core capability, as locked with the client on 2026-09-24 (artboards
 * "Core — Desktop" 1440×900 / "Core — Mobile" 390×940).
 *
 * Three decisions from that review shape the whole file, and each one undoes
 * something the previous three-card grid did:
 *
 *  - **Rows, not columns.** Three full-width rows of `figure | label + body |
 *    outcome`, vertically centred, splitting the section's spare height evenly.
 *    The card grid had to make three unlike things (a wordmark, a figure, a
 *    phrase) share four subgridded edges; as rows they no longer compete for a
 *    common baseline, so each one can be set at the size its content deserves.
 *  - **No borders and no rules.** Separation is whitespace and the type scale
 *    only. So there is deliberately no `GroupRule`, no `border-ink/…` and no
 *    divider anywhere below — a hairline here would read as a table.
 *  - **One loud mark per section.** `400K` is the largest thing on the screen
 *    and the only accent-coloured figure, with a soft radial glow behind it;
 *    `PIM` is a step down; the row-03 headline is smaller again *because it is a
 *    phrase, not a figure* (`small: true` in the dictionary).
 *
 * The `→ ENERGY EFFICIENCY` / `HIGH THROUGHPUT` / `STABLE & CONSISTENT
 * PROCESSING` lines are the third beat of every row rather than a footnote: for
 * investors and partners they are what the row is *for*, so they are set larger
 * than any other mono on the page (15px against the 12px kicker).
 *
 * The head is written out instead of using `SectionHead` for the same reason
 * pim-section.tsx does: the mock sets title lines after the first in `muted`,
 * and both the title break and the lead's emphasis live in the CMS string
 * (`lib/content/markup.ts`), so a locale that wants one line still gets one.
 *
 * Card 02's figure is the one value here the CMS owns (`core.stat`); the other
 * two are fixed phrases, so only card 02 reads from content.
 */

/**
 * The three display steps, transcribed from the mock's own px values
 * (mobile 390 → desktop 1440) rather than taken from `@theme`: the locked
 * hierarchy *is* the ratio between them, and no existing `--text-stat*` token
 * reaches 108px. The `vw` term is set so each clamp lands exactly on the mock's
 * desktop figure at 1440 — 5.7vw = 82px, 7.5vw = 108px.
 */
const FIGURE = "font-heading text-[clamp(3.25rem,5.7vw,5.125rem)] leading-none tracking-[-0.015em]";
const FIGURE_LOUD =
  "font-heading text-accent text-[clamp(4.25rem,7.5vw,6.75rem)] leading-none tracking-[-0.02em]";

/**
 * Row body copy: 15px on a phone, 17px at 1440 (1.18vw). One step *above* the
 * section lead, which stays on `text-lead` — the mock sets the head at 16px and
 * the rows at 17px precisely so the rows read as the payload and the head as
 * the introduction.
 */
const ROW_BODY = "text-[clamp(0.9375rem,1.18vw,1.0625rem)] leading-[1.72]";

/** The outcome rail: mono 600, 13px → 15px, wide tracking, always accent. */
const OUTCOME =
  "font-mono font-semibold text-accent text-[clamp(0.8125rem,1.05vw,0.9375rem)] leading-[1.5] tracking-[0.1em]";

export function CoreStats({ content, locale }: { content: HomeContent["core"]; locale: Locale }) {
  const titleLines = splitLines(content.title[locale]);

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
              // `muted`, as the mock does. `block` only from `md`: on a phone a
              // 26px display line has no room to break where a desktop layout
              // wants it, so the lines run on and wrap.
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

      {/* `grow` is how this block spends a full screen: the surplus goes to the
       * rows, which then split it three ways, instead of collecting as one band
       * of empty navy under the head — this section carries no photograph to
       * fill that band, unlike "Tại sao PIM" next door.
       *
       * The vertical gap is a phone/tablet device only. From `lg` the rows are
       * `flex-1` and centre their own content, so the air between them is the
       * leftover height and a gap on top of it would double-count. */}
      <div className="flex grow flex-col gap-y-[clamp(26px,3vw,34px)] lg:gap-y-0">
        {dictionary.home.core.cards.map((card, index) => (
          <Reveal
            key={card.index}
            delay={index * 0.08}
            // `items-center` against a stretched row track is what the mock's
            // `align-items: center` on a `flex: 1` grid does: figure, body and
            // outcome share one optical centre line rather than a top edge.
            //
            // The 1 / 1.75 / 1 ratio reproduces the mock's 340 / 584 / 330px
            // tracks at 1440 and keeps behaving down at 1024, where the mock's
            // fixed pixel columns would leave the middle one ~230px wide.
            className="grid items-center gap-x-col gap-y-3 md:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)_minmax(0,1fr)]"
          >
            <div className="relative flex flex-col gap-2.5">
              {/* The glow is the loud row's only decoration — no frame, no
               * border. Built from `--color-accent` at element opacity rather
               * than a pasted rgba (CLAUDE.md § 2.4); the geometry is the
               * mock's, scaled from 300×190 on a phone to 380×240 at 1440. */}
              {card.accent ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-[clamp(24px,2vw,30px)] -left-[clamp(40px,4vw,60px)] h-[clamp(190px,17vw,240px)] w-[clamp(300px,26.4vw,380px)] glow-core-figure"
                />
              ) : null}

              <span className="relative font-mono text-kicker text-accent">{card.index}</span>

              {card.headline ? (
                // Row 03's "figure" is a phrase, so it sits on the heading
                // scale instead of the display scale. It is allowed to wrap
                // inside its own column — the mock hard-breaks it after "DỮ
                // LIỆU" at 1440, which is where a 1fr column breaks it anyway,
                // and a `\n` in the dictionary would break the other locales in
                // the wrong place.
                <span className="relative font-heading text-h2-detail">
                  {card.headline[locale]}
                </span>
              ) : (
                <span className={cn("relative", card.accent ? FIGURE_LOUD : FIGURE)}>
                  {card.fromCms ? content.stat : card.value}
                </span>
              )}

              {/* The loud row's label is a notch brighter than the other two —
               * the mock sets it `muted` where rows 01 and 03 are `faint`. */}
              {card.label ? (
                <span
                  className={cn(
                    "relative font-mono text-kicker",
                    card.accent ? "text-muted" : "text-faint",
                  )}
                >
                  {card.label[locale]}
                </span>
              ) : null}
            </div>

            <p className={cn("max-w-[52ch]", ROW_BODY, card.accent ? "text-contact" : "text-muted")}>
              <MarkedText value={card.body[locale]} />
            </p>

            <span className={OUTCOME}>{card.outcome}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
