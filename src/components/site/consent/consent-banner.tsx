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
      className="fixed inset-x-0 bottom-0 z-[60] max-h-[85svh] overflow-y-auto border-t border-ink/20 bg-navy px-gutter py-[clamp(13px,1.3vw,18px)]"
    >
      {/*
       * One row at rest, three stacked when the preferences panel is open.
       *
       * At rest this was a title/body row over a retention/buttons row, 230px
       * tall on a 1440 viewport — the whole lead and CTA row of the landing
       * page was behind a cookie wall on first load. The disclosure and the
       * three answers share a line now and it is ~140px. Nothing about the
       * choice architecture moved: still three buttons of one size, still one
       * click to refuse, still the retention sentence in front of the reader
       * before they answer.
       *
       * `flex-wrap` plus a full-width `<ul>` is what gives one container two
       * layouts. The answers must come after the checkboxes they save, so when
       * the panel opens the list takes a line of its own and pushes them down;
       * it does not need a second layout to do it.
       */}
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-col gap-y-3">
        {/* `basis` is small enough that the disclosure and the three answers
            still share one line at 1024; `max-w` only binds past ~1500px, where
            the row is wide enough to stretch this into 180-character lines. */}
        <div className="flex min-w-0 max-w-[120ch] flex-1 basis-[22rem] flex-col gap-1.5">
          <h2 id={`${uid}-title`} className="font-heading text-h3 text-ink">
            {copy.title[locale]}
          </h2>
          <p className="text-note text-body">{copy.body[locale]}</p>
          {/* The retention sentence sits with the rest of the disclosure rather
              than on a row of its own — it is part of the same statement, and
              its own row was a third of the banner's height. */}
          <p className="text-note text-faint">{copy.retention[locale]}</p>
        </div>

        {panelOpen ? (
          <ul className="flex w-full flex-col border-t border-ink/14">
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

        {/* Refuse first, accept last, all three `size="md"`: equal weight is
            the requirement, not a stylistic preference. Every Button variant
            carries a border (`primary`'s is transparent) precisely so three
            different variants come out the same size — see button.tsx.

            `max-sm:justify-start` matters for the same reason. On a phone the
            three answers wrap to two lines, and with the row pushed right the
            third one — "accept all" — landed alone against the right edge while
            the other two sat left. Same sizes, but the odd one out reads as the
            emphasised answer, which is the exact impression a consent banner
            may not give. Left-aligned, the wrap is just a wrap. */}
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2.5 max-sm:ml-0 max-sm:justify-start">
          <Button variant="ghost" size="md" onClick={rejectAll}>
            {copy.rejectAll[locale]}
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={panelOpen ? saveChoices : openPanel}
            aria-expanded={panelOpen}
          >
            {panelOpen ? copy.save[locale] : copy.customise[locale]}
          </Button>
          <Button variant="primary" size="md" onClick={acceptAll}>
            {copy.acceptAll[locale]}
          </Button>

          {/* Only once an answer exists: before that there is nothing to close
              back to, and an X would read as a fourth, unlabelled answer. */}
          {phase === "settled" ? (
            <button
              type="button"
              onClick={closePanel}
              aria-label={copy.close[locale]}
              className="flex size-11 shrink-0 items-center justify-center text-faint transition-colors hover:text-ink"
            >
              <span aria-hidden className="text-lg leading-none">
                ✕
              </span>
            </button>
          ) : null}
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
    <li className="flex flex-wrap items-start justify-between gap-x-col gap-y-2 border-b border-ink/14 py-[clamp(12px,1.2vw,16px)]">
      <div className="flex max-w-[78ch] flex-col gap-1.5">
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
        <p id={`${id}-body`} className="text-note text-body">
          {body}
        </p>
        {/* The cookie names: `text-label` is the 11px mono step this was typed
            by hand as, and `text-faint` clears 4.5:1 on `navy` where the old
            `text-dim` did not. */}
        <span className="font-mono text-label text-faint">{detail}</span>
      </div>

      {locked ? (
        <span className="font-mono text-label tracking-[0.11em] text-faint">{locked}</span>
      ) : null}
    </li>
  );
}
