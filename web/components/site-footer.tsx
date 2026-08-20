import type { PageKey, SiteContent } from "@/content/types";
import { MAIL_HREF, SITE } from "@/content/site";
import { path } from "@/lib/routes";
import { FactRow, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Four columns — identity, pages, contact, legal — then a bottom bar for the
 * copyright, the label legend and the source statement. Tax code, legal name
 * and address are both an E-E-A-T signal and the input for the Organization
 * JSON-LD.
 */
export function SiteFooter({ c }: { c: SiteContent }) {
  const address = c.locale === "en" ? SITE.office.en : SITE.office.vi;
  const legalName = c.locale === "en" ? SITE.legalName : SITE.legalNameVi;
  const parentCity = c.locale === "en" ? SITE.parent.city.en : SITE.parent.city.vi;

  const links: Array<{ key: PageKey; label: string }> = [
    { key: "home", label: c.nav.home },
    { key: "products", label: c.nav.products },
    { key: "contact", label: c.nav.contact },
  ];

  return (
    <footer className="tone-dark snap-start border-t border-line bg-bg-deep text-fg">
      <div className={cn(SHELL, "py-12 sm:py-14")}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">Pebble Vina</p>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-muted">{c.footer.tagline}</p>
            <a
              href={SITE.parent.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-9 items-center font-mono text-xs tracking-[0.1em] text-accent hover:underline"
            >
              pebble-square.com ↗
            </a>
          </div>

          <nav aria-label={c.footer.navTitle}>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.navTitle}
            </p>
            <ul className="mt-1">
              {links.map((l) => (
                <li key={l.key}>
                  <a
                    href={path(c.locale, l.key)}
                    className="inline-flex min-h-9 items-center text-sm text-muted hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.contactTitle}
            </p>
            <ul className="mt-1">
              <li>
                <a
                  href={SITE.contact.phoneHref}
                  className="inline-flex min-h-9 items-center text-sm text-muted hover:text-fg"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={MAIL_HREF}
                  className="inline-flex min-h-9 items-center break-all text-sm text-muted hover:text-fg"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li className="pt-2 text-sm leading-relaxed text-muted">{address}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.legalTitle}
            </p>
            <dl className="mt-1">
              <FactRow label={c.labels.entity} value={legalName} />
              <FactRow label={c.labels.taxCode} value={SITE.taxId} />
              <FactRow label={c.labels.parent} value={`${SITE.parent.name} — ${parentCity}`} />
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">
            {c.footer.copyright}
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">
            {c.footer.statusLegend}
          </p>
        </div>

        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-subtle">{c.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
