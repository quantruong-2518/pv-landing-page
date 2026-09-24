import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { AppIcon } from "@/components/site/product/app-icons";
import { CardCarousel } from "@/components/site/product/card-carousel";
import { Eyebrow, GroupRule, MarkedText, Pill } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { splitLines } from "@/lib/content/markup";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary, type HardwareApp } from "@/lib/i18n/dictionary";
import {
  anchor,
  isPublicProduct,
  PRODUCT_SLUG_TO_ANCHOR,
  PRODUCT_SLUGS,
  routes,
  type AnchorId,
  type ProductSlug,
} from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * `catalog.hardware[].anchor` (dictionary.ts, owned by the copy agent) is a
 * bare anchor id such as `"mint"` left over from when these four cards linked
 * to a section on this same page. The correspondence between that id and its
 * `ProductSlug` is owned by `PRODUCT_SLUG_TO_ANCHOR` (routes.ts), so it is
 * inverted here rather than assumed identical — this is what lets a hardware
 * card link straight to the chip's own page instead of a page anchor that no
 * longer exists.
 */
const ANCHOR_TO_PRODUCT_SLUG = new Map<AnchorId, ProductSlug>(
  PRODUCT_SLUGS.map((slug) => [PRODUCT_SLUG_TO_ANCHOR[slug], slug]),
);

/**
 * `lg:grid-cols-{n}` keyed by the number of hardware cards actually shown,
 * not a literal `lg:grid-cols-4` — see the render below, which filters out
 * any card whose slug is in HIDDEN_PRODUCT_SLUGS (routes.ts). Both branches
 * are written out because Tailwind's build-time scanner needs the full class
 * name to appear as a literal string somewhere in the source; a template
 * string like `` `lg:grid-cols-${n}` `` would never generate the CSS. Re-
 * enabling E-Series (dropping it from HIDDEN_PRODUCT_SLUGS) makes the count
 * 4 again and this map picks the 4-column class back up on its own.
 */
const HARDWARE_GRID_COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Catalogue hero: heading, then every product as a card that jumps to its own
 * detail section, then the five-point roadmap strip.
 *
 * The roadmap strip is the honest part of this page — it is where "in
 * production", "PoC" and "roadmap" are stated as dates rather than implied by
 * how confidently a card is written.
 */
