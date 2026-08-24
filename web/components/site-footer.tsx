import type { PageKey, SiteContent } from "@/content/types";
import { MAIL_HREF, SITE } from "@/content/site";
import { path } from "@/lib/routes";
import { FactRow, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/** One mono label step for the whole footer — the same one FactRow already uses. */
const LABEL = "font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle";

/** 44px touch floor, same as the header. `gap-y-1` on the lists keeps neighbours from touching.
    `hover:text-accent` is the site's one hover step for a text link — header, menu and
    catalogue rows all use it, so hover means the same thing everywhere. */
const LINK = "inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-accent";

/**
 * Four columns — identity, pages, contact, legal — then a bottom bar for the
 * copyright, the label legend and the source statement. Tax code, legal name
 * and address are both an E-E-A-T signal and the input for the Organization
 * JSON-LD.
 *
 * Below `sm` the four groups stack, so inside a group the items run across the
 * line instead of down it: a stacked list of tall touch targets is what pushed
 * the phone footer past 1.6 screens.
 */
export function SiteFooter({ c }: { c: SiteContent }) {
  const links: Array<{ key: PageKey; label: string }> = [
    { key: "home", label: c.nav.home },
    { key: "products", label: c.nav.products },
    { key: "contact", label: c.nav.contact },
  ];

  return (
    // No `snap-start`: the footer is shorter than a viewport, so its snap
    // position always sat past maxScroll and could never be reached.
    // Closing rule, not a hairline: on /vi and /vi/products the last block is
    // dark too, and `bg` → `bg-deep` is a 5% step — the two read as one mass.
    // `border-t-2 border-fg` is the strong rule the spec cards already use.
    <footer className="tone-dark border-t-2 border-fg bg-bg-deep text-fg">
      <div className={cn(SHELL, "py-10 sm:py-14")}>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">{SITE.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{c.footer.tagline}</p>
            <a
              href={SITE.parent.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex min-h-11 items-center font-mono text-xs tracking-[0.1em] text-accent hover:underline"
            >
              pebble-square.com ↗
            </a>
          </div>

          <nav aria-label={c.footer.navTitle}>
            <p className={LABEL}>{c.footer.navTitle}</p>
            <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-1 sm:flex-col sm:gap-x-0">
              {links.map((l) => (
                <li key={l.key}>
                  <a href={path(l.key)} className={LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={LABEL}>{c.footer.contactTitle}</p>
            <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-1 sm:flex-col sm:gap-x-0">
              <li>
                <a href={SITE.contact.phoneHref} className={LINK}>
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                {/* No break-all: the address must stay one unbroken word so it wraps to
                    its own line rather than shrinking to share one with the phone. */}
                <a href={MAIL_HREF} className={LINK}>
                  {SITE.contact.email}
                </a>
              </li>
              <li className="w-full text-sm leading-relaxed text-muted">{SITE.office}</li>
            </ul>
          </div>

          <div>
            <p className={LABEL}>{c.footer.legalTitle}</p>
            <dl className="mt-1 grid grid-cols-2 gap-x-6 sm:block">
              <FactRow label={c.labels.entity} value={SITE.legalName} />
              <FactRow label={c.labels.taxCode} value={SITE.taxId} />
              <FactRow
                className="col-span-2"
                label={c.labels.parent}
                value={`${SITE.parent.name} — ${SITE.parent.city}`}
              />
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line pt-4 sm:mt-10 sm:pt-6">
          <p className={LABEL}>{c.footer.copyright}</p>
          <p className={LABEL}>{c.footer.statusLegend}</p>
        </div>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-subtle sm:mt-5">
          {c.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
