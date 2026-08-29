import type { HomeContent } from "@/content/types";
import { Abs, Artboard, Img, Txt, u } from "@/components/artboard";
import { path } from "@/lib/routes";

/**
 * Canva page 3. The two branch cards are the same object twice with different
 * measurements, so their geometry sits here, parallel to `c.branches`, and the
 * component maps over both instead of writing the card out twice.
 */
const BRANCHES = [
  { card: "/media/home/pim-card-analog.png", cardX: 624, cardW: 358, photoX: 624, photoW: 358, textX: 656, nameSize: 27.7 },
  { card: "/media/home/pim-card-digital.png", cardX: 966, cardW: 359, photoX: 981, photoW: 344, textX: 1008, nameSize: 27.1 },
];

const ICONS = [
  { src: "/media/home/pim-icon-analog.png", x: 184 },
  { src: "/media/home/pim-icon-digital.png", x: 331 },
];

export function Pim({ c }: { c: HomeContent["pim"] }) {
  return (
    <Artboard id="pim" className="text-art-ink bg-white">
      <Img src="/media/home/pim-deco-left.png" x={0} y={352} w={239} h={429} />
      <Img src="/media/home/pim-deco-right.png" x={1183} y={57} w={224} h={628} />

      <Txt as="h2" x={68} y={115} size={34.6} weight={700} leading={49} uppercase>
        {c.title}
      </Txt>
      <Txt x={68} y={164} size={34.6} weight={700} leading={49} uppercase className="text-art-blue">
        {c.titleAccent}
      </Txt>
      <Abs x={68} y={216} w={60} h={4} className="bg-art-blue" />

      <Txt x={68} y={246} w={523} size={22.7} leading={36}>
        {c.body}
      </Txt>

      {ICONS.map((icon, i) => (
        <div key={c.branches[i].id}>
          <Img src={icon.src} x={icon.x} y={489} w={120} h={123} />
          <Txt
            x={icon.x}
            y={617}
            w={120}
            size={14.2}
            weight={700}
            leading={20}
            uppercase
            className="text-art-blue-alt text-center"
          >
            {c.branches[i].iconLabel}
          </Txt>
        </div>
      ))}

      <Img src="/media/home/pim-callout.png" x={25} y={644} w={403} h={123} />
      <Img src="/media/home/pim-callout-icon.png" x={55} y={675} w={46} h={47} />
      <Txt x={114} y={669} w={280} size={17.3} weight={500} leading={24}>
        {c.calloutLead}
      </Txt>
      <Txt x={114} y={726} w={300} size={13.1} weight={500} leading={29} uppercase className="text-art-blue-alt">
        {c.calloutGoal}
      </Txt>

      {c.branches.map((b, i) => {
        const g = BRANCHES[i];
        return (
          <div key={b.id}>
            <Img src={g.card} x={g.cardX} y={115} w={g.cardW} h={643} />
            <Img src={b.media.src ?? ""} alt={b.media.alt} x={g.photoX} y={115} w={g.photoW} h={307} />

            <Abs
              x={g.textX - 18}
              y={130}
              w={60}
              h={61}
              className="bg-art-blue flex items-center justify-center rounded-md font-bold text-white"
              style={{ fontSize: u(20) }}
            >
              {b.index}
            </Abs>

            <Txt
              as="h3"
              x={g.textX}
              y={436}
              size={g.nameSize}
              weight={700}
              leading={41}
              uppercase
              className="text-art-blue-alt"
            >
              {b.name}
            </Txt>
            <Txt x={g.textX} y={499} w={326} size={16.5} weight={700} leading={27}>
              {b.tagline}
            </Txt>
            <Txt x={g.textX} y={533} w={300} size={18.3} leading={27}>
              {b.body}
            </Txt>

            <Abs x={g.textX} y={705} w={300}>
              <a
                href={path("products", "hardware")}
                className="text-art-blue-alt flex items-center justify-between uppercase hover:underline"
                style={{ fontSize: u(13), fontWeight: 700, lineHeight: u(29), width: u(230) }}
              >
                {b.cta}
                <span aria-hidden>→</span>
              </a>
            </Abs>
          </div>
        );
      })}
    </Artboard>
  );
}
