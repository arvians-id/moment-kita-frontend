"use client";

import {
  BadgeCheck,
  Banknote,
  Copy,
  Gift,
  Heart,
  LockKeyhole,
  MailCheck,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Rapi & Tetap Elegan",
    description:
      "Bagikan informasi hadiah di dalam undangan dengan tampilan yang selaras dengan bagian lainnya.",
  },
  {
    icon: Heart,
    title: "Hadiah Bulan Madu",
    description:
      "Ubah hadiah menjadi momen bermakna seperti makan malam pertama, perjalanan singkat, atau kebutuhan rumah baru.",
  },
  {
    icon: MailCheck,
    title: "Catatan Ucapan Terima Kasih",
    description:
      "Simpan catatan hadiah dengan rapi agar ucapan terima kasih tetap personal dan tepat waktu.",
  },
  {
    icon: Gift,
    title: "Informasi Hadiah Langsung",
    description:
      "Tampilkan rekening atau petunjuk hadiah pilihan pasangan tanpa membawa tamu ke halaman terpisah.",
  },
] as const;

const paymentMethods = [
  { icon: Banknote, title: "Transfer Bank", detail: "Informasi langsung" },
  { icon: Smartphone, title: "Mobile Banking", detail: "Mudah diikuti" },
  { icon: QrCode, title: "Pembayaran QR", detail: "Akses cepat" },
] as const;

export function DigitalEnvelopeSection() {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    await navigator.clipboard?.writeText("FR76 3000 4000 1234 5678 901");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section
      id="digital-envelope"
      className="scroll-mt-20 bg-surface-container py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            02 — Amplop Digital &amp; Hadiah
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Berbagi hadiah dengan hangat, privat, dan langsung untuk pasangan.
          </h2>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Sajikan informasi hadiah dalam satu bagian yang rapi agar tamu mudah
            mengirimkan tanda kasih kepada pasangan.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="min-w-0 rounded-2xl bg-white p-4 shadow-lg sm:p-7 lg:col-span-6">
            <div className="flex items-center justify-between pb-3">
              <span className="text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase">
                Angpao / Amplop Digital
              </span>
              <LockKeyhole aria-hidden size={22} className="text-secondary" />
            </div>
            <div className="flex flex-col items-center overflow-hidden rounded-xl bg-surface-high p-6 text-center">
              <div className="mb-4 grid size-16 place-items-center rounded-full bg-secondary text-white shadow-md transition-transform hover:scale-105">
                <span className="font-serif text-2xl italic">M</span>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                Hadiah Perjalanan Bulan Madu
              </h3>
              <p className="mt-1 max-w-sm text-[13px] leading-5 text-on-surface-variant">
                “Menjadi bagian dari makan malam pertama dan perjalanan kami
                sebagai pasangan baru.”
              </p>
              <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
                {paymentMethods.map(({ icon: Icon, title, detail }, index) => (
                  <div
                    key={title}
                    className={`flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-sm ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <Icon aria-hidden size={19} />
                    <span className="mt-1 text-[9px] font-semibold tracking-wider uppercase">
                      {title}
                    </span>
                    <span className="text-[9px] text-on-surface-variant">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg bg-white p-3 text-left shadow-sm">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold tracking-wider text-on-surface-variant uppercase">
                    Informasi Rekening Hadiah
                  </p>
                  <p className="truncate text-[12px] font-medium tracking-wider">
                    FR76 3000 4000 1234 5678 901
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="flex shrink-0 items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-[9px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                >
                  <Copy aria-hidden size={12} /> {copied ? "Tersalin" : "Salin"}
                </button>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-wider text-secondary uppercase sm:text-[10px]">
                <BadgeCheck aria-hidden size={15} />
                Informasi hadiah tetap berada di dalam undangan
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-6">
            <div className="relative h-56 overflow-hidden rounded-xl shadow-md">
              <Image
                src="/images/marketing/garden-stationery-suite.png"
                alt="Undangan kertas katun dengan segel lilin"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >
                  <Icon aria-hidden size={22} className="mb-2 text-secondary" />
                  <h3 className="font-serif text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
