"use client";

import { MailCheck, MessageCircle, QrCode, Send, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  ProcessStepCard,
  type ProcessStep,
} from "@/components/marketing/how-it-works/process-step-card";
import { Container } from "@/components/shared/container";

type MethodologyView = "digital" | "printed";

const digitalSteps: readonly ProcessStep[] = [
  {
    number: "01",
    badge: "Pilihan",
    phase: "Pemilihan",
    title: "Jelajahi Desain Pilihan",
    description:
      "Jelajahi koleksi editorial untuk perayaan modern, lalu pilih tipografi, susunan, dan suasana yang paling mewakili kisah Anda.",
    image: {
      src: "/images/marketing/digital-invitation-phone.png",
      alt: "Digital wedding invitation displayed on a phone",
    },
  },
  {
    number: "02",
    badge: "Interaktif",
    phase: "Pratinjau",
    title: "Pratinjau Interaktif Langsung",
    description:
      "Coba pengalaman tamu langsung di browser pada berbagai ukuran layar, termasuk animasi, musik, jadwal, dan contoh interaksi RSVP.",
    detail: "Pratinjau musik latar",
    detailEnd: "Coba langsung",
  },
  {
    number: "03",
    badge: "Privat",
    phase: "Pendaftaran",
    title: "Buat Akun Moment Kita",
    description:
      "Buat akun Moment Kita dan masuk ke ruang privat tempat konten undangan, tamu, dan status publikasi dikelola bersama.",
    detail: "Ruang undangan terlindungi",
    detailEnd: "Aman",
  },
  {
    number: "04",
    badge: "Tersinkron",
    phase: "Personalisasi",
    title: "Sesuaikan Perayaan Anda",
    description:
      "Susun jadwal, gambar, warna, hadiah, pertanyaan RSVP, dan kata-kata yang membuat undangan terasa personal.",
    detail: "Perubahan tampil pada pratinjau",
    detailEnd: "Tersinkron",
  },
  {
    number: "05",
    badge: "URL Personal",
    phase: "Alamat",
    title: "Pilih Alamat Undangan",
    description:
      "Pilih alamat Moment Kita yang mudah diingat. Alamat tersebut tetap digunakan setelah undangan difinalisasi.",
    detail: "momentkita.com/sophia-alex",
    detailEnd: "Tersimpan",
  },
  {
    number: "06",
    badge: "Siap Terbit",
    phase: "Publikasi",
    title: "Publikasikan Undangan",
    description:
      "Finalisasi dengan tenang, publikasikan saat siap, dan bagikan undangan responsif yang terasa nyaman di setiap perangkat.",
    detail: "Status undangan: siap",
    detailEnd: "Online",
  },
  {
    number: "07",
    badge: "Siap Dibagikan",
    phase: "Berbagi",
    title: "Bagikan kepada Tamu",
    description:
      "Bagikan undangan melalui tautan personal, WhatsApp, pesan, email, atau kode QR untuk kartu cetak.",
    icons: [MessageCircle, QrCode, Send, MailCheck],
  },
  {
    number: "08",
    badge: "Respons Langsung",
    phase: "Pengelolaan",
    title: "Pantau RSVP & Pilihan Makanan",
    description:
      "Pantau kehadiran, pilihan makanan, ucapan, dan pembaruan tamu dari satu ruang kerja saat respons masuk.",
    detail: "Respons RSVP terkumpul",
    detailEnd: "Ekspor",
  },
];

