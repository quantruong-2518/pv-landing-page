import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

import type { Spec } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks for the two public pages.
 *
 * These exist so the section files below read as layout, not as a wall of
 * repeated utility strings — and so a change to, say, the eyebrow treatment is
 * one edit rather than fourteen.
 */

/** Mono, letter-spaced, accent kicker above a heading. */
export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("font-mono text-eyebrow whitespace-nowrap text-accent-soft", className)}
      {...props}
    />
  );
}

/** The smaller, dimmer status line that sits beside a kicker on product pages. */
export function Kicker({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("font-mono text-label tracking-[0.12em] whitespace-nowrap", className)}
      {...props}
    />
  );
}

/**
 * The two-column section header used by almost every block: eyebrow + H2 on
 * the left, lead paragraph on the right. Collapses to one column below 900px,
 * which is where the 320px minimum column width stops fitting twice.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "start",
  headingId,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "end";
  headingId?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-row gap-x-col lg:grid-cols-2",
        align === "end" ? "items-end" : "items-start",
        className,
      )}
    >
      <div className="flex flex-col gap-[18px]">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 id={headingId} className="text-h2 font-heading text-balance">
          {title}
        </h2>
      </div>
      {lead ? <p className="max-w-[56ch] text-lead text-body">{lead}</p> : null}
    </div>
  );
}

/**
 * Product renders sit on a soft radial fade rather than in a visible frame —
 * `mask-vignette-*` in globals.css. `contain` is for chips shot on a plain
 * background, `cover` for photography that should fill the box.
 */
export function VignetteImage({
  src,
  alt,
  fit = "contain",
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-video w-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          fit === "contain"
            ? "object-contain mask-vignette-contain"
            : "object-cover mask-vignette-cover",
        )}
      />
    </div>
  );
}

/**
 * A specification card: mono label, large figure, then either a fixed unit or
 * a translated comparison footnote. Never both — the design uses one or the
 * other and mixing them makes the row heights disagree.
 */
export function SpecCard({ spec, locale }: { spec: Spec; locale: Locale }) {
  return (
    <div className="flex flex-col gap-1.5 py-4 pb-6">
      <span className="font-mono text-label text-accent">{spec.label}</span>
      <span
        className={cn("font-heading text-stat", spec.accent ? "text-accent" : "text-ink")}
      >
        {spec.value}
      </span>
      {spec.unit ? (
        <span className="font-mono text-[0.6875rem] leading-[1.5] text-muted">{spec.unit}</span>
      ) : null}
      {spec.note ? (
        <span className="text-[0.875rem] leading-[1.75] text-body">{spec.note[locale]}</span>
      ) : null}
    </div>
  );
}

export function SpecGrid({
  specs,
  locale,
  className,
}: {
  specs: readonly Spec[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-col sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(112px,1fr))]",
        className,
      )}
    >
      {specs.map((spec) => (
        <SpecCard key={spec.label} spec={spec} locale={locale} />
      ))}
    </div>
  );
}

/** The `01 • HARDWARE   ANALOG · IN PRODUCTION 05/2023` line above a product. */
export function ProductKicker({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-5 pb-6">
      <Kicker className="text-accent">{label}</Kicker>
      <Kicker className="text-faint">{meta}</Kicker>
    </div>
  );
}

/** Numbered feature column — used by "Why PIM", the training steps and modules. */
export function NumberedItem({
  index,
  title,
  body,
  className,
}: {
  index: string;
  title: ReactNode;
  body: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3.5 pt-9", className)}>
      <span className="font-mono text-[0.75rem] text-accent">{index}</span>
      <div className="text-[1.25rem] font-semibold">{title}</div>
      <p className="text-card text-body">{body}</p>
    </div>
  );
}
