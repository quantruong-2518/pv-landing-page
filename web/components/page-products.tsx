import type { SiteContent } from "@/content/types";
import { PageShell } from "@/components/page-shell";
import { CatalogIndex } from "@/components/products/catalog-index";
import { HardwareBlock } from "@/components/products/hardware-block";
import { ProductsHero } from "@/components/products/hero";
import { SoftwareBlock } from "@/components/products/software-block";
import { TrainingBlock } from "@/components/products/training-block";

/**
 * PRODUCTS — rebuilt from the Canva master "Product - Pebble Vina" (1536×1024,
 * 7 content artboards, read 2026-09-02), which replaces the dossier layout this
 * page shipped until now.
 *
 * Seven artboards, seven blocks, one anatomy repeated six times: dark band →
 * white specification island → application row → one button. Anchors are
 * unchanged, so every deep link in the header, the mobile menu and the
 * catalogue still lands where it did.
 *
 * The page ends on the training block. The embedded contact form that used to
 * close it is gone (GM, 2026-09-02): the master has no closing artboard, and
 * `/vi/contact` is the whole conversation rather than a second copy of it.
 */
export function ProductsPage({ c }: { c: SiteContent }) {
  const { intro, hardware, software, training } = c.products;

  return (
    <PageShell c={c} page="products">
      <ProductsHero c={intro} />
      <CatalogIndex c={c} />

      <div id="hardware">
        {hardware.items.map((product) => (
          <HardwareBlock key={product.id} c={c} intro={hardware} product={product} />
        ))}
      </div>

      <div id="software">
        {software.groups.map((group) => (
          <SoftwareBlock key={group.id} c={c} intro={software} group={group} />
        ))}
      </div>

      <div id="training">
        <TrainingBlock c={c} intro={training} offer={training.offer} />
      </div>
    </PageShell>
  );
}
