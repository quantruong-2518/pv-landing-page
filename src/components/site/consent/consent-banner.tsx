"use client";

import { useEffect, useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field-label";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { useConsentStore } from "@/lib/store/consent-store";

/**
 * The cookie consent banner, and the preferences detail it expands into.
 *
 * Two rules from consent law drive the whole layout, so neither is safe to
 * "tidy up" later:
 *
 *  1. Refusing costs exactly one click, the same as accepting, and the two
 *     buttons are the same size — a refusal buried one level down inside
 *     "Customise" is the classic finding against a banner.
 *  2. Nothing optional runs before an answer exists. The banner does not gate
 *     the page (it is not a modal and traps no focus), but `<Analytics>` reads
 *     the same store and stays unmounted until the visitor grants the category.
 *
 * It renders nothing on the server. The public pages are statically prerendered
 * (CLAUDE.md §3) so the layout cannot read `cookies()` without turning all four
 * of them dynamic; the store starts at `unknown`, matches the prerendered HTML
 * during hydration, and only then does `hydrate()` decide whether to ask.
 */
export function ConsentBanner({ locale }: { locale: Locale }) {
  const copy = dictionary.consent;
  const uid = useId();
  const bannerRef = useRef<HTMLElement>(null);

  const phase = useConsentStore((state) => state.phase);
  const panelOpen = useConsentStore((state) => state.panelOpen);
  const choices = useConsentStore((state) => state.choices);
  const hydrate = useConsentStore((state) => state.hydrate);
  const openPanel = useConsentStore((state) => state.openPanel);
  const closePanel = useConsentStore((state) => state.closePanel);
  const toggle = useConsentStore((state) => state.toggle);
  const acceptAll = useConsentStore((state) => state.acceptAll);
  const rejectAll = useConsentStore((state) => state.rejectAll);
  const saveChoices = useConsentStore((state) => state.saveChoices);

  useEffect(() => hydrate(), [hydrate]);

  // The banner is position-fixed, so it sits on top of whatever is at the
  // bottom of the page — on a phone that is often the contact form's submit
  // button, which a visitor who has not answered yet could then never reach.
  // Reserving its height at the foot of the document keeps everything
  // scrollable past it; the observer is there because the height changes when
  // the preferences panel expands and when the buttons wrap.
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const observer = new ResizeObserver(([entry]) => {
      document.body.style.paddingBottom = `${entry.target.getBoundingClientRect().height}px`;
    });
    observer.observe(banner);

    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
    // Keyed on what mounts and unmounts the banner, so the observer is
    // reattached when the footer reopens it. Height changes within one mount
    // — the buttons wrapping on resize — are the observer's own job.
  }, [phase, panelOpen]);

  // Escape closes the panel only once an answer is on record. While the banner
  // is still asking, a keystroke must not dismiss it: no answer is not consent,
  // and a banner that vanishes on Escape would leave the question unanswered
  // with no way back until the visitor finds the footer.
  useEffect(() => {
    if (!panelOpen || phase !== "settled") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panelOpen, phase, closePanel]);

  // `asking` shows the banner; `settled` shows it again only when the visitor
  // reopened preferences from the footer.
  if (phase !== "asking" && !panelOpen) return null;

  return (
    <section
      ref={bannerRef}
      aria-labelledby={`${uid}-title`}
      // Above the sticky header (z-50) — the header would otherwise sit over
      // the banner on a short viewport where the two meet.
      //
      // `max-h` + `overflow-y-auto` in `svh`, not `vh`: with both categories
      // expanded this is taller than a 360x640 phone, and a fixed element that
      // overflows the viewport puts its own buttons out of reach — the visitor
      // would be left with a question they cannot answer. `vh` would misjudge
      // the height by the mobile browser chrome (CLAUDE.md §3).
      className="fixed inset-x-0 bottom-0 z-[60] max-h-[85svh] overflow-y-auto border-t border-ink/20 bg-navy px-gutter py-[clamp(18px,2.2vw,30px)]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(14px,1.6vw,22px)]">
        <div className="flex items-start justify-between gap-x-col gap-y-3">
          <div className="flex max-w-[74ch] flex-col gap-2.5">
            <h2 id={`${uid}-title`} className="font-heading text-h3 text-ink">
              {copy.title[locale]}
            </h2>
            <p className="text-card text-body">{copy.body[locale]}</p>
          </div>

          {/* Only once an answer exists: before that there is nothing to close
              back to, and an X would read as a fourth, unlabelled answer. */}
          {phase === "settled" ? (
            <button
              type="button"
              onClick={closePanel}
              aria-label={copy.close[locale]}
              className="-mt-1 flex size-11 shrink-0 items-center justify-center text-faint transition-colors hover:text-ink"
            >
              <span aria-hidden className="text-lg leading-none">
                ✕
              </span>
            </button>
          ) : null}
        </div>

        {panelOpen ? (
          <ul className="flex flex-col border-t border-ink/14">
            <Category
              id={`${uid}-necessary`}
              name={copy.categories.necessary.name[locale]}
              body={copy.categories.necessary.body[locale]}
              detail={copy.categories.necessary.detail[locale]}
              // Checked and disabled, with the reason spelled out beside it —
              // a switch the visitor can flick but that does nothing would be
              // worse than no switch at all.
              locked={copy.alwaysOn[locale]}
            />
            <Category
              id={`${uid}-analytics`}
              name={copy.categories.analytics.name[locale]}
              body={copy.categories.analytics.body[locale]}
              detail={copy.categories.analytics.detail[locale]}
              checked={choices.analytics}
              onCheckedChange={(value) => toggle("analytics", value)}
            />
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-x-col gap-y-4">
          <p className="max-w-[64ch] text-[0.8125rem] leading-[1.65] text-faint">
            {copy.retention[locale]}
          </p>

          {/* Refuse first, accept last, both `size="lg"`: equal weight is the
              requirement, not a stylistic preference. */}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="ghost" size="lg" onClick={rejectAll}>
              {copy.rejectAll[locale]}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={panelOpen ? saveChoices : openPanel}
              aria-expanded={panelOpen}
            >
              {panelOpen ? copy.save[locale] : copy.customise[locale]}
            </Button>
            <Button variant="primary" size="lg" onClick={acceptAll}>
              {copy.acceptAll[locale]}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One consent category: what it is, what it does, and which cookies it writes.
 *
 * The cookie names and lifetimes are shown rather than hidden behind a link —
 * "specific and informed" is the standard the disclosure has to meet, and this
 * site has few enough cookies that the whole list fits in the row.
 */
function Category({
  id,
  name,
  body,
  detail,
  locked,
  checked,
  onCheckedChange,
}: {
  id: string;
  name: string;
  body: string;
  detail: string;
  locked?: string;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}) {
  return (
    <li className="flex flex-wrap items-start justify-between gap-x-col gap-y-3 border-b border-ink/14 py-[clamp(14px,1.6vw,20px)]">
      <div className="flex max-w-[78ch] flex-col gap-2">
        <div className="flex items-center gap-3">
          <Checkbox
            id={id}
            checked={locked ? true : checked}
            disabled={Boolean(locked)}
            onCheckedChange={(value) => onCheckedChange?.(value === true)}
            aria-describedby={`${id}-body`}
          />
          <FieldLabel htmlFor={id} className="cursor-pointer text-ink">
            {name}
          </FieldLabel>
        </div>
        <p id={`${id}-body`} className="text-[0.8125rem] leading-[1.7] text-body">
          {body}
        </p>
        <span className="font-mono text-[0.6875rem] leading-[1.5] tracking-[0.06em] text-dim">
          {detail}
        </span>
      </div>

      {locked ? (
        <span className="font-mono text-label tracking-[0.11em] text-faint">{locked}</span>
      ) : null}
    </li>
  );
}
