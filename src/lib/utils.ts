import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Every `--text-*` entry in the `@theme` block of `src/app/globals.css`, in the
 * order it is declared there. Adding a token there means adding its name here.
 *
 * Why this list has to exist: tailwind-merge only knows Tailwind's stock size
 * scale (`text-sm`, `text-lg`, …). A project token such as `text-stat` looks to
 * it like a text *colour*, so the moment a real colour lands in the same `cn()`
 * call the size is dropped as a "conflict" — measured on the live site, the
 * eyebrow of every section rendered at 16px instead of 12.96px and every spec
 * figure on /products at 16px instead of 37.44px, because `cn()` collapsed
 * `text-eyebrow text-accent-soft` and `text-stat text-accent` down to the
 * colour alone. Declaring the names as the `font-size` group keeps the size and
 * the colour, and still collapses genuine conflicts
 * (`text-stat text-stat-lg` → `text-stat-lg`).
 */
const TEXT_SIZE_TOKENS = [
  "h1-hero",
  "h1-catalogue",
  "h2",
  "h2-detail",
  "h3",
  "card-title",
  "wordmark",
  "stat",
  "stat-lg",
  "stat-xl",
  "lead",
  "lead-hero",
  "card",
  "note",
  "eyebrow",
  "label",
  "kicker",
] as const;

/* Built once at module scope: `extendTailwindMerge` compiles a class map, and
 * rebuilding it per `cn()` call would redo that on every render. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TEXT_SIZE_TOKENS] }],
    },
  },
});

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
