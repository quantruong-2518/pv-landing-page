import type { Metadata } from "next";
import { ProductsPage } from "@/components/page-products";
import { vi } from "@/content/vi";

export const metadata: Metadata = {
  ...vi.meta.products,
  alternates: { canonical: "/vi/products" },
};

export default function Page() {
  return <ProductsPage c={vi} />;
}
