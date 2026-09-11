import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { LOCALES } from "@/lib/i18n/config";

/**
 * Open Graph / Twitter card image, shared by all three locales.
 *
 * Why a generated route instead of the old hand-written `openGraph.images`
 * entry in src/lib/seo/metadata.ts: that entry declared the hero render at
 * 1200x630 while the file on disk is 1536x1024 (measured with `sips -g
 * pixelWidth -g pixelHeight`) — a lying aspect ratio that made every social
 * card crop off-centre. The file convention reports whatever size this route
 * actually produces, so the two can no longer disagree.
 *
 * Why the background is a *derivative* of the hero and not the hero itself:
 * `ImageResponse` has a flat 500KB budget for the whole bundle — "your JSX,
 * CSS, fonts, images, and any other assets" (node_modules/next/dist/docs/
 * 01-app/03-api-reference/04-functions/image-response.md, "Behavior"). The
 * source hero is 2.0MB, roughly 2.7MB once base64-encoded, so it cannot be
 * inlined. og-card-hero-1200x630.jpg is that render resampled to 1200 wide
 * and centre-cropped to 630 (`sips --resampleWidth 1200` then `sips -c 630
 * 1200`, re-encoded as JPEG at quality 70): 177KB, which with the wordmark
 * puts the bundle at ~325KB base64-encoded. Regenerate it the same way if the
 * hero art is ever replaced — it is a derivative, not a second piece of art,
 * and it is deliberately absent from the CMS asset list in
 * src/lib/content/fields.ts because no page renders it.
 *
 * Why the lockup sits left: the crop puts the chip in the right two thirds and
 * leaves the left third nearly black, so the wordmark lands on empty ground
 * instead of on top of the subject. The scrim below only deepens what the
 * photograph already does.
 *
 * Why no text at all: Satori needs an embedded font file for every glyph it
 * draws, and this site's copy spans Vietnamese, English and Korean — loading
 * three font families into a build-time image route to repeat words already in
 * the page's own <title> is cost and risk for no reader benefit.
 *
 * Colour literals below are the one sanctioned exception to "no hardcoded
 * colour" (CLAUDE.md §2.4): Satori accepts only literal inline styles, no
 * Tailwind classes and no `var(...)`, so each value is hand-copied from the
 * `@theme` block in src/app/globals.css and the token name is cited next to it
 * so a search for that token still finds this file.
 */

export const alt = "Pebble Vina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// One image serves all three locales, but the route still lives under the
// [locale] segment, so it needs its own generateStaticParams to be prerendered
// for /vi, /en and /ko rather than left dynamic. LOCALES (src/lib/i18n/config)
// is the locale list to use here.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Read once at module scope: the composition has no request-time input, so
// there is nothing to gain from re-reading on every render (see the
// Node.js-runtime-with-local-assets example in the opengraph-image doc). There
// is no running server at build time to fetch /images/... over HTTP, hence
// node:fs instead of fetch.
async function inline(file: string, mime: string): Promise<string> {
  const data = await readFile(join(process.cwd(), "public/images", file), "base64");
  return `data:${mime};base64,${data}`;
}

const backgroundSrc = await inline("og-card-hero-1200x630.jpg", "image/jpeg");
const wordmarkSrc = await inline("logo-wordmark.png", "image/png");

// logo-wordmark.png measures 1789x274 — a ~6.53:1 lockup, not a square mark.
// The height is the source scaled, never stretched.
const WORDMARK_WIDTH = 420;
const WORDMARK_HEIGHT = (WORDMARK_WIDTH * 274) / 1789;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          // --color-night, src/app/globals.css: the body background. It shows
          // through only if the JPEG below ever fails to decode.
          backgroundColor: "#05070f",
        }}
      >
        <img src={backgroundSrc} alt="" width={size.width} height={size.height} />

        {/* Scrim over the left half so the wordmark keeps its contrast against
            the photograph's own highlights. Left-to-right, ending transparent
            well before the chip so the subject is never veiled. --color-night
            again: #05070f = rgb(5, 7, 15). */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(90deg, rgba(5,7,15,0.92) 0%, rgba(5,7,15,0.72) 34%, rgba(5,7,15,0) 62%)",
          }}
        />

        {/* Square-cornered hairline frame. Depth comes from the dark ground and
            this border, never a shadow — the design has neither rounded corners
            nor shadows anywhere (CLAUDE.md §3). --color-ink, src/app/
            globals.css: headings / primary text; #e8edf7 = rgb(232, 237, 247),
            used here at 0.18 alpha, inside the documented border-ink/8…28
            range. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "1px solid rgba(232,237,247,0.18)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 26,
            paddingLeft: 72,
          }}
        >
          <img
            src={wordmarkSrc}
            alt=""
            style={{ width: WORDMARK_WIDTH, height: WORDMARK_HEIGHT }}
          />
          {/* --color-accent, src/app/globals.css: the blue the site uses for
              eyebrow labels and CTA underlines. #4e92ff. */}
          <div style={{ width: 72, height: 4, backgroundColor: "#4e92ff" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
