"use client";

import { LockKeyholeOpen, MessageCircle } from "lucide-react";
import type { FormEvent } from "react";

import { Container } from "@/components/shared/container";

export function PhilosophySection() {
  function openWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const weddingDate =
      form.get("weddingDate")?.toString().trim() || "tanggal yang akan datang";
    const discipline =
      form.get("discipline")?.toString() || "layanan Moment Kita";
    const message = `Halo Moment Kita, kami merencanakan pernikahan pada ${weddingDate} dan ingin mendiskusikan ${discipline}. Mohon informasikan jadwal konsultasi yang tersedia.`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section className="bg-espresso py-24 text-[#f9f6f0] lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-champagne uppercase">
              04 — Filosofi kami
            </p>
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.12] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
              “Undangan bukan sekadar pemberitahuan. Ia adalah pembuka bagi
              kenangan yang akan tinggal sepanjang hidup.”
            </h2>
            <p className="max-w-xl text-sm leading-6 text-white/65">
              Di tengah pesan yang cepat berlalu, kami merancang pengalaman
              digital yang berkesan dan undangan kertas yang pantas disimpan.
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[9px] font-semibold tracking-[0.16em] text-champagne uppercase">
              <span>Kertas pilihan</span>
              <span>·</span>
              <span>Digital yang ramah tamu</span>
              <span>·</span>
              <span>Tipografi penuh perhatian</span>
            </p>
          </div>

          <form
            onSubmit={openWhatsApp}
            className="space-y-6 border border-white/8 bg-white/[0.035] p-7 shadow-2xl lg:col-span-5 lg:p-10"
          >
            <div>
              <div className="mb-2 flex items-center gap-2 text-champagne">
                <LockKeyholeOpen aria-hidden="true" size={16} />
                <span className="text-[9px] font-semibold tracking-[0.15em] uppercase">
                  Konsultasi langsung
                </span>
              </div>
              <h3 className="font-serif text-2xl">
                Rencanakan bersama Moment Kita
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Mulai percakapan WhatsApp untuk undangan digital, cetak, atau
                perpaduan keduanya.
              </p>
            </div>
            <div>
              <label
                htmlFor="wedding-date"
                className="mb-2 block text-[9px] font-semibold tracking-[0.13em] text-white/70 uppercase"
              >
                Perkiraan tanggal dan kota pernikahan
              </label>
              <input
                id="wedding-date"
                name="weddingDate"
                placeholder="contoh: Oktober 2027 · Jakarta"
                className="min-h-12 w-full border border-white/10 bg-[#1c1b1a] px-4 text-xs text-white placeholder:text-white/35 focus:border-champagne focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="discipline"
                className="mb-2 block text-[9px] font-semibold tracking-[0.13em] text-white/70 uppercase"
              >
                Pilihan undangan yang diminati
              </label>
              <select
                id="discipline"
                name="discipline"
                className="min-h-12 w-full border border-white/10 bg-[#1c1b1a] px-4 text-xs text-white focus:border-champagne focus:outline-none"
              >
                <option>undangan digital dan cetak</option>
                <option>stationery cetak</option>
                <option>undangan digital interaktif</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex min-h-13 w-full items-center justify-center gap-2 bg-champagne px-5 text-[10px] font-semibold tracking-[0.13em] text-[#380d00] uppercase transition-colors hover:bg-[#ffb59c]"
            >
              <MessageCircle aria-hidden="true" size={16} />
              Mulai percakapan WhatsApp
            </button>
            <p className="text-center text-[10px] text-white/35">
              Data tidak disimpan atau dikirim ke Moment Kita.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
