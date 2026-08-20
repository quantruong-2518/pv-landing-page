import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { FactStatus, Intro, Item, Media, Origin, Spec } from "@/content/types";

/* ── Frame ───────────────────────────────────────────────────────────────── */

export const SHELL = "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10";

/**
 * One block. Every section snaps to its own start, so scrolling never rests
 * between two blocks. `screen` additionally pins a block to a full viewport —
 * reserved for the openers; catalogue blocks grow with their content
 * (docs/03-structure.md §2).
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
        "relative flex snap-start flex-col justify-center py-14 sm:py-20 lg:py-24",
        screen && "min-h-[calc(100svh-var(--header-h))]",
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
  return <p className={cn("text-sm leading-relaxed text-muted", className)}>{children}</p>;
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
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase leading-none tracking-[0.12em] sm:text-[0.65rem]",
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
        "inline-flex w-fit items-center border px-2 py-0.5 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.1em]",
        origin === "ps" ? "border-line-strong text-muted" : "border-primary text-primary",
      )}
    >
      {label}
    </span>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────────────── */

export function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-3.5">
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
          <dt className="text-sm font-medium leading-snug sm:text-[0.95rem]">{item.title}</dt>
          {item.body ? (
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</dd>
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
  sizes = "(min-width: 1024px) 40vw, 100vw",
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
