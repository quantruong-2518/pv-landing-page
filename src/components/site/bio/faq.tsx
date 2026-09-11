import { Reveal } from "@/components/motion/reveal";
import { SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { Section } from "@/components/site/section";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * § 06 — frequently asked questions.
 *
 * Not CMS-managed, like the rest of `/bio`: the seven items live in
 * `dictionary.bio.faq` (see that block's own header comment for exactly which
 * published figure or date backs each answer), pending GM review before this
 * copy goes live.
 *
 * Rendered as a plain `<dl>`, every answer in the served HTML, on purpose —
 * no accordion, no client-side disclosure. Google only credits `FAQPage`
 * markup (added alongside this block in `bio/page.tsx`) when the question and
 * answer text it describes is visible on the rendered page; hiding an answer
 * behind a click would make the markup lie about what a reader actually sees,
 * and there is no other reason to hide 2–4 sentences of text.
 *
 * `<dt>`/`<dd>` pairs are grouped in a `<div>` per item — valid inside a
 * `<dl>` — so each pair can carry its own reveal stagger, the same idiom
 * `identity.tsx` uses for its label/value cells.
 */
export function BioFaq({ locale }: { locale: Locale }) {
  const copy = dictionary.bio;
  const faq = copy.faq;

  return (
    <Section id={routes.anchors.bioFaq} labelledBy="bio-faq-title" className="bg-navy">
      <SectionMark
        mark={copy.sections.faq.mark}
        total={SHEET_TOTAL}
        title={faq.title[locale]}
        lead={faq.lead[locale]}
        headingId="bio-faq-title"
      />

      <dl className="mt-[clamp(26px,3vw,44px)] flex flex-col">
        {faq.items.map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 0.05}
            className="border-t border-ink/14 py-[clamp(18px,2vw,28px)] last:border-b"
          >
            <dt id={item.id} className="text-h3 font-semibold text-ink">
              {item.question[locale]}
            </dt>
            <dd className="mt-2.5 max-w-[64ch] text-card text-body">{item.answer[locale]}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