export function Catalogue({
  content,
  locale,
  softwareImage,
  trainingImage,
}: {
  content: ProductContent["catalog"];
  locale: Locale;
  /** `content.software.image` / `content.training.image` (CMS-owned, `ProductContent`)
   *  — the P2 solution cards' backgrounds. Passed in rather than read from a
   *  second `ProductContent` slice here, since `Catalogue` only otherwise
   *  knows about `content.catalog`. */
  softwareImage: string;
  trainingImage: string;
}) {
  const copy = dictionary.product.catalog;

  // catalog.hardware lists every product line, including any in
  // HIDDEN_PRODUCT_SLUGS (routes.ts) — filtered out here rather than at the
  // dictionary, which stays the full four-line source of truth for when a
  // hidden line comes back. A card whose anchor does not resolve to a
  // ProductSlug at all (should not happen — see the comment below) is kept,
  // since only a known hidden slug is a reason to drop it.
  const hardware = copy.hardware.filter((card) => {
    const slug = ANCHOR_TO_PRODUCT_SLUG.get(card.anchor as AnchorId);
    return !slug || isPublicProduct(slug);
  });

  const titleLines = splitLines(content.title[locale]);
  const leadParagraphs = splitLines(content.lead[locale]);

  // `catalog.other[].anchor` → the CMS image field for that solution (brief
  // P2 § "Solution cards": "software → content.software.image, training →
  // content.training.image"). A lookup rather than positional zip
  // (`other[0]`/`other[1]`) so the mapping survives `other` being reordered.
  const solutionImages: Partial<Record<string, string>> = {
    "phan-mem": softwareImage,
    "dao-tao": trainingImage,
  };

  return (
    <Section
      id={routes.anchors.top}
      labelledBy="catalogue-title"
      screen
      spend="between"
      className="glow-catalogue bg-night-deep pt-[clamp(38px,4.2vw,72px)] pb-[clamp(40px,4.4vw,64px)]"
    >
      <div className="grid items-end gap-row gap-x-col pb-[clamp(22px,2.6vw,38px)] lg:grid-cols-[1.12fr_1fr]">
        <div className="flex flex-col gap-[18px]">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <span aria-hidden className="h-0.5 w-3.5 shrink-0 bg-accent md:w-6" />
            <Eyebrow className="min-w-0">{content.eyebrow[locale]}</Eyebrow>
          </div>
          <h1 id="catalogue-title" className="font-heading text-h1-catalogue text-balance uppercase">
            {titleLines.map((line, index) => (
              // Second line onward is the qualifying half of the headline,
              // set in `text-muted` — same mechanism as `home.pim.title`
              // (PimSection, home/pim-section.tsx). `block` unconditionally
              // (not `md:block`): the locked mock keeps one visual line per
              // `\n` segment even on a phone, where the line simply wraps if
              // it runs long (see the mobile mock's second title line).
              <span
                key={index}
                className={cn("block lg:whitespace-nowrap", index > 0 && "text-muted")}
              >
                <MarkedText value={line} />
              </span>
            ))}
          </h1>
        </div>

        <div className="flex max-w-[56ch] flex-col gap-[14px]">
          {leadParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={cn(
                index === 0 ? "text-lead text-contact" : "hidden text-card text-body md:block",
              )}
            >
              <MarkedText value={paragraph} />
            </p>
          ))}
        </div>
      </div>

      {/* `hint` (content.hint) and `copy.exploreLine` are no longer rendered
          — this row overlapped at 390px and the locked P1 mock drops it
          entirely (brief P1 § "Content changes"). Both stay in the CMS
          schema/dictionary in case the row comes back; nothing below reads
          them. */}

      <CardCarousel
        label={copy.groupProducts[locale]}
        meta={copy.groupChipLine[locale]}
        count={hardware.length}
        gridColsClassName={HARDWARE_GRID_COLS[hardware.length] ?? "lg:grid-cols-4"}
      >
        {hardware.map((card, index) => {
          // catalog.hardware only ever lists the four product lines, so this
          // always resolves; the page-anchor fallback only protects against
          // that invariant breaking, rather than throwing at render time.
          const slug = ANCHOR_TO_PRODUCT_SLUG.get(card.anchor as AnchorId);
          const href = slug ? routes.product(locale, slug) : anchor(card.anchor as AnchorId);

          return (
            <HardwareCard
              key={card.name}
              href={href}
              name={card.name}
              family={card.family}
              image={card.image}
              imageAlt={card.imageAlt[locale]}
              apps={card.apps}
              locale={locale}
              priority={index === 0}
              delay={index * 0.06}
            />
          );
        })}
      </CardCarousel>

      <CardCarousel
        label={copy.groupSolutions[locale]}
        meta={copy.groupSolutionsLine[locale]}
        count={copy.other.length}
        gridColsClassName="lg:grid-cols-2"
      >
        {copy.other.map((card, index) => (
          <SolutionCard
            key={card.anchor}
            href={anchor(card.anchor as AnchorId)}
            image={solutionImages[card.anchor] ?? softwareImage}
            category={card.category[locale]}
            when={card.when[locale]}
            name={card.name[locale]}
            body={card.body[locale]}
            delay={index * 0.06}
          />
        ))}
      </CardCarousel>

      <GroupRule
        label={copy.groupTimeline[locale]}
        meta={<span className="max-md:hidden">{copy.groupTimelineLine[locale]}</span>}
      />

      <RoadmapStrip locale={locale} />
      <RoadmapList locale={locale} />
    </Section>
  );
}

/**
 * One hardware card: the chip render as a background (top 80%, `object-cover`
 * under `.scrim-hardware-card`), the name + arrow and family tag on top of
 * it, then the "ỨNG DỤNG" application list. Locked layout, brief P1 § Layout.
 *
 * Sits inside `<CardCarousel>` as a plain child, not a grid/flex item
 * itself — the sizing that makes it a 300px-wide slide below `lg` and a full
 * grid cell from `lg` lives on the `<Reveal>` wrapper, so this component only
 * ever states the card's own box (border, height, internal layout).
 */
