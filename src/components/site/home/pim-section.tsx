import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/section";
import { SectionHead, VignetteImage } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes } from "@/lib/routes";

/**
 * 01 — Processing in Memory. Two columns, Analog then Digital.
 *
 * The mock's CTAs pointed at `#analog` and `#digital`, which do not exist on
 * the product page. They now land on the chips that actually implement each
 * approach: MINT for Analog PIM, ESPRESSO for Digital-PIM.
 */
export function PimSection({ content, locale }: { content: HomeContent["pim"]; locale: Locale }) {
  const copy = dictionary.home.pim;

  const columns = [
    { ...copy.analog, image: content.imageA, href: productAnchor(locale, routes.anchors.mint) },
    {
      ...copy.digital,
      image: content.imageB,
      href: productAnchor(locale, routes.anchors.espresso),
    },
  ];

  return (
    <Section
      id={routes.anchors.pim}
      labelledBy="pim-title"
      screen
      center
      className="glow-pim bg-night-deep"
    >
      <SectionHead
        eyebrow={content.eyebrow[locale]}
        title={content.title[locale]}
        lead={content.lead[locale]}
        headingId="pim-title"
        className="pb-[clamp(28px,3.2vw,48px)]"
      />

      <div className="grid gap-x-col lg:grid-cols-2">
        {columns.map((column, index) => (
          <Reveal
            key={column.name}
            delay={index * 0.08}
            className="flex flex-col gap-6 py-[clamp(24px,2.6vw,40px)]"
          >
            <div className="flex items-baseline gap-3.5">
              <span className="font-mono text-[0.75rem] text-accent">{column.index}</span>
              <span className="font-heading text-wordmark tracking-[0.06em]">{column.name}</span>
            </div>

            <VignetteImage
              src={column.image}
              alt={column.name}
              fit="cover"
              sizes="(max-width: 1023px) 100vw, 520px"
              className="max-w-[520px]"
            />

            <div className="text-[clamp(1.0625rem,1.35vw,1.3125rem)] font-semibold">
              {column.heading[locale]}
            </div>
            <p className="max-w-[48ch] text-[1rem] leading-[1.8] text-body">
              {column.body[locale]}
            </p>

            <Button asChild variant="ghost" size="md" className="self-start">
              <Link href={column.href}>{column.cta[locale]}</Link>
            </Button>
          </Reveal>
        ))}
      </div>

      {/* Closing statement, with the transparent chip PNG anchored right. */}
      <div className="grid items-end gap-[clamp(24px,3vw,56px)] gap-x-col py-[clamp(18px,2vw,28px)] pb-[clamp(24px,2.6vw,38px)] sm:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          <span className="text-[1.0625rem] leading-[1.6] text-body">
            {copy.statementLead[locale]}
          </span>
          <p className="max-w-[26ch] font-heading text-h2-detail text-accent">
            {content.statement[locale]}
          </p>
        </div>
        <Image
          src={content.imageC}
          alt=""
          width={168}
          height={168}
          sizes="168px"
          className="w-full max-w-[168px] justify-self-end"
        />
      </div>
    </Section>
  );
}
