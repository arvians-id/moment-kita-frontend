import { ChevronDown } from "lucide-react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question:
      "Apakah ada langganan bulanan atau biaya perpanjangan tersembunyi?",
    answer:
      "Paket saat ini menggunakan harga sekali bayar. Masa aktif undangan mengikuti durasi yang tercantum pada paket.",
  },
  {
    question:
      "Bisakah saya meningkatkan paket dari Essential ke Signature atau Prestige?",
    answer:
      "Ketersediaan peningkatan paket mengikuti ketentuan paket, transaksi, dan kuota yang berlaku saat fitur tersebut tersedia.",
  },
  {
    question: "Bagaimana alur deposit dan produksi stationery cetak?",
    answer:
      "Pesanan cetak ditawarkan dan dikonfirmasi secara manual. Jadwal deposit, persetujuan proof, pelunasan, produksi, dan pengiriman disepakati langsung bersama tim kami.",
  },
  {
    question: "Bagaimana kebijakan pembatalan dan pengembalian dana?",
    answer:
      "Kebijakan final akan ditampilkan sebelum transaksi. Ketentuan pengembalian dana mengikuti aturan komersial yang berlaku.",
  },
  {
    question: "Bisakah saya meminta Swatch Kit sebelum memesan undangan cetak?",
    answer:
      "Contoh material dapat diminta melalui tim kami. Ketersediaan, isi, harga, dan pengiriman dikonfirmasi untuk setiap permintaan.",
  },
] as const;

export function PricingFaq() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            03 — Informasi yang Jelas
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Informasi penting mengenai akses digital, peningkatan paket, deposit
            cetak, dan Swatch Kit.
          </p>
        </div>
        <div className="max-w-4xl space-y-4">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg bg-surface-lowest p-5 shadow-sm sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg leading-7">
                {item.question}
                <ChevronDown
                  aria-hidden
                  size={18}
                  className="shrink-0 text-secondary transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 border-t border-surface-container pt-4 text-sm leading-7 text-on-surface-variant">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
