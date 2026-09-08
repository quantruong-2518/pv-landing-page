"use client";

import { create } from "zustand";

import {
  ANALYTICS_COOKIE_PREFIXES,
  DENY_ALL,
  GRANT_ALL,
  eraseCookies,
  readConsent,
  writeConsent,
  type ConsentChoices,
} from "@/lib/consent/cookie";

/**
 * Whose consent state this is: one visitor, one browser, read once per load.
 *
 * It starts at `unknown` and stays there through the server render and the
 * first client render, so the markup Next prerenders and the markup React
 * hydrates are identical — the banner cannot be server-rendered, because the
 * pages are static (CLAUDE.md §3) and reading `cookies()` in the layout would
 * make all four of them dynamic. `hydrate()` runs in an effect afterwards and
 * is what decides whether to ask.
 *
 * A store rather than context because three unrelated places read the same
 * answer: the banner, the footer's "cookie settings" button, and the analytics
 * loader — none of which share a parent worth wrapping in a provider.
 */
type ConsentPhase = "unknown" | "asking" | "settled";

interface ConsentState {
  phase: ConsentPhase;
  choices: ConsentChoices;
  /** The preferences detail is open — either expanded from the banner, or
   *  reopened from the footer long after the visitor answered. */
  panelOpen: boolean;

  hydrate: () => void;
  openPanel: () => void;
  closePanel: () => void;
  toggle: (category: keyof ConsentChoices, value: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveChoices: () => void;
}

export const useConsentStore = create<ConsentState>((set, get) => {
  /** Writes the answer, then cleans up after any category just switched off. */
  const commit = (choices: ConsentChoices) => {
    writeConsent(choices);
    if (!choices.analytics) eraseCookies(ANALYTICS_COOKIE_PREFIXES);
    set({ choices, phase: "settled", panelOpen: false });
  };

  return {
    phase: "unknown",
    // Not `DENY_ALL` by reference — `toggle` replaces the object, but keeping
    // the exported constant out of mutable state avoids any chance of aliasing.
    choices: { ...DENY_ALL },
    panelOpen: false,

    hydrate: () => {
      const stored = readConsent();
      set(
        stored
          ? { phase: "settled", choices: { analytics: stored.analytics } }
          : { phase: "asking", choices: { ...DENY_ALL } },
      );
    },

    openPanel: () => set({ panelOpen: true }),
    closePanel: () => set({ panelOpen: false }),

    toggle: (category, value) => set({ choices: { ...get().choices, [category]: value } }),

    acceptAll: () => commit({ ...GRANT_ALL }),
    rejectAll: () => commit({ ...DENY_ALL }),
    saveChoices: () => commit({ ...get().choices }),
  };
});
