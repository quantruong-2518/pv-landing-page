import type { CatalogGroup, FactStatus, Media, SiteContent } from "@/content/types";
import { ChipPlinth, Figure, Section, SHELL, StatusBadge } from "@/components/ui";
import { CAT_BG, CAT_BORDER, CAT_TEXT, type Category } from "@/components/products/ui";
import { cn } from "@/lib/cn";
import { path } from "@/lib/routes";

/**
 * Canva artboard 1, lower half: the catalogue. Six cards under four band
 * labels, every card a jump to the block that answers it further down the page.
 *
 * Content-height, not `screen`: six cards plus their labels do not fit a phone
 * viewport, and pinning them to one would only push the last row under the fold
 * (docs/03-structure.md §4b).
 */

type Entry = {
  id: string;
  name: string;
  decisionLabel: string;
  stageLabel: string;
  status: FactStatus;
  media: Media;
  /** Chip renders are cut-outs and must not be cropped; the two illustrations fill. */
  contain: boolean;
};

type Band = {
  key: CatalogGroup | "software" | "training";
  label: string;
  category: Category;
  entries: Entry[];
  className: string;
};

export function CatalogIndex({ c }: { c: SiteContent }) {
  const { intro, hardware, software, training } = c.products;

  const chip = (group: CatalogGroup): Entry[] =>
    hardware.items
      .filter((item) => item.catalogGroup === group)
      .map((item) => ({
        id: item.id,
        name: item.indexName ?? item.name,
        decisionLabel: item.decisionLabel,
        stageLabel: item.indexStageLabel,
        status: item.status,
        media: item.media,
        contain: true,
      }));

  const bands: Band[] = [
    { key: "npu", label: hardware.catalogGroups.npu, category: "hardware", entries: chip("npu"), className: "col-span-2 lg:col-span-3" },
    { key: "gpu", label: hardware.catalogGroups.gpu, category: "hardware", entries: chip("gpu"), className: "" },
    {
      key: "software",
      label: c.nav.software,
      category: "software",
      entries: software.groups.map((group) => ({
        id: group.id,
        name: group.indexName ?? group.name,
        decisionLabel: group.decisionLabel,
        stageLabel: group.indexStageLabel,
        status: group.status,
        media: group.media,
        contain: false,
      })),
      className: "",
    },
    {
      key: "training",
      label: c.nav.training,
      category: "training",
      entries: [
        {
          id: training.offer.id,
          name: training.offer.indexName ?? training.offer.name,
          decisionLabel: training.offer.decisionLabel,
          stageLabel: training.offer.indexStageLabel,
          status: training.offer.status,
          media: training.offer.media,
          contain: false,
        },
      ],
      className: "",
    },
  ];

  return (
    <Section className="section-field section-field-soft">
      <div className={SHELL}>
        {intro.catalogTitle || intro.catalogLead ? (
          <header className="mx-auto max-w-3xl text-center">
            {intro.catalogTitle ? (
              <h2 className="font-display text-[1.4rem] font-semibold uppercase leading-tight sm:text-[1.8rem]">
                {intro.catalogTitle}
              </h2>
            ) : null}
            {intro.catalogLead ? (
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intro.catalogLead}</p>
            ) : null}
          </header>
        ) : null}

        <div
          className={cn(
            "grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 lg:grid-cols-6 lg:gap-x-5",
            intro.catalogTitle || intro.catalogLead ? "mt-8 sm:mt-10" : "",
          )}
        >
          {bands.map((band) => (
            <section key={band.key} className={band.className} aria-label={band.label || undefined}>
              <p
                className={cn(
                  "flex min-h-6 items-center gap-2 border-t-2 pt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] sm:text-[0.7rem]",
                  CAT_BORDER[band.category],
                  CAT_TEXT[band.category],
                )}
              >
                {band.label}
              </p>

              <ul
                className={cn(
                  "mt-3 grid gap-3 sm:gap-4",
                  band.entries.length > 1 && "grid-cols-2 lg:grid-cols-3",
                )}
              >
                {band.entries.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={path("products", entry.id)}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgb(11_18_32_/_0.10)]"
                    >
                      {entry.contain ? (
                        <ChipPlinth
                          media={entry.media}
                          pendingLabel={c.ui.imagePending}
                          ratio="aspect-[16/9]"
                          sizes="(min-width: 1024px) 210px, (min-width: 640px) 30vw, 44vw"
                          imageClassName="p-[8%]"
                          className="shadow-none"
                        />
                      ) : (
                        <Figure
                          media={entry.media}
                          ratio="aspect-[16/9]"
                          sizes="(min-width: 1024px) 210px, (min-width: 640px) 44vw, 44vw"
                          pendingLabel={c.ui.imagePending}
                          compact
                          className="border-0"
                        />
                      )}

                      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                        {/* The arrow rides with the name, not with the status
                            label: at 161px a card cannot hold "Sản xuất-5/2023"
                            and a glyph on the same line. */}
                        <p className="flex items-start justify-between gap-2">
                          <span
                            className={cn(
                              "font-display text-[0.95rem] font-semibold leading-tight underline-offset-4 group-hover:underline sm:text-base",
                              CAT_TEXT[band.category],
                            )}
                          >
                            {entry.name}
                          </span>
                          <span
                            className={cn("shrink-0 transition-transform group-hover:translate-x-0.5", CAT_TEXT[band.category])}
                            aria-hidden
                          >
                            ↘
                          </span>
                        </p>
                        <p className="mt-1.5 text-[0.78rem] leading-snug text-muted sm:text-[0.82rem]">
                          {entry.decisionLabel}
                        </p>
                        <p className="mt-auto pt-3">
                          <StatusBadge status={entry.status} label={entry.stageLabel} />
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {intro.scrollLabel ? (
          <p className="mt-7 flex items-center justify-center gap-2 text-center text-[0.8rem] text-muted sm:text-sm">
            {intro.scrollLabel}
            <span className={cn("inline-block h-4 w-px", CAT_BG.hardware)} aria-hidden />
            <span aria-hidden>↓</span>
          </p>
        ) : null}
      </div>
    </Section>
  );
}
