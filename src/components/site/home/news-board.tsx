"use client";

import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { MarkedText } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

/** Flattened on the server so this file receives strings, not dictionaries. */
/** The phone slider's two stepper labels, flattened per locale on the server. */
export type SliderLabels = { previous: string; next: string };

export type NewsStory = {
  /** Display date, the design's Vietnamese DD.MM.YYYY. */
  date: string;
  /** The same date as YYYY-MM-DD, for `<time dateTime>`. */
  iso: string;
  title: string;
  /** May carry `**…**` marks — grammar in `lib/content/markup.ts`. */
  body: string;
  image: string;
};

/** The id of the region the slider buttons drive — `aria-controls` needs one. */
const STORIES_ID = "news-stories";

/**
 * The news board, as locked with the client on 2026-09-24 (mock artboards
 * "News — Desktop" / "News — Mobile").
 *
 * Desktop is deliberately *not* four equal cards: the lead story takes the left
 * half with an image that grows to whatever height the full-screen section hands
 * the row, and the other three are compact rows on the right — 4:3 thumbnail,
 * date, title, two lines of copy — spaced `justify-between` so the stack ends on
 * the same baseline as the featured card. No borders and no rules inside the
 * board; the grouping is carried by the two column widths alone.
 *
 * Below `md` that becomes one story per screen with a counter, a dot per story
 * and 48px prev/next buttons. The client's reason for asking is the one the mock
 * fixes: four stacked cards made this section the longest scroll on the phone
 * home page for content a reader skims.
 *
 * One component, one DOM, both layouts — the same rule `PimDirections` follows.
 * The unselected stories are hidden by a `max-md:hidden` class, never by a media
 * query read in JavaScript, so the server HTML carries all four stories and the
 * page still prerenders complete (CLAUDE.md § 3). The slider controls are
 * `md:hidden`: from `md` every story is already on screen, so a "which one am I
 * on" control would be counting things the reader can see.
 *
 * Cards are `<article>` elements, not links. The design mock pointed every card
 * back at `#tin-tuc`, this section's own anchor: there is no /news route and no
 * article URLs yet, and a card that scrolls you to where you already are is
 * worse than one that does not move. Wrap each in a Link when real destinations
 * exist. `<time dateTime>` is machine-readable on purpose — it is what lets a
 * crawler date these announcements.
 */
export function NewsBoard({ stories, controls }: { stories: NewsStory[]; controls: SliderLabels }) {
  const [index, setIndex] = useState(0);
  const [featured, ...rest] = stories;
  const count = stories.length;

  return (
    <div className="flex flex-col gap-[clamp(14px,1.6vw,22px)] md:grow">
      <div
        id={STORIES_ID}
        className={cn(
          "grid gap-x-[clamp(24px,3.6vw,52px)] md:grow",
          // Only split the board in two when there is a right-hand stack to
          // put there: `news.count` is a CMS field and can be as low as 1.
          rest.length > 0 && "md:grid-cols-2",
        )}
      >
        <FeaturedStory story={featured} selected={index === 0} />

        {rest.length > 0 ? (
          // `contents` below `md` dissolves this wrapper so the three compact
          // stories are siblings of the featured one in the single-column grid
          // the slider pages through; from `md` it is the right-hand column.
          <div className="contents md:flex md:flex-col md:justify-between md:gap-[clamp(18px,2.2vw,28px)]">
            {rest.map((story, position) => (
              <CompactStory
                key={story.iso}
                story={story}
                position={position + 1}
                selected={index === position + 1}
              />
            ))}
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <SliderControls stories={stories} controls={controls} index={index} onSelect={setIndex} />
      ) : null}
    </div>
  );
}

/**
 * The lead story: image, then date, title and body.
 *
 * The image is `grow` with a floor rather than a fixed height — it is the one
 * band in the card with nothing to measure, so it absorbs whatever surplus the
 * full-height section hands the row while the date, title and copy stay the
 * height of their own type. Below `md` there is no surplus to absorb and the
 * card is one slide of the slider, so it takes the same 16:9 crop as the rest.
 */
function FeaturedStory({ story, selected }: { story: NewsStory; selected: boolean }) {
  return (
    <Reveal
      as="article"
      className={cn("flex flex-col gap-3 md:gap-[18px]", !selected && "max-md:hidden")}
    >
      <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[240px] md:grow">
        <Image
          src={story.image}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 46vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <time dateTime={story.iso} className="font-mono text-kicker text-accent">
          {story.date}
        </time>
        {/* `card-title` is the step the mock's 27px lands on, with the weight
         * held at 600 as everywhere else these sans sub-heads appear (the
         * token's 700 is meant for the heading face). Below `md` the same
         * title is one slide among four and drops to the shared `h3` step. */}
        <h3 className="text-h3 font-semibold md:text-card-title">{story.title}</h3>
        <p className="max-w-[54ch] text-card text-body md:text-lead">
          <MarkedText value={story.body} />
        </p>
      </div>
    </Reveal>
  );
}

