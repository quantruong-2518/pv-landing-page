import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AppIcon } from "@/components/site/product/app-icons";
import { localizeFigure } from "@/components/site/primitives";
import type { Locale } from "@/lib/i18n/config";
import { dictionary, type AppIconId, type Spec } from "@/lib/i18n/dictionary";
import { anchor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * The DETAIL brief's hero + spec panel + navy CTA band, used by
 * `/products/{mint,papaya,espresso}` only (`[product]/page.tsx`). Re-themed
 * dark per DARK-BUILD-brief (2026-09-24, THEME-BRIEF.md § DARK): the hero and
 * panel surfaces that were `--color-paper` / `--color-panel-white` etc. now
 * read the site's own dark tokens (`--color-marquee`, `--color-navy`,
 * `--color-ink`, `--color-accent`, `--color-info`) instead of a second,
 * DETAIL-only palette — those seven tokens are gone from `@theme` (globals.css).
 *
 * This is still a second, self-contained set of components next to the dark
 * `ProductDetail` (`product-detail.tsx`) rather than a reuse of it: that
 * component still renders E-Series (kept in the codebase behind
 * `HIDDEN_PRODUCT_SLUGS`, routes.ts), and `SpecCard` / `SpecGrid` /
 * `ProductKicker` inside it carry `ProductDetail`'s own spacing/typography,
 * which the DETAIL brief's locked layout (hero + white-turned-dark spec panel
 * + navy band) does not match — reusing them would be a rewrite of this
 * component's markup, not a restyle.
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
        "inline-flex w-fit items-center justify-center whitespace-nowrap border px-3.5 py-[7px] text-[12px] font-medium lg:text-[13px]",
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
 * The hero: kicker, title, rule, lead, the chip render — shared shape for all
 * three products. `pillsUnderLead` is PAPAYA-only (brief: "PAPAYA also shows
 * its 3 pills under the lead"); MINT/ESPRESSO print the same three pills inside
 * the panel's first column instead (`DetailNamePlate` below), which is why this
 * component never renders them itself.
 */
export function DetailHero({
  locale,
  titleId,
  eyebrow,
  title,
  lead,
  pillsUnderLead,
  image,
  imageAlt,
  // Three tiers, not one flat `lg:` value: the render beside this column is
  // `lg:absolute` at 44%–54% width (below), so the text has less room at
  // 1024–1279 than it does once the page reaches the mock's own 1440px —
  // PAPAYA's longer H1 ran under the render at 1024 with a flat 1000px cap.
  maxWidthClassName = "lg:max-w-[550px] xl:max-w-[680px] min-[1400px]:max-w-[820px]",
}: {
  locale: Locale;
  /** Sets the `<h1>`'s id so the page section can point `aria-labelledby` at it. */
  titleId?: string;
  eyebrow: string;
  title: string;
  lead: string;
  pillsUnderLead?: ReactNode;
  image: string;
  imageAlt: string;
  maxWidthClassName?: string;
}) {
  void locale;
  return (
    <div className="relative overflow-hidden bg-marquee pb-16 lg:pb-24">
      {/* The highlight behind the chip render keeps the mock's geometry (right
          of centre, `75% 35%`) and is `.glow-detail-hero` rather than an inline
          gradient: a gradient is not expressible as a colour token, but it does
          not belong in JSX either — the whole `.glow-*` family lives in
          globals.css, named after the block it belongs to and built from
          `--color-glow`, which is the one token declared for exactly this and
          never for text or a border (@theme). */}
      <div
        aria-hidden
        className="glow-detail-hero pointer-events-none absolute inset-0 hidden lg:block"
      />
      {/* Decorative circuit trace, left edge — path data copied verbatim from
          the D-*-desktop-mock.html files (identical across all three, from the
          original light DETAIL brief), desktop only per those mocks. Purely
          decorative. */}
      <svg
        aria-hidden
        focusable="false"
        width="120"
        height="420"
        viewBox="0 0 120 420"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="pointer-events-none absolute top-[84px] left-0 hidden text-accent/[0.13] lg:block"
      >
        <path d="M0 40h40l20 20h40M0 90h60l20-20M0 150h30l30 30h50M0 220h70M0 270h20l25 25h55M0 340h45l20-20h30" />
        <circle cx="100" cy="60" r="3" />
        <circle cx="80" cy="70" r="3" />
        <circle cx="110" cy="180" r="3" />
        <circle cx="70" cy="220" r="3" />
        <circle cx="100" cy="295" r="3" />
        <circle cx="95" cy="320" r="3" />
      </svg>

      {/* Not `lg:grid-cols-2`: the render below becomes `lg:absolute` at this
          breakpoint, so a 2-column grid would still hand the text block a
          50%-wide track (~644px on a 1440px page) even though nothing else
          occupies the second column — well under the mock's 820/1000px
          `maxWidthClassName`, which is what was forcing MINT's H1 onto 3
          lines instead of 2. The text column sets its own max-width instead. */}
      <div className="relative mx-auto max-w-[1440px] px-gutter pt-8 lg:pt-14">
        {/* Chip render. A static top band under 1024px (D-*-mobile-mock.html);
            an absolute right-hand column from `lg` (D-*-desktop-mock.html) —
            one <Image>, only its container changes shape, so the render never
            double-fetches. */}
        <div className="relative -mx-gutter mb-6 h-[200px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-[-64px] lg:mx-0 lg:mb-0 lg:h-auto lg:w-[44%] xl:w-[54%]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="mask-chip-hero object-cover lg:object-contain"
          />
        </div>

        <div className={cn("relative z-10 flex flex-col gap-4 lg:gap-[22px]", maxWidthClassName)}>
          <DetailKicker label={eyebrow} className="text-[13px] lg:text-[18px]" />
          <DetailTitle
            value={title}
            id={titleId}
            className="text-[25px] leading-[1.18] font-extrabold text-balance text-ink uppercase lg:text-[40px] lg:leading-[1.12] lg:tracking-[-0.01em] xl:text-[50px]"
          />
          <DetailRule />
          <p className="max-w-[58ch] text-[15px] leading-[1.6] text-body lg:text-[18px] lg:leading-[1.7]">
            {lead}
          </p>
          {pillsUnderLead}
        </div>
      </div>
    </div>
  );
}

/** "01" / "02" / "03" figure tile — index, label, value, unit. `tone` swaps
 *  the index/unit colour for PAPAYA FLEX's teal (`info`) panel; the value
 *  itself stays plain `ink` either way, same rule `SpecCard` (primitives.tsx)
 *  uses. */
export function DetailSpecTile({
  spec,
  locale,
  tone = "blue",
  /** ESPRESSO's "Card 4 chip: 640 TOPS" line — part of tile 01's own column
   *  in D-Espresso-desktop-mock.html, appended right after that tile's unit,
   *  not a row below the whole 3-tile grid. */
  footer,
  className,
}: {
  spec: Spec;
  locale: Locale;
  tone?: "blue" | "teal";
  footer?: ReactNode;
  className?: string;
}) {
  const [index, ...rest] = spec.label.split(" ");
  // `Spec.label` is "NN UPPERCASE WORDS" (dictionary.ts) — the DETAIL tiles
  // set the words in title case ("Performance", "Die / Chip Area"), so this
  // reads the same data other spec grids do rather than adding a second,
  // differently-cased label per figure.
  const title = rest
    .join(" ")
    .toLowerCase()
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  return (
    <div
      className={cn(
        // THEME-BRIEF.md § DARK: "tiles rgba(232,237,247,.04)" over the panel's
        // own opaque navy (`DetailPanel`/`PapayaPanel` below) — a hair lighter
        // than the panel so the tile grid still reads as tiles, not a flat field.
        "flex flex-col gap-1 border border-ink/10 bg-ink/[0.04] px-3 py-[11px] pb-3 lg:gap-1.5 lg:px-[18px] lg:py-[18px] lg:pb-5",
        className,
      )}
    >
      <span
        className={cn(
          "text-[14px] font-semibold lg:text-[22px]",
          tone === "teal" ? "text-info" : "text-accent",
        )}
      >
        {index}
      </span>
      <span className="text-[9.5px] font-medium text-ink lg:text-[15px]">{title}</span>
      {/* Long ranges ("0,1–0,15") would spill out of a 3-up tile at the
          36px the short figures use (PAPAYA FLEX, 1440px) — size by length
          rather than letting one tile overflow into the chip render beside it. */}
      <span
        className={cn(
          "mt-1 leading-none font-semibold whitespace-nowrap text-ink lg:mt-2",
          spec.value.length > 6 ? "text-[18px] lg:text-[28px]" : "text-[22px] lg:text-[36px]",
        )}
      >
        {localizeFigure(spec.value, locale)}
      </span>
      {spec.unit ? (
        <span
          className={cn(
            "text-[9.5px] font-semibold tracking-[0.04em] lg:text-[15px]",
            tone === "teal" ? "text-info" : "text-accent",
          )}
        >
          {spec.unit}
        </span>
      ) : null}
      {footer}
    </div>
  );
}

/** "THÔNG SỐ CHÍNH" heading over a spec tile row — plain span, not
 *  `GroupRule`/`SpecHeading` (primitives.tsx, product-detail.tsx): those
 *  print in the dark theme's `--color-accent` and carry a hairline this
 *  panel's own dividers already provide. */
export function DetailGroupLabel({
  children,
  tone = "blue",
  className,
}: {
  children: ReactNode;
  tone?: "blue" | "teal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[17px] font-bold tracking-[0.01em] lg:text-[28px]",
        tone === "teal" ? "text-info" : "text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A thin vertical hairline between two panel columns, desktop only — the
 *  mock's `grid-template-columns: … 1px … 1px …` dividers. */
export function DetailColumnRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("hidden w-px self-stretch bg-ink/14 xl:block", className)} />;
}

/** One "ỨNG DỤNG" tile: a photo, or (no asset) an icon on a soft tile fill —
 *  MINT's IoT tile and PAPAYA's Robot tile both ship with no image
 *  (DETAIL brief). `date` is ESPRESSO's "Dự kiến Q3/2026" line. */
export function DetailAppTile({
  image,
  alt,
  icon,
  label,
  date,
  className,
}: {
  image?: string;
  alt?: string;
  icon?: AppIconId;
  label: string;
  date?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex w-[140px] flex-none flex-col items-center gap-2 lg:w-[150px]", className)}>
      {/* Same tile fill as `DetailSpecTile` — rgba(232,237,247,.04) over the
          panel, THEME-BRIEF.md § DARK — for the icon-only fallback (no photo
          asset: MINT's IoT tile). */}
      <div className="relative aspect-[150/170] w-full overflow-hidden bg-ink/[0.04]">
        {image ? (
          <Image src={image} alt={alt ?? ""} fill sizes="160px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            {icon ? <AppIcon id={icon} className="h-10 w-10 text-accent lg:h-14 lg:w-14" /> : null}
          </span>
        )}
      </div>
      <span className="text-center text-[14px] font-semibold text-ink lg:text-[17px]">{label}</span>
      {date ? (
        <span className="text-center text-[12.5px] font-semibold text-accent lg:text-[14px]">{date}</span>
      ) : null}
    </div>
  );
}

/** The horizontal application row for MINT/ESPRESSO — a static flex row from
 *  `lg`, a scroll-snap strip below it (D-*-mobile-mock.html has no page-dot
 *  counter here, unlike `CardCarousel`'s catalogue rows, so this stays a
 *  plain SSR scroller rather than pulling in that "use client" component). */
export function DetailAppRow({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

/** The spec panel's wordmark column: product name, then its pills.
 *  MINT/ESPRESSO only — PAPAYA's two panels print a wordmark + a subtitle
 *  tag instead (`PapayaPanel` below), no pills of their own. */
export function DetailNamePlate({ name, pills, className }: { name: string; pills: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-3 lg:gap-3.5", className)}>
      {/* 54px (the mock's MINT size) sets ESPRESSO wider than its 250px
          column and it ran into the spec heading — long names step down. */}
      <span
        className={cn(
          "text-[28px] leading-none font-extrabold text-accent",
          name.length > 6 ? "lg:text-[42px]" : "lg:text-[54px]",
        )}
      >
        {name}
      </span>
      <div className="flex flex-wrap gap-2 lg:gap-2.5">{pills}</div>
    </div>
  );
}

/**
 * MINT/ESPRESSO's one panel: wordmark + pills | "THÔNG SỐ CHÍNH" + 3
 * tiles | "ỨNG DỤNG" + the application row, divided by hairlines
 * (D-Mint/D-Espresso-desktop-mock.html's
 * `grid-template-columns: <name> 1px minmax(0,1fr) 1px max-content`).
 * `nameColWidth` is the one dimension the two mocks disagree on (170px vs
 * ESPRESSO's wider 250px, which has to fit three wrapped pills under a
 * longer wordmark) — a CSS custom property, not a second Tailwind class per
 * caller, since Tailwind has no utility for an arbitrary `grid-template-columns`
 * track list.
 */
export function DetailPanel({
  name,
  pills,
  specLabel,
  specs,
  specTileFooter,
  appsLabel,
  apps,
  locale,
  nameColWidth,
}: {
  name: string;
  pills: ReactNode;
  specLabel: string;
  specs: readonly Spec[];
  /** Keyed by `specs` index — ESPRESSO passes one for index 0 only, to print
   *  "Card 4 chip: 640 TOPS" inside that tile (`DetailSpecTile`'s `footer`). */
  specTileFooter?: (index: number) => ReactNode;
  appsLabel: string;
  apps: ReactNode;
  locale: Locale;
  nameColWidth: string;
}) {
  return (
    <div
      // `navy-lit` is the palette's lit surface — the one the solutions,
      // software and contact blocks sit on. It is the panel here for the same
      // reason the brief made this block white: it is the page's emphasis, and
      // it overlaps a `navy` band, so it has to be the lighter of the two.
      className="flex flex-col gap-6 bg-navy-lit p-6 lg:p-10 xl:grid xl:items-start xl:gap-x-9"
      // Three columns only from xl: at 1024 the max-content apps column left the
      // spec tiles ~20px wide each, so below xl the panel stacks instead.
      style={{ gridTemplateColumns: `${nameColWidth} 1px minmax(0,1fr) 1px max-content` }}
    >
      <DetailNamePlate name={name} pills={pills} />
      <DetailColumnRule />
      <div className="flex flex-col gap-3 lg:gap-[18px]">
        <DetailGroupLabel>{specLabel}</DetailGroupLabel>
        <div className="grid grid-cols-3 gap-2 lg:gap-4">
          {specs.map((spec, index) => (
            <DetailSpecTile key={spec.label} spec={spec} locale={locale} footer={specTileFooter?.(index)} />
          ))}
        </div>
      </div>
      <DetailColumnRule />
      <div className="flex flex-col gap-3 lg:gap-[18px]">
        <DetailGroupLabel>{appsLabel}</DetailGroupLabel>
        {apps}
      </div>
    </div>
  );
}

/**
 * One of PAPAYA's two side-by-side panels: wordmark + subtitle tag, a
 * divider, "THÔNG SỐ CHÍNH", then 3 spec tiles plus a small masked chip
 * thumbnail (D-Papaya-desktop-mock.html). MINT/ESPRESSO use `DetailNamePlate`
 * + `DetailGroupLabel` + `DetailSpecTile` directly instead — those two share
 * one panel with a third ỨNG DỤNG column the mock's grid-template-columns
 * gives fixed widths, which a generic 2-panel component would have to
 * special-case away.
 */
export function PapayaPanel({
  name,
  tag,
  specLabel,
  specs,
  locale,
  chipImage,
  chipAlt,
  tone,
  className,
}: {
  name: string;
  tag: string;
  specLabel: string;
  specs: readonly Spec[];
  locale: Locale;
  chipImage: string;
  chipAlt: string;
  tone: "blue" | "teal";
  className?: string;
}) {
  return (
    // `navy-lit` for the same reason as `DetailPanel` above: this panel
    // overlaps the `navy` band, so it has to be the lighter of the two.
    <div className={cn("flex flex-col gap-4 bg-navy-lit p-6 lg:gap-[22px] lg:p-8", className)}>
      <div className="grid grid-cols-[max-content_1px_1fr] items-start gap-x-5 lg:gap-x-7">
        <span className="flex flex-col gap-1">
          <span
            className={cn(
              "text-[20px] leading-none font-bold tracking-[0.01em]",
              tone === "teal" ? "text-info" : "text-accent",
            )}
          >
            {name}
          </span>
          <span
            className={cn(
              "text-[13px] font-semibold",
              tone === "teal" ? "text-info" : "text-accent",
            )}
          >
            {tag}
          </span>
        </span>
        <span aria-hidden className="w-px self-stretch bg-ink/14" />
        <DetailGroupLabel tone={tone} className="pt-1 text-[13px] whitespace-nowrap lg:text-[18px]">
          {specLabel}
        </DetailGroupLabel>
      </div>

      <div className="grid grid-cols-3 items-center gap-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_110px] lg:gap-3">
        {specs.map((spec) => (
          <DetailSpecTile key={spec.label} spec={spec} locale={locale} tone={tone} />
        ))}
        <div className="relative hidden aspect-square w-[110px] lg:block">
          <Image src={chipImage} alt={chipAlt} fill sizes="110px" className="mask-chip-tile object-contain" />
        </div>
      </div>
    </div>
  );
}

/**
 * One row of PAPAYA's full-width ỨNG DỤNG panel: icon, photo, label — or, on
 * the "Robot" tile (no photo asset), the icon alone twice over (once as the
 * desktop leading cell, once inline with the mobile label) rather than a
 * blank photo box (D-Papaya mocks, both breakpoints).
 *
 * One element handles both layouts via CSS `order`, not two conditionally
 * rendered trees: below `sm` this is a flex column (photo, then an icon+label
 * line); from `sm` the same three children become a 3-column grid
 * (icon | photo | label), so nothing double-renders the photo.
 */
export function PapayaAppTile({
  image,
  alt,
  icon,
  label,
}: {
  image?: string;
  alt?: string;
  icon: AppIconId;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 border border-ink/10 bg-ink/[0.04] p-2 sm:grid sm:grid-cols-[34px_104px_minmax(0,1fr)] sm:items-center sm:gap-3 sm:p-3">
      <div className="relative h-[86px] overflow-hidden bg-ink/[0.04] sm:order-2 sm:h-[78px]">
        {image ? (
          <Image src={image} alt={alt ?? ""} fill sizes="110px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <AppIcon id={icon} className="h-9 w-9 text-accent sm:hidden" />
          </span>
        )}
      </div>
      <span className="hidden justify-center sm:order-1 sm:flex">
        <AppIcon id={icon} className="h-7 w-7 text-accent" />
      </span>
      <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink sm:order-3 sm:text-base">
        <AppIcon id={icon} className="h-4 w-4 shrink-0 text-accent sm:hidden" />
        {label}
      </span>
    </div>
  );
}

/** The centred solid-accent CTA on the navy band — the page's one CTA
 *  (brief). THEME-BRIEF.md § DARK: "CTA: solid #4e92ff button with #05070f
 *  text" — `accent` fill, `night` text. Not `<Button>` (ui/button.tsx): none
 *  of its variants are this plain accent-on-dark-text combination, and that
 *  component is shared across the whole site, so a one-off tone for this page
 *  belongs here instead of as a fourth variant nothing else uses. */
export function DetailCta({ locale }: { locale: Locale }) {
  return (
    <div className="flex justify-center px-gutter py-7 lg:py-12">
      <Link
        href={anchor(routes.anchors.contact)}
        className="inline-flex items-center gap-3 bg-accent px-[18px] py-3 text-[15px] font-bold text-night lg:px-[18px] lg:py-3 lg:text-[16px]"
      >
        {dictionary.product.shared.consultCta[locale]}
      </Link>
    </div>
  );
}
