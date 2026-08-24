"use client";

import { useEffect, useRef } from "react";
import type { PageKey } from "@/content/types";
import { path } from "@/lib/routes";
import { cn } from "@/lib/cn";

/**
 * The disclosure stays a native `<details>` — no JS builds or paints it. This
 * island exists for the one thing `<details>` has no native answer to: closing
 * on Escape and on a tap outside itself.
 */
export function MobileMenu({
  label,
  links,
  groups,
  page,
  className,
}: {
  label: string;
  links: Array<{ key: PageKey; label: string }>;
  groups: Array<{ title: string; items: Array<{ id: string; name: string }> }>;
  page: PageKey;
  className?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const close = () => {
      if (el.open) el.open = false;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointerDown = (e: Event) => {
      if (!el.open) return;
      const t = e.target as Node | null;
      // The scrim is a child of <details> so the browser can show and hide it
      // with the panel, but a tap on it is still a tap outside the panel.
      if (t instanceof Element && t.hasAttribute("data-scrim")) return close();
      if (!el.contains(t)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details ref={ref} className={cn("group relative", className)}>
      <summary
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm border border-line-strong transition-colors hover:border-accent"
        aria-label={label}
      >
        <span className="relative block h-[9px] w-4" aria-hidden>
          <span className="absolute inset-x-0 top-0 h-px bg-fg transition-transform group-open:top-1 group-open:rotate-45" />
          <span className="absolute inset-x-0 top-1 h-px bg-fg transition-opacity group-open:opacity-0" />
          <span className="absolute inset-x-0 top-2 h-px bg-fg transition-transform group-open:top-1 group-open:-rotate-45" />
        </span>
      </summary>

      {/* Scrim. A child of <details>, so the browser shows and hides it with the
          panel — no JS paints it. It is sized off the header token instead of
          `inset-0` because the header's own `backdrop-filter` makes it the
          containing block for fixed children: stated this way the box is the
          same whether it resolves against the header or the viewport. Leaving
          the header row uncovered is deliberate — the hamburger stays the way
          back out even with JS off. */}
      <div
        data-scrim=""
        aria-hidden
        className="fixed inset-x-0 top-[var(--header-h)] h-[calc(100svh-var(--header-h))] bg-bg-deep/70"
      />

      {/* Height comes from the space actually left under the header, not a fixed
          share of the viewport: at 360x640 a 70svh box clipped the last item. */}
      <nav
        className="absolute right-0 top-12 z-10 max-h-[calc(100svh-var(--header-h)-1.5rem)] w-[17rem] overflow-y-auto border border-line-strong bg-bg p-4 shadow-xl"
        aria-label={label}
      >
        {links.map((l) => (
          <a
            key={l.key}
            href={path(l.key)}
            aria-current={l.key === page ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center border-b border-line text-sm transition-colors hover:text-accent",
              l.key === page ? "text-fg" : "text-muted",
            )}
          >
            {l.label}
          </a>
        ))}

        {groups.map((group) => (
          <div key={group.title} className="mt-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle">{group.title}</p>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={path("products", item.id)}
                className="flex min-h-11 items-center pl-3 text-sm text-muted transition-colors hover:text-accent"
              >
                {item.name}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </details>
  );
}
