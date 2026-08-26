import type { SiteContent } from "@/content/types";
import { ContactForm } from "@/components/contact-form";
import { Section, SectionHead, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/** The single contact surface shared by the contact route and catalogue end. */
export function ContactSection({ c, embedded = false }: { c: SiteContent; embedded?: boolean }) {
  const FormHeading = embedded ? "h3" : "h2";

  return (
    <Section id="book" screen className="section-field section-field-soft">
      <div
        className={cn(
          SHELL,
          "grid gap-y-7 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-start md:gap-x-12 lg:gap-x-16 xl:gap-x-20",
        )}
      >
        <SectionHead
          intro={c.contact.intro}
          as={embedded ? "h2" : "h1"}
          className="md:pt-4 [&>p:nth-of-type(2)]:border-l-2 [&>p:nth-of-type(2)]:border-accent [&>p:nth-of-type(2)]:bg-surface-brand [&>p:nth-of-type(2)]:px-4 [&>p:nth-of-type(2)]:py-3 [&>p:nth-of-type(2)]:text-fg"
        />

        <div className="-mx-5 border-y border-line bg-bg px-5 py-5 sm:mx-0 sm:border sm:p-6 sm:shadow-[0_12px_40px_rgb(15_23_42_/_0.05)] lg:p-7">
          <FormHeading className="font-display text-xl font-semibold leading-snug sm:text-2xl">
            {c.contact.form.title}
          </FormHeading>
          <div className="mt-4">
            <ContactForm c={c} successHeadingAs={embedded ? "h3" : "h2"} />
          </div>
        </div>
      </div>
    </Section>
  );
}
