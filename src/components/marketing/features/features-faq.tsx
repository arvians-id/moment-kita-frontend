"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question:
      "Bisakah tamu melihat undangan tanpa mengunduh aplikasi atau membuat akun?",
    answer:
      "Bisa. Tamu dapat membuka undangan melalui browser modern tanpa memasang aplikasi atau membuat akun terpisah.",
  },
  {
    question: "Bagaimana cara kerja amplop digital?",
    answer:
      "Undangan dapat menampilkan petunjuk hadiah pilihan pasangan dalam bagian yang rapi, tanpa mengalihkan tamu ke pengalaman lain.",
  },
  {
    question:
      "Bisakah detail pernikahan diperbarui setelah undangan dibagikan?",
    answer:
      "Bisa. Konten yang didukung dapat diperbarui setelah finalisasi, sementara template dan alamat undangan tetap sama.",
  },
  {
    question: "Apakah daftar tamu dan data acara kami tetap rahasia?",
    answer:
      "Moment Kita dirancang untuk akses undangan yang privat. Tidak ada iklan, dan tampilan publik hanya memperlihatkan konten yang memang ditujukan untuk tamu.",
  },
] as const;

export function FeaturesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="features-faq"
      className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="pb-2 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            05 — Informasi &amp; Dukungan
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Pertanyaan yang sering diajukan.
          </h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Informasi penting tentang akses browser, pembaruan undangan, hadiah,
            dan privasi tamu.
          </p>
        </div>
        <div className="space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl bg-surface-low"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 p-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`features-faq-answer-${index}`}
                >
                  <span className="font-serif text-lg leading-6">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={20}
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p
                    id={`features-faq-answer-${index}`}
                    className="px-4 pb-4 text-sm leading-6 text-on-surface-variant"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
