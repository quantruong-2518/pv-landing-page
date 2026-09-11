import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A page block.
 *
 * `screen` reproduces the design's `min-height: 100vh` sections, with two
 * changes that the design mock could get away with and a shipped page cannot:
 *
 *  - it only applies from `md` up. On a 360px phone the same content is three
 *    times taller, so pinning it to the viewport guarantees an overflow.
 *  - it uses `svh`, not `vh`. On mobile Safari `100vh` is the *largest*
 *    viewport, so a full-height block is always partly behind the browser chrome.
 *
 * The header is sticky and 84px tall, so a full-height block gets the viewport
 * minus that; otherwise the first one pushes the second below the fold.
 */
export function Section({
  id,
  as: Component = "section",
  screen = false,
  padded = true,
  spend,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  as?: ElementType;
  screen?: boolean;
  /** Set false when the block manages its own horizontal padding (full-bleed rows). */
  padded?: boolean;
  /**
   * Where the surplus goes when `screen` hands the block more room than its
   * content needs. Only meaningful together with `screen`.
   *
   *  - `"between"` — the opening block keeps the top edge, the closing block
   *    takes the bottom edge, and the surplus becomes the gap between them.
   *  - `"center"` — the content floats in the middle, surplus split above and
   *    below it.
   *
   * `"between"` is the default choice for a block shorter than the viewport,
   * and the difference is not cosmetic. Three home-page sections were taken
   * *off* `screen` altogether because `center` left a hole in the middle of
   * each — ~220px either side of "Tại sao PIM" at 1360px wide, ~31% of "Tin
   * tức", both measured and both recorded in those files. The surplus is the
   * same either way; what changes is that the reader sees a header on one edge
   * and content on the other instead of a raft adrift between two voids.
   * Reach for `"center"` only when the block is one unit with nothing that
   * belongs on the bottom edge.
   *
   * Both are `md:`-only, like `screen` itself: below `md` there is no surplus
   * to spend, and pinning either would only fight the content (CLAUDE.md § 3).
   */
  spend?: "between" | "center";
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Component
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        padded && "px-gutter py-section",
        screen && "md:min-h-[calc(100svh-var(--spacing-header))]",
        spend && "flex flex-col",
        spend === "center" && "md:justify-center",
        spend === "between" && "md:justify-between",
        className,
      )}
    >
      {children}
    </Component>
  );
}
