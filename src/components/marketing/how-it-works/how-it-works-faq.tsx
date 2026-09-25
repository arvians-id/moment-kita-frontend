"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question: "Bisakah undangan digital dilanjutkan menjadi rangkaian cetak?",
    answer:
      "Bisa. Arah tipografi, palet, dan monogram dari undangan digital dapat diterapkan pada stationery cetak. Pesanan cetaknya dikonfirmasi secara terpisah bersama tim kami.",
  },
  {
    question: "Bagaimana proses revisi proof tipografi cetak?",
    answer:
      "Alur proof dijelaskan sebelum produksi dimulai. Tipografi, susunan kata, hierarki, dan catatan finishing ditinjau serta disetujui sebelum masuk ke proses cetak.",
  },
  {
    question:
      "Bagaimana jika tanggal atau lokasi berubah setelah undangan dipublikasikan?",
    answer:
      "Konten digital yang didukung dapat diperbarui tanpa mengubah alamat undangan. Materi cetak tidak dapat diubah setelah produksi disetujui, sehingga tim kami akan mendiskusikan langkah terbaik bersama Anda.",
  },
  {
    question:
      "Bisakah kami melihat pilihan kertas dan finishing sebelum memutuskan?",
    answer:
      "Tentu. Mulai dengan percakapan mengenai kertas, ketebalan, foil, deboss, dan tepi yang Anda pertimbangkan. Ketersediaan serta biaya sampel fisik akan dikonfirmasi oleh tim kami.",
  },
] as const;

export function HowItWorksFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pb-24 lg:pb-32">
      <Container className="max-w-4xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Informasi untuk Anda
          </p>
          <h2 className="mt-3 font-serif text-3xl text-primary sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="rounded-lg bg-surface-lowest px-6 shadow-sm sm:px-7"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-serif text-lg leading-7 text-primary sm:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={20}
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p className="border-t border-border pb-6 pt-4 text-sm leading-7 text-on-surface-variant">
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
