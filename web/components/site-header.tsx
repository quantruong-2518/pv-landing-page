import type { PageKey, SiteContent } from "@/content/types";
import Image from "next/image";
import { path } from "@/lib/routes";
import { SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * One thin sticky row: mark + wordmark · three pages. The Contact page link is
 * the conversion path, so there is no separate CTA button here. The mobile menu
 * is a native <details> disclosure: no JS, no hydration mismatch.
 */
export function SiteHeader({ c, page }: { c: SiteContent; page: PageKey }) {
  const links: Array<{ key: PageKey; label: string }> = [
    { key: "home", label: c.nav.home },
    { key: "products", label: c.nav.products },
    { key: "contact", label: c.nav.contact },
  ];

  const productAnchors = [
    { title: c.nav.hardware, items: c.products.hardware.items },
    { title: c.nav.software, items: c.products.software.groups },
  ];

  return (
    <header className="tone-dark sticky top-0 z-50 border-b border-line bg-bg/92 text-fg backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-fg"
      >
        {c.nav.skipToContent}
      </a>

      <div className={cn(SHELL, "flex h-[var(--header-h)] items-center justify-between gap-3")}>
        <a href={path("home")} className="flex items-center gap-2 py-3">
          <Image src="/brand/pebble-vina-mark.png" alt="" width={28} height={26} className="h-6 w-auto sm:h-[1.625rem]" priority />
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">Pebble Vina</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={c.nav.menuLabel}>
          {links.map((l) => (
            <a
              key={l.key}
              href={path(l.key)}
              aria-current={l.key === page ? "page" : undefined}
              className={cn(
                "text-sm transition-colors hover:text-fg",
                l.key === page ? "text-fg" : "text-muted",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <details className="group relative lg:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm border border-line-strong"
            aria-label={c.nav.menuLabel}
          >
            <span className="relative block h-[9px] w-4" aria-hidden>
              <span className="absolute inset-x-0 top-0 h-px bg-fg transition-transform group-open:top-1 group-open:rotate-45" />
              <span className="absolute inset-x-0 top-1 h-px bg-fg transition-opacity group-open:opacity-0" />
              <span className="absolute inset-x-0 top-2 h-px bg-fg transition-transform group-open:top-1 group-open:-rotate-45" />
            </span>
          </summary>

          <nav
            className="absolute right-0 top-12 max-h-[70svh] w-[17rem] overflow-y-auto border border-line bg-bg p-4 shadow-xl"
            aria-label={c.nav.menuLabel}
          >
            {links.map((l) => (
              <a
                key={l.key}
                href={path(l.key)}
                aria-current={l.key === page ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center border-b border-line text-sm",
                  l.key === page ? "text-fg" : "text-muted",
                )}
              >
                {l.label}
              </a>
            ))}

            {productAnchors.map((group) => (
              <div key={group.title} className="mt-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={path("products", item.id)}
                    className="flex min-h-11 items-center pl-3 text-sm text-muted"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
