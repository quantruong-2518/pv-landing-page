"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The 2px completion bar in the enterprise-software section.
 *
 * The percentage is a roadmap figure, so it is announced properly: the wrapper
 * is a real `progressbar` with `aria-valuenow`, not a decorative div. The fill
 * animates from zero once, and is simply drawn at its final width when motion
 * is reduced.
 *
 * Completed and remaining used to be the same 2px line in two colours that sit
 * 3.67:1 apart — enough on paper, invisible in practice: `.scrim-software` puts
 * an accent bloom directly behind this bar, so a 2px accent hairline dissolves
 * into its own background. Weight is what separates them now. The track keeps
 * the design's 2px; the fill overhangs it by a pixel top and bottom, so the
 * completed portion is a 4px accent bar against a hairline and reads as filled
 * before any colour is judged. Still square, still no shadow.
 */
export function ProgressTrack({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="relative mt-2 h-0.5 bg-ink/14"
    >
      <motion.div
        className="absolute -top-px -bottom-px left-0 bg-accent"
        initial={reduceMotion ? false : { width: 0 }}
        whileInView={{ width: `${clamped}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={reduceMotion ? { width: `${clamped}%` } : undefined}
      />
    </div>
  );
}
