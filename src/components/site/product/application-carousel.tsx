"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { DetailApp } from "@/components/site/product/detail";
import { cn } from "@/lib/utils";

const AUTOPLAY_DELAY_MS = 4200;

type Labels = { previous: string; next: string; pause: string; play: string };

/**
 * The chip pages' application cards: a scroll-snap track that autoplays one
 * step at a time.
 *
 * Steps are the track's reachable scroll positions, not its cards: with two
 * cards in view the last card can never be scrolled to the left edge, so
 * stepping by card left autoplay "advancing" to a position the browser
 * clamps, the bars jumping while the cards stood still. `stops` is re-read on
 * resize because cards per view change by breakpoint.
 *
 * Autoplay stops while the reader is interacting (hover, focus, touch), while
 * the track is off screen or the tab is hidden, under reduced motion, and
 * for good once the reader presses pause — WCAG 2.2.2 asks for a control,
 * not only hover-to-pause, for anything that moves on its own.
 */
export function ApplicationCarousel({ apps, labels }: { apps: readonly DetailApp[]; labels: Labels }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<number[]>([0]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // `offsetLeft` is read against the track, which is why it is `relative`.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const next: number[] = [];
    for (const child of Array.from(track.children) as HTMLElement[]) {
      const left = Math.min(child.offsetLeft, max);
      if (!next.length || left - next[next.length - 1] > 4) next.push(left);
    }
    setStops(next.length ? next : [0]);
  }, []);

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
  }, [measure]);

  const goTo = useCallback(
    (index: number) => {
      const target = (index + stops.length) % stops.length;
      trackRef.current?.scrollTo({ left: stops[target], behavior: reduceMotion ? "auto" : "smooth" });
      setActive(target);
    },
    [stops, reduceMotion],
  );

  const playing = stops.length > 1 && visible && !hovered && !stopped && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) goTo(active + 1);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, goTo]);

  // Swipes and trackpad scrolls update the bars too; the nearest stop wins.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    stops.forEach((stop, index) => {
      if (Math.abs(stop - track.scrollLeft) < Math.abs(stops[closest] - track.scrollLeft)) closest = index;
    });
    if (closest !== active) setActive(closest);
  }

  const control =
    "flex h-8 w-8 items-center justify-center border border-ink/14 text-ink/80 transition-colors hover:border-accent hover:text-ink focus-visible:border-accent";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      className="flex min-w-0 flex-1 flex-col gap-3"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onTouchStart={() => setStopped(true)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false);
      }}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {apps.map((app, index) => (
          <figure
            key={`${app.label}-${index}`}
            className="group relative aspect-[16/10] w-[84%] flex-none snap-start overflow-hidden bg-ink/[0.04] sm:w-[calc(50%-6px)]"
          >
            <Image
              src={app.image}
              alt={app.alt}
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 84vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-linear-to-t from-night via-night/75 to-transparent px-4 pt-10 pb-3">
              <span className="text-[14px] leading-tight font-semibold text-ink lg:text-[15px]">{app.label}</span>
              {app.date ? (
                <span className="text-[11px] font-semibold text-accent-hover lg:text-[12px]">{app.date}</span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {stops.length > 1 ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center" aria-label={`${active + 1} / ${stops.length}`}>
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
      ) : null}
    </div>
  );
}
