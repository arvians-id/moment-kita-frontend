import { CheckCircle2, Globe2, Music2, Star, Volume2 } from "lucide-react";
import Link from "next/link";

export function DigitalHero() {
  return (
    <section className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pt-12 pb-20 sm:px-8 lg:px-14 lg:pt-20 lg:pb-32">
      <div className="pointer-events-none absolute top-1/4 right-0 -z-10 size-[520px] rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 size-[380px] rounded-full bg-surface-high/60 blur-2xl" />

      <div className="grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col items-start gap-6 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-high px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-secondary" />
            01 — Undangan Digital · Panduan Mudah · Tautan Personal
          </div>
          <h1 className="font-serif text-[44px] leading-[1.08] tracking-[-0.025em] sm:text-5xl md:text-[56px]">
            Kisah pernikahan Anda,
            <br className="hidden sm:block" />{" "}
            <em className="font-normal text-secondary">
              hadir indah di layar.
            </em>
          </h1>
          <p className="max-w-xl text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
            Undangan interaktif yang memudahkan informasi tamu, terasa personal
            saat dibagikan, dan tetap membawa kehangatan sebuah undangan yang
            dirancang dengan indah.
          </p>
          <div className="flex w-full flex-wrap items-center gap-4 pt-4 sm:w-auto">
            <Link
              href="/register"
              className="inline-flex flex-1 items-center justify-center bg-primary px-8 py-4 text-[10px] font-semibold tracking-wider text-white uppercase shadow-md transition-colors hover:bg-secondary sm:flex-none"
            >
              Buat Undangan Digital
            </Link>
            <a
              href="#templates-grid"
              className="inline-flex flex-1 items-center justify-center bg-transparent px-8 py-4 text-[10px] font-semibold tracking-wider uppercase shadow-sm transition-colors hover:bg-surface-container sm:flex-none"
            >
              Jelajahi Template
            </a>
          </div>
          <div className="flex items-center gap-6 pt-8 text-on-surface-variant">
            <div className="flex -space-x-2">
              {[
                ["M&D", "bg-surface-highest"],
                ["S&A", "bg-accent"],
                ["C&L", "bg-surface-high"],
              ].map(([label, color]) => (
                <span
                  key={label}
                  className={`grid size-8 place-items-center rounded-full text-[9px] font-semibold ring-2 ring-background ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} aria-hidden size={14} fill="currentColor" />
                ))}
                <span className="ml-1 text-[10px] font-semibold text-primary">
                  Dibuat untuk perayaan yang bermakna
                </span>
              </div>
              <span className="text-[12px]">Nyaman di ponsel dan desktop</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:col-span-6 lg:justify-end">
          <div className="pointer-events-none absolute top-[-24px] right-0 bottom-[-24px] w-11/12 -rotate-1 rounded-3xl bg-surface-low" />
          <div className="relative z-10 w-[310px] rounded-[44px] bg-white p-3 shadow-2xl sm:w-[340px] md:w-[370px]">
            <div className="aspect-[9/19] overflow-hidden rounded-[36px] bg-surface shadow-inner">
              <div className="flex items-center justify-between bg-surface/90 px-6 pt-4 pb-2 backdrop-blur-md">
                <span className="text-[9px] font-semibold tracking-widest text-on-surface-variant uppercase">
                  Moment Kita
                </span>
                <Volume2 aria-hidden size={15} className="text-secondary" />
              </div>
              <div className="flex flex-col items-center gap-4 px-6 py-6 text-center">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-secondary uppercase">
                  Save The Date
                </span>
                <h2 className="font-serif text-[28px] leading-tight">
                  Melina
                  <br />
                  <em className="font-normal text-on-surface-variant">
                    &amp;
                  </em>{" "}
                  Dayson
                </h2>
                <p className="text-[10px] font-semibold tracking-wider text-on-surface-variant uppercase">
                  Sabtu · 24 Okt 2026
                </p>
                <div className="my-3 grid size-12 place-items-center rounded-full bg-secondary font-serif text-sm text-white shadow-md">
                  M
                </div>
                <div className="w-full space-y-1 rounded-xl bg-surface-low p-4 text-left">
                  <span className="block text-[9px] font-semibold tracking-wider text-secondary uppercase">
                    Château de Villette
                  </span>
                  <span className="block text-[11px] text-on-surface-variant">
                    Condécourt, Île-de-France
                  </span>
                  <div className="flex items-center justify-between pt-2 text-[9px] font-semibold uppercase">
                    <span>16:00 Akad</span>
                    <span className="text-secondary">Petunjuk arah →</span>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="w-full rounded-lg bg-primary py-3 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm"
                >
                  Buka Undangan
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute top-12 -left-2 z-20 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:left-4">
            <span className="grid size-8 place-items-center rounded-full bg-surface-container text-secondary">
              <CheckCircle2 aria-hidden size={17} />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase">
                Respons tamu tertata
              </p>
              <p className="text-[10px] text-secondary">RSVP mudah dipantau</p>
            </div>
          </div>
          <div className="absolute right-0 bottom-16 z-20 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:flex">
            <span className="grid size-8 place-items-center rounded-full bg-secondary text-white">
              <Globe2 aria-hidden size={17} />
            </span>
            <div>
              <p className="text-[9px] font-semibold text-on-surface-variant uppercase">
                Tautan undangan personal
              </p>
              <p className="text-[11px] font-semibold">
                momentkita.com/melina-dayson
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-8 z-20 flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-white shadow-lg">
            <Music2
              aria-hidden
              size={13}
              className="animate-pulse text-accent"
            />
            <span className="text-[9px] font-semibold tracking-wider uppercase">
              Clair de Lune · 02:40
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
