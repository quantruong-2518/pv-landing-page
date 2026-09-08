import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Chakra_Petch, JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/query-provider";
import { Analytics } from "@/components/site/consent/analytics";
import { ConsentBanner } from "@/components/site/consent/consent-banner";
import { ScrollBehaviour } from "@/components/site/scroll-behaviour";
import { SiteFooter } from "@/components/site/site-footer";
import { LOCALES, LOCALE_TAGS, isLocale } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/routes";

import "@/app/globals.css";

/**
 * Root layout for the public site.
 *
 * It lives under `[locale]` rather than at `app/` so `<html lang>` is the real
 * language of the page — a crawler and a screen reader both read that attribute
 * before anything else. The admin group has its own root layout for the same
 * reason it has its own auth: it is a different application.
 */

const chakraPetch = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

// JetBrains Mono has no Vietnamese subset. That is fine and matches the design:
// it is used for Latin labels, figures and units, and the sans stack picks up
// any Vietnamese diacritic that lands in a mono label.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Neither Chakra Petch nor Be Vietnam Pro carries a single Hangul glyph, so
// /ko would render its entire body in whatever the device happens to fall back
// to — which on Windows is a font that does not match the rest of the page.
//
// `preload: false` and no `subsets`: the Latin coverage already comes from the
// two fonts above, so there is nothing here worth preloading, and Google serves
// Hangul in ~100 unicode-range slices the browser fetches only as it needs
// them. The variable axis is one file family instead of four static weights.
//
// It is attached to <html> only on /ko — see below. A Korean webfont has no
// business downloading on a Vietnamese page.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-korean",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#05070F",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // logo-light: the mark recoloured to white, flag roundel untouched. The navy
  // original is unreadable at 16px against a dark tab strip, which is what
  // themeColor above says this site is.
  icons: { icon: "/images/logo-light.png" },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/*
 * `dynamicParams` stays at its default (true), and unknown locales are rejected
 * by the `isLocale` check below instead.
 *
 * Setting it to false looks tidier and breaks publishing: once the CMS calls
 * `revalidatePath("/vi")`, the prerendered entry is dropped and Next refuses to
 * regenerate a param it was told cannot exist at runtime — /vi, /en and
 * /vi/products all returned 404 until the next full build. Measured, not
 * theorised.
 */

export default async function PublicLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const fonts = [chakraPetch.variable, beVietnamPro.variable, jetbrainsMono.variable];
  // globals.css reads `var(--font-korean, …)` with a plain-name fallback, so the
  // other two locales are unaffected by this variable being absent.
  if (locale === "ko") fonts.push(notoSansKr.variable);

  return (
    <html
      lang={LOCALE_TAGS[locale]}
      className={fonts.join(" ")}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden bg-night text-ink antialiased">
        {/*
          Scroll-reveal blocks are server-rendered with `opacity: 0` — that is
          how motion avoids a flash of the final state before it animates. With
          JavaScript off, nothing ever turns them back on, and roughly half of
          both pages is invisible. This puts them back.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <QueryProvider>
          <ScrollBehaviour />
          {/*
            First in the DOM so it is the first thing keyboard and screen-reader
            users reach — it is position-fixed, so this costs nothing visually.
            It renders null until an effect has read the consent cookie, which
            is what keeps these pages statically prerenderable.
          */}
          <ConsentBanner locale={locale} />
          {children}
          <SiteFooter locale={locale} />
          {/* Mounts only after the analytics category is granted — see the
              component; nothing is requested from Google before that. */}
          <Analytics />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "!rounded-none !border !border-ink/20 !bg-navy !font-mono !text-[0.75rem] !tracking-[0.06em] !text-ink",
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
