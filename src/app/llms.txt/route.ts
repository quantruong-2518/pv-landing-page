import { plainText } from "@/lib/content/markup";
import { getContent, getPublishedAt } from "@/lib/content/store";
import { dictionary } from "@/lib/i18n/dictionary";
import { absolute, external, routes } from "@/lib/routes";

/**
 * /llms.txt — the page for readers that are not people.
 *
 * An assistant summarising Pebble Vina from the rendered HTML has to infer
 * which figures are shipped silicon and which are a 2026 roadmap. That
 * inference is exactly where a marketing site gets misquoted, so this file
 * states it outright: every part is listed with its status, its figures, and
 * the section it comes from.
 *
 * It is generated from the same content the pages render, so it cannot drift
 * into saying something the site does not — which is also why E-Series has
 * no row in the status table and no "### E-Series" section below: business
 * decision 2026-09-24 pulled it from the public site (routes.ts,
 * HIDDEN_PRODUCT_SLUGS), and `/[locale]/products/e-series` now 404s, so a
 * "Read more" link to it here would point an assistant at a dead page.
 */
export const revalidate = 300;

export async function GET() {
  const content = await getContent();
  const publishedAt = await getPublishedAt();
  const copy = dictionary.product;
  const en = "en" as const;

  // "## Questions" (frequently-asked question and answer) section, appended
  // after "## Technology" and before "## Contact" via the `qaSection` slot in
  // the template below. Sourced from `dictionary.bio.faq.items` — the same
  // seven questions rendered as visible text on /bio — so this file cannot
  // state an answer /bio does not.
  const qaSection = `
## Questions

${dictionary.bio.faq.items
  .map((item) => `Q: ${item.question[en]}\nA: ${item.answer[en]}`)
  .join("\n\n")}
`;

  const body = `# Pebble Vina

> ${dictionary.meta.organisation[en]}

Content last published: ${publishedAt.toISOString()}

Legal entity: ${dictionary.footer.legalEntity} (tax code ${dictionary.footer.taxCode})
Address: ${dictionary.footer.address[en]}
Contact: ${external.email} · ${external.phoneDisplay}
Technology partner: Pebble Square Inc. — ${external.parent}

The site is published in Vietnamese, English and Korean at separate URLs.
Vietnamese is the source language; the other two are translations of it, so
quote the Vietnamese page if the wordings ever appear to differ:
- Vietnamese home: ${absolute(routes.home("vi"))}
- English home: ${absolute(routes.home(en))}
- Korean home: ${absolute(routes.home("ko"))}
- Vietnamese products: ${absolute(routes.products("vi"))}
- English products: ${absolute(routes.products(en))}
- Korean products: ${absolute(routes.products("ko"))}
- Vietnamese company profile: ${absolute(routes.bio("vi"))}
- English company profile: ${absolute(routes.bio(en))}
- Korean company profile: ${absolute(routes.bio("ko"))}

## What the company does

${content.home.hero.lead[en]}

${plainText(content.home.pim.lead[en])}

## Product status — read this before quoting a figure

Pebble Vina ships some of these parts today and has announced others. The
distinction is not decoration:

| Product | Status | Headline figures |
| --- | --- | --- |
| MINT | In production since 05/2023 | 30 GOPS · 17.6 TOPS/W |
| PAPAYA / PAPAYA FLEX | Proof of concept, 2024 (PAPAYA silicon verified, 1 run; PAPAYA FLEX productization target 2027 H1) | PAPAYA 0.5 TOPS · ~50 mW; PAPAYA FLEX 2 TOPS · ~200 mW |
| ESPRESSO | Roadmap, expected Q3/2026 | 140 TOPS (dense INT8) · efficiency varies by workload, about 15.5–28 TOPS/W on vision · 560 TOPS on a 4-chip card |
| Enterprise software platform | Roadmap, expected 12/2026 | ${content.product.software.progress}% toward target completion |
| Enterprise AI training | Needs survey, 2027 | Programme model not yet finalised |

## Products

### MINT — ${content.product.mint.title[en]}
${plainText(content.product.mint.lead[en])}
Applications: ${copy.mint.apps.join(", ")}.
Read more: ${absolute(routes.product(en, "mint"))}

### PAPAYA & PAPAYA FLEX — ${content.product.papaya.title[en]}
${plainText(content.product.papaya.lead[en])}
Read more: ${absolute(routes.product(en, "papaya"))}

### ESPRESSO — ${content.product.espresso.title[en]}
${plainText(content.product.espresso.lead[en])}
Read more: ${absolute(routes.product(en, "espresso"))}

### Enterprise software
${plainText(content.product.software.lead[en])}
Read more: ${absolute(routes.productSoftware(en))}

### Enterprise AI training
${content.product.training.lead[en]} ${copy.training.secondary[en]}
Read more: ${absolute(routes.productTraining(en))}

## News and partnerships

${plainText(content.home.news.lead[en])}
Read more: ${absolute(routes.news(en))}

${dictionary.home.news.items
  .slice(0, content.home.news.count)
  .map((item) => `- ${item.date}: ${item.title[en]} — ${plainText(item.body[en])}`)
  .join("\n")}

## Technology

${plainText(content.home.why.lead[en])}

Analog CIM: ${plainText(dictionary.home.pim.analog.body[en])}
Digital CIM: ${plainText(dictionary.home.pim.digital.body[en])}
${qaSection}
## Contact

${content.home.contact.lead[en]}
Enquiry form: ${absolute(routes.home(en))}#${routes.anchors.contact}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
