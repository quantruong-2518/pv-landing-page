import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { FactStatus, Intro, Item, Media, Origin, Spec } from "@/content/types";

/* ── Frame ───────────────────────────────────────────────────────────────── */

/**
 * The site frame. One cap, one gutter, everywhere — header row, every block on
 * PRODUCTS and CONTACT, the footer, and the HOME artboards (which use the
 * uninset `.frame-bleed`/`.artboard` variants because the Canva art carries its
 * own margins). The numbers live in `globals.css` under THE FRAME; changing the
 * site's width means changing `--frame-max` there and nowhere else.
 *
 * Widened from `max-w-6xl` (1152px) to the 1408px canvas on 2026-08-30: the cap
 * has to be the canvas width for HOME to render 1:1, and a second cap for the
 * text pages is the three-frames problem again. Reading measure is unaffected —
 * prose keeps its own `max-w-2xl`/`max-w-3xl`, which is what sets line length.
 */
export const SHELL = "frame";

/** Two hierarchy levels: a marked boundary between groups and a quiet rule
 * between sibling items inside one group. */
export function SectionDivider({
  variant = "section",
  className,
}: {
  variant?: "section" | "item";
  className?: string;
}) {
  return (
    <div className={cn(SHELL, className)} aria-hidden="true">
      {variant === "section" ? (
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="h-px flex-1 bg-line-strong" />
          <span className="h-2 w-2 rotate-45 border border-line-strong" />
          <span className="h-px flex-1 bg-line-strong" />
        </div>
      ) : (
        <div className="h-px bg-line" />
      )}
    </div>
  );
}

/**
 * One block. `screen` pins a block to a full viewport — reserved for the
 * openers; catalogue blocks grow with their content (docs/03-structure.md §2).
 *
 * Only `screen` blocks carry `snap-start` (2026-08-24). A snap stop is a promise
 * that the block starting there fits on the screen, and measured on the built
 * site no content-height block does: why-now is 1018px and history 1161px in an
 * 836px budget at 1440x900, every product block 849–1236px. Snapping their tops
 * bought two rest positions per block, one cutting the four-pillar row below the
 * fold and one hiding the h2 under the header, with nothing in between.
 */
export function Section({
  id,
  tone = "light",
  screen = false,
  dense = false,
  className,
  children,
}: {
  id?: string;
  tone?: "light" | "dark";
  screen?: boolean;
  /**
   * Catalogue rhythm: nine blocks back to back, each already opening with a
   * ruled identity bar and closing with a horizontal row. The band change and
   * those two rules separate the blocks, so the padding does not have to — a
   * full opener band between every two of them is 80px of nothing, nine times.
   */
  dense?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex flex-col justify-center",
        // One expression, exactly one `py-*` per block: cn() is a plain join, so
        // two padding classes at the same breakpoint would be settled by
        // stylesheet order, not by this list.
        //
        // A `screen` block gets a smaller phone step because its base padding is
        // only ever *visible* when the content already overflows the budget:
        // below that, min-h plus justify-center absorbs the difference and the
        // block renders identically whatever the value. So on a phone this is
        // the minimum air under the sticky header, not the block rhythm — 56px
        // of it was 112px of a 684px budget at 360x740. Unchanged from `sm`,
        // where no opener overflows.
        dense
          ? "py-7 sm:py-12 lg:py-14"
          : screen
            ? "py-6 sm:py-20 lg:py-24"
            : "py-14 sm:py-20 lg:py-24",
        // `--screen-budget` is the site's one vertical unit (globals.css) — the
        // same number the HOME artboards fit themselves to.
        screen && "min-h-[var(--screen-budget)] snap-start",
        tone === "dark" && "tone-dark bg-bg text-fg",
        className,
      )}
    >
      {children}
    </section>
  );
}

/* ── Type ────────────────────────────────────────────────────────────────── */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted sm:mb-4 sm:text-[0.7rem]">
      <span className="h-px w-6 bg-line-strong sm:w-8" aria-hidden />
      {children}
    </p>
  );
}

/** `as="h1"` for the page title; every other section head stays an h2. */
function Heading({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn("text-[1.6rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[2.6rem]", className)}>
      {children}
    </Tag>
  );
}

/** Empty copy renders nothing — prose is filled in later (see context/). */
export function Lead({ children, className }: { children?: string; className?: string }) {
  if (!children) return null;
  return (
    <p className={cn("mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg", className)}>
      {children}
    </p>
  );
}

