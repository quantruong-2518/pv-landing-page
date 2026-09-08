import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { anchor, routes } from "@/lib/routes";

export function Hero({ content, locale }: { content: HomeContent["hero"]; locale: Locale }) {
  return (
    <section id={routes.anchors.top} aria-labelledby="hero-title" className="home-hero">
      <div className="home-hero-copy">
        <span className="home-kicker">{content.eyebrow[locale]}</span>
        <h1 id="hero-title">{content.title[locale]}</h1>
        <p>{content.lead[locale]}</p>
        <Button asChild size="lg" mono={false}><Link href={anchor(routes.anchors.solutions)}>{content.cta[locale]}</Link></Button>
      </div>
      <div className="home-hero-art">
        <Image src={content.image} alt="ESPRESSO — Pebble Square" fill priority sizes="(max-width: 767px) 100vw, 58vw" className="object-contain" />
      </div>
      <div className="home-hero-bottom">
        <p>{content.sub[locale]}</p>
        <span>{locale === "vi" ? "Phần cứng · Mô hình AI · Phần mềm" : "Hardware · AI models · Software"}</span>
      </div>
    </section>
  );
}
