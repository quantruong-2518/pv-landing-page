"use client";

import { useEffect } from "react";

/**
 * Makes deep links land, then makes in-page jumps smooth — in that order.
 *
 * With `scroll-behavior: smooth` declared in CSS, the browser *animates* its
 * initial jump to a `#fragment`. Hydration scrolls too, the animation is
 * cancelled part-way, and the reader ends up near the top of the page instead
 * of at the section they followed a link to. Measured on this site:
 * `/vi/products#phan-mem` settled at scrollY 41 out of 5254.
 *
 * So: jump instantly to the fragment on mount, re-run it once web fonts have
 * settled (swapping fonts changes text height, which moves the target), and
 * only then hand smooth scrolling to the document for every later anchor click.
 *
 * Readers who asked for reduced motion never get the smooth part.
 */
export function ScrollBehaviour() {
  useEffect(() => {
    const root = document.documentElement;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;

    const jump = () => target?.scrollIntoView({ behavior: "instant", block: "start" });

    if (target) {
      jump();
      // `document.fonts` is missing in a few older WebViews; the jump above
      // already happened, so this is an improvement, not a requirement.
      void document.fonts?.ready.then(jump).catch(() => undefined);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduced.matches) {
      root.style.scrollBehavior = "smooth";
    }

    return () => {
      root.style.removeProperty("scroll-behavior");
    };
  }, []);

  return null;
}
