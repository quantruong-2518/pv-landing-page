"use client";

import { useCallback, useEffect, useState, type FocusEvent, type PointerEvent, type RefObject } from "react";

import { cn } from "@/lib/utils";

export const AUTOPLAY_DELAY_MS = 4200;

export type CarouselLabels = { previous: string; next: string; pause: string; play: string };

/**
 * Autoplay + position state for a horizontal scroll-snap track.
 *
 * Steps are the track's reachable scroll positions, not its cards: with more
 * than one card in view the last card can never reach the left edge, so
 * stepping by card left autoplay "advancing" to a position the browser
 * clamps — the bars jumped while the cards stood still. `stops` is re-read on
 * resize, since cards per view change by breakpoint; a track that does not
 * scroll at all (a static grid from `lg`) collapses to one stop and never
 * autoplays.
 *
 * Autoplay stops while the reader is interacting (hover, focus, touch), while
 * the track is off screen or the tab is hidden, under reduced motion, and for
 * good once the reader presses pause — WCAG 2.2.2 asks for a control, not
 * only hover-to-pause, for anything that moves on its own.
 */
export function useSnapCarousel(trackRef: RefObject<HTMLDivElement | null>) {
  const [stops, setStops] = useState<number[]>([0]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // `offsetLeft` is read against the track, which must be `relative`, and
  // taken relative to the first card so a track with side padding (the
  // catalogue's `px-5` + `scroll-pl-5`) still starts at 0.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const children = Array.from(track.children) as HTMLElement[];
    const base = children[0]?.offsetLeft ?? 0;
    const next: number[] = [];
    for (const child of children) {
      const left = Math.max(0, Math.min(child.offsetLeft - base, max));
      if (!next.length || left - next[next.length - 1] > 4) next.push(left);
    }
    setStops(max > 4 && next.length ? next : [0]);
  }, [trackRef]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    const seen = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    seen.observe(track);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motion.matches);
    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => {
      resize.disconnect();
      seen.disconnect();
      motion.removeEventListener("change", syncMotion);
    };
  }, [trackRef, measure]);

  const goTo = useCallback(
    (index: number) => {
      const target = (index + stops.length) % stops.length;
      trackRef.current?.scrollTo({ left: stops[target], behavior: reduceMotion ? "auto" : "smooth" });
      setActive(target);
    },
    [trackRef, stops, reduceMotion],
  );

  const playing = stops.length > 1 && visible && !hovered && !stopped && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) goTo(active + 1);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, goTo]);

  // Swipes and trackpad scrolls move the bars too; the nearest stop wins.
  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    stops.forEach((stop, index) => {
      if (Math.abs(stop - track.scrollLeft) < Math.abs(stops[closest] - track.scrollLeft)) closest = index;
    });
    if (closest !== active) setActive(closest);
  }

  /** Spread on the element wrapping track + controls. */
  const rootProps = {
    role: "group",
    "aria-roledescription": "carousel",
    onPointerEnter: (event: PointerEvent) => event.pointerType === "mouse" && setHovered(true),
    onPointerLeave: () => setHovered(false),
    onTouchStart: () => setStopped(true),
    onFocusCapture: () => setHovered(true),
    onBlurCapture: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false);
    },
  } as const;

  return { stops, active, playing, stopped, setStopped, goTo, onScroll, rootProps };
}

/** Progress bars (the active one fills over one autoplay interval) on the
 *  left, pause/play + previous/next on the right. */
export function CarouselControls({
  carousel,
  labels,
  className,
}: {
  carousel: ReturnType<typeof useSnapCarousel>;
  labels: CarouselLabels;
  className?: string;
}) {
  const { stops, active, playing, stopped, setStopped, goTo } = carousel;
  if (stops.length < 2) return null;
  const control =
    "flex h-8 w-8 items-center justify-center border border-ink/14 text-ink/80 transition-colors hover:border-accent hover:text-ink focus-visible:border-accent";

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center">
        {stops.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`${index + 1} / ${stops.length}`}
            aria-current={index === active ? "true" : undefined}
            // 24px-tall hit area around a 3px bar (WCAG 2.5.8 target size).
            className="group/bar flex h-6 items-center px-[3px]"
          >
            <span
              className={cn(
                "relative block h-[3px] overflow-hidden transition-[width] duration-300",
                index === active ? "w-8 bg-ink/22" : "w-3 bg-ink/22 group-hover/bar:bg-ink/45",
              )}
            >
              {index === active ? (
                <span
                  // Re-keyed per step so the fill restarts from zero.
                  key={`${active}-${playing}`}
                  className={cn("absolute inset-0 origin-left bg-accent", playing && "animate-carousel-progress")}
                  style={playing ? { animationDuration: `${AUTOPLAY_DELAY_MS}ms` } : undefined}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className={control}
          onClick={() => setStopped((value) => !value)}
          aria-label={stopped ? labels.play : labels.pause}
        >
          {stopped ? (
            <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M3 1.5v9l7.5-4.5z" />
            </svg>
          ) : (
            <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />
            </svg>
          )}
        </button>
        <button type="button" className={control} onClick={() => goTo(active - 1)} aria-label={labels.previous}>
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8.5 3 4.5 7l4 4" />
          </svg>
        </button>
        <button type="button" className={control} onClick={() => goTo(active + 1)} aria-label={labels.next}>
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="m5.5 3 4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
