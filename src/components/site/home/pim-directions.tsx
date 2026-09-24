"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type PimDirectionKind = "analog" | "digital";

/** Flattened on the server so this file receives strings, not dictionaries. */
export type PimDirection = {
  kind: PimDirectionKind;
  index: string;
  name: string;
  heading: string;
  body: string;
  cta: string;
  image: string;
  imageAlt: string;
  href: string;
};

/** A static drafting layer. The raster chip beneath it is the only moving part. */
function PimSignalDrawing({ kind }: { kind: PimDirectionKind }) {
  const signal =
    kind === "analog"
      ? "M-60 420C10 420 20 286 90 286S160 520 230 520S300 286 370 286S440 520 510 520S580 286 650 286S720 520 790 520S860 286 930 286S1000 520 1070 520S1140 286 1210 286S1280 420 1340 420"
      : "M-40 475H80V315H180V475H300V315H400V475H520V315H620V475H740V315H840V475H960V315H1060V475H1180V315H1240";

  const nodes =
    kind === "analog"
      ? [90, 230, 370, 510, 650, 790, 930, 1070, 1210]
      : [80, 180, 300, 400, 520, 620, 740, 840, 960, 1060, 1180];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 675"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full text-accent"
    >
      <g fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke">
        <path d="M0 395H1200" strokeWidth="0.75" strokeDasharray="2 12" opacity="0.2" />
        <path d={signal} strokeWidth="5" opacity="0.05" />
        <path d={signal} strokeWidth="1.25" opacity="0.62" />
        <path
          d={signal}
          transform="translate(0 18)"
          strokeWidth="0.75"
          strokeDasharray="3 8"
          opacity="0.22"
        />
      </g>

      <g fill="currentColor" opacity="0.56">
        {nodes.map((x, index) => (
          <circle
            key={x}
            cx={x}
            cy={kind === "analog" ? (index % 2 === 0 ? 286 : 520) : index % 2 === 0 ? 315 : 475}
            r="2.75"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * The two PIM direction cards.
 *
 * Desktop shows both side by side; below `md` they are a switcher, because the
 * 2026-09 review found the stacked pair on a phone to be two near-identical
 * cards read one after the other — 1.8 screens of scroll to compare four lines
 * of copy. One card at a time with the other a tap away is what the locked
 * mockup (canvas artboard "PIM — Mobile") asks for.
 *
 * The switcher is two `aria-pressed` buttons rather than an ARIA tablist. A
 * tablist would be the textbook control, but the buttons are `display:none`
 * from `md` up while both panels stay on screen, which leaves `role="tabpanel"`
 * elements with no tablist that owns them. Toggle buttons that control a region
 * are true at both widths and need no second DOM.
 *
 * One component, one DOM, both layouts: the non-selected card is hidden by a
 * `max-md:` class, never by a media query read in JavaScript, so the section
 * still prerenders complete (CLAUDE.md § 3).
 */
export function PimDirections({ directions }: { directions: PimDirection[] }) {
  const [selected, setSelected] = useState<PimDirectionKind>(directions[0].kind);

  return (
    <div className="flex grow flex-col">
      <div className="grid grid-cols-2 border border-ink/16 md:hidden">
        {directions.map((direction) => {
          const isSelected = direction.kind === selected;
          return (
            <button
              key={direction.kind}
              type="button"
              aria-pressed={isSelected}
              aria-controls={`pim-card-${direction.kind}`}
              onClick={() => setSelected(direction.kind)}
              className={cn(
                "min-h-12 border-b-2 font-mono text-kicker font-semibold transition-colors",
                isSelected
                  ? "border-accent bg-accent/14 text-ink"
                  : "border-transparent text-muted",
              )}
            >
              {direction.index} · {direction.name}
            </button>
          );
        })}
      </div>

      <div className="grid grow gap-x-col md:grid-cols-2">
        {directions.map((direction, index) => (
          <Reveal
            key={direction.kind}
            delay={index * 0.08}
            className={cn("flex", direction.kind !== selected && "max-md:hidden")}
          >
            <PimCard direction={direction} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * One card: name, the render on its lit band, the copy, then the CTA rail.
 *
 * The whole card is the link. The mockup draws a rail across the bottom on
 * desktop and a filled accent bar on mobile; both are the same row restyled, so
 * a tap anywhere on the card — image included — navigates, and there is no
 * second interactive element nested inside the first.
 *
 * `grow` on the render band, not a fixed height: it is the one band with nothing
 * to measure, so it absorbs whatever surplus a full-height section hands the
 * card, and the name, copy and rail stay the height of their own type. The mock's
 * 372px is the cap, not the value.
 */
function PimCard({ direction }: { direction: PimDirection }) {
  // The CTA labels in dictionary.ts carry their own "→" and /bio renders the
  // same strings as ordinary buttons, where it belongs inline. Here the mock
  // pins it to the far end of the rail, so it is split off rather than removed.
  const label = direction.cta.replace(/\s*→\s*$/, "");

  return (
    <Link
      href={direction.href}
      id={`pim-card-${direction.kind}`}
      className="pim-technical-card group relative flex w-full grow flex-col overflow-hidden border border-ink/12 bg-marquee max-md:border-t-0"
    >
      <div aria-hidden className="pim-technical-grid pointer-events-none absolute inset-0" />

      {/* Below md the switcher above already names the card. */}
      <div className="relative flex items-baseline gap-3.5 px-[clamp(16px,1.9vw,26px)] pt-[clamp(16px,1.6vw,22px)] max-md:hidden">
        <span className="font-mono text-kicker text-accent">{direction.index}</span>
        <span className="font-heading text-wordmark tracking-[0.06em]">{direction.name}</span>
      </div>

      <div className="pim-chip-stage relative flex min-h-[168px] grow items-center justify-center md:min-h-[clamp(190px,20vw,372px)]">
        <Image
          src={direction.image}
          alt={direction.imageAlt}
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 44vw"
          className="pim-chip-render object-contain p-[7%]"
        />
        <PimSignalDrawing kind={direction.kind} />
      </div>

      <div className="relative flex flex-col gap-2.5 px-[clamp(16px,1.9vw,26px)] pb-[clamp(16px,1.8vw,24px)]">
        {/* `text-h3` with the weight held at 600, as `NumberedItem` does: the
         * token's 700 is meant for the heading face, and the design refs set
         * these sans sub-heads at 600. */}
        <div className="text-h3 font-semibold">{direction.heading}</div>
        <p className="max-w-[54ch] text-card text-contact">{direction.body}</p>
      </div>

      {/* The rail. Accent-on-accent-wash from md, a filled accent bar below it —
       * on a phone this is the only CTA on screen, and the design gives the one
       * real CTA of a screen the solid treatment (`Button` variant `primary`). */}
      <div className="relative flex min-h-12 items-center justify-between gap-4 border-t border-ink/12 bg-accent px-[clamp(16px,1.9vw,26px)] py-[clamp(13px,1.3vw,18px)] font-mono text-note font-semibold tracking-[0.12em] text-night transition-colors md:bg-accent/6 md:font-medium md:text-accent md:group-hover:bg-accent/14">
        <span>{label}</span>
        <span aria-hidden>→</span>
      </div>
    </Link>
  );
}
