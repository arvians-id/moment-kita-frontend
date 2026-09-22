import Image from "next/image";

import { Container } from "@/components/shared/container";

const mosaic = [
  {
    caption: "Tactile Print Suite",
    src: "/images/marketing/garden-stationery-suite.png",
    alt: "Handcrafted invitation suite on deckle-edge cotton paper with silk ribbon and a wax seal",
    offset: false,
  },
  {
    caption: "Digital Companion",
    src: "/images/marketing/digital-invitation-phone.png",
    alt: "Digital wedding invitation displayed on a phone resting on linen beside dried pampas grass",
    offset: true,
  },
] as const;

const measures = [
  { value: "600–900", unit: "gsm", label: "Pure European Cotton" },
  { value: "< 1.2", unit: "s", label: "Global Edge Latency" },
] as const;

export function AboutGenesis() {
  return (
    <section className="w-full bg-surface-lowest py-12 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              The Genesis
            </span>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Bridging the dichotomy of the modern invitation.
            </h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">
              For decades, engaged couples were presented with a forced
              concession: compromise either on the tactile poetry of physical
              paper or the fluid convenience of modern software. Mass-market
              digital invitations felt synthetic, riddled with platform branding
              and disposable form templates. Conversely, bespoke letterpress
              houses often demanded four-month lead times, high error
              liabilities, and manual guest tracking spreadsheets.
            </p>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">
              Moment Kita was born to restore reverence, aesthetic autonomy, and
              quiet ease to both mediums under a single design language. We
              treat web experiences with the typographic rigor of 19th-century
              publishing, and print suites with the exacting calibration of
              architectural drafting.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {measures.map(({ value, unit, label }, index) => (
                <div key={label} className="flex items-center gap-4">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="h-10 w-px bg-surface-highest"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <span className="font-serif text-[22px] leading-[30px] font-semibold">
                      {value}
                      <span className="text-base text-secondary">{unit}</span>
                    </span>
                    <span className="text-[13px] leading-5 text-on-surface-variant">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row lg:col-span-7">
            {mosaic.map(({ caption, src, alt, offset }) => (
              <figure
                key={caption}
                className={`group relative w-full overflow-hidden bg-surface-low shadow-xl sm:w-1/2 ${offset ? "sm:-mt-12" : ""}`}
              >
                <div className="relative h-[320px] w-full sm:h-[420px]">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] text-white uppercase">
                    {caption}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
