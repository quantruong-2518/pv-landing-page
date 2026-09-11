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
      className={cn(
        "font-mono text-eyebrow whitespace-normal text-accent-soft sm:whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
}

/** The smaller, dimmer status line that sits beside a kicker on product pages. */
export function Kicker({ className, ...props }: ComponentProps<"span">) {
  return (
    <span className={cn("font-mono text-label whitespace-nowrap", className)} {...props} />
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
 * The head of a group *inside* a section: a hairline, then the group's name.
 *
 * `main > * + *` in globals.css guarantees a seam between two sections. This is
 * the same argument one level down. A section that holds two kinds of content
 * separated them with whitespace alone, and whitespace is not a boundary — it
 * is the same thing that sits between two cards of one group, so the reader has
 * nothing to tell "more of this" from "now something else". Measured on
 * /vi/products: the catalogue runs four chip cards into two solution cards into
 * a five-date roadmap strip with ~90px of nothing and no label on the last two,
 * and PAPAYA's own figures run into PAPAYA FLEX's comparison multiples — three
 * numbers against a named competitor part — with only the wordmark to say so.
 *
 * The hairline is 14% ink, not the 8% the section seam uses: inside a section
 * the rule has to win against the group's own content, and 14% is what /bio's
 * figure cards and the E-Series stack list already set (handoff § 4 puts every
 * divider on the dark ground in the 8–28% band).
 *
 * Three slots, in reading order: `name` is a wordmark ("PAPAYA FLEX"), `label`
 * is what the group is ("SẢN PHẨM", "THÔNG SỐ CHÍNH"), `meta` is the qualifier
 * that narrows it ("DÒNG CHIP NPU AI"). All optional — with none of them the
 * component is just the rule, which is the right head for a group whose content
 * already names itself (the numbered module and step rows).
 */
export function GroupRule({
  name,
  label,
  meta,
  children,
  className,
}: {
  name?: string;
  label?: string;
  meta?: string;
  /** A full sentence after the label, where the group needs one. */
  children?: ReactNode;
  className?: string;
}) {
  const hasHead = Boolean(name || label || meta || children);

  return (
    <div
      className={cn(
        "mt-[clamp(26px,3vw,44px)] border-t border-ink/14",
        hasHead && "flex flex-wrap items-baseline gap-x-5 gap-y-2.5 pt-[clamp(16px,1.8vw,26px)]",
        className,
      )}
    >
      {/* `tracking-[0.04em]` survives the token: the design sets these product
          names wide (+0.04em) where `card-title` runs tight (−0.005em), which
          is what makes "PAPAYA FLEX" read as a wordmark and not as a heading. */}
      {name ? (
        <span className="font-heading text-card-title tracking-[0.04em]">{name}</span>
      ) : null}
      {label ? (
        <span className="font-mono text-label whitespace-nowrap text-accent">{label}</span>
      ) : null}
      {meta ? (
        <span className="font-mono text-label whitespace-normal text-faint">{meta}</span>
      ) : null}
      {children}
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
 * `Spec.value` is transcribed verbatim from the design in Vietnamese numeral
 * notation — comma decimal, dot thousands (dictionary.ts: "17,6", "~10.000")
 * — because the design mock itself never localizes these spans (no `data-en`
 * on them). English and Korean readers expect the opposite convention, so a
 * bare VN-formatted number gets its separators swapped for those locales.
 * Anything that isn't *only* digits/~/× — a version string ("PCIe 5.0"), a
 * dimension ("5 × 5") — is left untouched, matching the source figure.
 */
const VN_NUMBER = /^(~?)(\d{1,3}(?:\.\d{3})*)(,\d+)?(×?)$/;

function localizeFigure(value: string, locale: Locale): string {
  if (locale === "vi") return value;
  const match = VN_NUMBER.exec(value);
  if (!match) return value;
  const [, prefix, integer, decimal, suffix] = match;
  return `${prefix}${integer.replace(/\./g, ",")}${decimal ? `.${decimal.slice(1)}` : ""}${suffix}`;
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
        {localizeFigure(spec.value, locale)}
      </span>
      {spec.unit ? <span className="font-mono text-label text-muted">{spec.unit}</span> : null}
      {spec.note ? <span className="text-note text-body">{spec.note[locale]}</span> : null}
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

/**
 * The `01 • HARDWARE   ANALOG · IN PRODUCTION 05/2023` line above a product.
 *
 * `meta` can run long (PAPAYA's carries a third segment: "ANALOG · PoC 2024 ·
 * PC-VISION & 5G") and it's a CMS field, so length isn't fixed. `Kicker`
 * defaults to `whitespace-nowrap` for short one-word labels elsewhere; here
 * that forced a 369px-wide phone viewport into 492px of horizontal scroll.
 * `whitespace-normal` lets it wrap instead — a no-op at desktop widths where
 * it already fits on one line.
 */
export function ProductKicker({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-5 pb-6">
      <Kicker className="text-accent">{label}</Kicker>
      <Kicker className="whitespace-normal text-faint">{meta}</Kicker>
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
      <span className="font-mono text-kicker text-accent">{index}</span>
      {/* `text-h3` rather than a hand-typed 20px: this sits on the 18–23px step
       * of the scale with the other sub-heads instead of inventing its own. The
       * weight stays 600 — the token's 700 is meant for the heading face, and
       * the design refs set these sans titles at 600. */}
      <div className="text-h3 font-semibold">{title}</div>
      <p className="text-card text-body">{body}</p>
    </div>
  );
}
