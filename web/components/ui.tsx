import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Application, FactStatus, Intro, Item, Media, Origin, Spec } from "@/content/types";

/* ── Frame ───────────────────────────────────────────────────────────────── */

export const SHELL = "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10";

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
  className,
  children,
}: {
  id?: string;
  tone?: "light" | "dark";
  screen?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex flex-col justify-center py-14 sm:py-20 lg:py-24",
        screen && "min-h-[calc(100svh-var(--header-h))] snap-start",
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

export function Body({ children, className }: { children?: string; className?: string }) {
  if (!children) return null;
  // 16px on phones, same step as <Lead>, so two adjacent blocks never change
  // body size on the same screen; the 14px step returns once there is room.
  return <p className={cn("text-base leading-relaxed text-muted sm:text-sm", className)}>{children}</p>;
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

/** A measured number with its method and source, both labelled. */
export function SpecCard({ spec, statusLabel, sourceLabel }: { spec: Spec; statusLabel: string; sourceLabel: string }) {
  return (
    <div className="flex flex-col border-t-2 border-fg pt-4">
      <StatusBadge status={spec.status} label={spec.statusNote ?? statusLabel} />
      <p className="mt-4 font-mono text-3xl font-medium leading-none tracking-tight text-fg sm:text-4xl">
        {spec.value}
        {spec.unit ? <span className="ml-1.5 text-base text-muted sm:text-lg">{spec.unit}</span> : null}
      </p>
      <p className="mt-3 text-sm font-medium leading-snug">{spec.label}</p>
      <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-muted">{spec.note}</p>
      <p className="mt-4 border-t border-line pt-3 font-mono text-[0.6rem] leading-relaxed text-subtle">
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
        <div key={item.title} className="border-t border-line py-3">
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
}: {
  media: Media;
  ratio?: string;
  sizes?: string;
  pendingLabel: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("relative overflow-hidden border border-line bg-surface", ratio, className)}>
      {media.src ? (
        <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <MediaPending alt={media.alt} label={pendingLabel} />
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
        className={cn("w-full object-contain", media.srcWide && "aspect-square md:aspect-[4/3]", className)}
      />
    </picture>
  );
}

/**
 * Product rig for the chip renders. The four files are additive-light artwork on
 * transparency: on a light band the glow reads as haze and the die edge burns
 * out, so every chip gets the same dark plinth whatever band it sits in. That
 * shared rig is also what makes the four read as one photographic set
 * (context/media-plan.md, luật 1) rather than four borrowed pictures.
 *
 * `badge` pins an evidence label inside the frame. Used for `roadmap` parts:
 * the label then cannot be separated from the render, not even by a screenshot
 * (CLAUDE.md §2 luật 4).
 */
export function ChipPlinth({
  media,
  badge,
  pendingLabel,
  className,
}: {
  media: Media;
  badge?: ReactNode;
  pendingLabel: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "tone-dark relative isolate overflow-hidden border border-line bg-bg",
        // Square from `md`, where the plinth shares a row with the copy and costs
        // no page height; shallower below that, where it would otherwise eat half
        // a viewport before the reader has met the product.
        "aspect-[5/4] md:aspect-square",
        className,
      )}
    >
      <div className="crossbar absolute inset-0 opacity-25" aria-hidden />
      {/* A pool of light under the die, so a cut-out render sits ON the plinth
          instead of floating above it. Neutral on purpose: each chip brings its
          own colour and a tinted pool would fight the copper one. */}
      <div className="chip-pool absolute inset-0" aria-hidden />

      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 36vw, (min-width: 640px) 62vw, 90vw"
          className="object-contain p-[5%] lg:p-[7%]"
        />
      ) : (
        <MediaPending alt={media.alt} label={pendingLabel} />
      )}

      {badge ? <div className="absolute bottom-3 left-3 z-10 sm:bottom-4 sm:left-4">{badge}</div> : null}
    </figure>
  );
}

/**
 * The use-case row under a product. A CSS scroll-snap rail — no JS, no arrows,
 * no dots: the next card peeking past the right edge is the whole affordance.
 * Once the viewport fits every card the rail simply stops scrolling.
 *
 * `tabIndex` because a scroll container is not keyboard-reachable outside
 * Firefox without it; `role="group"` + a label so that stop announces itself.
 */
export function AppRail({
  label,
  items,
  pendingLabel,
  className,
}: {
  label: string;
  items: Application[];
  pendingLabel: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{label}</p>

      <ul
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "rail mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1",
          // Bleeds to the screen edge below `lg` so the row is visibly a row that
          // continues; contained once every card fits.
          "-mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0",
          // Snap positions must respect that gutter. Without it `snap-start`
          // parks the first card against the padding box and the rail opens
          // already scrolled 20px, flush to the screen edge and out of line with
          // every other element in the block.
          "scroll-pl-5 sm:scroll-pl-8 lg:scroll-pl-0",
        )}
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="w-[74%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2rem)/3)]"
          >
            {/* No `src` yet: the placeholder prints the label as its own brief,
                so the rail reads as a rail and doubles as the shot list. */}
            <Figure
              media={item.media ?? { alt: item.title }}
              ratio="aspect-[16/10]"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 74vw"
              pendingLabel={pendingLabel}
            />
            <p className="mt-3 border-t border-line pt-2.5 text-base font-medium leading-snug sm:text-[0.95rem]">
              {item.title}
            </p>
            {item.body ? (
              <p className="mt-1.5 text-base leading-relaxed text-muted sm:text-sm">{item.body}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MediaPending({ alt, label }: { alt: string; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-6 text-center">
      <div className="crossbar absolute inset-0 opacity-70" aria-hidden />
      <Corners />
      <p className="relative font-mono text-[0.6rem] uppercase tracking-[0.16em] text-subtle">{label}</p>
      <p className="relative max-w-[30ch] text-xs leading-relaxed text-muted">{alt}</p>
    </div>
  );
}

/** Viewfinder ticks — reads as a frame waiting for a shot. */
function Corners() {
  const corner = "absolute h-3 w-3 border-line-strong";
  return (
    <span aria-hidden>
      <span className={cn(corner, "left-3 top-3 border-l border-t")} />
      <span className={cn(corner, "right-3 top-3 border-r border-t")} />
      <span className={cn(corner, "bottom-3 left-3 border-b border-l")} />
      <span className={cn(corner, "bottom-3 right-3 border-b border-r")} />
    </span>
  );
}
