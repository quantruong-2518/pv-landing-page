"use client";

import { Children, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";

/** All items remain visible on desktop; mobile reads one complete item at a time. */
export function MobileDeck({ children, locale, className }: { children: ReactNode; locale: Locale; className: string }) {
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);
  if (!items.length) return null;
  return (
    <div className="home-deck">
      <div className={className}>
        {items.map((item, index) => <div key={index} className="home-deck-item" data-active={index === active}>{item}</div>)}
      </div>
      <div className="home-deck-controls">
        <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)}>{locale === "vi" ? "Trước" : "Previous"}</button>
        <span aria-live="polite">{active + 1} / {items.length}</span>
        <button type="button" disabled={active === items.length - 1} onClick={() => setActive(active + 1)}>{locale === "vi" ? "Tiếp theo" : "Next"}</button>
      </div>
    </div>
  );
}
