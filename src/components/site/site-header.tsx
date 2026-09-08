import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_NAMES,
  LOCALE_TAGS,
  type Locale,
} from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { anchor, homeAnchor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ActivePage = "home" | "products" | "bio";

/**
 * Where the language toggle goes from each page. A map rather than a ternary:
 * the toggle has to keep the reader on the page they are reading, and a third
 * page turned that ternary into the kind of expression you have to re-read.
 */
const PAGE_PATH: Record<ActivePage, (locale: Locale) => string> = {
  home: routes.home,
  products: routes.products,
  bio: routes.bio,
};

/**
 * Sticky 84px header, shared by all three public pages — only the active nav
 * link differs.
 *
 * Two things are deliberately not client components. The language switch is a
 * set of `Link`s to the mirrored URLs rather than a store toggle, because each
 * language is its own indexable page. The mobile menu is a `<details>`
 * disclosure, so it opens before hydration and keeps working if the JS bundle
 * never lands — and the language menu is built the same way for the same
 * reason.
 */
export function SiteHeader({ locale, active }: { locale: Locale; active: ActivePage }) {
  const nav = dictionary.header.nav;

  const links = [
    { href: routes.home(locale), label: nav.home[locale], key: "home" as const },
    { href: routes.products(locale), label: nav.products[locale], key: "products" as const },
    { href: routes.bio(locale), label: nav.bio[locale], key: "bio" as const },
    // News lives only on the home page, so from /products it needs the full path.
    {
      href: active === "home" ? anchor("tin-tuc") : homeAnchor(locale, "tin-tuc"),
      label: nav.news[locale],
      key: "news" as const,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-header items-center justify-between gap-6 px-gutter",
        // 82% opacity + blur is what lets the hero image show through without
        // the wordmark losing contrast against it.
        "bg-night/85 backdrop-blur-[14px]",
      )}
    >
      <Link
        href={routes.home(locale)}
        className="flex items-center gap-3.5 text-ink"
        aria-label="Pebble Vina"
      >
        {/* From lg the header has the width for the supplied horizontal lockup,
            so it runs unaltered: mark, wordmark and flag star as one artwork.
            Below lg it would shrink past reading size, so the mark alone
            stands in for it instead. Only the lockup is `priority`; preloading
            both would pull down a logo the viewport is never going to render. */}
        <Image
          src="/images/logo-wordmark.png"
          alt=""
          // Rendered size, not the file's 1789x274 — the ratio is the same, and
          // stating it here is what keeps Next from serving a 1920px variant of
          // a logo that is never wider than 235px. 36px tall puts the lockup's
          // mark at exactly the size the mock gives the mark alone.
          width={235}
          height={36}
          priority
          className="hidden h-9 w-auto lg:block"
        />
        <Image src="/images/logo.png" alt="" width={36} height={36} className="block lg:hidden" />
      </Link>

      {/* Desktop navigation. Below lg the same links live inside the disclosure. */}
      <nav className="hidden items-center gap-[clamp(18px,2.6vw,40px)] lg:flex">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            aria-current={link.key === active ? "page" : undefined}
            className={cn(
              "text-sm font-medium tracking-[0.02em] whitespace-nowrap transition-colors",
              link.key === active ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {link.label}
          </Link>
        ))}

        <span aria-hidden className="h-7 w-px bg-ink/18" />

        <LocaleMenu locale={locale} active={active} />

        <Button asChild variant="primary" size="none" mono={false} className="px-[22px] py-[13px]">
          <Link href={active === "home" ? anchor("lien-he") : homeAnchor(locale, "lien-he")}>
            <span className="text-[0.8125rem] font-semibold tracking-[0.1em]">
              {dictionary.header.cta[locale]}
            </span>
          </Link>
        </Button>
      </nav>

      {/* Mobile: one disclosure holding nav, language and the CTA. */}
      <details className="group relative lg:hidden">
        <summary
          className="flex size-11 cursor-pointer list-none items-center justify-center text-ink [&::-webkit-details-marker]:hidden"
          aria-label={dictionary.header.menu[locale]}
        >
          <span aria-hidden className="flex flex-col gap-[5px]">
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
          </span>
        </summary>

        <div className="absolute right-0 top-[calc(100%+12px)] flex w-[min(78vw,300px)] flex-col gap-1 border border-ink/14 bg-night/98 p-2 backdrop-blur-[14px]">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={link.key === active ? "page" : undefined}
              className={cn(
                "px-3 py-3.5 text-[0.9375rem] font-medium transition-colors hover:bg-accent/10",
                link.key === active ? "text-ink" : "text-muted",
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-ink/14 px-3 pt-3">
            <LocaleBar locale={locale} active={active} />
            <Button asChild variant="primary" size="none" mono={false} className="min-h-11 px-4">
              <Link href={active === "home" ? anchor("lien-he") : homeAnchor(locale, "lien-he")}>
                <span className="text-[0.75rem] font-semibold tracking-[0.1em]">
                  {dictionary.header.cta[locale]}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </details>
    </header>
  );
}

/**
 * Desktop language menu.
 *
 * The old control was a `VI / EN` pair, which only reads as a switch while
 * there are exactly two languages: with Korean added, "VI / EN / KO" is three
 * links of identical weight and no indication of which one you are on. This is
 * a disclosure instead — the current language on the button, the full list
 * underneath.
 *
 * `<details>` and not a popover or a client component: it opens before
 * hydration, it closes when the browser navigates, and a reader who cannot read
 * the current page is precisely the reader who must not be told to wait for a
 * JS bundle. Each entry is labelled in its own language and carries `lang` and
 * `hrefLang`, so a screen reader pronounces "한국어" in Korean and a crawler
 * reads the list as the page's alternates.
 */
function LocaleMenu({ locale, active }: { locale: Locale; active: ActivePage }) {
  const copy = dictionary.header;

  return (
    <details className="group relative">
      <summary
        aria-label={`${copy.language[locale]}: ${LOCALE_NAMES[locale]}`}
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center gap-2 border border-ink/14 px-3",
          "font-mono text-[0.75rem] tracking-[0.1em] whitespace-nowrap text-muted",
          "transition-colors hover:border-ink/28 hover:text-ink",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        {/* A globe would be the conventional mark and is the one round shape
            this design does not use anywhere. Two stacked bars plus the code
            say the same thing in the header's own vocabulary. */}
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-px w-3 bg-current" />
          <span className="block h-px w-3 bg-current" />
        </span>
        <span className="text-ink">{LOCALE_LABELS[locale]}</span>
        <Caret />
      </summary>

      <div
        // Same panel treatment as the mobile disclosure below — square, hairline
        // border, near-opaque so the hero image behind it cannot compete.
        className="absolute right-0 top-[calc(100%+18px)] z-50 flex w-[210px] flex-col border border-ink/14 bg-night/98 p-1 backdrop-blur-[14px]"
      >
        <span className="px-3 pt-2 pb-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-faint">
          {copy.languageMenu[locale]}
        </span>
        {LOCALES.map((candidate) => (
          <LocaleOption
            key={candidate}
            candidate={candidate}
            current={locale}
            active={active}
            variant="row"
          />
        ))}
      </div>
    </details>
  );
}

/**
 * Mobile language control: the three codes side by side inside the menu that is
 * already open. A second disclosure nested in the first would mean two taps to
 * reach a list of three items, so the list is simply shown.
 */
function LocaleBar({ locale, active }: { locale: Locale; active: ActivePage }) {
  return (
    <div
      role="group"
      aria-label={dictionary.header.languageMenu[locale]}
      className="flex items-stretch border border-ink/14"
    >
      {LOCALES.map((candidate) => (
        <LocaleOption
          key={candidate}
          candidate={candidate}
          current={locale}
          active={active}
          variant="cell"
        />
      ))}
    </div>
  );
}

/**
 * One language in either presentation.
 *
 * The current language renders as a `<span>`, not a link to the page you are
 * already on: `aria-current` on a self-link still invites a pointless
 * navigation, and the accent bar has to mean "you are here" in both layouts.
 */
function LocaleOption({
  candidate,
  current,
  active,
  variant,
}: {
  candidate: Locale;
  current: Locale;
  active: ActivePage;
  variant: "row" | "cell";
}) {
  const isCurrent = candidate === current;

  const row = cn(
    "flex items-center justify-between gap-4 border-l-2 px-3 py-3 text-[0.875rem] transition-colors",
    isCurrent ? "border-accent text-ink" : "border-transparent text-muted hover:bg-accent/10 hover:text-ink",
  );

  const cell = cn(
    // min-h-11 is the tap target; the label inside is 12px.
    "flex min-h-11 items-center justify-center px-3.5 font-mono text-[0.75rem] tracking-[0.1em] transition-colors",
    // Hairline between cells rather than around them, so the group reads as one
    // control instead of three buttons.
    "border-ink/14 [&:not(:first-child)]:border-l",
    isCurrent ? "bg-accent/15 text-accent" : "text-muted hover:bg-accent/10 hover:text-ink",
  );

  const className = variant === "row" ? row : cell;

  const content =
    variant === "row" ? (
      <>
        <span lang={LOCALE_TAGS[candidate]}>{LOCALE_NAMES[candidate]}</span>
        <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-dim">
          {LOCALE_LABELS[candidate]}
        </span>
      </>
    ) : (
      LOCALE_LABELS[candidate]
    );

  if (isCurrent) {
    return (
      <span aria-current="true" className={className}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={PAGE_PATH[active](candidate)}
      hrefLang={candidate}
      lang={LOCALE_TAGS[candidate]}
      className={className}
    >
      {content}
    </Link>
  );
}

/** The disclosure's open/closed marker. Rotates with `details[open]`. */
function Caret() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 8 5"
      className="h-[5px] w-2 fill-current transition-transform duration-200 group-open:rotate-180"
    >
      <path d="M0 0h8L4 5z" />
    </svg>
  );
}
