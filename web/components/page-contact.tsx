import type { SiteContent } from "@/content/types";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { Figure, Section, SectionHead, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * 3. CONTACT — one light block: the invitation and the form on the same white
 * surface, and nothing else. The dark hero was folded into the form block on
 * 2026-08-24 (GM, docs/03-structure.md §3) — a page with a single job reads
 * better as one surface than as a title screen the visitor scrolls past to
 * reach the only thing on it. Phone, email, office and legal facts stay in the
 * footer alone (same decision).
 */
export function ContactPage({ c }: { c: SiteContent }) {
  return (
    <PageShell c={c} page="contact">
      <Section id="book" screen>
        {/* Two columns from `md`, where scroll-snap and every other layout on the
            site switch; stacked, this `screen` block overflowed the 768–1023 band. */}
        <div className={cn(SHELL, "grid gap-y-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:gap-x-24")}>
          <div>
            <SectionHead intro={c.contact.intro} as="h1" />
            {/* The office picture belongs before the send, not after it: it is
                evidence for the decision to write, not a thank-you note. */}
            <Figure
              media={c.contact.media}
              // A wider crop once the block is two columns: at 1440x900 the 3/2
              // frame pushed this `screen` block 10px past its budget, and 40px
              // at 1023x768. Stacked on a phone it keeps the 3/2 crop.
              ratio="aspect-[3/2] md:aspect-[2/1]"
              sizes="(min-width: 768px) 45vw, 100vw"
              pendingLabel={c.ui.imagePending}
              className="mt-6 lg:mt-10"
            />
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {c.contact.form.title}
            </h2>
            <div className="mt-5">
              <ContactForm c={c} />
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
