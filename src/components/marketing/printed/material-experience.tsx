import { Flame, Layers, Mail, ScrollText, Stamp, Waves } from "lucide-react";

import { Container } from "@/components/shared/container";

const crafts = [
  {
    icon: Layers,
    kicker: "01 · Substrate",
    title: "Archival Cotton Paper",
    text: "600gsm to 900gsm pure cotton handmade paper milled in historic European mills with naturally feathered, hand-torn deckle edges. Acid-free and preserved for centuries.",
    spec: "Density: 600–900 GSM · 100% Cotton Rag",
  },
  {
    icon: Flame,
    kicker: "02 · Illumination",
    title: "Hot Foil Stamping",
    text: "Custom magnesium dies heated to 130°C to press metallic foils deep into the fibers. Available in antique copper, rose bronze, champagne, and matte satin gold.",
    spec: "Heat: 130°C Thermal Bond · Precision Foil",
  },
  {
    icon: Waves,
    kicker: "03 · Relief",
    title: "Blind Deboss Sculpting",
    text: "Multi-level sculptured dies that depress your personal crest into heavy cotton without pigment. It relies entirely on natural shadows and touch to reveal its intricacy.",
    spec: "Depth: 0.8mm Shadow Inset · Tactile Relief",
  },
  {
    icon: Stamp,
    kicker: "04 · Impression",
    title: "Vintage Letterpress",
    text: 'Hand-fed onto our restored 1950s Heidelberg "Windmill" Platen presses. Each impression leaves a crisp, deep bite into the soft cotton pulp that you can trace with your fingertips.',
    spec: "Press: 1954 Heidelberg Tiegel · Manual Inking",
  },
  {
    icon: Mail,
    kicker: "05 · Casing",
    title: "Envelopes & Vellum Liners",
    text: "Hand-constructed heavyweight Euro-flap envelopes lined with bespoke translucent vellum illustrations, architectural sketches of your venue, or botanical flourishes.",
    spec: "Envelope: 300gsm Cotton · French Vellum",
  },
  {
    icon: ScrollText,
    kicker: "06 · Adornment",
    title: "Wax Seals & Silk Ribbons",
    text: "Natural beeswax blended with mineral pigments, hand-poured and stamped with your monogram stamp, paired with plant-dyed Habotai silk ribbon with organic frayed edges.",
    spec: "Seals: Natural Beeswax · 100% French Silk",
  },
] as const;

export function MaterialExperience() {
  return (
    <section className="w-full bg-surface py-12 lg:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            The Tactile Architecture
          </p>
          <h2 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
            Sensory Anatomy of Fine Craft
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-on-surface-variant">
            Unlike industrial digital printing, our heirloom creations are
            sensory artifacts. Every millimeter is calculated for weight, relief
            depth, and light play.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {crafts.map(({ icon: Icon, kicker, title, text, spec }) => (
            <article
              key={kicker}
              className="flex flex-col rounded-[8px] bg-surface-lowest p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-full bg-surface-low text-secondary">
                <Icon aria-hidden size={24} />
              </span>
              <span className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                {kicker}
              </span>
              <h3 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                {title}
              </h3>
              <p className="mb-4 text-[15px] leading-relaxed text-on-surface-variant">
                {text}
              </p>
              <p className="mt-auto pt-3 text-[12px] font-semibold tracking-[0.12em] text-on-surface-variant/80 uppercase">
                {spec}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
