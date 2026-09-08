import { SectionHead } from "@/components/site/primitives";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

export function WhySection({ content, locale }: { content: HomeContent["why"]; locale: Locale }) {
  return (
    <section aria-labelledby="why-title" className="home-panel home-why">
      <SectionHead title={content.title[locale]} lead={content.lead[locale]} headingId="why-title" />
      <div className="home-benefits-layout">
        <div className="home-memory-visual" role="img" aria-label={locale === "vi" ? "Minh họa PIM: xử lý AI gần dữ liệu, ngay trên thiết bị." : "PIM concept: AI processing close to data, on the device."}>
          <div className="home-memory-orbit" aria-hidden="true" />
          <div className="home-memory-core">
            <span>{locale === "vi" ? "Ngay trên thiết bị" : "On the device"}</span>
            <strong>PIM</strong>
            <div><span>{locale === "vi" ? "Dữ liệu" : "Data"}</span><span aria-hidden="true">↔</span><span>{locale === "vi" ? "Xử lý AI" : "AI compute"}</span></div>
          </div>
          <p>{locale === "vi" ? "Đưa xử lý đến gần dữ liệu." : "Bring processing closer to data."}</p>
        </div>
        <div className="home-benefits-list">
          {dictionary.home.why.cards.map((card) => (
            <article key={card.index}><h3>{card.title[locale]}</h3><p>{card.body[locale]}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}
