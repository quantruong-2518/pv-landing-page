import { getContent } from "@/lib/content/store";
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
 * into saying something the site does not.
 */
export const revalidate = 300;

export async function GET() {
  const content = await getContent();
  const copy = dictionary.product;
  const en = "en" as const;

  const body = `# Pebble Vina

> ${dictionary.meta.organisation[en]}

Legal entity: ${dictionary.footer.legalEntity} (tax code ${dictionary.footer.taxCode})
Address: ${dictionary.footer.address[en]}
Contact: ${external.email} · ${external.phoneDisplay}
Technology partner: Pebble Square Inc. — ${external.parent}

The site is published in Vietnamese and English at separate URLs:
- Vietnamese home: ${absolute(routes.home("vi"))}
- English home: ${absolute(routes.home(en))}
- Vietnamese products: ${absolute(routes.products("vi"))}
- English products: ${absolute(routes.products(en))}

## What the company does

${content.home.hero.lead[en]}

${content.home.pim.lead[en]}

## Product status — read this before quoting a figure

Pebble Vina ships some of these parts today and has announced others. The
distinction is not decoration:

| Product | Status | Headline figures |
| --- | --- | --- |
| MINT | In production since 05/2023 | 30 GOPS · 17.6 TOPS/W · 5 × 5 mm² die |
| PAPAYA / PAPAYA FLEX | Proof of concept, 2024 | 0.5 TOPS · 30 TOPS/W · 5 × 5 mm² die |
| ESPRESSO | Roadmap, expected Q3/2026 | 160 TOPS · 16 TOPS/W · 20 × 23 mm² die · 640 TOPS on a 4-chip card |
| E-Series E10 / E20 | Roadmap | E10: 512T FP8/INT8, 32 AI cores, 48 GB · E20: 1024T, 64 AI cores, 96 GB |
| Enterprise software platform | Roadmap, expected 12/2026 | ${content.product.software.progress}% toward target completion |
| Enterprise AI training | Needs survey, 2027 | Programme model not yet finalised |

PAPAYA FLEX's "~50× / ~100× / ~25×" figures are comparisons against an NVIDIA
Jetson Nano under published benchmark conditions, not absolute measurements:
${copy.papaya.flexSpecs.map((spec) => `${spec.value} — ${spec.note?.[en] ?? ""}`).join("; ")}

## Products

### MINT — ${content.product.mint.title[en]}
${content.product.mint.lead[en]}
Applications: ${copy.mint.apps.join(", ")}.
Read more: ${absolute(routes.products(en))}#${routes.anchors.mint}

### PAPAYA & PAPAYA FLEX — ${content.product.papaya.title[en]}
${content.product.papaya.lead[en]}
Read more: ${absolute(routes.products(en))}#${routes.anchors.papaya}

### ESPRESSO — ${content.product.espresso.title[en]}
${content.product.espresso.lead[en]}
Read more: ${absolute(routes.products(en))}#${routes.anchors.espresso}

### E-Series — ${content.product.eseries.title[en]}
${content.product.eseries.lead[en]}
Software stack: ${copy.eseries.stack.join(", ")}.
Read more: ${absolute(routes.products(en))}#${routes.anchors.eSeries}

### Enterprise software
${content.product.software.lead[en]}
Read more: ${absolute(routes.products(en))}#${routes.anchors.software}

### Enterprise AI training
${content.product.training.lead[en]} ${copy.training.secondary[en]}
Read more: ${absolute(routes.products(en))}#${routes.anchors.training}

## Technology

${content.home.why.lead[en]}

Analog PIM: ${dictionary.home.pim.analog.body[en]}
Digital PIM: ${dictionary.home.pim.digital.body[en]}

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
