import type { SiteContent } from "@/content/types";
import { ContactForm } from "@/components/contact-form";
import { Figure, Section, SectionHead, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/** The single contact surface shared by the contact route and catalogue end. */
export function ContactSection({ c, embedded = false }: { c: SiteContent; embedded?: boolean }) {
  const FormHeading = embedded ? "h3" : "h2";

  return (
    <Section id="book" screen className="section-field section-field-soft">
      <div
        className={cn(
          SHELL,
          "grid gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-6 lg:gap-x-16 lg:gap-y-10 xl:gap-x-24",
        )}
      >
        <SectionHead intro={c.contact.intro} as={embedded ? "h2" : "h1"} className="md:col-start-1 md:row-start-1" />

        <div className="-mx-5 border-y border-line bg-bg px-5 py-6 sm:mx-0 sm:border sm:p-6 sm:shadow-[0_12px_40px_rgb(15_23_42_/_0.05)] md:col-start-2 md:row-span-2 md:row-start-1 lg:p-8">
          <FormHeading className="font-display text-xl font-semibold leading-snug sm:text-2xl">
            {c.contact.form.title}
          </FormHeading>
          <div className="mt-5">
            <ContactForm c={c} successHeadingAs={embedded ? "h3" : "h2"} />
          </div>
        </div>

        <Figure
          media={c.contact.media}
          ratio="aspect-[3/2] md:aspect-[2/1]"
          sizes="(min-width: 768px) 45vw, 100vw"
          pendingLabel={c.ui.imagePending}
          className="md:col-start-1 md:row-start-2"
        />
      </div>
    </Section>
  );
}
