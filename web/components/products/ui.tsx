import type { ReactNode } from "react";
import type { Application, Item, ProductMetric, SiteContent, SystemIconName } from "@/content/types";
import { Figure } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * The PRODUCTS visual language, rebuilt from the Canva master
 * "Product - Pebble Vina" (1536×1024, 7 content artboards, read 2026-09-02).
 *
 * One anatomy, six blocks: a dark band carries the identity, a white island
 * carries the numbers, a row of applications says where the part goes, one
 * button closes. Everything below is the vocabulary that anatomy is made of —
 * the blocks themselves only arrange it.
 *
 * The master paints every block the same blue. This site does not: hardware,
 * software and training keep the three catalogue tokens they already had, so
 * the band tells you which of the three you are reading without a label.
 */

export type Category = "hardware" | "software" | "training";

export const CAT_TEXT: Record<Category, string> = {
  hardware: "text-hardware",
  software: "text-software",
  training: "text-training",
};

export const CAT_BORDER: Record<Category, string> = {
  hardware: "border-hardware",
  software: "border-software",
  training: "border-training",
};

export const CAT_BG: Record<Category, string> = {
  hardware: "bg-hardware",
  software: "bg-software",
  training: "bg-training",
};

/** Band atmosphere — `.product-band` in globals.css tints itself from this. */
export const CAT_BAND: Record<Category, string> = {
  hardware: "product-band",
  software: "product-band product-band-software",
  training: "product-band product-band-training",
};

/* ── Band header ─────────────────────────────────────────────────────────── */

/** "01 · Phần cứng" — the numbered index the master prints above every title. */
export function BlockKicker({ category, children }: { category: Category; children?: string }) {
  if (!children) return null;
  return (
    <p className={cn("flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em]", CAT_TEXT[category])}>
      <span className={cn("h-px w-6 sm:w-8", CAT_BG[category])} aria-hidden />
      {children}
    </p>
  );
}

/**
 * The block title. `headline` is the master's long form ("MINT - CHIP ANALOG
 * PIM CHO EDGE AI TẠI THIẾT BỊ") and ships empty until the content pass, so the
 * product name stands in — a heading is the one thing that may not be blank.
 */
export function BlockHeadline({
  headline,
  name,
  category,
  className,
}: {
  headline: string;
  name: string;
  category: Category;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-[1.5rem] font-semibold uppercase leading-[1.15] sm:text-[1.9rem] lg:text-[2.3rem]",
        CAT_TEXT[category],
        className,
      )}
    >
      {headline || name}
    </h2>
  );
}

/* ── Tag pills ───────────────────────────────────────────────────────────── */

/** A bordered pill: origin, architecture — the labels that are not a status. */
export function TagPill({ children, category }: { children: ReactNode; category: Category }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 w-fit items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] uppercase leading-none tracking-[0.1em]",
        CAT_BORDER[category],
        CAT_TEXT[category],
      )}
    >
      {children}
    </span>
  );
}

export function TagRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)}>{children}</div>;
}

/* ── The white island ────────────────────────────────────────────────────── */

/**
 * A light panel cutting into the dark band. `tone-light` re-declares the light
 * tokens so everything inside — muted text, hairlines, status colours — reads
 * against white again instead of inheriting the band's dark remap.
 */
