import type { SiteContent } from "@/content/types";
import { CTA_HREF, MAIL_HREF, SITE } from "@/content/site";
import { PageShell } from "@/components/page-shell";
import { Button, FactRow, Figure, Section, SectionHead, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/** 3. CONTACT — one action, the ways to reach it, and who you are signing with. */
export function ContactPage({ c }: { c: SiteContent }) {
  const address = c.locale === "en" ? SITE.office.en : SITE.office.vi;
  const legalName = c.locale === "en" ? SITE.legalName : SITE.legalNameVi;
  const parentCity = c.locale === "en" ? SITE.parent.city.en : SITE.parent.city.vi;

  return (
    <PageShell c={c} page="contact">
      <Section tone="dark" screen className="overflow-hidden">
        <div className="crossbar absolute inset-0 opacity-40" aria-hidden />
        <div className="aura absolute inset-0" aria-hidden />

        <div className={cn(SHELL, "relative")}>
          <SectionHead intro={c.contact.intro} as="h1" />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={CTA_HREF}>{c.contact.ctaPrimary}</Button>
            <Button href={MAIL_HREF} variant="ghost">
              {c.contact.ctaSecondary}
            </Button>
          </div>

          <dl className="mt-10 grid gap-x-10 border-t border-line pt-7 sm:grid-cols-2 lg:mt-14">
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                {c.labels.call}
              </dt>
              <dd className="mt-1.5">
                <a
                  href={SITE.contact.phoneHref}
                  className="font-mono text-2xl text-fg transition-colors hover:text-accent sm:text-3xl"
                >
                  {SITE.contact.phone}
                </a>
              </dd>
            </div>
            <div className="mt-6 sm:mt-0">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                {c.labels.email}
              </dt>
              <dd className="mt-1.5">
                <a
                  href={MAIL_HREF}
                  className="break-all font-mono text-lg text-fg transition-colors hover:text-accent sm:text-xl"
                >
                  {SITE.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="office">
        <div className={cn(SHELL, "grid gap-9 lg:grid-cols-2 lg:items-start lg:gap-12")}>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {c.labels.office}
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed sm:text-lg">{address}</p>

            <dl className="mt-8">
              <FactRow label={c.labels.entity} value={legalName} />
              <FactRow label={c.labels.taxCode} value={SITE.taxId} />
              <FactRow
                label={c.labels.parent}
                value={`${SITE.parent.name} — ${parentCity} · ${SITE.parent.businessLicense}`}
              />
            </dl>
          </div>

          <Figure
            media={c.contact.media}
            ratio="aspect-[3/2]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            pendingLabel={c.ui.imagePending}
          />
        </div>
      </Section>
    </PageShell>
  );
}
