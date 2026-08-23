import type { Metadata } from "next";
import { HomePage } from "@/components/page-home";
import { JsonLd, organizationSchema } from "@/components/schema";
import { vi } from "@/content/vi";

export const metadata: Metadata = {
  ...vi.meta.home,
  alternates: { canonical: "/vi" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(vi)} />
      <HomePage c={vi} />
    </>
  );
}
