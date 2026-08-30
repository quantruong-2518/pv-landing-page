import Image from "next/image";
import type { ReactNode } from "react";
import type { HomeContent } from "@/content/types";
import { Rich } from "@/components/artboard";
import { path } from "@/lib/routes";
import { cn } from "@/lib/cn";

/**
 * HOME below the canvas width — the responsive layout, and six of its seven
 * sections (CONTACT is in `contact.tsx`, see the note there).
 *
 * The Canva master is one 1408×768 canvas per section and has no second
 * artboard, so below 1408 it can only be scaled. Measured on the built page,
 * scaling stops being honest well before that:
 *
 * | canvas at | smallest run | runs under 12px |
 * |---|---|---|
 * | 1408px (1:1) | 10.9px | 5 — the master's own micro-labels |
 * | 1280px | 9.9px | 10 |
 * | 1024px | 7.9px | 39 |
 * | 768px | 5.9px | 88 |
 * | 390px | 2.9px | 113 |
 *
 * GM (2026-08-30) chose free reflow over waiting for a mobile master, closing
 * `docs/05-backlog.md` #42. The threshold is `xl` rather than the `md` first
 * proposed because the table above is where the evidence put it: at 1024 the
 * canvas puts thirty-nine runs under 12px, which is not a tablet compromise,
 * it is unreadable. So this layout serves everything from 320 to 1279 and has
 * to be a real responsive layout at every step of that range, not a phone
 * column stretched across a laptop.
 *
 * It is the same content in the same order from the same keys, with the pure
 * ornament dropped — deco corners, grid plates, drawn card frames are
 * compositions for a 1408-wide canvas and reflow turns them into loose
 * rectangles. The band colour comes from the parent `<Artboard>`, so the
 * light/dark rhythm of `docs/03-structure.md` §4 survives.
 *
 * No string is authored here: every word arrives through the same props the
 * canvas gets (CLAUDE.md §7, boundary 2).
 */

/* ── The flow scale ────────────────────────────────────────────────────────
   Six sections, one set of steps. A section that needs a different size
   changes this table, not its own block. */

const BLOCK = "frame py-12 lg:py-16";
export const F_TITLE =
  "text-[1.55rem] font-bold uppercase leading-[1.15] sm:text-[1.9rem] lg:text-[2.25rem]";
export const F_LEAD = "text-[1rem] leading-[1.55] sm:text-[1.1rem]";
const BODY = "text-[0.95rem] leading-[1.6] sm:text-base";
const CARD_TITLE = "text-[1.05rem] font-bold uppercase leading-[1.25] sm:text-[1.15rem]";
const CARD_BODY = "text-[0.9rem] leading-[1.55] sm:text-[0.95rem]";
const INDEX = "text-[1.3rem] font-bold leading-none sm:text-[1.5rem]";
const MICRO = "text-[0.7rem] font-bold uppercase tracking-[0.12em] sm:text-[0.75rem]";
/** 44px touch floor — the same one the header and footer keep. */
const LINK = "inline-flex min-h-11 items-center gap-2 text-[0.8rem] font-bold uppercase";
/** Prose cap. Without it a paragraph runs the full 1279px and stops being readable. */
const MEASURE = "max-w-[62ch]";

export function FBlock({ className, reveal, children }: { className?: string; reveal?: number; children: ReactNode }) {
  return <div data-reveal={reveal} className={cn(BLOCK, "home-flow-block", className)}>{children}</div>;
}

/** The keyline the master draws under a section title. */
export function FRule({ className }: { className?: string }) {
  return <span className={cn("mt-4 block h-1 w-14", className)} aria-hidden />;
}

/**
 * A ring with its glyph inside — the master's numbered emblem. The two are
 * separate files stacked on the canvas, so they stay two files here;
 * `object-contain` in a square box re-centres a glyph that is not square
 * without carrying its canvas offsets over.
 */
export function FEmblem({ ring, glyph, className }: { ring: string; glyph: string; className?: string }) {
  return (
    <span className={cn("relative block h-14 w-14 shrink-0", className)} aria-hidden>
      {ring ? <Image src={ring} alt="" fill sizes="56px" className="object-contain" /> : null}
      <span className="absolute inset-[18%]">
        <Image src={glyph} alt="" fill sizes="40px" className="object-contain" />
      </span>
    </span>
  );
}

