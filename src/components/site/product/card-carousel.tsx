"use client";

import { useRef, useState, type ReactNode } from "react";

import { GroupRule } from "@/components/site/primitives";
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
  count,
  gridColsClassName,
  children,
}: {
  label: string;
  meta: string;
  count: number;
  gridColsClassName: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Reads the step between two cards from the DOM instead of assuming a
  // fixed card width + gap, so this keeps working if that sizing ever
  // changes without a matching edit here, and for either card row's own
  // width.
  function handleScroll() {
    const track = trackRef.current;
    if (!track || count < 2) return;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first || !second) return;
    const step = second.offsetLeft - first.offsetLeft;
    if (!step) return;
    const index = Math.round(track.scrollLeft / step);
    setActive(Math.min(count - 1, Math.max(0, index)));
  }

  return (
    <>
      <GroupRule label={label} meta={meta}>
        {/* Hidden from `lg`: the grid shows every card at once, so a "which
            card am I on" readout has nothing left to count. */}
        <span className="ml-auto font-mono text-label text-faint lg:hidden">
          <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> /{" "}
          {String(count).padStart(2, "0")}
        </span>
      </GroupRule>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className={cn(
          "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "lg:mx-0 lg:grid lg:snap-none lg:gap-x-col lg:gap-y-4 lg:overflow-visible lg:px-0 lg:pb-0",
          gridColsClassName,
        )}
      >
        {children}
      </div>

      {count > 1 ? (
        <div aria-hidden className="mx-5 flex items-center gap-1.5 lg:hidden">
          {Array.from({ length: count }, (_, index) => (
            <span
              key={index}
              className={cn(
                "h-[3px] transition-[width,background-color]",
                index === active ? "w-[22px] bg-accent" : "w-[10px] bg-ink/22",
              )}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
