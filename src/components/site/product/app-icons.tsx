import type { SVGProps } from "react";

import type { AppIconId } from "@/lib/i18n/dictionary";

/**
 * Inline stroke icons for a hardware card's "ỨNG DỤNG" (applications) row.
 *
 * Path data is copied verbatim from the locked P1 catalogue mock
 * (`P1-desktop-mock.html` / `P1-mobile-mock.html`, brief P1) — 24×24 viewBox,
 * `stroke="currentColor"`, strokeWidth 1.6, square caps, `aria-hidden`. One
 * component keyed by `AppIconId` (the type `dictionary.ts` uses for
 * `hardware[].apps[].icon`) rather than inlining SVG per call site, so the
 * dictionary can name an icon without repeating markup for every locale.
 */
const PATHS: Record<AppIconId, React.ReactNode> = {
  shieldbolt: (
    <>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />
      <path d="M13 7l-3 5h4l-3 5" />
    </>
  ),
  factory: <path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17H3z" />,
  watch: (
    <>
      <rect x="7" y="6" width="10" height="12" />
      <path d="M9 6V2h6v4M9 18v4h6v-4" />
      <path d="M9 12h2l1-2 1 4 1-2h1" />
    </>
  ),
  sound: <path d="M3 12h2M7 8v8M11 4v16M15 8v8M19 10v4" />,
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </>
  ),
  arm: (
    <>
      <path d="M4 21h8M8 21v-4l-3-6 6-6 5 3" />
      <path d="M16 8l3-1 2 3-3 2" />
      <rect x="6" y="15" width="4" height="2" />
    </>
  ),
  scan: (
    <>
      <path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" />
      <rect x="8" y="8" width="8" height="8" />
    </>
  ),
  enterprise: (
    <>
      <rect x="4" y="3" width="16" height="18" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" />
    </>
  ),
  robot: (
    <>
      <rect x="5" y="8" width="14" height="11" />
      <path d="M12 8V4M10 4h4M9 16h6M2 12v3M22 12v3" />
    </>
  ),
  humanoid: (
    <>
      <rect x="9" y="2" width="6" height="5" />
      <path d="M7 9h10v7H7zM9 16v6M15 16v6M7 10l-3 5M17 10l3 5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="3" width="18" height="7" />
      <rect x="3" y="14" width="18" height="7" />
    </>
  ),
  // Path data copied verbatim from D-Mint-desktop-mock.html's IoT tile
  // (DETAIL brief) — a chip-node glyph for the one MINT application with no
  // photo asset.
  chip: (
    <>
      <rect x="8" y="8" width="8" height="8" />
      <path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M5 10h3M5 14h3M16 10h3M16 14h3" />
    </>
  ),
  // Path data copied verbatim from D-Papaya-desktop-mock.html's "Hệ thống an
  // ninh" tile (DETAIL brief) — the shield outline alone; `shieldbolt` above
  // adds a lightning stroke the comp does not draw here.
  shield: <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />,
};

export function AppIcon({
  id,
  ...props
}: { id: AppIconId } & Omit<SVGProps<SVGSVGElement>, "viewBox" | "fill" | "stroke" | "strokeWidth">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      {PATHS[id]}
    </svg>
  );
}