/** Same opening rhythm on every section. */
export function SectionHead({
  intro,
  as,
  className,
}: {
  intro: Intro;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header className={className}>
      <Kicker>{intro.kicker}</Kicker>
      <Heading as={as}>{intro.title}</Heading>
      <Lead>{intro.lead}</Lead>
    </header>
  );
}

/* ── Controls ────────────────────────────────────────────────────────────── */

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors sm:px-6",
        variant === "primary"
          ? "bg-primary text-primary-fg hover:opacity-90"
          : "border border-line-strong text-fg hover:bg-surface",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ── Evidence labels ─────────────────────────────────────────────────────────
   Repo rule #1 (CLAUDE.md §2): every technical fact carries a label. The
   component requires `status`, so it cannot be forgotten by accident. */

export function StatusBadge({ status, label }: { status: FactStatus; label: string }) {
  const shipped = status === "shipped";
  return (
    <span
      className={cn(
        // These two labels are the product (CLAUDE.md §2) — they may not be the
        // smallest type on the page.
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] uppercase leading-none tracking-[0.12em] sm:text-[0.75rem]",
        shipped ? "bg-shipped-bg text-shipped" : "bg-roadmap-bg text-roadmap",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", shipped ? "bg-shipped" : "bg-roadmap")} aria-hidden />
      {label}
    </span>
  );
}

/** Whose capability this is — rule #2 enforced by layout, not by trust. */
export function OriginTag({ origin, label }: { origin: Origin; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center border px-2 py-0.5 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.1em]",
        // `accent`, not `primary`: primary is a fill colour and only reads as
        // text in the light zone — this tag now also appears on a dark block.
        origin === "ps" ? "border-line-strong text-muted" : "border-accent text-accent",
      )}
    >
      {label}
    </span>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────────────── */

export function FactRow({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("border-t border-line py-3.5", className)}>
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{label}</dt>
      <dd className="mt-1.5 text-sm leading-snug text-fg">{value}</dd>
    </div>
  );
}

/**
 * A measured number with its method and source, both labelled.
 *
 * Only a `roadmap` number carries a badge (GM, 2026-08-24): "ĐÃ CÓ" on a part
 * that is on sale tells a buyer nothing, and it was printing twice per block —
 * once by the product, once by its number. The same convention the home
 * timeline has always used (`page-home.tsx`: `status="roadmap"`). Rule #1 is
 * unchanged where it matters: `status` is still required, still drives what is
 * labelled, and the method and source lines below never move.
 */
export function SpecCard({ spec, statusLabel, sourceLabel }: { spec: Spec; statusLabel: string; sourceLabel: string }) {
  return (
    <div className="flex flex-col border-t-2 border-fg pt-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <p className="font-mono text-[1.7rem] font-medium leading-none tracking-tight text-fg sm:text-3xl">
          {spec.value}
          {spec.unit ? <span className="ml-1 text-sm text-muted sm:text-base">{spec.unit}</span> : null}
        </p>
        {spec.status === "roadmap" ? (
          <StatusBadge status={spec.status} label={spec.statusNote ?? statusLabel} />
        ) : null}
      </div>
      <p className="mt-2 text-sm font-medium leading-snug">{spec.label}</p>
      <p className="mt-1.5 flex-1 text-[0.8rem] leading-relaxed text-muted">{spec.note}</p>
      <p className="mt-2.5 font-mono text-[0.6rem] leading-relaxed text-subtle">
        <span className="sr-only">{sourceLabel}: </span>
        {spec.source}
      </p>
    </div>
  );
}

