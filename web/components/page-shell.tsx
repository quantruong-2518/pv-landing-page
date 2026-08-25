import type { ReactNode } from "react";
import type { PageKey, SiteContent } from "@/content/types";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionDivider } from "@/components/ui";

/** Header, main landmark, footer — identical on all three pages. */
export function PageShell({
  c,
  page,
  children,
}: {
  c: SiteContent;
  page: PageKey;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader c={c} page={page} />
      <main id="main">{children}</main>
      <div className="tone-dark bg-bg">
        <SectionDivider />
      </div>
      <SiteFooter c={c} />
    </>
  );
}
