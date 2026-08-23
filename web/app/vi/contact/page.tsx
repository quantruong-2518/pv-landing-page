import type { Metadata } from "next";
import { ContactPage } from "@/components/page-contact";
import { JsonLd, organizationSchema } from "@/components/schema";
import { vi } from "@/content/vi";

export const metadata: Metadata = {
  ...vi.meta.contact,
  alternates: { canonical: "/vi/contact" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(vi)} />
      <ContactPage c={vi} />
    </>
  );
}