/**
 * One of the three secondary stories: a 4:3 thumbnail beside the copy from `md`
 * (272×204 in the mock — held as a ratio, not a pixel height, so the thumbnail
 * tracks the column instead of drifting off it), stacked as a full slide below.
 *
 * `items-start` keeps the thumbnail at its own ratio: stretched to the row it
 * would grow with the copy, and the three rows carry different line counts.
 */
function CompactStory({
  story,
  position,
  selected,
}: {
  story: NewsStory;
  position: number;
  selected: boolean;
}) {
  return (
    <Reveal
      as="article"
      delay={position * 0.06}
      className={cn(
        "grid gap-3 md:grid-cols-[clamp(150px,19vw,272px)_minmax(0,1fr)] md:items-start md:gap-x-[clamp(14px,1.7vw,24px)]",
        !selected && "max-md:hidden",
      )}
    >
      <div className="relative aspect-video overflow-hidden md:aspect-[4/3]">
        <Image
          src={story.image}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 md:gap-2">
        <time dateTime={story.iso} className="font-mono text-kicker text-accent">
          {story.date}
        </time>
        <h3 className="text-h3 font-semibold">{story.title}</h3>
        <p className="text-card text-body">
          <MarkedText value={story.body} />
        </p>
      </div>
    </Reveal>
  );
}

/**
 * The phone-only slider rail: position counter, a dot per story, then the two
 * 48px stepper buttons the mock sizes for a thumb.
 *
 * The dots are named after the story they lead to — a destination is more use
 * than a number — and the two steppers after the direction they move in
 * (`dictionary.home.news.controls`, all three locales). The labels arrive as
 * props because this file is the client boundary: flattening them on the server
 * keeps the dictionaries out of the bundle, exactly as the stories do.
 *
 * The dots are `aria-pressed` toggles, not an ARIA tablist: the same argument as
 * `PimDirections` — from `md` this whole rail is `display: none` while every
 * story stays on screen, which would leave `tabpanel` elements with no tablist
 * that owns them.
 */
function SliderControls({
  stories,
  controls,
  index,
  onSelect,
}: {
  stories: NewsStory[];
  controls: SliderLabels;
  index: number;
  onSelect: (next: number) => void;
}) {
  const count = stories.length;
  // Wrap around, as the mock does: with four stories a dead-ended stepper puts
  // a disabled button under the thumb half the time.
  const previous = (index + count - 1) % count;
  const next = (index + 1) % count;

  return (
    <div className="flex items-center gap-4 md:hidden">
      {/* Announced on change: the counter is the only thing on the rail that
          says the slider moved at all. */}
      <span aria-live="polite" className="font-mono text-kicker font-semibold">
        {pad(index + 1)} / {pad(count)}
      </span>

      <div className="flex items-center gap-2">
        {stories.map((story, position) => (
          <button
            key={story.iso}
            type="button"
            aria-pressed={position === index}
            aria-controls={STORIES_ID}
            aria-label={story.title}
            onClick={() => onSelect(position)}
            // 8px dots with 8px between them is what the mock draws, and 8px is
            // no tap target. The `before` box widens the hit area to 16×28
            // without moving anything: 4px is the most it can grow sideways
            // before two neighbours overlap and the wrong dot answers the tap.
            className={cn(
              "relative size-2 transition-colors before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-['']",
              position === index ? "bg-accent" : "bg-ink/22",
            )}
          />
        ))}
      </div>

      <div className="ml-auto flex gap-2.5">
        <button
          type="button"
          aria-controls={STORIES_ID}
          aria-label={controls.previous}
          onClick={() => onSelect(previous)}
          className="flex size-12 items-center justify-center bg-ink/8 text-h3 leading-none transition-colors active:bg-ink/16"
        >
          <span aria-hidden>←</span>
        </button>
        {/* The one filled control on the screen, the way the design treats the
            single real CTA of a phone screen (`Button` variant `primary`). */}
        <button
          type="button"
          aria-controls={STORIES_ID}
          aria-label={controls.next}
          onClick={() => onSelect(next)}
          className="flex size-12 items-center justify-center bg-accent text-h3 leading-none text-night transition-colors active:bg-accent-hover"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

/** "1" → "01", so the counter reads `01 / 04` at every position. */
function pad(value: number): string {
  return String(value).padStart(2, "0");
}