const printedSteps: readonly ProcessStep[] = [
  {
    number: "01",
    badge: "Koleksi",
    phase: "Pilihan Gaya",
    title: "Jelajahi Koleksi Cetak",
    description:
      "Temukan arah stationery melalui pilihan kertas, proporsi, tipografi, detail botani, dan karakter setiap rangkaian.",
    image: {
      src: "/images/marketing/garden-stationery-suite.png",
      alt: "Artisan wedding stationery suite with wax seals and ribbon",
    },
  },
  {
    number: "02",
    badge: "Material",
    phase: "Kertas",
    title: "Pilih Kertas & Finishing",
    description:
      "Bandingkan kertas katun tebal, tepi deckle, warna foil metalik, dan kedalaman blind deboss.",
    image: {
      src: "/images/marketing/copper-monogram-paper.png",
      alt: "Textured cotton paper with a copper-foil monogram",
    },
  },
  {
    number: "03",
    badge: "Konsultasi",
    phase: "Pendampingan",
    title: "Diskusi Langsung via WhatsApp",
    description:
      "Bagikan jumlah, lokasi, waktu, dan referensi kepada tim kami agar setiap keputusan memiliki konteks yang tepat.",
    detail: "Percakapan langsung dengan tim",
    detailEnd: "WhatsApp",
  },
  {
    number: "04",
    badge: "Desain",
    phase: "Proof Tipografi",
    title: "Monogram & Proof Personal",
    description:
      "Sempurnakan inisial, susunan, pilihan kata, dan detail cetak melalui proof digital sebelum produksi dimulai.",
    detail: "Proof digital berskala akurat",
    detailEnd: "Perbaiki",
  },
  {
    number: "05",
    badge: "Persetujuan",
    phase: "Konfirmasi",
    title: "Konfirmasi Pesanan & Deposit",
    description:
      "Setujui spesifikasi akhir dan rincian penawaran. Deposit yang terkonfirmasi memulai persiapan material dan jadwal produksi.",
    detail: "Deposit memulai pesanan",
    detailEnd: "Terkonfirmasi",
  },
  {
    number: "06",
    badge: "Pengerjaan",
    phase: "Produksi",
    title: "Letterpress & Foil Pressing",
    description:
      "Setiap set dicetak, diselesaikan, dan diperiksa bertahap untuk memastikan tekanan, presisi, tepi kertas, dan warna tetap konsisten.",
    detail: "Cetak, finishing, dan pemeriksaan",
    detailEnd: "Moment Kita",
  },
  {
    number: "07",
    badge: "Penyajian",
    phase: "Pengiriman",
    title: "Pengiriman dengan Perlindungan",
    description:
      "Stationery dirakit dengan teliti, dilindungi selama perjalanan, dan dikirim dengan pelacakan agar tiba siap menjadi bagian dari perayaan Anda.",
    detail: "Pengiriman terlacak",
    detailEnd: "Dikemas dengan teliti",
    icons: [Truck],
    featured: true,
  },
];

const viewOptions: readonly {
  id: MethodologyView;
  label: string;
  note?: string;
}[] = [
  {
    id: "digital",
    label: "Undangan Digital",
    note: "Online & real-time",
  },
  {
    id: "printed",
    label: "Stationery Cetak",
    note: "Kertas buatan tangan",
  },
];

function ProcessHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end lg:pb-12">
      <div className="max-w-3xl">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
          {kicker}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-primary sm:text-4xl lg:text-[56px] lg:leading-[1.12]">
          {title}
        </h2>
      </div>
      <p className="max-w-md text-sm leading-7 text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

