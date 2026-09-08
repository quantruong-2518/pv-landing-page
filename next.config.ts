import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * The site talks to exactly three places off its own origin, and the policy
 * names all three so that anything else — an injected tag, a hijacked
 * dependency, a tracker somebody pastes in later — is refused by the browser
 * rather than by review:
 *
 *   - the PV One CRM intake the contact form posts to (`src/lib/contact/crm.ts`)
 *   - Google Tag Manager / Analytics, and only once the visitor has granted the
 *     analytics category (`src/components/site/consent/analytics.tsx`)
 *   - nothing else. Fonts are self-hosted by next/font, images are local.
 *
 * `'unsafe-inline'` on scripts is not optional here: Next streams the RSC
 * payload through inline `self.__next_f.push(...)` tags, and the alternative —
 * a per-request nonce — needs middleware, which would make all four public
 * pages dynamic and cost the prerendering SEO depends on (CLAUDE.md §3).
 * Styles need it for the inline `style` attributes motion writes each frame.
 *
 * `upgrade-insecure-requests` is deliberately absent: it would rewrite the
 * same-origin asset URLs of the WSL dev server (plain http on an IP, CLAUDE.md
 * §5) to https and break local development. In production HSTS does that job,
 * and Vercel already sends it — verified: `strict-transport-security:
 * max-age=63072000` on www.pebblevina.com.
 */
const isDev = process.env.NODE_ENV !== "production";

const crmOrigin = new URL(
  process.env.NEXT_PUBLIC_PV_ONE_CRM_API_URL ?? "https://pvone-crm-api.fly.dev",
).origin;

const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  // Clickjacking: nobody frames this site. X-Frame-Options below says the same
  // thing for scanners and proxies that still only read that header.
  `frame-ancestors 'none'`,
  // The contact form submits with fetch, never a navigation, so no cross-origin
  // form target is legitimate.
  `form-action 'self'`,
  `img-src 'self' data: https://www.google-analytics.com`,
  `font-src 'self' data:`,
  `style-src 'self' 'unsafe-inline'`,
  // Turbopack's dev runtime evaluates modules with eval(); production does not.
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  // `region1.` is the EU collection endpoint GA4 uses for visitors it routes
  // there; without it those beacons are blocked and the data silently vanishes.
  `connect-src 'self' ${crmOrigin} https://www.google-analytics.com https://region1.google-analytics.com${isDev ? " ws:" : ""}`,
].join("; ");

/**
 * Response headers applied to every route.
 *
 * HSTS is not set here on purpose — the platform already sends it, and a second
 * `Strict-Transport-Security` on the same response is noise at best. It belongs
 * in the host config, next to the certificate it depends on.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  // Send the full URL within the site, only the origin when leaving it: an
  // outbound click must not hand the destination the visitor's reading path.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site asks for none of these. Saying so explicitly is what stops an
  // embedded third party from asking on its behalf. `browsing-topics=()` opts
  // the origin out of Chrome's Topics API — an interest profile built from
  // browsing history is exactly the inference the consent banner exists to put
  // under the visitor's control, and it is not covered by asking about cookies.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Every public page lives under a locale prefix so each language has its own
  // indexable URL (see src/lib/i18n/config.ts). Bare paths are permanent
  // redirects into the default locale rather than duplicate content.
  async redirects() {
    return [
      { source: "/", destination: "/vi", permanent: true },
      { source: "/products", destination: "/vi/products", permanent: true },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // Generated source art stays lossless where alpha matters; AVIF/WebP
  // negotiation sends a compact, correctly-sized format to each browser.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
