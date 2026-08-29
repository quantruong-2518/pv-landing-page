import type { PageKey, SiteContent } from "@/content/types";
import Image from "next/image";
import { path } from "@/lib/routes";
import { MobileMenu } from "@/components/mobile-menu";
import { cn } from "@/lib/cn";

/**
 * One thin sticky row, styled from the Canva master's header band: near-black
 * bar, two-line wordmark, the two pages to read, and one blue action pill
 * (docs/03-structure.md §7). The button is present at every width — hiding the
 * conversion path inside the hamburger is the classic loss.
 *
 * Full-bleed with proportional padding, not the site `SHELL`: the HOME sections
 * below it are full-bleed artboards, and a 1152px-capped header floating over
 * them reads as a different page.
 *
 * CONTACT is deliberately absent from the nav list (GM, 2026-08-24): the button
 * beside it already goes there, and a link and a button pointing at the same
 * route read as two offers.
 *
 * The locale chip is a label, not a control. The master draws "VI ⌄", but the
 * English build was removed on 2026-08-23 and a chevron that opens nothing is
 * worse than no chevron — see CLAUDE.md §4.
 *
 * The row is `h-[var(--header-h)]` with a box-shadow rather than a border, so
 * the rendered height equals the token every `screen` block subtracts.
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

  // Keep the action local wherever a form is already present. PRODUCTS has no
  // form, so it hands off to the section that does.
  const ctaHref = page === "products" ? path("products", "book") : path("home", "contact");

  return (
    <header className="bg-art-black font-artboard sticky top-0 z-50 text-white shadow-[0_10px_28px_rgb(4_12_19_/_0.28)]">
      <a
        href="#main"
        className="focus:bg-art-blue sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        {c.nav.skipToContent}
      </a>

      <div className="mx-auto flex h-[var(--header-h)] w-full items-center justify-between gap-3 px-5 sm:px-8 lg:px-[3.8%]">
        <a href={path("home")} className="hover:text-art-blue-solution flex h-full items-center gap-2.5 transition-colors">
          <Image src="/brand/pebble-vina-mark.png" alt="" width={28} height={26} className="h-7 w-auto" priority />
          <span className="text-[0.94rem] font-bold uppercase leading-[1.05] tracking-[0.1em] sm:text-base">
            Pebble
            <br />
            Vina
          </span>
        </a>

        <div className="flex h-full items-center gap-3 md:gap-6 lg:gap-9">
          <nav className="hidden h-full items-center gap-6 md:flex lg:gap-10" aria-label={c.nav.menuLabel}>
            {links.map((l) => (
              <a
                key={l.key}
                href={path(l.key)}
                aria-current={l.key === page ? "page" : undefined}
                className={cn(
                  "after:bg-art-blue-solution relative flex h-full items-center text-[0.95rem] font-bold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:transition-transform",
                  l.key === page
                    ? "text-white after:scale-x-100"
                    : "hover:text-art-blue-solution text-white/85 after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Same action, two lengths: the full invitation does not fit beside a
              wordmark and a hamburger at 360px, and a wrapped button would break
              the header row. Both labels are existing content keys. */}
          <a
            href={ctaHref}
            className="bg-art-blue whitespace-nowrap rounded-md px-3 py-2 text-[0.8rem] font-bold text-white transition-opacity hover:opacity-90 sm:px-4 sm:text-[0.95rem]"
          >
            <span className="sm:hidden">{c.nav.contact}</span>
            <span className="hidden sm:inline">{c.nav.cta}</span>
          </a>

          <span className="hidden text-[0.8rem] font-bold uppercase tracking-[0.05em] text-white/90 md:inline">
            vi
          </span>

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
