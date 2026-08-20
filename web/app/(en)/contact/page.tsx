import type { Metadata } from "next";
import { ContactPage } from "@/components/page-contact";
import { JsonLd, organizationSchema } from "@/components/schema";
import { en } from "@/content/en";

export const metadata: Metadata = {
  ...en.meta.contact,
  alternates: { canonical: "/contact", languages: { en: "/contact", vi: "/vi/contact" } },
};

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(en)} />
      <ContactPage c={en} />
    </>
  );
}
