import {
  BadgeCheck,
  Eye,
  Mailbox,
  Music2,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const highlights = [
  {
    icon: Music2,
    title: "Musik Latar Pilihan",
    text: "Audio instrumental terintegrasi untuk mengiringi pembukaan undangan digital.",
  },
  {
    icon: Mailbox,
    title: "RSVP Beberapa Acara & Pilihan Menu",
    text: "RSVP untuk acara penyambutan, jamuan, dan acara utama yang tersinkron dengan daftar tamu.",
  },
  {
    icon: ShieldCheck,
    title: "Set Cetak Foil & Blind Deboss",
    text: "Dikerjakan dengan tangan, dilengkapi amplop pilihan dan segel lilin.",
  },
] as const;

const specs = [
  { label: "Bahan Kertas", value: "Katun 600 GSM" },
  { label: "Finishing Khusus", value: "Copper Foil & Deboss" },
  { label: "Fitur Digital", value: "Tautan Personal + RSVP" },
] as const;

export function FeaturedMonograph() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-[16px] bg-surface-lowest shadow-xl shadow-stone-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative flex flex-col justify-between overflow-hidden bg-[#f8f5ee] p-6 sm:p-10 lg:col-span-7 lg:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -mt-20 -mr-20 top-0 right-0 size-96 rounded-full bg-accent/40 blur-3xl"
              />
              <div className="z-10 mb-8 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-surface-lowest px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase shadow-sm">
                    Pilihan Moment Kita
                  </span>
                  <span className="font-mono text-[13px] leading-5 text-on-surface-variant">
                    Edisi 01
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-secondary">
                  <BadgeCheck aria-hidden size={18} />
                  <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase">
                    Digital &amp; Cetak Selaras
                  </span>
                </div>
              </div>

              <div className="relative my-8 flex min-h-[420px] items-center justify-center lg:min-h-[480px]">
                <div className="w-11/12 overflow-hidden rounded-[12px] shadow-2xl transition-transform duration-500 hover:scale-[1.01] md:w-3/4">
                  <div className="relative h-[360px] w-full md:h-[440px]">
                    <Image
                      src="/images/marketing/hero-stationery-suite.png"
                      alt="Le Jardin Minimaliste printed suite on 600gsm deckle-edge cotton paper"
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-6 right-2 w-44 rounded-[2.5rem] bg-primary p-2 shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:right-6 sm:w-56 md:right-10 md:w-64">
                  <div className="relative w-full overflow-hidden rounded-[2.2rem] bg-surface">
                    <span
                      aria-hidden
                      className="absolute top-0 left-1/2 z-20 h-4 w-20 -translate-x-1/2 rounded-b-lg bg-primary"
                    />
                    <div className="relative h-[280px] w-full sm:h-[340px]">
                      <Image
                        src="/images/marketing/digital-invitation-phone.png"
                        alt="Digital interactive invitation screen for Le Jardin Minimaliste"
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute right-3 bottom-3 left-3 rounded-[8px] bg-surface/90 p-2 text-center shadow-md backdrop-blur-md">
                      <span className="block text-[9px] font-semibold tracking-[0.2em] text-secondary uppercase">
                        RSVP Tamu Digital
                      </span>
                      <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                        Musik • Audio Aktif
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="z-10 grid grid-cols-1 gap-3 pt-6 sm:grid-cols-3">
                {specs.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-[8px] bg-surface-lowest/80 p-3 shadow-sm backdrop-blur-sm"
                  >
                    <span className="block text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                      {label}
                    </span>
                    <span className="text-[13px] leading-5 font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between bg-surface-lowest p-8 sm:p-12 lg:col-span-5 lg:p-16">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                    Botanical Monolith
                  </span>
                  <span aria-hidden className="text-xs text-on-surface-variant">
                    /
                  </span>
                  <span className="text-[13px] leading-5 text-on-surface-variant">
                    Kreasi Moment Kita
                  </span>
                </div>
                <h2 className="mb-4 font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
                  Le Jardin Minimaliste
                </h2>
                <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
                  Nuansa botani yang tenang berpadu dengan serif editorial yang
                  tegas. Dilengkapi pembukaan segel lilin digital dan pasangan
                  cetak dengan tepi deckle bertekstur.
                </p>

                <div className="mb-8 space-y-3.5">
                  {highlights.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex items-start gap-3">
                      <Icon
                        aria-hidden
                        size={20}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      <div>
                        <h3 className="text-[13px] leading-5 font-semibold">
                          {title}
                        </h3>
                        <p className="text-[13px] leading-5 text-on-surface-variant">
                          {text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-[12px] bg-surface-low p-4">
                  <div>
                    <span className="block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                      Harga Rangkaian
                    </span>
                    <span className="font-serif text-[22px] leading-[30px] font-semibold">
                      Rp499.000{" "}
                      <span className="font-sans text-[13px] font-normal text-on-surface-variant">
                        Digital
                      </span>
                      <span className="mx-1 text-xs text-on-surface-variant">
                        •
                      </span>
                      <span className="font-sans text-[13px] font-normal text-on-surface-variant">
                        mulai
                      </span>{" "}
                      Rp1.250.000{" "}
                      <span className="font-sans text-[13px] font-normal text-on-surface-variant">
                        / set cetak
                      </span>
                    </span>
                  </div>
                  <span className="inline-block rounded-[4px] bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-accent-foreground uppercase">
                    Siap Dipersonalisasi
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-6 py-3.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase shadow-sm transition-colors hover:bg-secondary sm:w-1/2"
                >
                  <span>Personalisasi Desain</span>
                  <PenLine aria-hidden size={16} />
                </Link>
                <Link
                  href="/templates/elegant-01"
                  className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-surface-container px-6 py-3.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-highest sm:w-1/2"
                >
                  <Eye aria-hidden size={16} />
                  <span>Demo Interaktif</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
