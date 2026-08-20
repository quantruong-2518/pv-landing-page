import type { Metadata } from "next";
import { HomePage } from "@/components/page-home";
import { JsonLd, organizationSchema } from "@/components/schema";
import { en } from "@/content/en";

export const metadata: Metadata = {
  ...en.meta.home,
  alternates: { canonical: "/", languages: { en: "/", vi: "/vi" } },
};

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(en)} />
      <HomePage c={en} />
    </>
  );
}
