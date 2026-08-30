import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Txt, u } from "@/components/artboard";
import { SolutionsFlow } from "@/components/home/flow";

/**
 * Canva page 6. The four rows look like a grid but are not one: the master
 * spaces and sizes each panel around its own body, so every row carries its own
 * measurements. Evening them out is the later UI pass, not this one.
 *
 * Row 2's inner glyph is vector art in the master with no downloadable asset, so
 * it borrows the identical brain glyph from page 4.
 */
const ROWS = [
  {
    panel: { y: 188, h: 108 },
    ring: { src: "/media/home/solutions-ring-1.png", y: 196 },
    glyph: { src: "/media/home/solutions-glyph-1.png", y: 213, h: 66 },
    indexY: 231,
    titleY: 208,
    bodyY: 246,
  },
  {
    panel: { y: 316, h: 118 },
    ring: { src: "/media/home/solutions-ring-2.png", y: 330 },
    glyph: { src: "/media/home/why-glyph-2.png", y: 347, h: 66 },
    indexY: 368,
    titleY: 334,
    bodyY: 373,
  },
  {
    panel: { y: 456, h: 128 },
    ring: { src: "/media/home/solutions-ring-3.png", y: 472 },
    glyph: { src: "/media/home/solutions-glyph-3.png", y: 488, h: 67 },
    indexY: 509,
    titleY: 476,
    bodyY: 515,
  },
  {
    panel: { y: 603, h: 128 },
    ring: { src: "/media/home/solutions-ring-4.png", y: 623 },
    glyph: { src: "/media/home/solutions-glyph-4.png", y: 640, h: 50 },
    indexY: 652,
    titleY: 623,
    bodyY: 662,
  },
];

const PANEL_X = 586;
const PANEL_W = 786;

export function Solutions({ c }: { c: HomeContent["solutions"] }) {
  return (
    <Artboard id="solutions" className="bg-art-black text-white" flow={<SolutionsFlow c={c} />}>
      <Img src={c.media.src ?? ""} alt={c.media.alt} x={-10} y={-11} w={576} h={557} className="media-image" reveal={2} />

      <Txt as="h2" x={72} y={99} w={1264} size={45.5} weight={700} leading={53} uppercase className="text-center" reveal={1}>
        {c.title} <span className="text-art-blue-solution">{c.titleAccent}</span>
      </Txt>

      <Txt x={41} y={558} w={520} size={22} leading={30} reveal={3}>
        {c.body}
      </Txt>

      {c.items.map((item, i) => {
        const g = ROWS[i];
        return (
          <div key={item.id}>
            <Abs x={PANEL_X} y={g.panel.y} w={PANEL_W} h={g.panel.h} className="precision-card bg-art-card rounded-xl" reveal={2 + i} />

            <Abs
              x={604}
              y={g.indexY}
              w={44}
              className="text-art-blue-solution text-center font-bold"
              style={{ fontSize: u(27) }}
            >
              {item.index}
            </Abs>

            <Img src={g.ring.src} x={666} y={g.ring.y} w={97} h={100} />
            <Img src={g.glyph.src} x={683} y={g.glyph.y} w={65} h={g.glyph.h} />

            <Txt as="h3" x={791} y={g.titleY} w={578} size={20.6} weight={700} leading={27} uppercase>
              {item.title}
            </Txt>
            <Txt x={791} y={g.bodyY} w={570} size={18.2} leading={21}>
              {item.body}
            </Txt>
          </div>
        );
      })}
    </Artboard>
  );
}
