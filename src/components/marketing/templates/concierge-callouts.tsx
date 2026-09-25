import { MessageCircle, Package, Palette } from "lucide-react";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const bespokeServices = [
  { title: "Monogram Khusus", text: "Emblem vektor gambar tangan" },
  { title: "Ilustrasi Lokasi", text: "Gambar khusus venue & vila" },
] as const;

export function ConciergeCallouts() {
  return (
    <section
      id="concierge-sample"
      className="scroll-mt-20 bg-surface-low py-16"
    >
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex h-full flex-col justify-between rounded-[16px] bg-surface-lowest p-8 shadow-sm sm:p-10 lg:col-span-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Package aria-hidden size={24} className="text-secondary" />
                <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  Pengalaman Material
                </span>
              </div>
              <h2 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                Pesan Kotak Contoh Material
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
                Rasakan langsung materialnya sebelum memesan. Berisi kartu katun
                600gsm &amp; 800gsm, contoh foil metalik (rose gold, champagne,
                matte copper), segel lilin, dan amplop kertas pilihan.
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-[12px] bg-surface-low px-4 py-3">
                <span className="font-serif text-[22px] leading-[30px] font-semibold">
                  Rp250.000
                </span>
                <span className="flex-1 text-xs leading-tight text-on-surface-variant">
                  <strong className="font-semibold">100% diperhitungkan</strong>{" "}
                  ke nilai produksi atau pesanan cetak akhir Anda.
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappHref(
                  "Halo Moment Kita, saya ingin memesan Kotak Contoh Material.",
                )}
                {...externalLinkProps}
                className="w-full rounded-[8px] bg-primary px-6 py-3.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary sm:w-auto"
              >
                Pesan Kotak Contoh
              </a>
              <span className="font-mono text-xs text-on-surface-variant">
                Dikirim setelah konfirmasi tim
              </span>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between rounded-[16px] bg-surface-lowest p-8 shadow-sm sm:p-10 lg:col-span-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Palette aria-hidden size={24} className="text-secondary" />
                <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  Monogram Tipografi Khusus
                </span>
              </div>
              <h2 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                Perlu Monogram atau Ilustrasi Lokasi Khusus?
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
                Setiap template dapat dilengkapi ilustrasi khusus. Tim kami
                dapat menggambar lokasi pernikahan, monogram keluarga, atau peta
                ilustratif untuk template pilihan Anda.
              </p>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {bespokeServices.map(({ title, text }) => (
                  <div key={title} className="rounded-[8px] bg-surface-low p-3">
                    <span className="block text-[11px] font-semibold tracking-[0.12em] uppercase">
                      {title}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappHref(
                  "Halo Moment Kita, saya ingin mendiskusikan monogram atau ilustrasi lokasi khusus.",
                )}
                {...externalLinkProps}
                className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-surface-container px-6 py-3.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
              >
                <MessageCircle aria-hidden size={16} />
                <span>Konsultasikan dengan Kami</span>
              </a>
              <span className="font-mono text-xs text-on-surface-variant">
                Balasan pada jam operasional
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
