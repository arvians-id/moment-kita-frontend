"use client";

import {
  Check,
  Gem,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  PackageOpen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/shared/container";
import type { Package, PrintedProduct } from "@/types";
import { idrFormat as currency } from "@/lib/format";

type Mode = "digital" | "print";

const planPresentation = {
  essential: {
    label: "Atur mandiri",
    extras: [
      "Pengalaman tamu yang responsif",
      "Jadwal acara dan detail lokasi",
      "Koleksi template standar",
      "Dukungan melalui email",
    ],
  },
  signature: {
    label: "Direkomendasikan",
    extras: [
      "RSVP tamu dan detail makanan",
      "Bagian galeri dan cerita",
      "Personalisasi visual lebih luas",
      "Pendampingan prioritas",
    ],
  },
  prestige: {
    label: "Dengan pendampingan",
    extras: [
      "Semua fitur Signature",
      "Bantuan pengaturan khusus",
      "Arahan tipografi personal",
      "Konsultasi langsung",
    ],
  },
} as const;

const comparisonGroups = [
  {
    title: "01 — Dasar undangan",
    rows: [
      ["Undangan digital termasuk", "1", "1", "1"],
      [
        "Akses template",
        "Koleksi standar",
        "Koleksi pilihan",
        "Koleksi pilihan",
      ],
      ["Detail acara dan lokasi", "Included", "Included", "Included"],
    ],
  },
  {
    title: "02 — Pengalaman tamu",
    rows: [
      ["Pengumpulan RSVP", "Dasar", "Lengkap", "Lengkap"],
      ["Detail makanan dan rombongan", "Dasar", "Lengkap", "Lengkap"],
      ["Ucapan tamu", "Included", "Included", "Included"],
    ],
  },
  {
    title: "03 — Cerita dan media",
    rows: [
      ["Bagian cerita", "Dasar", "Lengkap", "Lengkap"],
      ["Tampilan galeri", "Dasar", "Lengkap", "Lengkap"],
      ["Penyempurnaan visual", "—", "Included", "Didampingi tim"],
    ],
  },
  {
    title: "04 — Pendampingan",
    rows: [
      ["Bantuan pengaturan", "Mandiri", "Prioritas", "Penuh"],
      ["Konsultasi desain", "—", "Dukungan prioritas", "Konsultasi khusus"],
      ["Persiapan konten", "Mandiri", "Mandiri", "Didampingi tim"],
    ],
  },
] as const;

const printPresentation = [
  {
    title: "Koleksi Essential",
    label: "Minimum sesuai diskusi",
    featured: false,
    features: [
      "Pilihan kertas katun berkualitas",
      "Opsi letterpress atau blind deboss",
      "Undangan dan kartu detail yang selaras",
      "Proof tipografi digital",
    ],
  },
  {
    title: "Koleksi Premium",
    label: "Pilihan favorit",
    featured: true,
    features: [
      "Kertas katun ekstra tebal",
      "Pilihan foil metalik dan deboss",
      "Finishing vellum, segel, atau sutra",
      "Konsultasi alamat amplop",
    ],
  },
  {
    title: "Custom Haute Couture",
    label: "Pesanan personal",
    featured: false,
    features: [
      "Pilihan material yang fleksibel",
      "Opsi cetak dan finishing khusus",
      "Konsultasi monogram personal",
      "Stationery hari acara yang selaras",
    ],
  },
] as const;

const costArchitecture = [
  [
    "01 — Jumlah",
    "Skala Pesanan",
    "Biaya persiapan produksi disesuaikan dengan jumlah akhir pesanan.",
    "Dibahas per pesanan",
  ],
  [
    "02 — Ketebalan",
    "Kertas & Tekstur",
    "Ketebalan, tekstur, lapisan, dan tepi deckle membentuk penawaran.",
    "Katun dan kertas khusus",
  ],
  [
    "03 — Cetak",
    "Finishing & Foil",
    "Setiap tinta, tekanan, foil, atau emboss memerlukan persiapan tersendiri.",
    "Letterpress & foil",
  ],
  [
    "04 — Hiasan",
    "Segel & Pita",
    "Lilin, vellum, pita, dan perakitan menambah detail material serta pengerjaan tangan.",
    "Detail buatan tangan",
  ],
  [
    "05 — Tulisan",
    "Kaligrafi Tamu",
    "Alamat amplop dapat dicetak atau ditulis dengan tangan.",
    "Digital atau tulisan tangan",
  ],
] as const;

function DigitalPricing({ packages }: { packages: Package[] }) {
  return (
    <div>
      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {packages.map((item, index) => {
          const presentation =
            planPresentation[item.id as keyof typeof planPresentation] ??
            planPresentation.essential;
          const features = [...item.features, ...presentation.extras].slice(
            0,
            7,
          );
          return (
            <article
              key={item.id}
              className={`relative flex flex-col justify-between rounded-xl bg-surface-lowest p-8 transition-shadow lg:p-10 ${item.featured ? "shadow-[0_18px_45px_-18px_rgba(28,28,24,0.34)] lg:-translate-y-2" : "shadow-sm hover:shadow-md"}`}
            >
              {item.featured ? (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary px-4 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-white uppercase shadow-sm">
                  <Sparkles aria-hidden size={13} /> Pilihan terpopuler
                </span>
              ) : null}
              <div>
                <div
                  className={`mb-4 flex items-center justify-between gap-3 ${item.featured ? "mt-2" : ""}`}
                >
                  <span
                    className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${item.featured ? "text-secondary" : "text-on-surface-variant"}`}
                  >
                    Paket 0{index + 1}
                  </span>
                  <span
                    className={`rounded px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase ${item.featured ? "bg-accent text-accent-foreground" : "bg-surface-low text-on-surface-variant"}`}
                  >
                    {presentation.label}
                  </span>
                </div>
                <h2 className="font-serif text-3xl">{item.name}</h2>
                <p className="mt-2 min-h-16 text-xs leading-6 text-on-surface-variant">
                  {item.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2 border-b border-surface-container pb-6">
                  <span className="font-serif text-[2.75rem] leading-none">
                    {currency.format(item.price)}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    / sekali bayar
                  </span>
                </div>
                <ul className="my-8 space-y-3.5 text-xs leading-5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/register"
                className={`inline-flex min-h-11 items-center justify-center rounded px-6 text-[10px] font-semibold tracking-wider uppercase transition-colors ${item.featured ? "bg-primary text-white hover:bg-secondary" : "bg-surface-container text-primary hover:bg-surface-high"}`}
              >
                Pilih {item.name}
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-20 overflow-hidden rounded-xl bg-surface-lowest p-6 shadow-sm sm:p-8 lg:p-12">
        <div className="flex flex-col justify-between gap-3 border-b border-surface-container pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Perbandingan Rinci
            </p>
            <h2 className="mt-1 font-serif text-3xl">Bandingkan Fitur Paket</h2>
          </div>
          <p className="text-xs text-on-surface-variant">
            Konfigurasi paket mengikuti layanan yang tersedia.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-surface-container">
                <th className="w-2/5 px-3 py-4 text-[10px] tracking-wider text-on-surface-variant uppercase">
                  Fitur
                </th>
                {packages.map((item, index) => (
                  <th
                    key={item.id}
                    className={`w-1/5 py-4 text-center font-serif text-lg ${index === 1 ? "bg-accent/45 text-secondary" : ""}`}
                  >
                    {item.name}
                    <span className="mt-1 block font-sans text-[10px] font-normal text-on-surface-variant">
                      {currency.format(item.price)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <FragmentRows key={group.title} group={group} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FragmentRows({ group }: { group: (typeof comparisonGroups)[number] }) {
  return (
    <>
      <tr className="bg-surface-low">
        <th
          colSpan={4}
          className="px-3 py-2.5 text-[9px] font-semibold tracking-wider uppercase"
        >
          {group.title}
        </th>
      </tr>
      {group.rows.map(([label, essential, signature, prestige]) => (
        <tr
          key={label}
          className="border-b border-surface-container last:border-0"
        >
          <th className="px-3 py-3.5 font-normal text-primary">{label}</th>
          {[essential, signature, prestige].map((value, index) => (
            <td
              key={`${label}-${index}`}
              className={`px-3 py-3.5 text-center text-on-surface-variant ${index === 1 ? "bg-accent/20 font-medium text-secondary" : ""}`}
            >
              {value === "Included" ? (
                <Check
                  aria-label="Termasuk"
                  className="mx-auto text-secondary"
                  size={16}
                />
              ) : (
                value
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function PrintPricing({ products }: { products: PrintedProduct[] }) {
  return (
    <div>
      <section className="mb-14 rounded-xl bg-surface-container p-8 lg:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              02 — Stationery Cetak
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
              Letterpress berkualitas dibuat secara personal, bukan melalui
              checkout otomatis.
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              Setiap pesanan mengikuti ketebalan kertas, tekanan cetak,
              finishing, jumlah, dan perakitan. Penawaran diberikan setelah
              seluruh kebutuhan dipahami.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-6 text-[10px] font-semibold tracking-wider text-white uppercase hover:bg-secondary"
            >
              <MessageCircle aria-hidden size={16} /> Konsultasi dengan kami
            </Link>
            <p className="mt-2 text-[11px] text-on-surface-variant">
              Melalui konsultasi · Dikonfirmasi manual
            </p>
          </div>
        </div>
      </section>

      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {products.slice(0, 3).map((product, index) => {
          const presentation = printPresentation[index] ?? printPresentation[0];
          return (
            <article
              key={product.id}
              className={`relative flex flex-col justify-between rounded-xl bg-surface-lowest p-8 lg:p-10 ${presentation.featured ? "shadow-[0_18px_45px_-18px_rgba(28,28,24,0.34)] lg:-translate-y-2" : "shadow-sm"}`}
            >
              {presentation.featured ? (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary px-4 py-1.5 text-[9px] font-semibold tracking-wider text-white uppercase">
                  <Gem aria-hidden size={13} /> Pilihan favorit
                </span>
              ) : null}
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-on-surface-variant uppercase">
                    Koleksi 0{index + 1}
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider text-secondary uppercase">
                    {presentation.label}
                  </span>
                </div>
                <h2 className="font-serif text-3xl">{presentation.title}</h2>
                <p className="mt-2 min-h-16 text-xs leading-6 text-on-surface-variant">
                  {product.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2 border-b border-surface-container pb-6">
                  <span className="font-serif text-4xl">
                    Mulai {currency.format(product.startingPrice)}
                  </span>
                </div>
                <ul className="my-8 space-y-3.5 text-xs leading-5">
                  {presentation.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className={`inline-flex min-h-11 items-center justify-center rounded px-6 text-[10px] font-semibold tracking-wider uppercase ${presentation.featured ? "bg-primary text-white hover:bg-secondary" : "bg-surface-container hover:bg-surface-high"}`}
              >
                Minta konsultasi
              </Link>
            </article>
          );
        })}
      </div>

      <section className="mt-20 rounded-xl bg-surface-low p-8 lg:p-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Komponen Biaya
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            Memahami Biaya Undangan Cetak
          </h2>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Cetak tradisional memadukan persiapan produksi dengan pilihan
            material dan finishing. Lima detail ini membentuk penawaran Anda.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {costArchitecture.map(([kicker, title, text, footnote]) => (
            <article
              key={title}
              className="flex flex-col justify-between rounded-lg bg-surface-lowest p-6 shadow-sm"
            >
              <div>
                <p className="text-[9px] font-semibold tracking-wider text-secondary uppercase">
                  {kicker}
                </p>
                <h3 className="mt-3 font-serif text-lg">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-on-surface-variant">
                  {text}
                </p>
              </div>
              <p className="mt-5 text-[9px] font-semibold tracking-wider text-secondary uppercase">
                {footnote}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col items-center justify-between gap-6 rounded-xl bg-surface-lowest p-8 shadow-sm md:flex-row lg:p-10">
        <div className="flex items-center gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent/60 text-secondary">
            <PackageOpen aria-hidden size={25} />
          </span>
          <div>
            <h2 className="font-serif text-xl">
              Rasakan Material melalui Swatch Kit
            </h2>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
              Bandingkan kertas katun, tekanan cetak, foil, dan finishing
              sebelum mengonfirmasi pesanan.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded bg-surface-container px-6 py-3 text-[10px] font-semibold tracking-wider uppercase hover:bg-primary hover:text-white"
        >
          Minta detail sampel
        </Link>
      </section>
    </div>
  );
}

export function PricingPlans({
  packages,
  products,
}: {
  packages: Package[];
  products: PrintedProduct[];
}) {
  const [mode, setMode] = useState<Mode>("digital");
  return (
    <section id="pricing-plans" className="pb-24">
      <Container>
        <div className="mb-6 flex justify-center">
          <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface-container p-1.5 shadow-sm">
            <button
              type="button"
              aria-pressed={mode === "digital"}
              onClick={() => setMode("digital")}
              className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left transition-colors sm:px-7 ${mode === "digital" ? "bg-primary text-white shadow-sm" : "text-on-surface hover:bg-surface-high"}`}
            >
              <MonitorSmartphone aria-hidden size={18} />
              <span>
                <span className="block text-[10px] font-semibold tracking-wider uppercase">
                  Undangan Digital
                </span>
                <span className="mt-0.5 hidden text-[10px] opacity-70 sm:block">
                  Sekali bayar, nyaman untuk tamu
                </span>
              </span>
            </button>
            <button
              type="button"
              aria-pressed={mode === "print"}
              onClick={() => setMode("print")}
              className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left transition-colors sm:px-7 ${mode === "print" ? "bg-primary text-white shadow-sm" : "text-on-surface hover:bg-surface-high"}`}
            >
              <Mail aria-hidden size={18} />
              <span>
                <span className="block text-[10px] font-semibold tracking-wider uppercase">
                  Stationery Cetak
                </span>
                <span className="mt-0.5 hidden text-[10px] opacity-70 sm:block">
                  Kertas katun, cetak, dan konsultasi
                </span>
              </span>
            </button>
          </div>
        </div>
        <p className="mb-12 text-center text-xs text-on-surface-variant">
          {mode === "digital"
            ? "Menampilkan harga paket digital sekali bayar. Masa aktif undangan mengikuti ketentuan paket."
            : "Menampilkan kisaran harga awal koleksi cetak. Setiap pesanan ditawarkan secara manual."}
        </p>
        {mode === "digital" ? (
          <DigitalPricing packages={packages} />
        ) : (
          <PrintPricing products={products} />
        )}
      </Container>
    </section>
  );
}
