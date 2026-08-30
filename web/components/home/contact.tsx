import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { Abs, Artboard, Img, Rich, Txt, u } from "@/components/artboard";
import { ContactForm } from "@/components/contact-form";
import { FBlock, FEmblem, FRule, F_LEAD, F_TITLE } from "@/components/home/flow";

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
    <Artboard id="contact" className="text-art-navy-deep bg-white" flow={<ContactFlow c={c} />}>
      <Img src={s.media.src ?? ""} alt={s.media.alt} x={-25} y={-27} w={858} h={806} fit="cover" className="media-image" reveal={1} />

      <Txt
        as="h2"
        x={65}
        y={103}
        w={440}
        size={29.2}
        weight={800}
        leading={36}
        className="whitespace-pre-line text-white"
        reveal={1}
      >
        <Rich value={s.title} accent="text-art-blue-bright" />
      </Txt>
      <Abs x={63} y={234} w={50} h={4} className="bg-art-blue-bright" />

      <Txt x={65} y={262} w={300} size={20.7} weight={600} leading={31} className="text-white" reveal={2}>
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

      <Txt as="h3" x={856} y={91} size={33.5} weight={800} leading={49} reveal={2}>
        {c.contact.form.title}
      </Txt>

      {/* The form is a real control set, not artwork: it keeps the CRM wiring of
          /vi/contact and only takes the artboard's skin. The em set here is what
          makes every field scale with the canvas. */}
      <Abs x={847} y={140} w={536} style={{ fontSize: u(14.1) }} reveal={3}>
        <ContactForm c={c} successHeadingAs="h3" skin="artboard" />
      </Abs>
    </Artboard>
  );
}

/**
 * The same section as flow, shown whenever the `canvas:` condition fails. It
 * lives here rather than in `flow.tsx` because it is the only flow block that
 * needs `<ContactForm>`, and `flow.tsx` is imported by the hero — a client
 * component, so putting it there would pull the whole form into the hero's
 * bundle. It borrows the shared flow scale, so it reads as one page with the
 * other six. The two halves stack under `md` and sit side by side above it —
 * the arrangement `/vi/contact` already uses for the same pair of things.
 */
function ContactFlow({ c }: { c: SiteContent }) {
  const s = c.home.contact;

  return (
    <div className="md:grid md:grid-cols-2">
      {/* The invitation keeps the building behind it, as on the canvas: this is
          the one place on HOME where type sits on a photograph, and dropping it
          would make the closing block read as a bare form. */}
      <div className="relative isolate overflow-hidden">
        {s.media.src ? (
          <Image
            src={s.media.src}
            alt={s.media.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover"
          />
        ) : null}
        <div className="bg-art-navy-deep/70 absolute inset-0 -z-10" aria-hidden />

        {/* `frame` centres on the page, which is wrong for a half-width column:
            the inset is kept, the centring is not. */}
        <FBlock className="text-white md:mx-0 md:max-w-none" reveal={1}>
          <h2 className={`${F_TITLE} whitespace-pre-line normal-case`}>
            <Rich value={s.title} accent="text-art-blue-bright" />
          </h2>
          <FRule className="bg-art-blue-bright" />
          <p className={`${F_LEAD} mt-5 font-semibold`}>{s.lead}</p>

          <ul className="mt-7 grid gap-4">
            {s.badges.map((b, i) => (
              <li key={b.id} className="flex items-start gap-3">
                <FEmblem ring={b.media.src ?? ""} glyph={BADGE_GLYPH[i].src} className="h-12 w-12" />
                <p className="text-[0.95rem] leading-[1.45] sm:text-base">
                  {b.title}
                  <br />
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </FBlock>
      </div>

      <FBlock className="md:mx-0 md:max-w-none" reveal={2}>
        <h3 className={`${F_TITLE} text-[1.35rem] sm:text-[1.5rem]`}>{c.contact.form.title}</h3>
        <div className="mt-5">
          <ContactForm c={c} successHeadingAs="h3" skin="artboard-flow" />
        </div>
      </FBlock>
    </div>
  );
}