function HardwareCard({
  href,
  name,
  family,
  image,
  imageAlt,
  apps,
  locale,
  priority,
  delay,
}: {
  href: string;
  name: string;
  family: string;
  image: string;
  imageAlt: string;
  apps: HardwareApp[];
  locale: Locale;
  priority: boolean;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="w-[300px] flex-none snap-start lg:w-auto lg:flex-auto lg:snap-align-none"
    >
      <Link
        href={href}
        className="group relative flex h-[400px] w-full flex-col justify-between overflow-hidden border border-ink/14 bg-marquee text-ink transition-colors hover:border-ink/30 lg:h-[490px]"
      >
        <div className="absolute inset-x-0 top-0 h-4/5">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1023px) 300px, (max-width: 1279px) 45vw, 30vw"
            priority={priority}
            className="object-cover"
          />
        </div>
        <div aria-hidden className="scrim-hardware-card absolute inset-0" />

        <div className="relative flex flex-col gap-2.5 px-[18px] pt-[18px] lg:px-6 lg:pt-6">
          <span className="flex items-center justify-between gap-3">
            <span className="font-sans text-card-name whitespace-nowrap">{name}</span>
            <span aria-hidden className="font-mono text-lg text-accent">
              →
            </span>
          </span>
          <span className="w-fit border border-accent/45 bg-night/55 px-[9px] py-1 font-mono text-label tracking-[0.14em] text-accent-hover">
            {family}
          </span>
        </div>

        <div className="relative flex flex-col gap-2 px-[18px] pb-[18px] lg:px-6 lg:pb-6">
          <span className="font-mono text-label tracking-[0.16em] text-faint">
            {dictionary.product.shared.applications[locale]}
          </span>
          {/*
           * Two columns spread to the card's own left/right edges
           * (`justify-between` on the grid) — the user's 2026-09-24
           * correction: the original `minmax(0,1fr)` second column let long
           * left-column labels ("Giám sát an toàn điện") push the second
           * column narrower than its own nowrap text, clipped by the card's
           * `overflow-hidden`.
           *
           * Each track is `minmax(0,max-content)`, not bare `max-content`:
           * it grows to fit its label at VI's lengths (what the locked mock
           * measures), but can still shrink under `justify-between` instead
           * of forcing an overflow when a locale's label runs longer — EN
           * "Factory health monitoring" clipped mid-word at 1440 with the
           * unconstrained version. `min-w-0` on the row and `truncate` on
           * the label text is what makes that shrink end in an ellipsis
           * rather than a silent cut. `justify-between` still spreads the
           * pair to the card's edges whenever both labels fit at their full
           * width, which is the normal case.
           *
           * That dense two-column grid only turns on at `xl` (1280px):
           * below it — including the 1024px `lg` breakpoint where three
           * hardware cards are already only ~300px wide — there is no room
           * left to shrink into even with this fallback. `lg` keeps the
           * single-column, wrapping list instead, which is what "pick
           * something sane… nothing overflows at 768 and 1024" (brief P1 §
           * Layout) asks for.
           */}
          <div className="flex flex-col gap-2.5 border-t border-ink/12 pt-2.5 xl:grid xl:grid-cols-[minmax(0,max-content)_minmax(0,max-content)] xl:justify-between xl:gap-x-5 xl:gap-y-0 xl:border-t-0 xl:pt-0">
            {apps.map((app) => (
              <span
                key={app.label[locale]}
                className="flex min-w-0 items-center gap-1.5 text-[13px] font-medium text-ink xl:gap-2.5 xl:border-t xl:border-ink/12 xl:py-[9px] xl:text-[14px]"
              >
                <AppIcon
                  id={app.icon}
                  className="h-3.5 w-3.5 shrink-0 text-accent-soft xl:h-4 xl:w-4"
                />
                <span className="xl:truncate">{app.label[locale]}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * One P2 solution card: a full-bleed photo under `.scrim-solution-card`, a
 * date `Pill` + arrow on top, category/name/body pinned to the bottom-left
 * (≤78% width). Locked layout, brief P2 § "Solution cards". No border — the
 * one visible difference from `HardwareCard`'s box, besides the full-height
 * (not top-80%) image.
 */
function SolutionCard({
  href,
  image,
  category,
  when,
  name,
  body,
  delay,
}: {
  href: string;
  image: string;
  category: string;
  when: string;
  name: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="w-[300px] flex-none snap-start lg:w-auto lg:flex-auto lg:snap-align-none"
    >
      <Link
        href={href}
        className="group relative flex h-[300px] w-full flex-col justify-between overflow-hidden bg-marquee text-ink lg:h-[320px]"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1023px) 300px, 45vw"
          className="object-cover max-md:object-[60%_15%] md:object-[50%_40%]"
        />
        <div aria-hidden className="scrim-solution-card absolute inset-0" />

        <span className="relative flex items-center justify-between gap-3 p-4 lg:px-[28px] lg:py-[26px]">
          <Pill tone="info">{when}</Pill>
          <span aria-hidden className="font-mono text-lg text-accent">
            →
          </span>
        </span>

        {/* `max-w-[78%]` is the desktop mock's own constraint (keeps the
            copy off the card's right edge on a wide photo); the mobile mock
            runs it the card's full width instead — at 300px wide "Phần mềm
            doanh nghiệp" wrapped to 2 lines and squeezed the body copy
            under the 78% cap (see P2-mobile-render.png). */}
        <span className="relative flex max-w-full flex-col gap-1.5 p-4 pt-0 lg:max-w-[78%] lg:gap-2.5 lg:px-[28px] lg:pb-[26px]">
          <span className="font-mono text-label tracking-[0.16em] text-accent">{category}</span>
          <span className="font-sans text-solution-name">{name}</span>
          <span className="text-[14px] leading-[1.55] text-contact lg:text-[15px] lg:leading-[1.6]">
            {body}
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

/** done → solid accent bar; roadmap → dashed info bar (brief P2 § Roadmap). */
const ROADMAP_BAR_X = {
  done: "bg-accent",
  roadmap: "roadmap-bar-planned-x",
} as const;
const ROADMAP_BAR_Y = {
  done: "bg-accent",
  roadmap: "roadmap-bar-planned-y",
} as const;

/**
 * The roadmap strip: a 5-column ruled row from `lg`, a stacked list of rows
 * below it. Two DOM trees, not one responsive one — unlike the two card
 * rows above, columns-to-rows is an axis swap the same markup can't flex
 * across, and there is nothing to animate or make interactive either way
 * (no carousel: every milestone is visible at once at both widths), so
 * `Catalogue` just renders both and lets `lg:hidden` / `hidden lg:grid` pick
 * one (brief P2 § Roadmap, desktop vs. mobile).
 */
function RoadmapStrip({ locale }: { locale: Locale }) {
  const timeline = dictionary.product.catalog.timeline;

  return (
    <ol className="mt-[clamp(20px,2.2vw,30px)] hidden gap-x-[6px] lg:grid lg:grid-cols-5 lg:grid-rows-[auto_auto_auto] lg:gap-y-3.5">
      {timeline.map((entry) => {
        const isDone = entry.state === "done";
        return (
          // `grid-rows-subgrid` + `row-span-3`: at `lg` (1024px) the date +
          // Pill row wraps in some columns and not others (see the comment
          // below), which would leave the bar and the item name at a
          // different height per column under a plain `flex-col`. Subgrid
          // borrows the parent's three row tracks so row 2 (the bar) and
          // row 3 (the item name) line up across all five columns however
          // tall row 1 ends up — the same fix the P1 hardware cards used for
          // an analogous drift (see the comment on `HARDWARE_GRID_COLS`'s
          // caller above).
          <li key={entry.when} className="lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:pr-6">
            {/* Below `xl` the pill always sits on its own line under the
                date — not "wraps if it doesn't fit": at `lg` (1024px) five
                ~186px columns don't have room for a 30px Chakra Petch date
                beside its status Pill on one line ("12/2026" + "ROADMAP"
                measured wider than the column and spilled into the next
                one), but a shorter pair ("2024" + "PoC") does fit, and
                letting flex-wrap decide per-column made the row ragged —
                some columns stacked, some didn't. Forcing the stack for
                every column below `xl` keeps all five uniform; only `xl`
                switches to the single-line row the mock draws. */}
            <div className="flex flex-col items-start gap-1 xl:flex-row xl:items-center xl:justify-between xl:gap-2.5">
              <span
                className={cn(
                  "font-heading text-[22px] font-bold leading-none tracking-[-0.01em] xl:text-[30px]",
                  isDone ? "text-ink" : "text-contact",
                )}
              >
                {entry.when}
              </span>
              <Pill tone={isDone ? "accent" : "info"}>{entry.status[locale]}</Pill>
            </div>
            <span aria-hidden className={cn("-mr-6 block h-1", ROADMAP_BAR_X[entry.state])} />
            <span
              className={cn(
                "text-[16px] font-semibold leading-[1.35]",
                isDone ? "text-ink" : "text-contact",
              )}
            >
              {entry.item[locale]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The `<md`–`lg` companion to `RoadmapStrip`'s grid — see its own comment. */
function RoadmapList({ locale }: { locale: Locale }) {
  const timeline = dictionary.product.catalog.timeline;

  return (
    <ol className="mt-[clamp(14px,1.6vw,20px)] flex flex-col lg:hidden">
      {timeline.map((entry) => {
        const isDone = entry.state === "done";
        return (
          <li
            key={entry.when}
            className="grid min-h-[52px] grid-cols-[3px_72px_minmax(0,1fr)_max-content] items-center gap-x-3 border-b border-ink/6"
          >
            <span aria-hidden className={cn("h-full self-stretch", ROADMAP_BAR_Y[entry.state])} />
            <span
              className={cn(
                "font-heading text-lg font-bold leading-none",
                isDone ? "text-ink" : "text-contact",
              )}
            >
              {entry.when}
            </span>
            <span
              className={cn(
                "text-[14.5px] font-semibold leading-[1.3]",
                isDone ? "text-ink" : "text-contact",
              )}
            >
              {entry.item[locale]}
            </span>
            <Pill tone={isDone ? "accent" : "info"}>{entry.status[locale]}</Pill>
          </li>
        );
      })}
    </ol>
  );
}