export function SpecIsland({
  title,
  eyebrow,
  className,
  children,
}: {
  title?: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("spec-island tone-light rounded-xl bg-bg p-5 text-fg sm:p-6 lg:p-7", className)}>
      {title ? (
        <header className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-base font-semibold uppercase tracking-[0.08em] sm:text-lg">{title}</h3>
          {eyebrow ? <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-subtle">{eyebrow}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

/**
 * The numbered stat tiles. Every `note` is printed in full: it is the boundary
 * the number is only true inside (proof-bank §E2), so it travels with it or the
 * number does not ship.
 */
export function StatTiles({
  metrics,
  labels,
  category,
  columns = 4,
}: {
  metrics: ProductMetric[];
  labels: SiteContent["ui"]["metricLabels"];
  category: Category;
  /** 4 across when the panel owns the row; 2 when two panels share it. */
  columns?: 2 | 4;
}) {
  if (metrics.length === 0) return null;

  // The row is as wide as there are numbers. Padding a three-metric family out
  // to four columns leaves a quarter of the island empty and reads as a gap
  // where a fourth figure was cut.
  const wide = columns === 4 ? (metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3") : "sm:gap-x-6";

  return (
    <ol className={cn("grid grid-cols-2 gap-x-4 gap-y-5", wide)}>
      {metrics.map((metric, index) => (
        <li key={metric.label} className={cn("border-t-2 pt-2.5", CAT_BORDER[category])}>
          <p className={cn("font-mono text-[0.65rem] leading-none", CAT_TEXT[category])}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-muted">{labels[metric.label]}</p>
          <p className="mt-1 font-mono text-lg font-semibold leading-tight text-fg sm:text-xl">{metric.value}</p>
          {metric.note ? (
            <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted">{metric.note}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** Titled icon list — the software stack that ships beside E-Series. */
export function IconList({ items, category }: { items: Item[]; category: Category }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3">
          <span className={cn("mt-1.5 h-2 w-2 shrink-0 rotate-45", CAT_BG[category])} aria-hidden />
          <span className="min-w-0">
            <span className="block text-[0.92rem] font-medium leading-snug text-fg">{item.title}</span>
            {item.body ? <span className="mt-0.5 block text-[0.78rem] leading-relaxed text-muted">{item.body}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── Applications ────────────────────────────────────────────────────────── */

/**
 * Where the part goes. Photographs when the family has them, plain tiles when
 * it does not — E-Series' use cases are authored as title + body with no media,
 * and inventing photography for them is not this pass's job.
 *
 * A rail below `md` for the same reason the old one was: the next card peeking
 * past the edge is the whole affordance, and five wrapped cards on a phone cost
 * a screen. From `md` the row simply fits, so it stops scrolling.
 */
export function ApplicationRow({
  label,
  items,
  pendingLabel,
  category,
}: {
  label: string;
  items: Application[];
  pendingLabel: string;
  category: Category;
}) {
  if (items.length === 0) return null;

  const withPhotos = items.some((item) => item.media?.src);
  const columns = items.length >= 5 ? "md:grid-cols-3 lg:grid-cols-5" : items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">{label}</p>
      <ul
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "rail mt-3 flex snap-x gap-3 overflow-x-auto overscroll-x-contain pb-1 sm:gap-4",
          "md:grid md:overflow-visible md:pb-0",
          columns,
        )}
      >
        {items.map((item) => (
          <li
            key={item.title}
            className={cn(
              "flex w-40 shrink-0 snap-start flex-col overflow-hidden rounded-lg border md:w-auto",
              // The application shots are cut-outs on transparency: on the dark
              // band they would disappear. A photographed card is a light card
              // all the way through — a white picture over a dark caption is a
              // seam across the middle of every one of them.
              withPhotos ? "tone-light border-line bg-bg text-fg" : "border-line bg-surface",
            )}
          >
            {withPhotos ? (
              <div className="bg-bg">
                <Figure
                  media={item.media ?? { alt: item.title }}
                  // 16/9 is the ratio all ten application files are authored at.
                  ratio="aspect-[16/9]"
                  sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 160px"
                  pendingLabel={pendingLabel}
                  compact
                  bare={Boolean(item.media?.src)}
                />
              </div>
            ) : null}
            <div className="flex flex-1 items-start gap-2.5 p-3">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rotate-45", CAT_BG[category])} aria-hidden />
              <div className="min-w-0">
                <p className="text-[0.85rem] font-medium leading-snug text-fg sm:text-sm">{item.title}</p>
                {item.dateNote ? (
                  <p className={cn("mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em]", CAT_TEXT[category])}>
                    {item.dateNote}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Close ───────────────────────────────────────────────────────────────── */

/**
 * One button per block (Canva, 2026-09-02) — it replaces the single page-level
 * CTA the page carried until now. The visitor decides at the block that
 * convinced them, not four screens later.
 *
 * `label` falls back the way `BlockHeadline` does: the page's own `ctaLabel` is
 * compiled but not applied yet, and a button with no accessible name is worse
 * than one wearing the nav's words. Both strings come from content either way.
 */
export function BlockCta({ href, label, fallbackLabel }: { href: string; label: string; fallbackLabel: string }) {
  const text = label || fallbackLabel;
  if (!text) return null;

  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center gap-2.5 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-fg transition-[transform,opacity] duration-200 hover:-translate-y-px hover:opacity-90 sm:px-6 sm:text-[0.95rem]"
    >
      {text}
      <span aria-hidden>→</span>
    </a>
  );
}

/* ── Code-native artwork ─────────────────────────────────────────────────── */

/** Module and principle glyphs. Layout data, not translatable content. */
export function SystemIcon({ name, className }: { name: SystemIconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {name === "crm" ? (
        <g {...common}><circle cx="24" cy="23" r="9" /><path d="M8 50c2-10 8-15 16-15s14 5 16 15" /><path d="M43 18h13v19H43zM47 24h5M47 29h5" /></g>
      ) : name === "erp" ? (
        <g {...common}><path d="M9 11h18v18H9zM37 11h18v18H37zM9 39h18v14H9zM37 39h18v14H37z" /><path d="M27 20h10M18 29v10M46 29v10" /></g>
      ) : name === "hrm" ? (
        <g {...common}><circle cx="32" cy="19" r="8" /><circle cx="15" cy="27" r="6" /><circle cx="49" cy="27" r="6" /><path d="M19 52c1-12 5-18 13-18s12 6 13 18M5 51c1-9 4-14 10-14 4 0 7 2 9 6M59 51c-1-9-4-14-10-14-4 0-7 2-9 6" /></g>
      ) : name === "dms" ? (
        <g {...common}><path d="M15 8h25l10 10v38H15z" /><path d="M40 8v11h10M23 29h19M23 37h19M23 45h13" /></g>
      ) : name === "ai" ? (
        <g {...common}><circle cx="32" cy="32" r="9" /><circle cx="12" cy="15" r="4" /><circle cx="52" cy="15" r="4" /><circle cx="12" cy="49" r="4" /><circle cx="52" cy="49" r="4" /><path d="M18 19l8 7M46 19l-8 7M18 46l8-7M46 46l-8-7" /></g>
      ) : name === "survey" ? (
        <g {...common}><path d="M18 10h28v46H18zM25 10V6h14v4" /><path d="M25 23l4 4 8-9M25 38h14M25 46h14" /></g>
      ) : name === "tailored" ? (
        <g {...common}><circle cx="32" cy="32" r="23" /><circle cx="32" cy="32" r="13" /><path d="M32 9v8M32 47v8M9 32h8M47 32h8M32 32l15-15" /></g>
      ) : name === "practice" ? (
        <g {...common}><path d="M10 49l17-17 7 7-17 17H10zM31 28l5-5 7 7-5 5" /><path d="M39 17l5-9 4 7 8 3-9 5" /></g>
      ) : (
        <g {...common}><path d="M10 52h44M15 46V31h8v15M28 46V21h8v25M41 46V11h8v35" /><path d="M13 23l13-8 11 2 14-10" /></g>
      )}
    </svg>
  );
}

/**
 * A numbered step in a connected row — the software modules and the training
 * principles are the same object in the master: index, glyph, title, body,
 * with a dotted track running behind the glyphs.
 */
export function StepCard({
  index,
  item,
  category,
  connect,
}: {
  index: number;
  item: Item;
  category: Category;
  /** Draw the track on to the next step. False on the last one. */
  connect?: boolean;
}) {
  return (
    <li className="relative flex flex-col items-start">
      {/* Exact geometry rather than one line across the row: the segment starts
          at the glyph's right edge (3rem) and ends at the next glyph's left
          edge, which is one column gap (1.25rem) past this card. */}
      {connect ? (
        <span className="step-track absolute -right-5 left-12 top-6 hidden h-0.5 lg:block" aria-hidden />
      ) : null}
      <div className="flex w-full items-center gap-3">
        <span
          className={cn(
            "relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 bg-bg",
            CAT_BORDER[category],
            CAT_TEXT[category],
          )}
        >
          {item.icon ? <SystemIcon name={item.icon} className="h-6 w-6" /> : null}
        </span>
        <span className={cn("font-mono text-[0.8rem] font-semibold leading-none", CAT_TEXT[category])}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 font-display text-[0.98rem] font-semibold leading-snug text-fg">{item.title}</p>
      {item.body ? <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">{item.body}</p> : null}
    </li>
  );
}

/**
 * The step row. Each card draws its own segment of the track (see `StepCard`)
 * and only from `lg`, where the steps genuinely stand side by side — across a
 * two-column wrap the line would connect steps that do not follow each other.
 */
export function StepRow({ children, columns }: { children: ReactNode; columns: string }) {
  return <ol className={cn("grid gap-x-5 gap-y-7 sm:grid-cols-2", columns)}>{children}</ol>;
}