/** Titled list. Titles ship now, bodies arrive later — the list reads either way. */
export function ItemList({ items, className }: { items: Item[]; className?: string }) {
  return (
    <dl className={cn("grid gap-x-8", className)}>
      {items.map((item) => (
        <div key={item.title} className="border-t border-line py-2 sm:py-3">
          {/* A title may never render smaller than the body under it. */}
          <dt className="text-base font-medium leading-snug sm:text-[0.95rem]">{item.title}</dt>
          {item.body ? (
            <dd className="mt-1.5 text-base leading-relaxed text-muted sm:text-sm">{item.body}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/* ── Media ────────────────────────────────────────────────────────────────
   An empty `src` is the normal state until photography exists: the placeholder
   states what belongs there instead of looking broken (context/media-plan.md). */

export function Figure({
  media,
  ratio = "aspect-[4/3]",
  sizes = "(min-width: 768px) 40vw, 100vw",
  pendingLabel,
  className,
  priority,
  compact,
  bare,
}: {
  media: Media;
  ratio?: string;
  sizes?: string;
  pendingLabel: string;
  className?: string;
  priority?: boolean;
  /** Frame too small to print the brief — a rail card at 176px wide. */
  compact?: boolean;
  /** Drop the card and let the file sit on the page. For cut-outs on
      transparency only: a filled panel behind one draws a box the picture does
      not have. A pending frame must never be bare — the crossbar grid and the
      corner ticks are only legible against the white media surface. */
  bare?: boolean;
}) {
  return (
    <figure className={cn("@container relative overflow-hidden", !bare && "border border-line bg-bg", ratio, className)}>
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={bare ? "object-contain" : "object-cover"}
        />
      ) : (
        <MediaPending alt={media.alt} label={pendingLabel} compact={compact} />
      )}
    </figure>
  );
}

/**
 * Art-directed artwork. `media.src` is the square crop, `media.srcWide` a wider
 * recomposition that takes over from `md` — two different drawings, so this is a
 * <picture> rather than next/image, which swaps resolution but never composition.
 * The files carry their own drawn frame, so nothing is added around them.
 */
export function Illustration({
  media,
  className,
  priority,
}: {
  media: Media;
  className?: string;
  priority?: boolean;
}) {
  if (!media.src) return null;

  return (
    <picture>
      {media.srcWide ? <source media="(min-width: 768px)" srcSet={media.srcWide} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element -- <picture> art direction */}
      <img
        src={media.src}
        alt={media.alt}
        width={1254}
        height={1254}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full bg-bg object-contain",
          media.srcWide ? "aspect-square md:aspect-[4/3]" : "aspect-[3/2]",
          className,
        )}
      />
    </picture>
  );
}

/** Product render centred on the same white surface as the dossier. */
export function ChipPlinth({
  media,
  pendingLabel,
  ratio = "aspect-square",
  sizes = "(min-width: 1024px) 26vw, (min-width: 768px) 30vw, 38vw",
  imageClassName,
  className,
}: {
  media: Media;
  pendingLabel: string;
  ratio?: string;
  sizes?: string;
  imageClassName?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "@container relative isolate flex items-center justify-center overflow-hidden bg-bg shadow-[0_14px_36px_rgb(11_18_32_/_0.12)]",
        ratio,
        className,
      )}
    >
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className={cn("chip-lift object-contain object-center", imageClassName ?? "p-[10%] lg:p-[12%]")}
        />
      ) : (
        <MediaPending alt={media.alt} label={pendingLabel} />
      )}
    </figure>
  );
}

function MediaPending({ alt, label, compact }: { alt: string; label: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center",
        compact ? "p-3" : "p-6",
      )}
    >
      <div className="crossbar absolute inset-0 opacity-70" aria-hidden />
      <Corners compact={compact} />
      <p
        className={cn(
          "relative font-mono uppercase tracking-[0.16em] text-subtle",
          compact ? "text-[0.55rem]" : "text-[0.6rem]",
        )}
      >
        {label}
      </p>
      {/* Whether the brief fits is a question about the frame, not about the
          page — the same plinth is 139px beside a phone identity and 364px in a
          desktop column — so a container query answers it. Under ~15rem only the
          label shows; above it the placeholder goes on doubling as the shot list
          (context/media-plan.md 5d). */}
      <p className="relative hidden max-w-[30ch] text-xs leading-relaxed text-muted @min-[15rem]:block">{alt}</p>
    </div>
  );
}

/** Viewfinder ticks — reads as a frame waiting for a shot. */
function Corners({ compact }: { compact?: boolean }) {
  const corner = cn("absolute border-line-strong", compact ? "h-2 w-2" : "h-3 w-3");
  const inset = compact ? ["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"] : ["left-3 top-3", "right-3 top-3", "bottom-3 left-3", "bottom-3 right-3"];
  return (
    <span aria-hidden>
      <span className={cn(corner, inset[0], "border-l border-t")} />
      <span className={cn(corner, inset[1], "border-r border-t")} />
      <span className={cn(corner, inset[2], "border-b border-l")} />
      <span className={cn(corner, inset[3], "border-b border-r")} />
    </span>
  );
}
