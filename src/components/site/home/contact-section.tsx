"use client";

import { useState } from "react";
import { ContactForm } from "@/components/site/contact-form";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/routes";

export function ContactSection({ content, locale }: { content: HomeContent["contact"]; locale: Locale }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id={routes.anchors.contact} aria-labelledby="contact-title" className="home-panel home-contact" data-expanded={expanded}>
      <div className="home-contact-intro">
        <span className="home-kicker">{locale === "vi" ? "Cùng tìm lời giải" : "Find a way forward"}</span>
        <h2 id="contact-title">{content.title[locale]}</h2>
        <p>{content.lead[locale]}</p>
        <div className="home-contact-note">{locale === "vi" ? "Bắt đầu từ nhu cầu thực tế. Chọn công nghệ phù hợp." : "Start with real needs. Choose the right technology."}</div>
        <button type="button" className="home-contact-open" aria-expanded={expanded} aria-controls="home-contact-fields" onClick={() => setExpanded(true)}>{content.cta[locale]}</button>
      </div>
      <div id="home-contact-fields" className="home-contact-fields">
        <button type="button" className="home-contact-back" onClick={() => setExpanded(false)}>{locale === "vi" ? "← Quay lại" : "← Back"}</button>
        <ContactForm locale={locale} submitLabel={content.cta[locale]} note={content.note[locale]} />
      </div>
    </section>
  );
}
