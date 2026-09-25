import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ApplicationCarousel } from "@/components/site/product/application-carousel";
import { localizeFigure } from "@/components/site/primitives";
import type { Locale } from "@/lib/i18n/config";
import { dictionary, type Spec } from "@/lib/i18n/dictionary";
import { homeAnchor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * The chip pages' template — `/products/{mint,papaya,espresso}` only
 * (`[product]/page.tsx`): one screen of hero + spec/application board
 * (`DetailScreen`, `DetailBoard`), then the page's one CTA (`DetailCta`).
 * Dark per DARK-BUILD-brief (2026-09-24): every surface reads the site's own
 * tokens (`marquee`, `navy-lit`, `ink`, `accent`, `info`).
 *
 * Separate from the dark `ProductDetail` (`product-detail.tsx`), which still
 * renders the hidden E-Series page (`HIDDEN_PRODUCT_SLUGS`, routes.ts).
 * `DetailKicker`, `DetailPill` and `DetailCta` are shared with the software,
 * training and news pages.
 */

/**
 * Every product title in `seed.ts` reads "<NAME> — <rest>" in all three
 * locales (`content.<chip>.title`) — the same em dash the catalogue's own
 * title uses. Splitting on it colours the product name without a second CMS
 * field or a markup mark baked into the stored string, which would also leak
 * into the JSON-LD `title`/`name` fields this same string feeds
 * (`productPageJsonLd`, `breadcrumbJsonLd`, `collectionPageJsonLd` on
 * `/products`) — those must stay the plain, unmarked CMS text (brief:
 * "valid JSON-LD (unchanged)").
 */
const NAME_SEPARATOR = " — ";

export function DetailTitle({ value: raw, id, className }: { value: string; id?: string; className?: string }) {
  // Browsers may break after a hyphen, which split "DIGITAL-PIM" across two
  // lines in the ESPRESSO heading. A non-breaking hyphen (U+2011) is swapped
  // in for display only — the CMS string, metadata and JSON-LD keep "-".
  const value = raw.replace(/(\p{L})-(\p{L})/gu, "$1\u2011$2");
  const cut = value.indexOf(NAME_SEPARATOR);
  if (cut === -1) return (
    <h1 id={id} className={className}>
      {value}
    </h1>
  );
  return (
    <h1 id={id} className={className}>
      <span className="text-accent">{value.slice(0, cut)}</span>
      {value.slice(cut)}
    </h1>
  );
}

/**
 * PAPAYA's lead runs three sentences in `seed.ts` (`content.papaya.lead`);
 * the DETAIL mocks (desktop and mobile alike) print only the first two —
 * see D-Papaya-desktop-render.png, which stops at "...theo thời gian thực."
 * and drops the sentence about PAPAYA's own 30 TOPS/W efficiency. Splitting
 * on sentence-ending punctuation instead of hand-copying a shorter string
 * keeps this in sync with the CMS text (brief: "unchanged text") rather than
 * forking a second, driftable copy of it.
 */
export function firstSentences(value: string, count: number): string {
  const sentences = value.match(/[^.!?]+[.!?]+(?=\s|$)/g);
  if (!sentences) return value;
  return sentences.slice(0, count).join(" ").trim();
}

/** The "01 • PHẦN CỨNG" kicker with only its leading index in accent blue —
 *  every DETAIL mock colours "01" alone, not the bullet or the label after
 *  it, unlike the dark theme's `ProductKicker` (primitives.tsx) which sets
 *  the whole string in accent. Splits on the first space, which is safe here
 *  because `dictionary.product.shared.hardware` is this file's own fixed
 *  "NN • LABEL" shape in all three locales. */
export function DetailKicker({ label, className }: { label: string; className?: string }) {
  const spaceAt = label.indexOf(" ");
  if (spaceAt === -1) return <span className={className}>{label}</span>;
  return (
    <span className={cn("font-sans font-semibold tracking-[0.06em] text-ink", className)}>
      <span className="text-accent">{label.slice(0, spaceAt)}</span>
      {label.slice(spaceAt)}
    </span>
  );
}

/** The short 56×3 accent rule under the H1, every DETAIL hero. */
export function DetailRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-[3px] w-10 bg-accent lg:w-14", className)} />;
}

