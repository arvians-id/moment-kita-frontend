import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const commissions = [
  {
    place: "Lake Como, Italy",
    title: "Villa Balbiano Commission",
    text: "120 bespoke suites in warm ivory with copper-rose heated foil, deckle edged Somerset cotton, and olive botanical hand-poured wax seal.",
    spec: "Suite Count: 120 · Finish: Copper Foil & Olive Seal",
    image: "/images/marketing/garden-stationery-suite.png",
    alt: "Ivory invitation suite finished with a copper wax seal and olive botanical detail",
  },
  {
    place: "Île-de-France, France",
    title: "Château de Villette Commission",
    text: "85 suites on heavy 700gsm cotton featuring a blind debossed family heritage crest, frayed French silk ribbons, and Italian calligraphy guest addressing.",
    spec: "Suite Count: 85 · Finish: Blind Deboss & French Silk",
    image: "/images/marketing/embossed-cotton-invitation.png",
    alt: "Blind debossed heritage crest pressed into heavy cotton paper",
  },
  {
    place: "New York City, USA",
    title: "Tribeca Rooftop Commission",
    text: "140 modern monolith suites featuring architectural typography, champagne metallic letterpress, black-wax stamp closures, and matching acrylic day-of menus.",
    spec: "Suite Count: 140 · Finish: Champagne Letterpress",
    image: "/images/marketing/copper-monogram-paper.png",
    alt: "Architectural monogram letterpressed in metallic foil on cotton paper",
  },
] as const;

export function CommissionGallery() {
  return (
    <section className="w-full bg-surface py-12 lg:py-28">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Archival Provenance
            </p>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Real Atelier Commissions
            </h2>
          </div>
          <a
            href={whatsappHref(
              "Hello Moment Kita, may I see the complete printed commission archive?",
            )}
            {...externalLinkProps}
            className="flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
          >
            <span>View complete archive</span>
            <ArrowRight aria-hidden size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {commissions.map(({ place, title, text, spec, image, alt }) => (
            <article key={title} className="group flex flex-col">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[8px] bg-surface-container">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                {place}
              </span>
              <h3 className="mb-2 font-serif text-[22px] leading-[30px] font-semibold">
                {title}
              </h3>
              <p className="mb-3 text-[13px] leading-5 text-on-surface-variant">
                {text}
              </p>
              <p className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant/80 uppercase">
                {spec}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
