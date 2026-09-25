import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const disciplines = [
  {
    id: "digital-suite",
    label: "Pilihan A",
    title: "Undangan Digital Interaktif",
    badge: "Siap dengan cepat",
    image: "/images/marketing/digital-invitation-phone.png",
    imageAlt:
      "Ponsel yang menampilkan undangan pernikahan digital di atas kain linen alami.",
    description:
      "Untuk pasangan yang menginginkan koordinasi tamu yang mudah, berbagi dengan cepat, dan kisah digital berlapis tanpa kehilangan keindahannya.",
    features: [
      "Pemantauan respons RSVP",
      "Tautan personal untuk tamu",
      "Bab perjalanan cinta",
      "Peta dan detail acara",
      "Galeri dan ucapan",
      "Nyaman di perangkat seluler",
    ],
    meta: "Atur secara mandiri",
    price: "Mulai Rp299 ribu",
    href: "/templates",
    action: "Lihat template",
    accent: false,
  },
  {
    id: "print-atelier",
    label: "Pilihan B",
    title: "Stationery Cetak Bertekstur",
    badge: "Dibuat sesuai pesanan",
    image: "/images/marketing/embossed-cotton-invitation.png",
    imageAlt:
      "Undangan pernikahan berbahan katun dengan emboss, kaligrafi tembaga, dan monogram botani.",
    description:
      "Untuk pasangan yang menyukai kesan nyata dan tahan lama. Setiap rangkaian dibahas langsung, memadukan tipografi, kertas, dan finishing pilihan.",
    features: [
      "Kertas katun tebal",
      "Blind deboss dan foil",
      "Monogram khusus",
      "Lapisan sutra dan vellum",
      "Finishing segel lilin",
      "Konsultasi personal",
    ],
    meta: "Pesanan khusus",
    price: "Penawaran sesuai kebutuhan",
    href: "/contact",
    action: "Konsultasi dengan kami",
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
            kicker="01 — Dua pilihan undangan"
            title="Pilih Digital, Cetak, atau Padukan Keduanya"
          />
          <p className="max-w-lg text-sm leading-6 text-on-surface-variant md:justify-self-end">
            Baik untuk kemudahan mengelola tamu maupun kenang-kenangan kertas,
            keduanya dirancang dengan perhatian yang sama.
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
                      : "Katun · Emboss · Foil hangat"}
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
