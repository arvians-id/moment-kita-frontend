"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const questions = [
  {
    question: "Bisakah undangan digital dipadukan dengan set cetak?",
    answer:
      "Tentu. Undangan digital dapat dibagikan kepada lebih banyak tamu, sementara edisi cetak disiapkan untuk keluarga, sahabat dekat, atau disimpan sebagai kenang-kenangan.",
  },
  {
    question:
      "Mengapa pesanan cetak dibahas langsung, bukan melalui keranjang?",
    answer:
      "Berat dan tekstur kertas, finishing, jumlah, serta perakitan memengaruhi hasil akhir. Percakapan langsung membantu kami merekomendasikan pilihan yang sesuai dengan perayaan dan anggaran Anda.",
  },
  {
    question: "Bagaimana respons tamu digital dikumpulkan?",
    answer:
      "Tamu dapat mengirim respons melalui undangan yang telah dipublikasikan. Pengelolaannya tersedia di area khusus pelanggan.",
  },
  {
    question:
      "Seberapa cepat kami bisa mulai mempersonalisasi undangan digital?",
    answer:
      "Anda dapat menjelajahi koleksi visual sekarang, lalu membuat akun untuk melanjutkan personalisasi undangan.",
  },
  {
    question: "Pilihan finishing dan ketebalan kertas apa yang tersedia?",
    answer:
      "Pilihan kami mencakup kertas katun tebal, tepi deckle, blind deboss, foil metalik, lapisan vellum, pita, dan segel lilin. Ketersediaan pastinya dikonfirmasi saat konsultasi.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <Container className="max-w-[960px]">
        <EditorialHeading
          kicker="06 — Jawaban untuk Anda"
          title="Pertanyaan yang Sering Diajukan"
          align="center"
        />
        <div className="mt-12 space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `home-faq-answer-${index}`;

            return (
              <div key={item.question} className="bg-surface-lowest shadow-sm">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left font-serif text-base sm:p-6 sm:text-xl"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    {isOpen ? (
                      <Minus
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-secondary"
                      />
                    ) : (
                      <Plus
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-secondary"
                      />
                    )}
                  </button>
                </h3>
                <div
                  id={answerId}
                  hidden={!isOpen}
                  className="px-5 pb-6 text-sm leading-6 text-on-surface-variant sm:px-6"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
