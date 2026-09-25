import { Calculator, Check } from "lucide-react";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const tiers = [
  {
    tier: "Pilihan 01",
    name: "Perayaan Intim",
    summary: "Untuk pernikahan butik, intimate wedding, dan elopement.",
    price: "Rp2.400.000–2.900.000",
    unit: "/ set lengkap",
    guidance: "Disarankan untuk 30–50 Set",
    features: [
      "Undangan Utama di Kertas Katun 600gsm",
      "Kartu RSVP + Amplop Balasan Beralamat",
      "Amplop Utama dengan Alamat Pengirim",
      "1 Proses Foil Metalik atau Blind Deboss",
    ],
    cta: "Tanyakan untuk 30–50 Set",
    message:
      "Halo Moment Kita, saya ingin meminta penawaran untuk pilihan Perayaan Intim.",
    featured: false,
  },
  {
    tier: "Pilihan 02",
    name: "Perayaan Klasik",
    summary:
      "Rangkaian lengkap khas kami dengan detail yang dikerjakan dengan tangan.",
    price: "Rp1.850.000–2.250.000",
    unit: "/ set lengkap",
    guidance: "Disarankan untuk 75–125 Set",
    features: [
      "Undangan Utama di French Moulin 700gsm",
      "Kartu RSVP & Kartu Detail Berilustrasi",
      "Segel Lilin Monogram & Lapisan Vellum",
      "Finishing Tepi Deckle Buatan Tangan",
      "Sinkronisasi RSVP Digital",
    ],
    cta: "Tanyakan untuk 75–125 Set",
    message:
      "Halo Moment Kita, saya ingin meminta penawaran untuk pilihan Perayaan Klasik.",
    featured: true,
  },
  {
    tier: "Pilihan 03",
    name: "Grand Haute Couture",
    summary:
      "Untuk destination wedding beberapa hari dengan stationery hari acara.",
    price: "Khusus",
    unit: "/ rancangan personal",
    guidance: "Disarankan untuk 150+ Set",
    features: [
      "Kartu 900gsm Ekstra Tebal dengan Tepi Gilded",
      "Rangkaian 5 Bagian + Peta Khusus",
      "Alamat Tamu dengan Kaligrafi Tangan",
      "Stationery Hari Acara (Menu, Buku Janji, Signage)",
    ],
    cta: "Minta Konsultasi Personal",
    message:
      "Halo Moment Kita, saya ingin meminta penawaran untuk pilihan Grand Haute Couture.",
    featured: false,
  },
] as const;

export function PrintedPricing() {
  return (
    <section className="w-full bg-surface-low py-12">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Rincian Harga
          </p>
          <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Harga Cetak yang Transparan
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-on-surface-variant">
            Karena setiap set menggunakan letterpress dan finishing manual,
            harga mengikuti ketebalan kertas, jumlah proses foil, dan kuantitas.
            Tidak ada biaya pelat tersembunyi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.tier}
              className={`relative flex flex-col justify-between rounded-[8px] bg-surface-lowest p-8 ${
                tier.featured
                  ? "shadow-md ring-2 ring-secondary/30"
                  : "shadow-sm"
              }`}
            >
              {tier.featured ? (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-[11px] leading-4 font-semibold tracking-[0.2em] whitespace-nowrap text-secondary-foreground uppercase">
                  Paling Sering Dipesan
                </span>
              ) : null}
              <div>
                <p className="mb-2 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  {tier.tier}
                </p>
                <h3 className="mb-1 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                  {tier.name}
                </h3>
                <p className="mb-6 text-[13px] leading-5 text-on-surface-variant">
                  {tier.summary}
                </p>
                <p className="mb-6">
                  <span className="font-serif text-3xl sm:text-4xl">
                    {tier.price}
                  </span>{" "}
                  <span className="text-[13px] leading-5 text-on-surface-variant">
                    {tier.unit}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                    {tier.guidance}
                  </span>
                </p>
                <ul className="space-y-3 border-t border-surface-container py-6 text-[13px] leading-5 text-on-surface-variant">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={whatsappHref(tier.message)}
                {...externalLinkProps}
                className={`w-full rounded-[4px] py-3 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-secondary"
                    : "bg-surface-container hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[8px] bg-surface-container p-8 md:flex-row">
          <div>
            <h3 className="font-serif text-xl leading-7">
              Perlu penawaran sesuai jumlah tamu Anda?
            </h3>
            <p className="text-[13px] leading-5 text-on-surface-variant">
              Kirim jumlah dan pilihan item melalui WhatsApp untuk estimasi yang
              terperinci.
            </p>
          </div>
          <a
            href={whatsappHref(
              "Halo Moment Kita, saya ingin meminta penawaran stationery cetak sesuai kebutuhan.",
            )}
            {...externalLinkProps}
            className="flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap text-secondary-foreground uppercase shadow-sm transition-opacity hover:opacity-90"
          >
            <Calculator aria-hidden size={18} />
            <span>Minta Estimasi via WhatsApp</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
