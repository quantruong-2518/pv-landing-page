import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Rich, Txt } from "@/components/artboard";
import { WhyPimFlow } from "@/components/home/flow";

/**
 * Canva page 4. The three cards are not identical in the master — Canva shrank
 * each block to fit its own box, so the type sizes differ card by card. Those
 * differences are copied rather than normalised; evening them out is part of
 * the later UI pass, not of matching the design.
 */
const CARDS = [
  {
    ring: "/media/home/why-ring-1.png",
    glyph: "/media/home/why-glyph-1.png",
    card: "/media/home/why-card-1.png",
    x: 101,
    w: 353,
    ringX: 209,
    glyph_: { x: 224, y: 408, w: 107, h: 80 },
    rules: [
      { x: 177, w: 92 },
      { x: 300, w: 77 },
    ],
    indexSize: 22,
    titleSize: 24.7,
    titleLead: 36,
    underline: { x: 254, w: 47 },
    bodySize: 20.8,
    bodyLead: 31,
    bodyY: 637,
  },
  {
    ring: "/media/home/why-ring-2.png",
    glyph: "/media/home/why-glyph-2.png",
    card: "/media/home/why-card-2.png",
    x: 510,
    w: 337,
    ringX: 602,
    glyph_: { x: 633, y: 408, w: 77, h: 95 },
    rules: [
      { x: 563, w: 77 },
      { x: 694, w: 76 },
    ],
    indexSize: 22,
    titleSize: 25.2,
    titleLead: 37,
    underline: { x: 648, w: 46 },
    bodySize: 17.9,
    bodyLead: 26,
    bodyY: 640,
  },
  {
    ring: "/media/home/why-ring-3.png",
    glyph: "/media/home/why-glyph-3.png",
    card: "/media/home/why-card-3.png",
    x: 882,
    w: 367,
    ringX: 989,
    glyph_: { x: 1019, y: 408, w: 92, h: 95 },
    rules: [
      { x: 974, w: 77 },
      { x: 1080, w: 62 },
    ],
    indexSize: 22,
    titleSize: 23.7,
    titleLead: 35,
    underline: { x: 1035, w: 61 },
    bodySize: 20.5,
    bodyLead: 30,
    bodyY: 638,
  },
];

export function WhyPim({ c }: { c: HomeContent["whyPim"] }) {
  return (
    <Artboard id="why-pim" className="bg-art-black text-white" flow={<WhyPimFlow c={c} />}>
      <Img src={c.media.src ?? ""} alt={c.media.alt} x={798} y={-34} w={674} h={644} className="media-image" reveal={2} />

      {/* The master breaks this headline itself; `whitespace-pre-line` keeps
          that break instead of letting the box width invent another one. */}
      <Txt
        as="h2"
        x={112}
        y={107}
        size={43.6}
        weight={600}
        leading={56}
        className="whitespace-pre-line"
        reveal={1}
      >
        <Rich value={c.title} accent="text-art-blue-num" />
      </Txt>

      <Txt x={121} y={231} w={800} size={21.1} leading={31} reveal={2}>
        {c.body}
      </Txt>

      {c.items.map((item, i) => {
        const g = CARDS[i];
        return (
          <div key={item.id}>
            <Img src={g.card} x={g.x} y={455} w={g.w} h={298} reveal={3 + i} />
            <Img src={g.ring} x={g.ringX} y={393} w={138} h={126} />
            <Img src={g.glyph} x={g.glyph_.x} y={g.glyph_.y} w={g.glyph_.w} h={g.glyph_.h} />

            {g.rules.map((r) => (
              <Abs key={r.x} x={r.x} y={542} w={r.w} h={1} className="bg-white/25" />
            ))}
            <Txt
              x={g.x}
              y={531}
              w={g.w}
              size={g.indexSize}
              weight={600}
              className="text-art-blue-num text-center"
            >
              {item.index}
            </Txt>

            <Txt
              as="h3"
              x={g.x}
              y={571}
              w={g.w}
              size={g.titleSize}
              weight={600}
              leading={g.titleLead}
              className="text-center"
            >
              {item.title}
            </Txt>
            <Abs x={g.underline.x} y={620} w={g.underline.w} h={2} className="bg-art-blue-num" />

            <Txt
              x={g.x + 12}
              y={g.bodyY}
              w={g.w - 24}
              size={g.bodySize}
              leading={g.bodyLead}
              className="text-center"
            >
              {item.body}
            </Txt>
          </div>
        );
      })}
    </Artboard>
  );
}
