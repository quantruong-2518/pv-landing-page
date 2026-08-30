import type { SiteContent } from "@/content/types";
import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/home/hero";
import { Pim } from "@/components/home/pim";
import { WhyPim } from "@/components/home/why-pim";
import { Core } from "@/components/home/core";
import { Solutions } from "@/components/home/solutions";
import { News } from "@/components/home/news";
import { Contact } from "@/components/home/contact";
import { HomeMotion } from "@/components/home/motion";

/**
 * HOME is the eight pages of the Canva master "Home - Pebble Vina" in order —
 * pages 1 and 2 are two frames of one hero, so seven sections ship. Each is a
 * 1408×768 artboard that scales as a piece; see `components/artboard.tsx`.
 */
export function HomePage({ c }: { c: SiteContent }) {
  return (
    <PageShell c={c} page="home">
      <HomeMotion />
      <Hero c={c.home.hero} />
      <Pim c={c.home.pim} />
      <WhyPim c={c.home.whyPim} />
      <Core c={c.home.core} />
      <Solutions c={c.home.solutions} />
      <News c={c.home.news} />
      <Contact c={c} />
    </PageShell>
  );
}
