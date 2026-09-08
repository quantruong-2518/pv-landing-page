import Image from "next/image";
import Link from "next/link";

import { ConsentSettingsLink } from "@/components/site/consent/consent-settings-link";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { external, homeAnchor, routes } from "@/lib/routes";

/**
 * Four-column footer, identical on every public page.
 *
 * The design mock links the CMS from here. That link is gone on purpose: the
 * handoff (section 5.10) asks for it to be removed from the public footer, and
 * an admin URL advertised to every visitor is an invitation, not a convenience.
 * The CMS lives at /admin behind its own auth.
 *
 * `max-lg:min-h-11` on every link: at the design's density these rows are 17 to
 * 20px tall, which is fine with a mouse and misses with a thumb. The larger
 * target is applied only below `lg`, so the desktop rhythm the design specifies
 * is untouched. The logo link was the one row that never got it (320x32).
 *
 * The four columns are one grid, so their first rows have to be one row. Column
 * 1 opens with a 32px logo and columns 2-4 with an 11px mono label, which left
 * the three labels floating against nothing and every column's body copy
 * starting at a different height. `lg:min-h-8` gives each label the logo's
 * height and centres it there; the columns then share `gap-3`, so row 2 lands
 * on the same line in all four.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = dictionary.footer;

  // The label that opens columns 2-4. Its height is the logo's, which is what
  // makes the four first rows one row from `lg` up — see the note above.
  const columnLabel =
    "flex items-center font-mono text-label tracking-[0.13em] text-faint lg:min-h-8";

  return (
    <footer className="bg-night-footer px-gutter pt-[clamp(34px,3.6vw,56px)] pb-[clamp(26px,2.8vw,40px)]">
      <div className="grid items-start gap-x-[clamp(24px,3vw,56px)] gap-y-[clamp(26px,3vw,44px)] sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link
            href={routes.home(locale)}
            className="flex items-center gap-3 text-ink max-lg:min-h-11"
            aria-label="Pebble Vina"
          >
            {/* Same rule as the header: the supplied horizontal lockup once the
                grid goes to four columns and the column is wide enough for it,
                the mark alone below that. */}
            <Image
              src="/images/logo-wordmark.png"
              alt=""
              // Rendered size, not the file's 1789x274 — same ratio, and it is
              // what stops Next serving a 1920px variant. 32px tall matches the
              // mark size the mock gives this column.
              width={209}
              height={32}
              className="hidden h-8 w-auto lg:block"
            />
            <Image src="/images/logo.png" alt="" width={32} height={32} className="block lg:hidden" />
          </Link>
          <p className="max-w-[34ch] text-sm leading-[1.75] text-body">{copy.tagline[locale]}</p>
          <a
            href={external.parent}
            target="_blank"
            rel="noreferrer"
            // `tracking-[0.06em]` rather than the token's 0.11em: this is the
            // only mono label on the site that carries a domain, and at 0.11em
            // the line overruns this 300px column and breaks inside
            // "pebble-square.com". A hostname split across two lines stops
            // being a hostname, so the tracking gives way, not the word.
            className="flex items-center font-mono text-label tracking-[0.06em] text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
          >
            {copy.partner[locale]}
          </a>
        </div>

        <nav className="flex flex-col gap-3" aria-label={copy.pagesTitle[locale]}>
          <span className={columnLabel}>{copy.pagesTitle[locale]}</span>
          <Link href={routes.home(locale)} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {dictionary.header.nav.home[locale]}
          </Link>
          <Link href={routes.products(locale)} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {dictionary.header.nav.products[locale]}
          </Link>
          <Link href={routes.bio(locale)} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {dictionary.header.nav.bio[locale]}
          </Link>
          <Link href={homeAnchor(locale, "lien-he")} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {copy.contactLink[locale]}
          </Link>
        </nav>

        <address className="flex flex-col gap-3 not-italic">
          <span className={columnLabel}>{copy.contactTitle[locale]}</span>
          <a
            href={`tel:${external.phone}`}
            className="flex items-center font-mono text-sm text-ink transition-colors hover:text-accent-hover max-lg:min-h-11"
          >
            {external.phoneDisplay}
          </a>
          <a href={`mailto:${external.email}`} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {external.email}
          </a>
          <span className="max-w-[32ch] text-sm leading-[1.75] text-body">
            {copy.address[locale]}
          </span>
        </address>

        <div className="flex flex-col gap-3">
          <span className={columnLabel}>{copy.profileTitle[locale]}</span>
          <div className="flex flex-col gap-1">
            <span className="text-note text-faint">{copy.legalEntityLabel[locale]}</span>
            <span className="text-sm font-medium text-ink">{copy.legalEntity}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-note text-faint">{copy.taxLabel[locale]}</span>
            <span className="font-mono text-sm text-ink">{copy.taxCode}</span>
          </div>
        </div>
      </div>

      {/* Copyright and the consent control share the closing row: withdrawing
          consent has to be findable, and the footer is where a visitor looks
          for it. The link is the only client-side JavaScript in this footer. */}
      <div className="mt-[clamp(24px,2.6vw,40px)] flex flex-wrap items-center justify-between gap-x-col gap-y-2">
        {/* `text-faint`, not `--color-copy`: #4A5872 on the #03050B footer is
            2.84:1, and a copyright line is still text. #7C8AA3 measures 5.84:1
            on the same surface and is already this footer's mono label colour,
            so the closing row now matches the three column labels above it. */}
        <span className="font-mono text-label text-faint">{copy.copyright[locale]}</span>
        <ConsentSettingsLink locale={locale} />
      </div>
    </footer>
  );
}