/**
 * A square status pill, mono-free (the DETAIL mocks set these in the sans
 * body face, not `font-mono` like the dark theme's `Pill`, primitives.tsx).
 * Fill/border/text are THEME-BRIEF.md § DARK's own pill spec verbatim:
 * "Pills: square, bg rgba(5,7,15,.55), 1px rgba(232,237,247,.18), text
 * #c6d1e5" (`night`/55, `ink`/18, `contact` — the default `"navy"` tone,
 * covering the partner-name and Analog/Digital-tag pills) and "status pill
 * accent tone (text #8fb8ff, bg rgba(78,146,255,.12), border
 * rgba(78,146,255,.45))" (`accent-hover`/`accent`/12/`accent`/45 — the status
 * pill, the one that also colours its own text).
 *
 * The status pill has two tones, not one, and which one it takes is a factual
 * claim rather than a style choice (CLAUDE.md § 2.2): `accent` means shipped,
 * `info` means expected. That is the same split the roadmap strip on
 * `/products` already draws from `timeline[].state` — `done` in accent, the
 * three `roadmap` entries in teal (catalogue.tsx) — so the three chips read the
 * same on their own page as they do in that row: MINT "Sản xuất 05/2023" and
 * PAPAYA "PoC 2024" in accent (both `done`), ESPRESSO "Roadmap Q3/2026" in
 * `info`. The teal's alphas are `Pill`'s own (primitives.tsx), including the
 * `signal-teal`/28 fill that @theme declares for exactly this rather than a
 * second teal hex.
 */
export function DetailPill({
  tone = "navy",
  children,
}: {
  tone?: "navy" | "accent" | "info";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-center whitespace-nowrap border px-3.5 py-[7px] text-[12px] font-medium xl:text-[13px]",
        tone === "accent" && "border-accent/45 bg-accent/12 text-accent-hover",
        tone === "info" && "border-info/38 bg-signal-teal/28 text-info",
        tone === "navy" && "border-ink/18 bg-night/55 text-contact",
      )}
    >
      {children}
    </span>
  );
}

/**
 * One chip page's first screen: the hero (kicker, title, rule, lead, pills,
 * render) over one spec + application board. MINT, PAPAYA and ESPRESSO all
 * render through this one shape — the first cut had three (a name-plate
 * panel for MINT/ESPRESSO, two panels plus a separate app strip for PAPAYA),
 * so the same facts sat in different places from chip to chip and PAPAYA ran
 * well past the fold.
 *
 * From `lg` the block is exactly one screen tall (`100svh` minus the header):
 * the hero takes the free height, while the board and CTA stay inside the
 * bottom edge. Smaller screens use plain flow so content is never clipped.
 */
