import Image from "next/image";

import { ContactForm } from "@/components/site/contact-form";
import { Eyebrow } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * 05 — Contact. Left column is the pitch over the HQ photograph, right column
 * is the working form.
 *
 * The left card bleeds past the section padding (negative margin matched to the
 * padding) so the photograph reaches the section edge while the text keeps its
 * inset. The three mini-stats are pushed to the bottom with `mt-auto`, which is
 * what lines their baseline up with the submit row opposite.
 */
export function ContactSection({
  content,
  locale,
}: {
  content: HomeContent["contact"];
  locale: Locale;
}) {
  const copy = dictionary.home.contact;

  return (
    <Section
      id={routes.anchors.contact}
      labelledBy="contact-title"
      screen
      center
      className="band-contact bg-navy-lit"
    >
      <div className="grid items-stretch gap-[clamp(30px,3.4vw,60px)] gap-x-col lg:grid-cols-2">
        <div className="relative -my-[clamp(24px,2.6vw,40px)] flex flex-col gap-[clamp(22px,2.6vw,36px)] p-[clamp(24px,2.6vw,40px)]">
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="z-0 object-cover"
          />
          <div aria-hidden className="scrim-contact pointer-events-none absolute inset-0 z-[1]" />

          <Eyebrow className="relative z-[2]">{copy.eyebrow[locale]}</Eyebrow>
          <h2
            id="contact-title"
            className="relative z-[2] max-w-[20ch] font-heading text-h2 text-balance"
          >
            {content.title[locale]}
          </h2>
          <p className="relative z-[2] max-w-[46ch] text-lead text-contact">
            {content.lead[locale]}
          </p>

          <div className="relative z-[2] mt-auto grid grid-cols-3 gap-x-3.5">
            {copy.stats.map((stat) => (
              <div key={stat.title.en} className="py-5">
                <div className="text-[1rem] font-semibold">{stat.title[locale]}</div>
                <div className="mt-1.5 text-sm text-muted">{stat.body[locale]}</div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm
          locale={locale}
          submitLabel={content.cta[locale]}
          note={content.note[locale]}
        />
      </div>
    </Section>
  );
}
