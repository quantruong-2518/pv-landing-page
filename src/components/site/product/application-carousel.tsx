"use client";

import Image from "next/image";
import { useRef } from "react";

import type { DetailApp } from "@/components/site/product/detail";
import { CarouselControls, useSnapCarousel, type CarouselLabels } from "@/components/site/product/snap-carousel";

/**
 * The chip pages' application cards: two per view from `sm`, autoplaying one
 * reachable position at a time (`useSnapCarousel`, snap-carousel.tsx).
 */
export function ApplicationCarousel({ apps, labels }: { apps: readonly DetailApp[]; labels: CarouselLabels }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const carousel = useSnapCarousel(trackRef);

  return (
    <div {...carousel.rootProps} className="flex min-w-0 flex-1 flex-col gap-3">
      <div
        ref={trackRef}
        onScroll={carousel.onScroll}
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
      <CarouselControls carousel={carousel} labels={labels} />
    </div>
  );
}
