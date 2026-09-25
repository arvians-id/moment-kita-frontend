"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Bisakah informasi pernikahan diubah setelah dipublikasikan?",
    answer:
      "Bisa. Konten undangan yang didukung dapat diperbarui setelah finalisasi, sementara template dan alamat undangan tetap sama.",
  },
  {
    question: "Bisakah saya menggunakan nama domain sendiri?",
    answer:
      "Domain khusus belum tersedia saat ini. Undangan menggunakan alamat publik Moment Kita yang ditampilkan saat pengaturan.",
  },
  {
    question: "Bisakah template diganti setelah detail undangan diisi?",
    answer:
      "Template akan ditetapkan saat finalisasi agar undangan yang dipublikasikan tetap konsisten. Gunakan pratinjau sebelum menentukan pilihan.",
  },
  {
    question: "Berapa lama undangan pernikahan kami tetap aktif?",
    answer:
      "Masa aktif mengikuti durasi paket yang dipilih. Detailnya akan terlihat pada ketentuan setiap paket.",
  },
  {
    question: "Respons tamu apa saja yang dapat dikumpulkan?",
    answer:
      "Template dan paket yang mendukung dapat mengumpulkan konfirmasi kehadiran, jumlah rombongan, informasi makanan, ucapan, dan detail tamu lainnya.",
  },
  {
    question: "Bisakah kami menyertakan informasi hadiah?",
    answer:
      "Bisa. Bagian undangan yang didukung dapat menampilkan informasi hadiah atau rekening pilihan pasangan dengan tampilan yang tetap elegan.",
  },
] as const;

export function DigitalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            Informasi Penting
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>
        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={item.question} className="bg-white p-6 shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`digital-faq-${index}`}
                >
                  <span className="font-serif text-base leading-6 sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={19}
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p
                    id={`digital-faq-${index}`}
                    className="pt-4 text-[13px] leading-6 text-on-surface-variant"
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
