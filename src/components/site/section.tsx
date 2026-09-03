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
  center = false,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  as?: ElementType;
  screen?: boolean;
  /** Set false when the block manages its own horizontal padding (full-bleed rows). */
  padded?: boolean;
  /** Vertically centre the content — only meaningful together with `screen`. */
  center?: boolean;
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
        center && "flex flex-col justify-center",
        className,
      )}
    >
      {children}
    </Component>
  );
}
