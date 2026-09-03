"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Fade-and-lift as a block scrolls into view.
 *
 * Two constraints shape it. It runs `once`, because a section that re-animates
 * every time you scroll back up reads as broken rather than alive. And the
 * initial hidden state is only applied when motion is allowed — otherwise a
 * visitor with `prefers-reduced-motion`, or one whose JS never arrives, would
 * be left looking at `opacity: 0`.
 *
 * The prop surface is deliberately four options wide. Forwarding the whole
 * motion prop set would let a caller override `whileInView` and quietly break
 * the rule above, and it does not type cleanly across element tags anyway.
 *
 * `data-reveal` is the hook the `<noscript>` rule in the layout targets: the
 * server HTML really does ship `style="opacity:0"` on each of these, so without
 * that rule a reader with JavaScript disabled gets a page of blank sections.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger siblings by passing an increasing index. */
  delay?: number;
  as?: "div" | "article" | "li";
}) {
  const reduceMotion = useReducedMotion();

  const content = children;
  const animation = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2, margin: "0px 0px -80px 0px" },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

  if (as === "article") {
    return (
      <motion.article data-reveal className={cn(className)} {...animation}>
        {content}
      </motion.article>
    );
  }

  if (as === "li") {
    return (
      <motion.li data-reveal className={cn(className)} {...animation}>
        {content}
      </motion.li>
    );
  }

  return (
    <motion.div data-reveal className={cn(className)} {...animation}>
      {content}
    </motion.div>
  );
}
