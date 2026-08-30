"use client";

import { useCallback, useState } from "react";
import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Txt, u } from "@/components/artboard";
import { HeroFlow } from "@/components/home/flow";
import { path } from "@/lib/routes";
import { cn } from "@/lib/cn";

export function Hero({ c }: { c: HomeContent["hero"] }) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  const select = useCallback((index: number) => {
    setActive(index);
    setCycle((value) => value + 1);
  }, []);

  const slide = c.slides[active];

  return (
    <div className="hero-experience">
    <Artboard
      className="bg-art-black text-white"
      flow={<HeroFlow c={c} active={active} cycle={cycle} onSelect={select} />}
    >
      <Img
        src={c.media.src ?? ""}
        alt={c.media.alt}
        x={0}
        y={0}
        w={1408}
        h={768}
        fit="cover"
        priority
        sizes="(min-width: 1425px) and (min-height: 832px) 1408px, 1px"
      />

      {/* 615 is the canvas measure that keeps each headline on the two lines the
          design breaks it into — wider and "ngoại" climbs onto line one. */}
      <Txt key={`title-${active}-${cycle}`} as="h1" x={61} y={170} w={615} size={40.4} weight={700} leading={62} uppercase className="hero-copy hero-copy-title">
        {slide.title}
      </Txt>

      <Txt key={`lead-${active}-${cycle}`} x={61} y={307} w={492} size={26.7} leading={42} className="hero-copy hero-copy-lead">
        {slide.lead}
      </Txt>

      <Abs x={232} y={515} className="flex" style={{ gap: u(4) }}>
        {c.slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => select(i)}
            aria-label={s.title}
            aria-current={i === active}
            className="flex items-center justify-center rounded-full"
            style={{ width: u(44), height: u(44) }}
          >
            <span
              className={cn("hero-rail", i === active && "is-active")}
              style={{ width: u(41), height: u(5) }}
            />
          </button>
        ))}
      </Abs>

      <Abs x={60} y={572} w={207} h={44} className="hero-cta" data-reveal="3">
        <a
          href={path("products")}
          className="font-artboard-alt border-art-blue-deep text-art-blue-deep hover:bg-art-blue-deep flex h-full w-full items-center justify-between border uppercase transition-colors hover:text-white"
          style={{ fontSize: u(14.9), fontWeight: 700, paddingInline: u(21) }}
        >
          {c.cta}
          <span aria-hidden>→</span>
        </a>
      </Abs>

      <Abs x={61} y={717} className="flex items-center" style={{ gap: u(11), fontSize: u(17.3) }} data-reveal="4">
        {c.pillars.map((p, i) => (
          <span key={p} className="flex items-center uppercase" style={{ gap: u(11) }}>
            {i > 0 && (
              <span aria-hidden className="bg-art-blue rounded-full" style={{ width: u(5), height: u(5) }} />
            )}
            {p}
          </span>
        ))}
      </Abs>
    </Artboard>
    </div>
  );
}
