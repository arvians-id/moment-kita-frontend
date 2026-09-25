"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Berapa jumlah minimum pemesanan undangan cetak?",
    answer:
      "Produksi standar dimulai dari 50 set untuk menyesuaikan pembuatan pelat khusus dan persiapan mesin Heidelberg. Pesanan lebih kecil mulai 30 set tersedia dalam pilihan Perayaan Intim.",
  },
  {
    question: "Berapa lama proses desain dan produksi?",
    answer:
      "Proof tipografi dikirim melalui WhatsApp dalam 48 jam. Setelah persetujuan akhir, produksi, pembuatan tepi manual, foil stamping, dan pengeringan membutuhkan 3–4 minggu. Produksi ekspres 14 hari tersedia sesuai kapasitas tim.",
  },
  {
    question: "Bisakah kami meminta contoh kertas dan foil sebelum memesan?",
    answer:
      "Tentu. Kami menyarankan Swatch Kit (Rp250.000, diperhitungkan ke pesanan undangan Anda) yang berisi pilihan ketebalan kertas, warna foil, pita, dan contoh segel lilin.",
  },
  {
    question:
      "Mengapa pesanan dilakukan melalui WhatsApp, bukan checkout otomatis?",
    answer:
      "Undangan letterpress memiliki banyak detail personal, mulai dari karakter kertas, kedalaman deboss, palet warna, hingga susunan kata. Konsultasi WhatsApp langsung membantu setiap keputusan dibuat dengan tepat.",
  },
  {
    question: "Bisakah stationery cetak dipadukan dengan undangan digital?",
    answer:
      "Bisa. Undangan digital dapat menggunakan tipografi, monogram gambar tangan, dan nuansa warna yang selaras. Kartu cetak juga dapat memuat kode QR kecil pada kartu detail.",
  },
  {
    question: "Apakah tersedia penulisan alamat tamu dan kaligrafi?",
    answer:
      "Kami menyediakan cetak alamat tamu dengan gaya kaligrafi yang selaras dengan tipografi utama, serta kaligrafi tulisan tangan menggunakan pena celup.",
  },
] as const;

export function PrintedFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-surface-low py-12">
      <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8 lg:px-14">
        <div className="mb-12 text-center">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Panduan &amp; Informasi
          </p>
          <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="rounded-[8px] bg-surface-lowest p-6 shadow-sm"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`printed-faq-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-serif text-base leading-6 sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden
                      size={20}
                      className={`shrink-0 text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <p
                    id={`printed-faq-${index}`}
                    className="mt-3 border-t border-surface-container pt-3 text-[13px] leading-5 text-on-surface-variant"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
