import type { Metadata } from "next";
import { ProductsPage } from "@/components/page-products";
import { en } from "@/content/en";

export const metadata: Metadata = {
  ...en.meta.products,
  alternates: { canonical: "/products", languages: { en: "/products", vi: "/vi/products" } },
};

export default function Page() {
  return <ProductsPage c={en} />;
}
