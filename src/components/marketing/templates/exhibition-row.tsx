import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const exhibits = [
  {
    key: "sienna-01",
    badge: "Terracotta & Warm Ochre",
    kicker: "Mediterranean Warmth",
    price: "Rp499.000 / Rp1.350.000+",
    name: "Sienna & Solstice",
    description:
      "Earthy terracotta tones paired with sun-drenched photography layouts and relaxed editorial styling for al fresco celebrations.",
    footnote: "Digital + Physical",
    image: "/images/marketing/sunlit-stationery-table.png",
    alt: "Sienna & Solstice terracotta letterpress invitation suite",
  },
  {
    key: "copenhagen-01",
    badge: "Pure Minimalist",
    kicker: "Nordic Restraint",
    price: "Rp499.000 Digital",
    name: "Copenhagen Reverie",
    description:
      "Hyper-focused on typographic breathing room, micro-grid alignment, and rapid one-tap RSVP confirmations.",
    footnote: "Digital Native",
    image: "/images/marketing/digital-invitation-phone.png",
    alt: "Copenhagen Reverie clean Scandinavian digital invitation layout",
  },
  {
    key: "elegant-01",
    badge: "Archival Letterpress",
    kicker: "Royal Heraldry",
    price: "From Rp1.650.000 / set",
    name: "Atelier Heritage",
    description:
      "Designed after classical court invitations, featuring hand-beveled gilded edges and a bespoke family motto rendering.",
    footnote: "Fine Print Special",
    image: "/images/marketing/embossed-cotton-invitation.png",
    alt: "Atelier Heritage archival letterpress card with a blind deboss crest",
  },
] as const;

export function ExhibitionRow() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Extended Catalog
            </span>
            <h2 className="font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
              Tailored for Every Celebration Architecture
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant">
            Showing all curated templates
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {exhibits.map((item) => (
            <article
              key={item.key}
              className="group flex flex-col justify-between overflow-hidden rounded-[16px] bg-surface-lowest shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-[4px] bg-surface/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                      {item.kicker}
                    </span>
                    <span className="font-mono text-xs font-semibold whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-[22px] leading-[30px] font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-6 pt-2 pb-6">
                <span className="font-mono text-xs text-on-surface-variant">
                  {item.footnote}
                </span>
                <Link
                  href={`/templates/${item.key}`}
                  className="flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:text-secondary"
                >
                  <span>View Suite</span>
                  <ArrowRight aria-hidden size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
