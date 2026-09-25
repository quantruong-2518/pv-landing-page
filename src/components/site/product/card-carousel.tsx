"use client";

import { useRef, type ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { GroupRule } from "@/components/site/primitives";
import { CarouselControls, useSnapCarousel, type CarouselLabels } from "@/components/site/product/snap-carousel";
import { cn } from "@/lib/utils";

/**
 * A card row's track: a `GroupRule` (carrying a "01 / 03" counter that only
 * means something while the cards scroll) plus the track itself and, below
 * `lg`, a row of progress bars.
 *
 * Below `lg` the track is a scroll-snap slider (brief P1 § Layout, "Mobile"
 * — extended through `md`–`lg` per the brief's "pick something sane" call,
 * since the same tested pattern avoids a second bespoke layout no mock
 * covers). From `lg` the same element becomes the static grid — one set of
 * card elements, not two, so nothing double-renders or double-loads an
 * image; only the responsive classes on the track and on each card switch
 * it between the two.
 *
 * Shared by both card rows on `/products` — the P1 hardware cards and the
 * P2 solution cards (brief P2: "reuse the SAME client slider/counter
 * component you built for P1 (generalise it, don't duplicate)"); nothing
 * here is specific to either, which is what makes the reuse possible.
 *
 * This is the one "use client" boundary either brief asks for. The cards
 * themselves are built server-side in `Catalogue` and handed in as
 * `children` — an RSC composition, not a prop of primitive values — so their
 * markup, and any `next/image` renders inside them, stay server-rendered
 * rather than joining the client bundle.
 */
export function CardCarousel({
  label,
  meta,
  gridColsClassName,
  labels,
  children,
}: {
  label: string;
  meta: string;
  gridColsClassName: string;
  /** Screen-reader labels for the pause / previous / next controls. */
  labels: CarouselLabels;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Same autoplay + controls as the chip pages' application carousel. From
  // `lg` the track is a static grid that does not scroll, so the hook finds
  // one stop and neither autoplays nor renders its controls.
  const carousel = useSnapCarousel(trackRef);
  const total = Math.max(carousel.stops.length, 1);

  return (
    // `contents`: the wrapper only carries the carousel's group role and
    // interaction handlers; the rule, track and controls stay direct flow
    // children of the section, so its spacing is unchanged.
    <div {...carousel.rootProps} className="contents">
      <GroupRule label={label} meta={meta}>
        {/* Hidden from `lg`: the grid shows every card at once, so a "which
            card am I on" readout has nothing left to count. */}
        {total > 1 ? (
          <span className="ml-auto font-mono text-label text-faint lg:hidden">
            <span className="text-ink">{String(carousel.active + 1).padStart(2, "0")}</span> /{" "}
            {String(total).padStart(2, "0")}
          </span>
        ) : null}
      </GroupRule>

      {/* One reveal for the whole row, not one per card: a card that only
          peeks in from the right edge of the slider (~60px of 300) never
          reached a per-card reveal's visibility threshold, so it stayed
          transparent and the row looked cut off with a blank strip. */}
      <Reveal>
      <div
        ref={trackRef}
        onScroll={carousel.onScroll}
        className={cn(
          "relative -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "lg:mx-0 lg:grid lg:snap-none lg:gap-x-col lg:gap-y-4 lg:overflow-visible lg:px-0 lg:pb-0",
          gridColsClassName,
        )}
      >
        {children}
      </div>
      </Reveal>

      <CarouselControls carousel={carousel} labels={labels} className="lg:hidden" />
    </div>
  );
}
