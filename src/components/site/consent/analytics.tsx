"use client";

import Script from "next/script";

import { useConsentStore } from "@/lib/store/consent-store";

/**
 * Google Analytics 4, loaded only after the visitor grants the analytics
 * category — never before, and removed from the tree the moment it is
 * withdrawn.
 *
 * This component *is* the consent gate. Loading gtag on every page and asking
 * it not to store anything is the pattern that gets sites fined: the request to
 * googletagmanager.com has already happened by then, and it carries the
 * visitor's IP. So the script tag simply does not exist until `analytics` is
 * true, and `eraseCookies` in the store clears `_ga*` on the way out.
 *
 * With no measurement id configured this renders nothing at all — the banner
 * still records the answer, so turning GA on later needs an env var and no code
 * change, and until then no third party is contacted either way.
 */
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export function Analytics() {
  const phase = useConsentStore((state) => state.phase);
  const analytics = useConsentStore((state) => state.choices.analytics);

  if (!MEASUREMENT_ID || phase !== "settled" || !analytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          // Only the analytics category was asked for and granted. Advertising
          // storage stays denied under Consent Mode v2 because no ads category
          // exists on this site — granting it would be consent nobody gave.
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
