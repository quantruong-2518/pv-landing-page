import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LOCALE_LABELS, otherLocale, type Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { anchor, homeAnchor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ActivePage = "home" | "products";

/**
 * Sticky 84px header, shared by both public pages — only the active nav link
 * differs.
 *
 * Two things are deliberately not client components. The language switch is a
 * `Link` to the mirrored URL rather than a store toggle, because each language
 * is its own indexable page. The mobile menu is a `<details>` disclosure, so it
 * opens before hydration and keeps working if the JS bundle never lands.
 */
export function SiteHeader({ locale, active }: { locale: Locale; active: ActivePage }) {
  const nav = dictionary.header.nav;
  const target = otherLocale(locale);

  const links = [
    { href: routes.home(locale), label: nav.home[locale], key: "home" as const },
    { href: routes.products(locale), label: nav.products[locale], key: "products" as const },
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
        <Image src="/images/logo.png" alt="" width={36} height={36} priority className="block" />
        <span className="flex flex-col font-heading text-[0.9375rem] leading-none font-bold tracking-[0.12em]">
          <span>PEBBLE</span>
          <span className="text-accent">VINA</span>
        </span>
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

        <LocaleSwitch locale={locale} target={target} active={active} />

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

          <div className="mt-1 flex items-center justify-between gap-3 border-t border-ink/14 px-3 pt-3">
            <LocaleSwitch locale={locale} target={target} active={active} />
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
 * Switches language by navigating to the same page in the other locale, so the
 * reader keeps their place and the URL stays shareable in that language.
 */
function LocaleSwitch({
  locale,
  target,
  active,
}: {
  locale: Locale;
  target: Locale;
  active: ActivePage;
}) {
  const href = active === "home" ? routes.home(target) : routes.products(target);

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={dictionary.header.languageSwitch[locale]}
      // min-h-11: the label itself is 18px tall, which is not a tappable target
      // on a phone. The extra height is invisible inside the 84px header.
      className="inline-flex min-h-11 items-center px-1 font-mono text-[0.75rem] tracking-[0.1em] whitespace-nowrap text-muted transition-colors hover:text-accent"
    >
      {LOCALE_LABELS[locale]}
      <span aria-hidden className="mx-1 text-dim">
        /
      </span>
      <span className="text-dim">{LOCALE_LABELS[target]}</span>
    </Link>
  );
}