function SectionCta({
  kicker,
  title,
  description,
  features,
  primary,
  secondary,
}: {
  kicker: string;
  title: string;
  description: string;
  features: readonly string[];
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <div className="mt-12 flex flex-col justify-between gap-8 rounded-xl bg-surface-low p-7 shadow-sm lg:flex-row lg:items-center lg:p-12">
      <div className="max-w-2xl">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
          {kicker}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-primary sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase"
            >
              <span className="size-1.5 rounded-full bg-secondary" />
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <Link
          href={primary.href}
          className="inline-flex min-h-12 items-center justify-center bg-primary px-7 text-center text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-secondary"
        >
          {primary.label}
        </Link>
        <Link
          href={secondary.href}
          className="inline-flex min-h-12 items-center justify-center bg-surface-lowest px-7 text-center text-[10px] font-semibold tracking-[0.12em] text-primary uppercase transition-colors hover:bg-surface-container"
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}

export function MethodologyExperience() {
  const [selectedView, setSelectedView] = useState<MethodologyView>("digital");
  const showDigital = selectedView !== "printed";
  const showPrinted = selectedView !== "digital";

  return (
    <>
      <section className="py-14 sm:py-16 lg:py-20">
        <Container className="flex max-w-5xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-4 py-2 shadow-sm">
            <span className="size-1.5 rounded-full bg-secondary" />
            <span className="text-[9px] font-semibold tracking-[0.18em] text-secondary uppercase sm:text-[10px]">
              Cara Kerja Moment Kita
            </span>
          </div>
          <h1 className="mt-6 font-serif text-[44px] leading-[1.08] tracking-[-0.025em] text-primary sm:text-6xl lg:text-[84px]">
            Dari gagasan menjadi{" "}
            <em className="font-normal text-secondary">undangan.</em>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-on-surface-variant sm:text-base sm:leading-8 lg:text-lg">
            Dua cara untuk mengawali perayaan Anda: undangan digital yang mudah
            dibagikan atau stationery cetak yang dikerjakan secara personal.
          </p>
          <div
            className="mt-10 flex w-full max-w-3xl flex-col gap-1.5 rounded-[28px] bg-surface-container p-1.5 shadow-sm sm:w-auto sm:flex-row sm:rounded-full"
            role="tablist"
            aria-label="Pilih alur undangan"
          >
            {viewOptions.map((option) => {
              const isSelected = selectedView === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedView(option.id)}
                  className={`flex min-h-14 items-center justify-center gap-3 rounded-full px-5 text-left transition-colors sm:justify-start ${isSelected ? "bg-primary text-white" : "text-on-surface-variant hover:text-primary"}`}
                >
                  <span className="flex flex-col">
                    <span className="text-[9px] font-semibold tracking-[0.13em] uppercase sm:text-[10px]">
                      {option.label}
                    </span>
                    {option.note ? (
                      <span
                        className={`mt-0.5 text-[9px] ${isSelected ? "text-white/60" : "text-on-surface-variant/70"}`}
                      >
                        {option.note}
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={`size-2 rounded-full ${isSelected ? "bg-terracotta-soft" : "bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {showDigital ? (
        <section className="pb-24 lg:pb-32" id="digital-process">
          <Container>
            <ProcessHeader
              kicker="Pilihan 01 / Undangan digital"
              title="Elegan, mudah, dan siap dibagikan."
              description="Alur browser yang tenang untuk pasangan modern, dari memilih template hingga pengalaman tamu responsif, respons langsung, dan alamat undangan yang mudah dibagikan."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {digitalSteps.map((step) => (
                <ProcessStepCard key={step.number} step={step} />
              ))}
            </div>
            <SectionCta
              kicker="Pengaturan yang mudah"
              title="Siap memulai undangan digital Anda?"
              description="Susun pengalaman tamu sesuai ritme Anda dan pastikan arah visualnya matang sebelum dipublikasikan."
              features={[
                "Satu ruang kerja yang tertata",
                "Pratinjau tamu responsif",
                "Template siap dipersonalisasi",
              ]}
              primary={{
                href: "/templates",
                label: "Jelajahi template digital",
              }}
              secondary={{ href: "/register", label: "Buat undangan Anda" }}
            />
          </Container>
        </section>
      ) : null}

      {showPrinted ? (
        <section className="pb-24 lg:pb-32" id="printed-process">
          <Container>
            <ProcessHeader
              kicker="Pilihan 02 / Letterpress bertekstur"
              title="Karya personal yang dipandu melalui percakapan."
              description="Kertas katun tebal, proof yang teliti, dan finishing manual dipadukan melalui proses konsultasi bersama tim kami."
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {printedSteps.map((step) => (
                <ProcessStepCard key={step.number} step={step} />
              ))}
            </div>
            <SectionCta
              kicker="Produksi personal"
              title="Wujudkan stationery yang layak disimpan."
              description="Diskusikan pilihan kertas, jumlah, waktu, dan nuansa material yang Anda bayangkan untuk perayaan."
              features={[
                "Proof melalui konsultasi",
                "Pilihan kertas katun",
                "Pengiriman terlacak",
              ]}
              primary={{ href: "/contact", label: "Konsultasi dengan kami" }}
              secondary={{
                href: "/printed",
                label: "Jelajahi stationery cetak",
              }}
            />
          </Container>
        </section>
      ) : null}
    </>
  );
}
