import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const disciplines = [
  {
    id: "digital-suite",
    label: "Discipline A",
    title: "Interactive Digital Suite",
    badge: "Instant setup",
    image: "/images/marketing/digital-invitation-phone.png",
    imageAlt:
      "A smartphone displaying an editorial digital wedding invitation on natural linen.",
    description:
      "For couples who want effortless guest coordination, immediate sharing, and a layered digital story without losing visual reverence.",
    features: [
      "RSVP response tracking",
      "Personal guest links",
      "Love-story chapters",
      "Map and event details",
      "Gallery and wishes",
      "Mobile-first experience",
    ],
    meta: "Self-guided platform",
    price: "From Rp299K",
    href: "/templates",
    action: "Browse templates",
    accent: false,
  },
  {
    id: "print-atelier",
    label: "Discipline B",
    title: "Tactile Artisan Fine Print",
    badge: "Made to order",
    image: "/images/marketing/embossed-cotton-invitation.png",
    imageAlt:
      "Embossed cotton wedding invitation with copper calligraphy and a botanical monogram.",
    description:
      "For couples drawn to tactile permanence. Every suite is discussed directly, pairing considered typography with papers and finishes chosen by hand.",
    features: [
      "Heavy cotton paper",
      "Blind deboss and foil",
      "Custom monograms",
      "Silk and vellum layers",
      "Wax-seal finishing",
      "Personal consultation",
    ],
    meta: "Artisan commission",
    price: "Tailored quotation",
    href: "/contact",
    action: "Consult the atelier",
    accent: true,
  },
] as const;

export function DisciplineShowcase() {
  return (
    <section
      id="disciplines"
      className="scroll-mt-20 bg-surface-low py-20 lg:py-28"
    >
      <Container>
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <EditorialHeading
            kicker="01 — The two disciplines"
            title="Choose Your Medium or Harmonize Both"
          />
          <p className="max-w-lg text-sm leading-6 text-on-surface-variant md:justify-self-end">
            Whether you seek fluid guest logistics or irreplaceable paper
            keepsakes, both expressions are shaped with the same editorial care.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {disciplines.map((discipline) => (
            <article
              key={discipline.id}
              id={discipline.id}
              className="group flex scroll-mt-28 flex-col overflow-hidden bg-surface-lowest shadow-[0_18px_40px_-22px_rgba(46,38,33,0.22)]"
            >
              <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
                    {discipline.label}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight sm:text-[1.75rem]">
                    {discipline.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-surface-container px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] uppercase">
                  {discipline.badge}
                </span>
              </div>

              <div className="px-6 sm:px-8">
                <div className="relative h-72 overflow-hidden bg-surface-container sm:h-80">
                  <Image
                    src={discipline.image}
                    alt={discipline.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 text-[10px] tracking-[0.08em] backdrop-blur">
                    {discipline.id === "digital-suite"
                      ? "momentkita.id/raka-ayu"
                      : "Cotton · Emboss · Warm foil"}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-sm leading-6 text-on-surface-variant">
                  {discipline.description}
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                  {discipline.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2
                        aria-hidden="true"
                        size={15}
                        className="shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="-mx-6 -mb-6 mt-8 flex flex-col gap-5 bg-surface-low p-6 sm:-mx-8 sm:-mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.17em] text-on-surface-variant uppercase">
                      {discipline.meta}
                    </p>
                    <p className="mt-1 font-serif text-xl">
                      {discipline.price}
                    </p>
                  </div>
                  <Link
                    href={discipline.href}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 px-5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                      discipline.accent
                        ? "bg-secondary text-secondary-foreground hover:bg-primary"
                        : "bg-primary text-primary-foreground hover:bg-secondary"
                    }`}
                  >
                    {discipline.accent ? (
                      <MessageCircle aria-hidden="true" size={15} />
                    ) : null}
                    {discipline.action}
                    {!discipline.accent ? (
                      <ArrowRight aria-hidden="true" size={15} />
                    ) : null}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
