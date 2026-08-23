import type { SiteContent } from "@/content/types";
import { MAIL_HREF, SITE } from "@/content/site";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { FactRow, Section, SectionHead, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/** 3. CONTACT — one action, the ways to reach it, and who you are signing with. */
export function ContactPage({ c }: { c: SiteContent }) {
  return (
    <PageShell c={c} page="contact">
      <Section tone="dark" screen className="overflow-hidden">
        <div className="crossbar absolute inset-0 opacity-40" aria-hidden />
        <div className="aura absolute inset-0" aria-hidden />

        <div className={cn(SHELL, "relative")}>
          <SectionHead intro={c.contact.intro} as="h1" />

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

      <Section id="book">
        <div className={cn(SHELL, "grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16")}>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {c.labels.office}
            </p>
            <p className="mt-3 text-base leading-relaxed sm:text-lg">{SITE.office}</p>

            <dl className="mt-8">
              <FactRow label={c.labels.entity} value={SITE.legalName} />
              <FactRow label={c.labels.taxCode} value={SITE.taxId} />
              <FactRow
                label={c.labels.parent}
                value={`${SITE.parent.name} — ${SITE.parent.city} · ${SITE.parent.businessLicense}`}
              />
            </dl>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {c.contact.form.title}
            </p>
            <div className="mt-6">
              <ContactForm c={c} />
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
