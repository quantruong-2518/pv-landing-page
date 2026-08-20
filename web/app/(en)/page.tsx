import { Landing } from "@/components/landing";
import { JsonLd, faqSchema, organizationSchema } from "@/components/schema";
import { en } from "@/content/en";

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema(en)} />
      <JsonLd data={faqSchema(en)} />
      <Landing c={en} />
    </>
  );
}
