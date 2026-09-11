import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The furniture shared by every /bio section.
 *
 * The other two pages open a block with `SectionHead` — eyebrow above an H2,
 * lead paragraph beside it. /bio deliberately does not: it is laid out as a
 * technical sheet, and a section opens with a numbered rule instead. Reusing
 * the marketing header here would erase the only thing that makes the page a
 * different object.
 *
 * Everything below the mark still comes from the shared primitives, so the
 * type scale, the colours and the hairline weights are the same as everywhere
 * else — the departure is in the geometry, not in the theme.
 */

/**
 * `01 ————————— 01 / 06` above a heading.
 *
 * The numeral is set at display size in `text-ink/15`: large enough to be the
 * structure of the page, faint enough that the H2 under it still wins. It sits
 * in the flow rather than absolutely behind the heading, because a bleeding
 * ghost numeral is one more thing that can push a 360px viewport sideways.
 */
export function SectionMark({
  mark,
  total,
  title,
  lead,
  headingId,
  className,
}: {
  /** The section's number — set at display size, and repeated in `01 / 06`. */
  mark: string;
  /** How many numbered sections the sheet has. */
  total: string;
  title: ReactNode;
  lead?: ReactNode;
  headingId: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[clamp(16px,1.8vw,26px)]", className)}>
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.8] tracking-[-0.02em] text-ink/15"
        >
          {mark}
        </span>
        <span aria-hidden className="h-px flex-1 bg-ink/14" />
        <span className="font-mono text-label whitespace-nowrap text-faint">
          {mark} / {total}
        </span>
      </div>

      <div className="grid gap-row gap-x-col lg:grid-cols-2">
        <h2 id={headingId} className="max-w-[20ch] font-heading text-h2 text-balance">
          {title}
        </h2>
        {lead ? <p className="max-w-[56ch] text-lead text-body">{lead}</p> : null}
      </div>
    </div>
  );
}

/**
 * One `LABEL / value` cell of the identity and legal blocks.
 *
 * Rendered as `<dt>/<dd>` by the caller's `<dl>`: this is a description list in
 * the literal sense, and a screen reader reading "TAX CODE, 0111545175" pairs
 * the two the way the layout does.
 */
export function DataCell({
  label,
  index,
  children,
  className,
}: {
  label: string;
  /** `01`, `02` … Numbering the rows is what stops a stack of four hairline
   *  cells from reading as a form; the site numbers everything else already. */
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 border-t border-ink/14 pt-3.5 pb-1", className)}>
      <dt className="flex items-baseline gap-2.5 font-mono text-label text-faint">
        {index ? <span className="text-accent">{index}</span> : null}
        <span>{label}</span>
      </dt>
      {/* `text-card` rather than a hand-typed 15px: the scale's 15.5px step is
       *  where every one-off in that band belongs (see the vocabulary comment
       *  in globals.css), and it carries its own line-height so this does not
       *  restate one. */}
      <dd className="text-card text-ink">{children}</dd>
    </div>
  );
}

/** Total number of numbered sections — the denominator in every mark. */
export const SHEET_TOTAL = "07";
