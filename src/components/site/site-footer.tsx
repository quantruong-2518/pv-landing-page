import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { external, homeAnchor, routes } from "@/lib/routes";

/**
 * Four-column footer, identical on both pages.
 *
 * The design mock links the CMS from here. That link is gone on purpose: the
 * handoff (section 5.10) asks for it to be removed from the public footer, and
 * an admin URL advertised to every visitor is an invitation, not a convenience.
 * The CMS lives at /admin behind its own auth.
 *
 * `max-lg:min-h-11` on every link: at the design's density these rows are 17 to
 * 20px tall, which is fine with a mouse and misses with a thumb. The larger
 * target is applied only below `lg`, so the desktop rhythm the design specifies
 * is untouched.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = dictionary.footer;

  return (
    <footer className="bg-night-footer px-gutter pt-[clamp(34px,3.6vw,56px)] pb-[clamp(26px,2.8vw,40px)]">
      <div className="grid items-start gap-x-[clamp(24px,3vw,56px)] gap-y-[clamp(26px,3vw,44px)] sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href={routes.home(locale)} className="flex items-center gap-3 text-ink">
            <Image src="/images/logo.png" alt="" width={32} height={32} />
            <span className="font-heading text-sm font-bold tracking-[0.1em]">PEBBLE VINA</span>
          </Link>
          <p className="max-w-[34ch] text-sm leading-[1.75] text-body">{copy.tagline[locale]}</p>
          <a
            href={external.parent}
            target="_blank"
            rel="noreferrer"
            className="flex items-center font-mono text-[0.71875rem] tracking-[0.06em] text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
          >
            {copy.partner[locale]}
          </a>
        </div>

        <nav className="flex flex-col gap-3" aria-label={copy.pagesTitle[locale]}>
          <span className="font-mono text-label tracking-[0.13em] text-faint">
            {copy.pagesTitle[locale]}
          </span>
          <Link href={routes.home(locale)} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {dictionary.header.nav.home[locale]}
          </Link>
          <Link href={routes.products(locale)} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {dictionary.header.nav.products[locale]}
          </Link>
          <Link href={homeAnchor(locale, "lien-he")} className="flex items-center text-sm text-body transition-colors hover:text-ink max-lg:min-h-11">
            {copy.contactLink[locale]}
          </Link>
        </nav>

        <address className="flex flex-col gap-3 not-italic">
          <span className="font-mono text-label tracking-[0.13em] text-faint">
            {copy.contactTitle[locale]}
          </span>
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
          <span className="font-mono text-label tracking-[0.13em] text-faint">
            {copy.profileTitle[locale]}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[0.78125rem] text-faint">{copy.legalEntityLabel[locale]}</span>
            <span className="text-sm font-medium text-ink">{copy.legalEntity}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[0.78125rem] text-faint">{copy.taxLabel[locale]}</span>
            <span className="font-mono text-sm text-ink">{copy.taxCode}</span>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(24px,2.6vw,40px)]">
        <span className="font-mono text-[0.71875rem] tracking-[0.05em] text-copy">
          {copy.copyright[locale]}
        </span>
      </div>
    </footer>
  );
}