/** A photograph at a fixed ratio, filling its column. */
function Shot({
  src,
  alt,
  ratio = "aspect-[16/10]",
  sizes = "(min-width: 640px) 50vw, 100vw",
  priority,
  className,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) return null;
  return (
    <div className={cn("media-frame relative w-full overflow-hidden", ratio, className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="media-image object-cover" />
    </div>
  );
}

/* ── 1. HERO ─────────────────────────────────────────────────────────────── */

export function HeroFlow({
  c,
  active,
  cycle,
  onSelect,
}: {
  c: HomeContent["hero"];
  active: number;
  cycle: number;
  onSelect: (i: number) => void;
}) {
  const slide = c.slides[active];

  return (
    <FBlock className="hero-flow grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
      {/* Photo second in the source, first on the page below `md`: the headline
          is what the visitor came for, so it leads once the two stack. */}
      <div className="media-frame md:order-2" data-reveal="2">
        <Shot
          src={c.media.src ?? ""}
          alt={c.media.alt}
          ratio="aspect-[4/3] md:aspect-[5/4]"
          sizes="(min-width: 768px) 50vw, calc(100vw - 2.5rem)"
          priority
        />
      </div>

      <div className="md:order-1" data-reveal="1">
        <div key={`flow-copy-${active}-${cycle}`} className="hero-copy hero-copy-slot">
          <h1 className={cn(F_TITLE, "text-[1.7rem]")}>{slide.title}</h1>
          <p className={cn(F_LEAD, MEASURE, "mt-4 text-white/85")}>{slide.lead}</p>
        </div>

        {c.slides.length > 1 ? (
          <div className="mt-5 flex items-center">
            {c.slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={s.title}
                aria-current={i === active}
                // The dot is 5px of paint the master draws; the button around it
                // is 44px, which is what a thumb has to hit.
                className="flex h-11 w-14 items-center justify-center"
              >
                <span
                  className={cn(
                    "hero-rail block h-[3px] w-9",
                    i === active && "is-active",
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}

        <a
          href={path("products")}
          className="hero-cta font-artboard-alt border-art-blue-deep text-art-blue-deep hover:bg-art-blue-deep mt-3 flex min-h-12 w-full items-center justify-between border px-5 text-[0.85rem] font-bold uppercase transition-[transform,background-color,color,box-shadow] duration-200 hover:-translate-y-px hover:text-white sm:w-auto sm:max-w-xs sm:gap-8"
        >
          {c.cta}
          <span aria-hidden>→</span>
        </a>

        <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
          {c.pillars.map((p, i) => (
            <li key={p} className="flex items-center gap-3">
              {i > 0 ? <span aria-hidden className="bg-art-blue block h-1 w-1 rounded-full" /> : null}
              <span className="text-[0.8rem] uppercase sm:text-[0.85rem]">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </FBlock>
  );
}

/* ── 2. PIM ──────────────────────────────────────────────────────────────── */

const PIM_ICONS = ["/media/home/pim-icon-analog.png", "/media/home/pim-icon-digital.png"];

export function PimFlow({ c }: { c: HomeContent["pim"] }) {
  return (
    <FBlock>
      <div className="gap-8 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start lg:gap-14">
        <div data-reveal="1">
          <h2 className={F_TITLE}>
            {c.title} <span className="text-art-blue">{c.titleAccent}</span>
          </h2>
          <FRule className="bg-art-blue" />
          <p className={cn(BODY, MEASURE, "mt-5")}>{c.body}</p>
        </div>

        <ul className="mt-7 flex gap-8 md:mt-0" data-reveal="2">
          {c.branches.map((b, i) => (
            <li key={b.id} className="flex w-24 flex-col items-center text-center">
              <span className="relative block h-16 w-16" aria-hidden>
                <Image src={PIM_ICONS[i]} alt="" fill sizes="64px" className="object-contain" />
              </span>
              <span className={cn(MICRO, "text-art-blue-alt mt-2")}>{b.iconLabel}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The callout is a drawn plate on the canvas; here it is the same two
          lines beside the same icon, on a tinted rule instead. */}
      <div className="border-art-blue-alt/30 bg-art-blue-alt/5 mt-7 flex max-w-lg items-start gap-3 border-l-2 py-3 pl-3" data-reveal="2">
        <span className="relative mt-0.5 block h-8 w-8 shrink-0" aria-hidden>
          <Image src="/media/home/pim-callout-icon.png" alt="" fill sizes="32px" className="object-contain" />
        </span>
        <div>
          <p className="text-[0.9rem] font-medium leading-[1.45] sm:text-[0.95rem]">{c.calloutLead}</p>
          <p className={cn(MICRO, "text-art-blue-alt mt-1.5")}>{c.calloutGoal}</p>
        </div>
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-7">
        {c.branches.map((b) => (
          <li key={b.id} data-reveal={3} className="precision-card border-line flex flex-col overflow-hidden rounded-xl border">
            <div className="relative">
              <Shot src={b.media.src ?? ""} alt={b.media.alt} />
              <span className="bg-art-blue absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md text-[1.05rem] font-bold text-white">
                {b.index}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4 lg:p-5">
              <h3 className={cn(CARD_TITLE, "text-art-blue-alt text-[1.25rem] lg:text-[1.4rem]")}>{b.name}</h3>
              <p className="mt-1.5 text-[0.9rem] font-bold leading-[1.35] sm:text-[0.95rem]">{b.tagline}</p>
              <p className={cn(CARD_BODY, "mt-2 flex-1")}>{b.body}</p>
              <a href={path("products", "hardware")} className={cn(LINK, "text-art-blue-alt mt-1 hover:underline")}>
                {b.cta}
                <span aria-hidden>→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </FBlock>
  );
}

/* ── 3. WHY PIM ──────────────────────────────────────────────────────────── */

const WHY_EMBLEMS = [
  { ring: "/media/home/why-ring-1.png", glyph: "/media/home/why-glyph-1.png" },
  { ring: "/media/home/why-ring-2.png", glyph: "/media/home/why-glyph-2.png" },
  { ring: "/media/home/why-ring-3.png", glyph: "/media/home/why-glyph-3.png" },
];

export function WhyPimFlow({ c }: { c: HomeContent["whyPim"] }) {
  return (
    <FBlock>
      <div className="gap-10 md:grid md:grid-cols-2 md:items-center lg:gap-14">
        <div data-reveal="1">
          {/* The master breaks this headline itself — kept, as on the canvas. */}
          <h2 className={cn(F_TITLE, "whitespace-pre-line normal-case")}>
            <Rich value={c.title} accent="text-art-blue-num" />
          </h2>
          <p className={cn(BODY, MEASURE, "mt-4 text-white/85")}>{c.body}</p>
        </div>

        <Shot
          src={c.media.src ?? ""}
          alt={c.media.alt}
          ratio="aspect-[4/3]"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="mt-6 rounded-xl md:mt-0"
        />
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:mt-10 lg:gap-6">
        {c.items.map((item, i) => (
          <li
            key={item.id}
            data-reveal={2 + i}
            className="precision-card flex flex-col rounded-xl border border-white/15 bg-white/[0.04] p-4 lg:p-5"
          >
            <div className="flex items-center gap-3">
              <FEmblem {...WHY_EMBLEMS[i]} />
              <span className={cn(INDEX, "text-art-blue-num")}>{item.index}</span>
            </div>
            <h3 className={cn(CARD_TITLE, "mt-3 normal-case")}>{item.title}</h3>
            <span className="bg-art-blue-num mt-2 block h-0.5 w-10" aria-hidden />
            <p className={cn(CARD_BODY, "mt-3 text-white/85")}>{item.body}</p>
          </li>
        ))}
      </ul>
    </FBlock>
  );
}

/* ── 4. CORE ─────────────────────────────────────────────────────────────── */

const CORE_ICONS = [
  "/media/home/core-icon-01.png",
  "/media/home/core-icon-02.png",
  "/media/home/core-icon-03.png",
];

export function CoreFlow({ c }: { c: HomeContent["core"] }) {
  return (
    <FBlock>
      <div className="gap-10 md:grid md:grid-cols-2 md:items-center lg:gap-14">
        <div data-reveal="1">
          <h2 className={F_TITLE}>{c.title}</h2>
          <p className={cn(BODY, MEASURE, "mt-4 text-white/85")}>
            <Rich value={c.body} accent="text-art-cyan font-bold" />
          </p>
        </div>

        {/* The engine render is the section's subject, not decoration, so it
            survives the reflow while the deco plates around it do not. */}
        <div className="core-engine media-frame relative mt-6 aspect-[3/2] w-full md:mt-0" data-reveal="2">
          <span className="core-signal" aria-hidden />
          <Image
            src="/media/home/core-engine.png"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:mt-10 lg:gap-6">
        {c.capabilities.map((cap, i) => (
          <li key={cap.id} data-reveal={3 + i} className="precision-card flex flex-col rounded-xl border border-white/25 bg-black/40 p-4 lg:p-5">
            <div className="flex items-center gap-3">
              <span className="relative block h-12 w-12 shrink-0" aria-hidden>
                <Image src={CORE_ICONS[i]} alt="" fill sizes="48px" className="object-contain" />
              </span>
              <span className="bg-art-black flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-[1rem] font-extrabold">
                {cap.index}
              </span>
            </div>

            {cap.value ? (
              <p className="mt-3 text-[1.6rem] font-bold uppercase leading-none lg:text-[1.9rem]">{cap.value}</p>
            ) : null}
            <h3 className={cn(CARD_TITLE, cap.value ? "mt-2 text-[0.95rem] font-medium" : "mt-3")}>{cap.name}</h3>
            {cap.caption ? <p className={cn(MICRO, "mt-1 font-medium")}>{cap.caption}</p> : null}

            <p className={cn(CARD_BODY, "mt-3 flex-1 text-white/85")}>{cap.body}</p>
            <p className="text-art-cyan mt-3 text-[0.85rem] font-medium leading-[1.4] sm:text-[0.9rem]">
              {cap.outcome}
            </p>
          </li>
        ))}
      </ul>
    </FBlock>
  );
}

/* ── 5. SOLUTIONS ────────────────────────────────────────────────────────── */

const SOLUTION_EMBLEMS = [
  { ring: "/media/home/solutions-ring-1.png", glyph: "/media/home/solutions-glyph-1.png" },
  { ring: "/media/home/solutions-ring-2.png", glyph: "/media/home/why-glyph-2.png" },
  { ring: "/media/home/solutions-ring-3.png", glyph: "/media/home/solutions-glyph-3.png" },
  { ring: "/media/home/solutions-ring-4.png", glyph: "/media/home/solutions-glyph-4.png" },
];

export function SolutionsFlow({ c }: { c: HomeContent["solutions"] }) {
  return (
    <FBlock>
      <h2 className={cn(F_TITLE, "text-center")} data-reveal="1">
        {c.title} <span className="text-art-blue-solution">{c.titleAccent}</span>
      </h2>

      <div className="mt-6 gap-10 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center lg:gap-14" data-reveal="2">
        <Shot
          src={c.media.src ?? ""}
          alt={c.media.alt}
          ratio="aspect-[4/3]"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="rounded-xl"
        />
        <p className={cn(BODY, MEASURE, "mt-6 text-white/85 md:mt-0")}>{c.body}</p>
      </div>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:gap-5">
        {c.items.map((item, i) => (
          <li key={item.id} data-reveal={3 + i} className="precision-card bg-art-card flex gap-3 rounded-xl p-4 lg:gap-4 lg:p-5">
            <div className="flex flex-col items-center gap-2">
              <span className={cn(INDEX, "text-art-blue-solution")}>{item.index}</span>
              <FEmblem {...SOLUTION_EMBLEMS[i]} className="h-12 w-12" />
            </div>
            <div className="min-w-0">
              <h3 className={CARD_TITLE}>{item.title}</h3>
              <p className={cn(CARD_BODY, "mt-2 text-white/85")}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </FBlock>
  );
}

/* ── 6. NEWS ─────────────────────────────────────────────────────────────── */

export function NewsFlow({ c }: { c: HomeContent["news"] }) {
  return (
    <FBlock>
      <h2 className={cn(F_TITLE, "text-center")} data-reveal="1">{c.title}</h2>
      <p className={cn(BODY, "mx-auto mt-4 max-w-3xl text-center")} data-reveal="2">{c.lead}</p>

      <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:mt-9 lg:grid-cols-4 lg:gap-6">
        {c.items.map((item) => (
          <li
            key={item.id}
            data-reveal={3}
            className="news-item border-art-navy/15 flex flex-col border-b pb-6 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0"
          >
            {item.media.src ? (
              <Shot
                src={item.media.src}
                alt={item.media.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="mb-4 rounded-lg"
              />
            ) : null}
            <p className={MICRO}>{item.date}</p>
            <h3 className="mt-2 text-[1.05rem] font-bold leading-[1.3]">{item.title}</h3>
            <p className={cn(CARD_BODY, "mt-2 flex-1")}>{item.body}</p>
            <span className={cn(LINK, "mt-1")}>
              {item.cta}
              <span aria-hidden>→</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Not a link: the master draws a label here and gives it no destination.
          Inventing one is a content decision, not a layout one. */}
      <p className="border-art-navy/35 mx-auto mt-8 flex min-h-12 max-w-xs items-center justify-center gap-3 border text-[0.85rem] font-bold uppercase">
        {c.cta}
        <span aria-hidden>→</span>
      </p>
    </FBlock>
  );
}
