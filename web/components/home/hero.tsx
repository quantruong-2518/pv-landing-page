"use client";

import { useEffect, useState } from "react";
import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Txt, u } from "@/components/artboard";
import { path } from "@/lib/routes";
import { cn } from "@/lib/cn";

/** Canva pages 1 and 2 are the same frame with two messages — one carousel. */
const SLIDE_MS = 7000;

export function Hero({ c }: { c: HomeContent["hero"] }) {
  const [active, setActive] = useState(0);
  const count = c.slides.length;

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), SLIDE_MS);
    return () => clearInterval(t);
  }, [count]);

  const slide = c.slides[active];

  return (
    <Artboard className="bg-art-black text-white">
      <Img src={c.media.src ?? ""} alt={c.media.alt} x={0} y={0} w={1408} h={768} fit="cover" priority />

      {/* 615 is the canvas measure that keeps each headline on the two lines the
          design breaks it into — wider and "ngoại" climbs onto line one. */}
      <Txt as="h1" x={61} y={170} w={615} size={40.4} weight={700} leading={62} uppercase>
        {slide.title}
      </Txt>

      <Txt x={61} y={307} w={492} size={26.7} leading={42}>
        {slide.lead}
      </Txt>

      <Abs x={240} y={534} className="flex" style={{ gap: u(8) }}>
        {c.slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={s.title}
            aria-current={i === active}
            className={cn("rounded-full transition-colors", i === active ? "bg-art-blue" : "bg-art-dot")}
            style={{ width: u(41), height: u(5) }}
          />
        ))}
      </Abs>

      <Abs x={60} y={573} w={207} h={42}>
        <a
          href={path("products")}
          className="font-artboard-alt border-art-blue-deep text-art-blue-deep hover:bg-art-blue-deep flex h-full w-full items-center justify-between border uppercase transition-colors hover:text-white"
          style={{ fontSize: u(14.9), fontWeight: 700, paddingInline: u(21) }}
        >
          {c.cta}
          <span aria-hidden>→</span>
        </a>
      </Abs>

      <Abs x={61} y={717} className="flex items-center" style={{ gap: u(11), fontSize: u(17.3) }}>
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
  );
}
