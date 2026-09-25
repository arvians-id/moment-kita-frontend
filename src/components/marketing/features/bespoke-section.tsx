import { Clock3, Globe2, LayoutGrid, ToggleRight, Type } from "lucide-react";
import Image from "next/image";

export function BespokeSection() {
  return (
    <section
      id="bespoke-craft"
      className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16 lg:px-14"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            03 — Personalisasi Desain
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Undangan mengikuti karakter pernikahan Anda.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-on-surface-variant sm:text-[15px]">
          Sesuaikan tipografi, gambar, dan urutan bagian agar mencerminkan gaya
          Anda tanpa mengurangi kejelasan informasi untuk tamu.
        </p>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-3">
        <article className="flex flex-col gap-4 rounded-2xl bg-surface-low p-5 shadow-sm sm:p-7">
          <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <Globe2 aria-hidden size={19} />
          </span>
          <h3 className="font-serif text-xl font-semibold">
            Alamat Undangan yang Mudah Diingat
          </h3>
          <p className="text-[13px] leading-5 text-on-surface-variant">
            Gunakan alamat undangan personal yang mudah dikenali, dibuka
            kembali, dan dibagikan kepada keluarga.
          </p>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-white p-3 shadow-sm">
            <span className="flex min-w-0 items-center gap-2 text-[10px] font-semibold">
              <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
              <span className="truncate">momentkita.com/melina-dayson</span>
            </span>
            <span className="text-[9px] font-semibold text-on-surface-variant uppercase">
              Terbit
            </span>
          </div>
          <div className="relative h-44 overflow-hidden rounded-lg">
            <Image
              src="/images/marketing/digital-invitation-phone.png"
              alt="Undangan pernikahan digital yang ditampilkan di ponsel"
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-2xl bg-surface-low p-5 shadow-sm sm:p-7 md:-mt-4">
          <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <Type aria-hidden size={19} />
          </span>
          <h3 className="font-serif text-xl font-semibold">
            Pilihan Tipografi yang Tertata
          </h3>
          <p className="text-[13px] leading-5 text-on-surface-variant">
            Pilih pasangan tipografi editorial sambil menjaga judul, keterangan,
            dan petunjuk tamu tetap jelas.
          </p>
          <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm">
            <div className="pb-2">
              <span className="text-[8px] font-semibold tracking-wider text-secondary uppercase">
                Pilihan 01 • Paris Monolith
              </span>
              <p className="font-serif text-lg">Clair de Lune &amp; Roses</p>
            </div>
            <div className="pb-2">
              <span className="text-[8px] font-semibold tracking-wider text-secondary uppercase">
                Pilihan 02 • Tuscan Warmth
              </span>
              <p className="font-serif text-lg italic">Amore e Vita Eterna</p>
            </div>
            <div>
              <span className="text-[8px] font-semibold tracking-wider text-secondary uppercase">
                Pilihan 03 • Nordic Restraint
              </span>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase">
                Modern Murni
              </p>
            </div>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-on-surface-variant uppercase">
            Tanpa Coding
          </span>
        </article>

        <article className="flex flex-col gap-4 rounded-2xl bg-surface-low p-5 shadow-sm sm:p-7 md:mt-4">
          <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <LayoutGrid aria-hidden size={19} />
          </span>
          <h3 className="font-serif text-xl font-semibold">
            Bagian Undangan yang Fleksibel
          </h3>
          <p className="text-[13px] leading-5 text-on-surface-variant">
            Atur bagian yang tersedia pada template pilihan agar undangan
            mengikuti alur perayaan Anda.
          </p>
          <div className="space-y-2 rounded-xl bg-white p-3.5 shadow-sm">
            {[
              ["Hitung Mundur", ToggleRight, "text-secondary"],
              ["Galeri Cerita Foto", ToggleRight, "text-secondary"],
              ["Jadwal Acara", Clock3, "text-on-surface-variant"],
            ].map(([label, Icon, color]) => (
              <div
                key={label as string}
                className="flex items-center justify-between text-[13px] text-on-surface-variant"
              >
                <span>{label as string}</span>
                <Icon aria-hidden size={18} className={color as string} />
              </div>
            ))}
          </div>
          <div className="relative h-44 overflow-hidden rounded-lg">
            <Image
              src="/images/marketing/hero-stationery-suite.png"
              alt="Stationery pernikahan dengan detail botani dan segel lilin"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
