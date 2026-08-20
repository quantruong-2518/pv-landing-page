import type { ReactNode } from "react";
import type { PageKey, SiteContent } from "@/content/types";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
      <SiteFooter c={c} />
    </>
  );
}
