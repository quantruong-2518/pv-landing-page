import type { PageKey, SiteContent } from "@/content/types";
import Image from "next/image";
import { path } from "@/lib/routes";
import { Button, SHELL } from "@/components/ui";
import { MobileMenu } from "@/components/mobile-menu";
import { cn } from "@/lib/cn";

/**
 * One thin sticky row: mark + wordmark · the two pages to read · exactly one
 * action button (docs/03-structure.md §7). The button is present at every width —
 * hiding the conversion path inside the hamburger is the classic loss.
 *
 * CONTACT is deliberately absent from the nav list (GM, 2026-08-24): the button
 * beside it already goes there, and a link and a button pointing at the same
 * route read as two offers. Navigation lists what to read; the button is what
 * to do.
 *
 * The nav collapses at 768px, not 1024px: 768px is also where scroll-snap and
 * the two-column layouts turn on, so the band in between is desktop in every
 * respect instead of half-mobile.
 *
 * The row is `h-[var(--header-h)]` with a box-shadow rather than a border, so
 * the rendered height equals the token that every `screen` block subtracts.
 */
export function SiteHeader({ c, page }: { c: SiteContent; page: PageKey }) {
  const links: Array<{ key: PageKey; label: string }> = [
    { key: "home", label: c.nav.home },
    { key: "products", label: c.nav.products },
  ];

  const productAnchors = [
    { title: c.nav.hardware, items: c.products.hardware.items },
    { title: c.nav.software, items: c.products.software.groups },
    { title: c.nav.training, items: [c.products.training.offer] },
  ];

  // Keep the action local wherever a form is already present. Home has no form,
  // so it hands off to the dedicated contact route.
  const ctaHref = page === "contact"
    ? path("contact", "name")
    : page === "products"
      ? path("products", "book")
      : path("contact");

  return (
    <header className="tone-dark header-atmosphere sticky top-0 z-50 text-fg shadow-[0_1px_0_var(--color-line),0_10px_28px_rgb(8_15_29_/_0.16)] backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-fg"
      >
        {c.nav.skipToContent}
      </a>

      <div className={cn(SHELL, "flex h-[var(--header-h)] items-center justify-between gap-3")}>
        <a
          href={path("home")}
          className="flex h-full items-center gap-2.5 transition-colors hover:text-accent"
        >
          <Image src="/brand/pebble-vina-mark.png" alt="" width={28} height={26} className="h-6 w-auto sm:h-[1.625rem]" priority />
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">Pebble Vina</span>
        </a>

        <div className="flex h-full items-center gap-3 md:gap-5 lg:gap-6">
          <nav className="hidden h-full items-center gap-5 md:flex lg:gap-7" aria-label={c.nav.menuLabel}>
            {links.map((l) => (
              <a
                key={l.key}
                href={path(l.key)}
                aria-current={l.key === page ? "page" : undefined}
                className={cn(
                  "relative flex h-full items-center text-sm transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform",
                  l.key === page
                    ? "text-fg after:scale-x-100"
                    : "text-muted after:scale-x-0 hover:text-accent hover:after:scale-x-100",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Same action, two lengths: the full invitation does not fit beside a
              wordmark and a hamburger at 360px, and a wrapped button would break
              the header row. Both labels are existing content keys — a dedicated
              short header label is a work order for the writer. */}
          <Button
            href={ctaHref}
            className="whitespace-nowrap px-3 py-2 text-[0.8rem] sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">{c.nav.contact}</span>
            <span className="hidden sm:inline">{c.nav.cta}</span>
          </Button>

          <MobileMenu
            className="md:hidden"
            label={c.nav.menuLabel}
            links={links}
            groups={productAnchors}
            page={page}
          />
        </div>
      </div>
    </header>
  );
}
