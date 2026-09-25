import {
  ArrowRight,
  BookOpen,
  CloudCog,
  Fingerprint,
  MoveUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const pillars = [
  {
    icon: BookOpen,
    kicker: "01 / Estetika",
    title: "Tipografi yang Anggun & Tenang",
    text: "Terinspirasi tata letak editorial klasik dan proporsi Swiss. Setiap pasangan font, jarak baris, dan ruang kosong ditata untuk menghadirkan emosi serta keindahan yang tahan lama.",
    footnote: "Kerning ditata dengan teliti",
  },
  {
    icon: CloudCog,
    kicker: "02 / Digital",
    title: "Teknologi yang Terasa Hangat",
    text: "Teknologi tidak seharusnya terasa dingin. Undangan digital kami dimuat cepat, mendukung koordinasi RSVP real-time, informasi hadiah langsung, dan akses tamu privat tanpa iklan atau unduhan aplikasi.",
    footnote: "Pengalaman tamu yang privat",
  },
  {
    icon: Fingerprint,
    kicker: "03 / Material",
    title: "Kenang-kenangan yang Bertahan",
    text: "Dikerjakan bersama perajin berpengalaman menggunakan mesin Heidelberg platen era 1950-an, kertas katun 600–900gsm, tepi deckle, foil tembaga, dan monogram segel lilin.",
    footnote: "Mesin cetak Heidelberg platen",
  },
] as const;

export function AboutPhilosophy() {
  return (
    <section className="w-full bg-surface-low py-12 lg:py-28">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-1">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Filosofi Kami
            </span>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Tiga komitmen yang memandu setiap pilihan tipografi, baris kode,
              dan proses cetak di atas katun.
            </h2>
          </div>
          <p className="hidden text-right text-[12px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase lg:block">
            Digital &amp; Fine Print
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, kicker, title, text, footnote }) => (
            <article
              key={kicker}
              className="flex flex-col justify-between bg-surface-lowest p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                    {kicker}
                  </span>
                  <Icon
                    aria-hidden
                    size={20}
                    className="shrink-0 text-on-surface-variant"
                  />
                </div>
                <h3 className="font-serif text-[22px] leading-[30px] font-semibold">
                  {title}
                </h3>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">
                  {text}
                </p>
              </div>
              <p className="flex items-center gap-1 pt-7 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
                <span>{footnote}</span>
                <ArrowRight aria-hidden size={14} />
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="overflow-hidden shadow-md md:col-span-7">
            <div className="relative h-[280px] w-full sm:h-[360px]">
              <Image
                src="/images/marketing/embossed-cotton-invitation.png"
                alt="Blind deboss dan letterpress foil copper-rose di atas kertas katun tebal bertepi deckle"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-surface-container p-7 md:col-span-5">
            <span className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Kesan yang Dapat Disentuh
            </span>
            <h3 className="mb-2 font-serif text-[22px] leading-[30px] font-semibold">
              Blind deboss dalam &amp; foil tembaga hangat.
            </h3>
            <p className="text-[13px] leading-relaxed text-on-surface-variant">
              Setiap lembar dicetak dengan tangan. Kami percaya bobot fisik
              sebuah undangan—tekstur khas katun murni yang bertemu tekanan
              cetak—menjadi bagian penting dari kenangan.
            </p>
            <Link
              href="/printed"
              className="mt-4 flex items-center gap-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
            >
              <span>Lihat Pilihan Material</span>
              <MoveUpRight aria-hidden size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
