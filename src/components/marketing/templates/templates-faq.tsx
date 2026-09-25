"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question:
      "Bisakah template diganti setelah daftar tamu dan kisah pernikahan diisi?",
    answer:
      "Bisa. Daftar tamu, jadwal, pilihan makanan, jawaban RSVP, dan galeri foto tersimpan terpisah dari tema desain. Template yang didukung dapat diganti tanpa menghilangkan konten Anda.",
  },
  {
    question: "Bisakah desain digital dipadukan dengan versi cetak?",
    answer:
      "Setiap edisi dalam koleksi kami memiliki pasangan cetak di atas kertas katun 600gsm. Versi cetak juga dapat memuat kode QR kecil agar tamu mudah membuka undangan digital.",
  },
  {
    question: "Bagaimana musik dan peta interaktif hadir di undangan digital?",
    answer:
      "Undangan dapat dibuka dengan musik latar yang lembut. Petunjuk arah lokasi akan terbuka di aplikasi peta pilihan tamu, lengkap dengan informasi parkir dan kedatangan.",
  },
  {
    question: "Berapa lama proses proof dan produksi undangan cetak?",
    answer:
      "Proof digital disiapkan dalam beberapa hari kerja. Setelah disetujui, proses letterpress dan foil stamping memerlukan sekitar dua hingga tiga minggu, lalu pesanan dikirim melalui kurir terlacak.",
  },
] as const;

export function TemplatesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mb-2 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Pertanyaan Umum
            </span>
            <h2 className="mb-4 font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
              Panduan Memilih Template
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
              Pilihan undangan membangun suasana pertama untuk perayaan Anda.
              Berikut cara undangan digital dan fine stationery berpadu dengan
              selaras.
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
            >
              <span>Lihat proses lengkap</span>
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>

          <div className="space-y-4 lg:col-span-8">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <article
                  key={item.question}
                  className="rounded-[12px] bg-surface-lowest p-6 shadow-sm"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`templates-faq-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-5 text-left"
                    >
                      <span className="font-serif text-lg leading-7 transition-colors group-hover:text-secondary md:text-[22px] md:leading-[30px] md:font-semibold">
                        {item.question}
                      </span>
                      <ChevronDown
                        aria-hidden
                        size={20}
                        className={`shrink-0 text-on-surface-variant transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  {isOpen ? (
                    <p
                      id={`templates-faq-${index}`}
                      className="mt-4 pt-4 text-[15px] leading-relaxed text-on-surface-variant"
                    >
                      {item.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
