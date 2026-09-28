"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { CarouselControls, useSnapCarousel, type CarouselLabels } from "@/components/site/product/snap-carousel";
import { cn } from "@/lib/utils";

/**
 * The four core-capability cards: a scroll-snap slider below `md`, a static
 * 2×2 / 4-up grid from there. Same hook and controls as the /products card
 * rows (`snap-carousel.tsx`), so autoplay, pause and reduced motion behave the
 * same on every slider on the site.
 *
 * The cards are server-rendered and handed in as `children`; this file only
 * owns the track. On a phone the card in view is lifted to full opacity and
 * scale while its neighbours sit back, and the change eases as the reader
 * swipes — `active` follows the nearest snap stop during the scroll, not only
 * once it settles. From `md` nothing scrolls, the hook finds one stop, and the
 * dimming classes are `max-md:` so every card shows at full strength.
 *
 * One `Reveal` for the whole track rather than one per card: a card that only
 * peeks in from the right edge never reaches a per-card visibility threshold
 * and would stay transparent (the same finding as `card-carousel.tsx`).
 */
export function CoreCarousel({ labels, children }: { labels: CarouselLabels; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const carousel = useSnapCarousel(trackRef);
  const count = Children.count(children);

  // The flag lives on the card element itself so the emphasis can be pure CSS
  // on the track (`[&>[data-active]]`), with no per-card client component.
  useEffect(() => {
    const cards = Array.from(trackRef.current?.children ?? []);
    cards.forEach((card, index) => card.toggleAttribute("data-active", index === carousel.active));
  }, [carousel.active, count]);

  return (
    <div {...carousel.rootProps} className="flex grow flex-col gap-4">
      <Reveal className="flex grow flex-col">
        <div
          ref={trackRef}
          onScroll={carousel.onScroll}
          className={cn(
            "relative -mx-gutter flex grow snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-gutter px-gutter [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "[&>*]:w-[84%] [&>*]:shrink-0 [&>*]:snap-start",
            "max-md:[&>*]:scale-[0.965] max-md:[&>*]:opacity-55 max-md:[&>*]:transition-[opacity,transform] max-md:[&>*]:duration-500 max-md:[&>*]:ease-[cubic-bezier(0.22,1,0.36,1)]",
            "max-md:[&>[data-active]]:scale-100 max-md:[&>[data-active]]:opacity-100 motion-reduce:[&>*]:transition-none",
            "md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-[clamp(12px,1.2vw,16px)] md:overflow-visible md:px-0 md:[&>*]:w-auto lg:grid-cols-4",
          )}
        >
          {children}
        </div>
      </Reveal>

      <CarouselControls carousel={carousel} labels={labels} className="md:hidden" />
    </div>
  );
}
