import { Landing } from "@/components/landing";
import { JsonLd, faqSchema, organizationSchema } from "@/components/schema";
import { vi } from "@/content/vi";

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(vi)} />
      <JsonLd data={faqSchema(vi)} />
      <Landing c={vi} />
    </>
  );
}
