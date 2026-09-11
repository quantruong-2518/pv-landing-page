import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { routes } from "@/lib/routes";

/**
 * Web App Manifest.
 *
 * What it is for here: a mobile visitor who saves the site to their home
 * screen gets this site's own icon and colours instead of a blank-page
 * screenshot, and it is one more place Google's SERP favicon lookup can find
 * a stable icon (see the comment on the app-icon files in src/app/).
 *
 * Icons point at the app-icon file convention (src/app/icon.png,
 * src/app/apple-icon.png) by their bare pathname, not a public/ path: Next
 * serves that convention through its own route handler at the same pathname
 * regardless of the cache-busting query string it appends to the <link> tags
 * it generates for <head> itself — HTTP route matching is by pathname, the
 * query string is separate — so the bare path here stays correct.
 *
 * theme_color / background_color repeat the exact value the public layout's
 * `viewport` already declares (`themeColor: "#05070F"`, src/app/(public)/
 * [locale]/layout.tsx) rather than a second literal that could drift from it.
 *
 * No `description`: there is no existing short self-description of the site
 * to reuse verbatim, and CLAUDE.md forbids writing new marketing copy outside
 * dictionary.ts/CMS — omitted rather than invented.
 *
 * `display: "browser"`: this is a marketing site, not an app — a visitor who
 * saves it should keep the browser's own URL bar and back button, not land in
 * a chrome-less window that behaves like something it isn't.
 *
 * `start_url` is the Vietnamese home page, not "/": bare paths are permanent
 * redirects into /vi (next.config.ts `redirects()`), and a saved icon should
 * open straight into the source-language page rather than bounce through a
 * redirect on launch.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pebble Vina",
    short_name: "Pebble Vina",
    start_url: routes.home(DEFAULT_LOCALE),
    display: "browser",
    background_color: "#05070F",
    theme_color: "#05070F",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