export function DetailScreen({
  titleId,
  eyebrow,
  title,
  lead,
  pills,
  image,
  imageAlt,
  action,
  children,
}: {
  /** Sets the `<h1>`'s id so the page section can point `aria-labelledby` at it. */
  titleId?: string;
  eyebrow: string;
  title: string;
  lead: string;
  pills: ReactNode;
  image: string;
  imageAlt: string;
  /** The page CTA, kept inside the desktop screen-height budget. */
  action: ReactNode;
  /** The board (`DetailBoard`), pinned to the bottom of the screen. */
  children: ReactNode;
}) {
  return (
    <div className="relative flex flex-col bg-marquee md:min-h-[calc(100svh-var(--spacing-header))] lg:h-[calc(100svh-var(--spacing-header))] lg:min-h-0 lg:overflow-hidden">
      {/* `.glow-detail-hero` (globals.css) — the highlight behind the render. */}
      <div aria-hidden className="glow-detail-hero pointer-events-none absolute inset-0 hidden lg:block" />
      {/* Decorative circuit trace, left edge — path data from the
          D-*-desktop-mock.html files, desktop only. */}
      <svg
        aria-hidden
        focusable="false"
        width="120"
        height="420"
        viewBox="0 0 120 420"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="pointer-events-none absolute top-10 left-0 hidden text-accent/[0.13] lg:block"
      >
        <path d="M0 40h40l20 20h40M0 90h60l20-20M0 150h30l30 30h50M0 220h70M0 270h20l25 25h55M0 340h45l20-20h30" />
        <circle cx="100" cy="60" r="3" />
        <circle cx="80" cy="70" r="3" />
        <circle cx="110" cy="180" r="3" />
        <circle cx="70" cy="220" r="3" />
        <circle cx="100" cy="295" r="3" />
        <circle cx="95" cy="320" r="3" />
      </svg>

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-5 px-gutter py-5 lg:min-h-0 lg:py-4">
        <div className="relative z-10 flex flex-col gap-3.5 lg:max-w-[56%] lg:gap-4">
          <DetailKicker label={eyebrow} className="text-[13px] lg:text-[14px] xl:text-[16px]" />
          <DetailTitle
            value={title}
            id={titleId}
            className="text-[25px] leading-[1.18] font-extrabold text-balance text-ink uppercase lg:text-[30px] lg:leading-[1.08] lg:tracking-[-0.01em] xl:text-[40px] xl:leading-[1.12]"
          />
          <DetailRule />
          <p className="max-w-[62ch] text-[15px] leading-[1.55] text-body lg:text-[14px] lg:leading-[1.45] xl:text-[16px] xl:leading-[1.55]">
            {lead}
          </p>
          <div className="flex flex-wrap items-center gap-2 lg:gap-2.5">
            {pills}
            {action}
          </div>
        </div>
        {/* From `lg` the render fills the whole right side of the hero, top to
            board, instead of a fixed-height grid cell: the free height left by
            the board is what it gets, so the chip stays as large as the screen
            allows. `object-cover` trims the render's empty glow margin, which
            `contain` kept and which made the chip itself read small. */}
        <div className="relative -mx-gutter h-[200px] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[46%]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            priority
            className="mask-chip-hero object-cover lg:object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 shrink-0 px-gutter pb-4">
        <div className="mx-auto max-w-[1440px]">{children}</div>
      </div>
    </div>
  );
}

/** "THÔNG SỐ CHÍNH" / "ỨNG DỤNG" over a board column. */
export function DetailGroupLabel({ children }: { children: ReactNode }) {
  return <h2 className="text-[15px] font-bold tracking-[0.02em] text-accent lg:text-[17px]">{children}</h2>;
}

/** One figure: index + label on the first line, value + unit on the second.
 *  `tone` swaps the index/unit colour for PAPAYA FLEX's teal (`info`) row;
 *  the value itself stays plain `ink`, same rule `SpecCard` (primitives.tsx)
 *  uses. */
