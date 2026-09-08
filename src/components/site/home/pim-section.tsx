"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/site/primitives";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes } from "@/lib/routes";

export function PimSection({ content, locale }: { content: HomeContent["pim"]; locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const copy = dictionary.home.pim;
  const columns = [
    { ...copy.analog, image: content.imageA, href: productAnchor(locale, routes.anchors.mint) },
    { ...copy.digital, image: content.imageB, href: productAnchor(locale, routes.anchors.espresso) },
  ];
  return (
    <section id={routes.anchors.pim} aria-labelledby="pim-title" className="home-panel home-pim">
      <SectionHead eyebrow={content.eyebrow[locale]} title={content.title[locale]} lead={content.lead[locale]} headingId="pim-title" />
      <div className="home-signal-switch" aria-label={locale === "vi" ? "Chọn công nghệ" : "Choose technology"}>
        {columns.map((column, index) => <button key={column.name} type="button" aria-pressed={selected === index} aria-controls={`home-signal-${index}`} onClick={() => setSelected(index)}>{column.name}</button>)}
      </div>
      <div className="home-signal-grid">
        {columns.map((column, index) => (
          <article id={`home-signal-${index}`} key={column.name} className="home-signal-card" data-selected={selected === index}>
            <div className="home-signal-image">
              <Image src={column.image} alt={column.alt[locale]} fill sizes="(max-width: 767px) 90vw, 44vw" className="object-cover" />
              <span>{column.name}</span>
            </div>
            <div className="home-signal-copy">
              <h3>{column.heading[locale]}</h3>
              <p>{column.body[locale]}</p>
              <Button asChild variant="ghost" size="md" mono={false}><Link href={column.href}>{column.cta[locale]}</Link></Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
