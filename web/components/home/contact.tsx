import type { SiteContent } from "@/content/types";
import { Abs, Artboard, Img, Rich, Txt, u } from "@/components/artboard";
import { ContactForm } from "@/components/contact-form";

/** Canva page 8: invitation over the building photograph, form on the white half. */
const BADGE_Y = [449, 532, 614];
const BADGE_GLYPH = [
  { src: "/media/home/contact-badge-glyph-1.png", h: 50 },
  { src: "/media/home/contact-badge-glyph-2.png", h: 66 },
  { src: "/media/home/contact-badge-glyph-3.png", h: 50 },
];

export function Contact({ c }: { c: SiteContent }) {
  const s = c.home.contact;

  return (
    <Artboard id="contact" className="text-art-navy-deep bg-white">
      <Img src={s.media.src ?? ""} alt={s.media.alt} x={-25} y={-27} w={858} h={806} fit="cover" />

      <Txt
        as="h2"
        x={65}
        y={103}
        w={440}
        size={29.2}
        weight={800}
        leading={36}
        className="whitespace-pre-line text-white"
      >
        <Rich value={s.title} accent="text-art-blue-bright" />
      </Txt>
      <Abs x={63} y={234} w={50} h={4} className="bg-art-blue-bright" />

      <Txt x={65} y={262} w={300} size={20.7} weight={600} leading={31} className="text-white">
        {s.lead}
      </Txt>

      {s.badges.map((b, i) => (
        <div key={b.id}>
          <Img src={b.media.src ?? ""} alt={b.media.alt} x={51} y={BADGE_Y[i]} w={87} h={66} />
          <Img src={BADGE_GLYPH[i].src} x={68} y={BADGE_Y[i]} w={53} h={BADGE_GLYPH[i].h} />
          <Txt x={138} y={BADGE_Y[i] + 6} w={260} size={19.5} leading={29} className="text-white">
            {b.title}
          </Txt>
          <Txt x={138} y={BADGE_Y[i] + 37} w={260} size={19.5} leading={29} className="text-white">
            {b.body}
          </Txt>
        </div>
      ))}

      <Txt as="h3" x={856} y={91} size={33.5} weight={800} leading={49}>
        {c.contact.form.title}
      </Txt>

      {/* The form is a real control set, not artwork: it keeps the CRM wiring of
          /vi/contact and only takes the artboard's skin. The em set here is what
          makes every field scale with the canvas. */}
      <Abs x={847} y={140} w={536} style={{ fontSize: u(14.1) }}>
        <ContactForm c={c} successHeadingAs="h3" skin="artboard" />
      </Abs>
    </Artboard>
  );
}
