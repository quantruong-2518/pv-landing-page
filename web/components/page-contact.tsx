import type { SiteContent } from "@/content/types";
import { PageShell } from "@/components/page-shell";
import { ContactSection } from "@/components/contact-section";

/**
 * 3. CONTACT — one light block: the invitation and the form on the same white
 * surface, and nothing else. The dark hero was folded into the form block on
 * 2026-08-24 (GM, docs/03-structure.md §3) — a page with a single job reads
 * better as one surface than as a title screen the visitor scrolls past to
 * reach the only thing on it. Phone, email, office and legal facts stay in the
 * footer alone (same decision).
 */
export function ContactPage({ c }: { c: SiteContent }) {
  return (
    <PageShell c={c} page="contact">
      <ContactSection c={c} />
    </PageShell>
  );
}
