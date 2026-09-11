import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * Compact comparison for the two accelerator cards. Their hardware render is
 * already the anchor of the application bento, so repeating two more large
 * product images here would push the actual specifications below the viewport.
 */
export function ESeriesCards({ locale }: { locale: Locale }) {
  const copy = dictionary.product.eseries;

  return (
    <div className="mt-3">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-label text-accent">{copy.lineupLabel[locale]}</span>
        <span className="font-mono text-label text-faint">E10 / E20</span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {copy.cards.map((card) => (
          <article key={card.name} className="bg-ink/[0.035] p-3.5 sm:p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-heading text-h3">{card.name}</h3>
              <span className="font-mono text-label text-accent">{card.index}</span>
            </div>
            <p className="mt-1.5 text-note font-semibold text-contact">{card.heading[locale]}</p>
            <p className="mt-1.5 text-note text-body">{card.body[locale]}</p>

            <dl className="mt-3 grid gap-2">
              {card.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-2">
                  <dt className="font-mono text-[9px] leading-tight tracking-[0.1em] text-faint">
                    {spec.label.replace(/^\d+\s*/, "")}
                  </dt>
                  <dd>
                    <span
                      className={cn(
                        "font-heading text-[1.05rem] leading-none font-bold",
                        "accent" in spec && spec.accent ? "text-accent" : "text-ink",
                      )}
                    >
                      {spec.value}
                    </span>
                    {spec.unit ? (
                      <span className="ml-1.5 font-mono text-[8px] leading-tight text-muted">
                        {spec.unit}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <span className="font-mono text-label text-accent">{copy.stackLabel}</span>
        {copy.stack.map((item, index) => (
          <span key={item} className="flex items-center gap-x-3 text-note text-contact">
            {item}
            {index < copy.stack.length - 1 ? (
              <span aria-hidden className="text-faint">·</span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