export function DetailSpecTile({
  spec,
  locale,
  tone = "blue",
}: {
  spec: Spec;
  locale: Locale;
  tone?: "blue" | "teal";
}) {
  const [index, ...rest] = spec.label.split(" ");
  // `Spec.label` is "NN UPPERCASE WORDS" (dictionary.ts) — set in title case
  // here ("Performance", "Die / Chip Area") rather than a second label field.
  const title = rest
    .join(" ")
    .toLowerCase()
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  const toneText = tone === "teal" ? "text-info" : "text-accent";
  return (
    <div className="flex min-w-0 flex-col justify-between gap-2 border border-ink/10 bg-ink/[0.04] px-3 py-2.5 lg:px-4 lg:py-3">
      {/* Index over label on a phone, where a 3-up tile is ~100px wide and
          "Performance" would otherwise be cut; one line from `lg`. */}
      <span className="flex flex-col gap-0.5 text-[11px] leading-tight font-medium text-body lg:flex-row lg:items-baseline lg:gap-2 lg:text-[13px]">
        <span className={cn("font-semibold", toneText)}>{index}</span>
        <span>{title}</span>
      </span>
      <span className="flex flex-wrap items-baseline gap-x-1.5">
        {/* Long ranges ("0,1–0,15", "20 × 23") step down so a 3-up row
            never overflows its tile. */}
        <span
          className={cn(
            "leading-none font-semibold whitespace-nowrap text-ink",
            spec.value.length > 6 ? "text-[19px] lg:text-[24px]" : "text-[22px] lg:text-[30px]",
          )}
        >
          {localizeFigure(spec.value, locale)}
        </span>
        {spec.unit ? (
          <span className={cn("text-[11px] font-semibold tracking-[0.04em] lg:text-[13px]", toneText)}>
            {spec.unit}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export type DetailSpecRowData = {
  /** Only multi-chip boards need a row name; a single chip already has an H1. */
  name?: string;
  /** PAPAYA's per-part subtitle ("PC-Vision & 5G", "Machine Vision Benchmark"). */
  tag?: string;
  tone?: "blue" | "teal";
  specs: readonly Spec[];
};

export type DetailApp = {
  label: string;
  image: string;
  alt: string;
  /** ESPRESSO's "Dự kiến Q3/2026" — a roadmap app carries its date in place
   *  (CLAUDE.md § 2). */
  date?: string;
};

/**
 * The board under the hero: key specs (one row per part — PAPAYA has two,
 * PAPAYA and PAPAYA FLEX) on the left, applications on the right. Two equal
 * columns from `xl`; stacked below that — at 1024 a two-up board left each
 * spec tile ~95px and PAPAYA FLEX's "0,1–0,15" ran out of its tile.
 */
export function DetailBoard({
  locale,
  specLabel,
  rows,
  specNote,
  appsLabel,
  apps,
}: {
  locale: Locale;
  specLabel: string;
  rows: readonly DetailSpecRowData[];
  /** ESPRESSO's "Card 4 chip: 640 TOPS" line under its spec row. */
  specNote?: ReactNode;
  appsLabel: string;
  apps: readonly DetailApp[];
}) {
  return (
    <div className="grid gap-4 border border-ink/10 bg-navy-lit p-4 xl:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] xl:gap-6">
      <div className="flex flex-col gap-3">
        <DetailGroupLabel>{specLabel}</DetailGroupLabel>
        {/* Rows grow to the application column's height, so a one-row chip
            (MINT, ESPRESSO) fills its half of the board instead of leaving a
            gap under three short tiles. */}
        <div className="flex flex-1 flex-col gap-2.5">
          {rows.map((row, rowIndex) => {
            const toneText = row.tone === "teal" ? "text-info" : "text-accent";
            return (
              <div
                key={row.name ?? rowIndex}
                className={cn("grid flex-1 gap-2 sm:items-stretch sm:gap-3", row.name && "sm:grid-cols-[136px_minmax(0,1fr)]")}
              >
                {row.name ? (
                  <span className="flex flex-col justify-center gap-1">
                    <span className={cn("text-[16px] leading-none font-extrabold whitespace-nowrap lg:text-[17px]", toneText)}>
                      {row.name}
                    </span>
                    {row.tag ? <span className="text-[11px] font-medium text-body">{row.tag}</span> : null}
                  </span>
                ) : null}
                <div className="grid grid-cols-3 gap-2">
                  {row.specs.map((spec) => (
                    <DetailSpecTile key={spec.label} spec={spec} locale={locale} tone={row.tone} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {specNote}
      </div>
      <span aria-hidden className="hidden w-px self-stretch bg-ink/14 xl:block" />
      <div className="flex min-w-0 flex-col gap-3">
        <DetailGroupLabel>{appsLabel}</DetailGroupLabel>
        <ApplicationCarousel
          apps={apps}
          labels={{
            previous: dictionary.product.shared.carousel.previous[locale],
            next: dictionary.product.shared.carousel.next[locale],
            pause: dictionary.product.shared.carousel.pause[locale],
            play: dictionary.product.shared.carousel.play[locale],
          }}
        />
      </div>
    </div>
  );
}

/** The centred solid-accent CTA on the navy band — the page's one CTA
 *  (brief). THEME-BRIEF.md § DARK: "CTA: solid #4e92ff button with #05070f
 *  text" — `accent` fill, `night` text. Not `<Button>` (ui/button.tsx): none
 *  of its variants are this plain accent-on-dark-text combination, and that
 *  component is shared across the whole site, so a one-off tone for this page
 *  belongs here instead of as a fourth variant nothing else uses. */
export function DetailCta({ locale, inline = false }: { locale: Locale; inline?: boolean }) {
  return (
    <div className={cn("flex justify-center", !inline && "px-gutter py-7 lg:py-12")}>
      {/* The contact form lives on the home page only — a bare `#lien-he` on a
          chip / software / training page pointed at nothing, so the page's one
          CTA went nowhere. */}
      <Link
        href={homeAnchor(locale, routes.anchors.contact)}
        className="inline-flex items-center gap-3 bg-accent px-[18px] py-3 text-[15px] font-bold text-night lg:px-[18px] lg:py-3 lg:text-[16px]"
      >
        {dictionary.product.shared.consultCta[locale]}
      </Link>
    </div>
  );
}
