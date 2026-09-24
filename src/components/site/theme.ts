/**
 * The public site's day/night surface.
 *
 * `dark` is the brand's look and is written as the *absence* of the attribute,
 * never as `data-theme="dark"`. That is what lets all nine public pages stay
 * prerendered: the HTML a crawler and a first-time reader receive is already
 * the default surface, and the only reader the boot script has to act for is
 * the one who asked for daylight. The light block in globals.css reads night as
 * `:root:not([data-theme="light"])` for the same reason.
 *
 * Not a `"use client"` module: the layout (a server component) needs the boot
 * script as a plain string, and every export of a client module reaches a
 * server component as a client reference instead of its value.
 */

export type Theme = "dark" | "light";

/** Where the choice is remembered. Read by the boot script, written by the toggle. */
export const THEME_STORAGE_KEY = "pv-theme";

/**
 * Runs before the body is parsed, so the surface is decided before the first
 * paint — a stored choice applied at hydration would show the reader the wrong
 * theme for as long as the bundle takes to land, on a page whose whole point is
 * that it renders without one.
 *
 * Wrapped in try/catch because `localStorage` throws, rather than returning
 * null, when a browser blocks storage (Safari's private mode, third-party
 * iframe). A reader with storage off gets the default surface, not an error
 * that stops the rest of the document.
 */
export const THEME_BOOT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

/** The surface currently on screen. Client only — reads the live document. */
export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * The document is the store, so a control that shows the current theme reads it
 * with `useSyncExternalStore` rather than mirroring it into React state. That is
 * what keeps the server's render (always the default) and the browser's first
 * paint (possibly light, set by the boot script above) from disagreeing without
 * a `setState` inside an effect, which React 19 flags: the hook is built for
 * exactly this — a value that lives outside React and differs on the server.
 */
const listeners = new Set<() => void>();

export function subscribeToTheme(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** What the server renders: the default surface, because it cannot know better. */
export function getServerTheme(): Theme {
  return "dark";
}

/** Switch the surface and remember it. Client only. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "light") {
    root.dataset.theme = "light";
  } else {
    delete root.dataset.theme;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the surface still changed for this visit, which is more
    // than refusing to switch would have given the reader.
  }

  for (const notify of listeners) notify();
}
