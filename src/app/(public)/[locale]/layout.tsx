import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/query-provider";
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

export const viewport: Viewport = {
  themeColor: "#05070F",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/images/logo.png" },
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

  return (
    <html
      lang={LOCALE_TAGS[locale]}
      className={`${chakraPetch.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable}`}
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
          {children}
          <SiteFooter locale={locale} />
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
