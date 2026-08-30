import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Rich, Txt, u } from "@/components/artboard";
import { CoreFlow } from "@/components/home/flow";

/**
 * Canva page 5. The three capability panels are not a grid — each sits in its
 * own place on the artwork and leads with a different thing (a name, a figure,
 * a two-line label), so each carries its own geometry rather than sharing one.
 */
type Box = { x: number; y: number; w: number; h: number };
type Run = { x: number; y: number; size: number; leading: number; w: number };

type PanelLayout = {
  icon: string;
  iconAt: Box;
  panel: Box;
  badge: { x: number; y: number };
  value?: { x: number; y: number; size: number };
  name: Run;
  caption?: Run;
  body: Run;
  outcome: { x: number; y: number; size: number };
};

const PANELS: PanelLayout[] = [
  {
    icon: "/media/home/core-icon-01.png",
    iconAt: { x: 666, y: 237, w: 101, h: 95 },
    panel: { x: 668, y: 198, w: 463, h: 176 },
    badge: { x: 851, y: 166 },
    name: { x: 767, y: 238, size: 33.8, leading: 47, w: 110 },
    caption: { x: 767, y: 296, size: 17.1, leading: 23, w: 110 },
    body: { x: 884, y: 242, size: 18.7, leading: 28, w: 240 },
    outcome: { x: 884, y: 351, size: 17.5 },
  },
  {
    icon: "/media/home/core-icon-02.png",
    iconAt: { x: 435, y: 465, w: 106, h: 100 },
    panel: { x: 450, y: 445, w: 292, h: 268 },
    badge: { x: 554, y: 413 },
    value: { x: 561, y: 477, size: 31.9 },
    name: { x: 561, y: 524, size: 17.3, leading: 24, w: 130 },
    body: { x: 467, y: 578, size: 18.7, leading: 28, w: 270 },
    outcome: { x: 464, y: 687, size: 16.2 },
  },
  {
    icon: "/media/home/core-icon-03.png",
    iconAt: { x: 1019, y: 441, w: 84, h: 92 },
    panel: { x: 996, y: 428, w: 292, h: 252 },
    badge: { x: 1101, y: 372 },
    name: { x: 1107, y: 455, size: 22, leading: 30, w: 175 },
    body: { x: 1024, y: 537, size: 17.3, leading: 26, w: 250 },
    outcome: { x: 1005, y: 640, size: 16.5 },
  },
];

export function Core({ c }: { c: HomeContent["core"] }) {
  return (
    <Artboard id="core" className="bg-art-black text-white" flow={<CoreFlow c={c} />}>
      <Img src={c.media.src ?? ""} alt={c.media.alt} x={0} y={0} w={1408} h={768} fit="cover" />
      <Img src="/media/home/core-deco-tl.png" x={0} y={47} w={302} h={80} />
      <Img src="/media/home/core-deco-tr.png" x={1072} y={78} w={336} h={221} />
      <Img src="/media/home/core-deco-mid.png" x={655} y={208} w={482} h={182} />
      <Img src="/media/home/core-deco-grid.png" x={0} y={472} w={402} h={253} />
      <Img src="/media/home/core-deco-bl.png" x={83} y={567} w={118} h={79} />
      <Img src="/media/home/core-engine.png" x={417} y={114} w={901} h={601} />
      <Abs x={395} y={92} w={950} h={630} className="core-signal" />

      <Txt as="h2" x={66} y={99} w={562} size={50} weight={700} leading={64} uppercase reveal={1}>
        {c.title}
      </Txt>

      <Txt x={67} y={236} w={560} size={21.2} leading={29} reveal={2}>
        <Rich value={c.body} accent="text-art-cyan font-bold" />
      </Txt>

      {c.capabilities.map((cap, i) => {
        const g = PANELS[i];
        return (
          <div key={cap.id}>
            <Abs
              {...g.panel}
              className="rounded-xl border border-white/25 bg-black/45 backdrop-blur-[2px]"
              reveal={3 + i}
            />
            <Img src={g.icon} {...g.iconAt} />

            <Abs
              x={g.badge.x}
              y={g.badge.y}
              w={72}
              h={72}
              className="bg-art-black flex items-center justify-center rounded-full border border-white/35 font-extrabold"
              style={{ fontSize: u(31) }}
            >
              {cap.index}
            </Abs>

            {cap.value ? (
              <Txt x={g.value!.x} y={g.value!.y} size={g.value!.size} weight={700} leading={44} uppercase>
                {cap.value}
              </Txt>
            ) : null}

            <Txt
              as="h3"
              x={g.name.x}
              y={g.name.y}
              w={g.name.w}
              size={g.name.size}
              weight={cap.value ? 500 : 700}
              leading={g.name.leading}
              uppercase
            >
              {cap.name}
            </Txt>

            {cap.caption ? (
              <Txt
                x={g.caption!.x}
                y={g.caption!.y}
                w={g.caption!.w}
                size={g.caption!.size}
                weight={500}
                leading={g.caption!.leading}
                uppercase
              >
                {cap.caption}
              </Txt>
            ) : null}

            <Txt x={g.body.x} y={g.body.y} w={g.body.w} size={g.body.size} leading={g.body.leading}>
              {cap.body}
            </Txt>

            <Txt
              x={g.outcome.x}
              y={g.outcome.y}
              size={g.outcome.size}
              weight={500}
              className="text-art-cyan whitespace-nowrap"
            >
              {cap.outcome}
            </Txt>
          </div>
        );
      })}
    </Artboard>
  );
}
