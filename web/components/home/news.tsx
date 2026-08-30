import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Txt, u } from "@/components/artboard";
import { NewsFlow } from "@/components/home/flow";

/**
 * Canva page 7. Four cards, but not four identical cards: the master shrank
 * each block to fit its own column, and cards 3 and 4 share one flattened image
 * that already contains its photograph. Both facts are copied, not tidied up.
 */
const CARDS = [
  {
    art: "/media/home/news-card-1.png",
    x: 85,
    w: 300,
    textX: 106,
    textW: 264,
    dateSize: 12,
    titleSize: 17.2,
    bodyY: 583,
    bodySize: 16,
    bodyLead: 21,
  },
  {
    art: "/media/home/news-card-2.png",
    x: 384,
    w: 315,
    textX: 415,
    textW: 260,
    dateSize: 12,
    titleSize: 17.2,
    bodyY: 587,
    bodySize: 14.1,
    bodyLead: 19,
  },
  {
    art: "/media/home/news-card-3.png",
    x: 699,
    w: 315,
    textX: 723,
    textW: 267,
    dateSize: 12,
    titleSize: 17.2,
    bodyY: 584,
    bodySize: 15.1,
    bodyLead: 21,
  },
  {
    art: "/media/home/news-card-3.png",
    x: 1008,
    w: 315,
    textX: 1032,
    textW: 267,
    dateSize: 12,
    titleSize: 17.2,
    bodyY: 584,
    bodySize: 15.1,
    bodyLead: 21,
  },
];

export function News({ c }: { c: HomeContent["news"] }) {
  return (
    <Artboard id="news" className="text-art-navy bg-white" flow={<NewsFlow c={c} />}>
      <Img src="/media/home/news-deco-left.png" x={0} y={104} w={200} h={171} />
      <Img src="/media/home/news-deco-right.png" x={1234} y={69} w={216} h={188} />
      <Img src="/media/home/news-rule-left.png" x={305} y={130} w={100} h={18} />
      <Img src="/media/home/news-rule-right.png" x={1003} y={130} w={100} h={18} />

      <Txt as="h2" x={449} y={107} w={511} size={53.9} weight={700} leading={59} uppercase className="text-center" reveal={1}>
        {c.title}
      </Txt>
      <Txt x={265} y={186} w={880} size={20.3} leading={26} className="text-center" reveal={2}>
        {c.lead}
      </Txt>

      {c.items.map((item, i) => {
        const g = CARDS[i];
        return (
          <div key={item.id}>
            <Img src={g.art} x={g.x} y={257} w={g.w} h={461} reveal={3 + i} />
            {item.media.src ? (
              <Img src={item.media.src} alt={item.media.alt} x={g.x} y={274} w={g.w} h={222} fit="cover" reveal={3 + i} />
            ) : null}

            <Txt x={g.textX} y={497} size={g.dateSize} weight={700} uppercase>
              {item.date}
            </Txt>
            <Txt as="h3" x={g.textX} y={526} w={g.textW} size={g.titleSize} weight={700} leading={19}>
              {item.title}
            </Txt>
            <Txt x={g.textX} y={g.bodyY} w={g.textW} size={g.bodySize} leading={g.bodyLead}>
              {item.body}
            </Txt>

            <Abs x={g.textX} y={655} w={g.textW} h={1} className="bg-art-navy/15" />
            <Abs
              x={g.textX}
              y={673}
              w={g.textW}
              className="flex items-center justify-between"
              style={{ fontSize: u(13.4), fontWeight: 700, width: u(110) }}
            >
              {item.cta}
              <span aria-hidden>→</span>
            </Abs>
          </div>
        );
      })}

      <Abs
        x={599}
        y={724}
        w={215}
        h={36}
        className="border-art-navy/35 flex items-center justify-center border uppercase"
        style={{ fontSize: u(15), fontWeight: 700, gap: u(14) }}
      >
        {c.cta}
        <span aria-hidden>→</span>
      </Abs>
    </Artboard>
  );
}
