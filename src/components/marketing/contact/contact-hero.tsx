import Image from "next/image";

import { Container } from "@/components/shared/container";

const images = [
  {
    src: "/images/marketing/sunlit-stationery-table.png",
    alt: "Deckle-edge wedding stationery arranged beside flowers in natural studio light",
    label: "Maison Craft — Cotton Paper & Deboss",
    className: "md:col-span-7",
  },
  {
    src: "/images/marketing/hero-stationery-suite.png",
    alt: "Tactile wedding stationery with silk ribbon, wax seal, and botanical details",
    label: "Tactile Ensembles — Physical Atelier",
    className: "md:col-span-5",
  },
] as const;

export function ContactHero() {
  return (
    <>
      <section className="pt-12 pb-7 sm:pt-16 sm:pb-9 lg:pt-20">
        <Container className="grid items-end gap-8 lg:grid-cols-[1.55fr_0.85fr] lg:gap-16">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-secondary uppercase">
              08 — Concierge &amp; Correspondence
            </p>
            <h1 className="mt-3 font-serif text-[2.75rem] leading-[1.02] tracking-[-0.035em] text-primary sm:text-6xl lg:text-[5.25rem]">
              Let&apos;s <em className="font-normal">talk</em> about your
              invitation.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-on-surface-variant sm:text-base sm:leading-8 lg:pb-1">
            Whether you are designing a real-time digital suite for immediate
            guest delivery or commissioning an archival letterpress keepsake,
            our concierge and typographers are at your service.
          </p>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-12">
            {images.map((image) => (
              <figure
                key={image.src}
                className={`group relative min-h-[280px] overflow-hidden bg-surface-container shadow-[0_8px_24px_-18px_rgba(28,28,24,0.35)] sm:min-h-[340px] ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(min-width: 768px) 58vw, 100vw"
                />
                <figcaption className="absolute bottom-4 left-4 bg-surface/90 px-3 py-2 text-[9px] font-semibold tracking-[0.12em] uppercase shadow-sm backdrop-blur-md">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
