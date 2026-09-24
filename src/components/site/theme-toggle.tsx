"use client";

import { useSyncExternalStore } from "react";

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { applyTheme, getServerTheme, readTheme, subscribeToTheme } from "@/components/site/theme";
import { cn } from "@/lib/utils";

/**
 * Day/night switch for the public header.
 *
 * Shaped like the language control beside it — square, hairline border, mono,
 * 44px — because it is the same kind of control: a preference, not a
 * destination. It is the one header control that cannot be a link or a
 * `<details>`, since it changes the page you are on rather than navigating to
 * another, so it is the header's only client component.
 *
 * What the server renders is the default surface, because a prerendered page
 * cannot know a reader's stored choice. The boot script in the [locale] layout
 * has already put the right surface on screen by then; this component only has
 * to catch `aria-pressed` up, which it does on mount. Rendering the state from
 * React instead would mean either a flash of the wrong theme or opting the page
 * out of prerendering — and prerendering is the SEO condition in CLAUDE.md § 3.
 *
 * The mark is a half-filled square rather than a sun or a moon: both are round,
 * and this design has no round shapes (same argument as the globe the language
 * menu does not use).
 *
 * Two presentations, like `LocaleMenu` / `LocaleBar`: a 44px square beside the
 * language menu on the desktop row, which is width-bound at 1024 and has no
 * room for a word, and a labelled row inside the mobile disclosure, which has
 * the width and where an unexplained mark would be the only one in the panel.
 */
export function ThemeToggle({
  locale,
  variant = "icon",
}: {
  locale: Locale;
  variant?: "icon" | "row";
}) {
  // The live document is the store (see `theme.ts`): the server snapshot is the
  // default surface, the client one is whatever the boot script already put on
  // screen, and React reconciles the two on hydration without this component
  // ever holding a copy of the theme.
  const light =
    useSyncExternalStore(subscribeToTheme, readTheme, getServerTheme) === "light";

  const label = dictionary.header.theme.label[locale];

  return (
    <button
      type="button"
      // One label in both states, with `aria-pressed` carrying which state it
      // is in — "light theme, pressed" and "light theme, not pressed" are the
      // two announcements, and neither changes out from under a reader who is
      // still hearing the first one. The row spells the same label out, so it
      // names itself and `aria-label` would only repeat it.
      aria-label={variant === "icon" ? label : undefined}
      aria-pressed={light}
      onClick={() => applyTheme(readTheme() === "light" ? "dark" : "light")}
      className={cn(
        "flex cursor-pointer items-center text-muted transition-colors",
        variant === "icon"
          ? "size-11 shrink-0 justify-center border border-ink/14 hover:border-ink/28 hover:text-ink"
          : // Same 14px step and padding as a nav link in the same panel, so
            // the disclosure reads as one list rather than a list plus a widget.
            "min-h-11 w-full justify-between gap-4 px-3 py-3.5 text-sm font-medium hover:bg-accent/10 hover:text-ink",
      )}
    >
      {variant === "row" ? <span>{label}</span> : null}
      <span aria-hidden className="relative block size-3 shrink-0 border border-current">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-current" />
      </span>
    </button>
  );
}
