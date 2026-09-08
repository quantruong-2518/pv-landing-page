"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Fade-and-lift as a block scrolls into view.
 *
 * Two constraints shape it. It runs `once`, because a section that re-animates
 * every time you scroll back up reads as broken rather than alive. And a reader
 * who asked for less motion must end up looking at the content, not at
 * `opacity: 0`.
 *
 * That second one is not free, and it used to be broken outright: 12 of 12
 * blocks on /vi stayed invisible with `prefers-reduced-motion: reduce`. The
 * component is rendered on the server, where `useReducedMotion()` is always
 * false, so the hidden state is serialised into the HTML — and React does not
 * repair a mismatched `style` attribute during hydration, so simply passing no
 * motion props on the client left that `opacity: 0` standing forever. The fix
 * is to hand motion the *final* values as `initial`, which gives the visual
 * element something to write to the DOM on mount, plus the
 * `prefers-reduced-motion` rule in globals.css, which covers the window before
 * hydration. Nobody else is affected: the animated branch is untouched, so
 * there is still no flash of the final state.
 *
 * The prop surface is deliberately four options wide. Forwarding the whole
 * motion prop set would let a caller override `whileInView` and quietly break
 * the rules above, and it does not type cleanly across element tags anyway.
 *
 * `data-reveal` is the hook both of those CSS rules target — the `<noscript>`
 * one in the layout, for a reader whose JavaScript never arrives, and the
 * reduced-motion one.
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
    ? // Not `{}`: with no motion values at all the visual element renders
      // nothing on mount and the server's `opacity: 0` survives. Stating the
      // end state as `initial` makes motion write `opacity: 1; transform: none`
      // to the element, with no animation to run.
      { initial: { opacity: 1, y: 0 } }
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
