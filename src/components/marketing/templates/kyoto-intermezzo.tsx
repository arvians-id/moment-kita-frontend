import { ExternalLink, PlayCircle, Sparkles, Pointer } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const palette = [
  { hex: "#141312", className: "bg-espresso text-white/70" },
  { hex: "#E3D4BE", className: "bg-champagne text-espresso" },
  { hex: "#8C4D37", className: "bg-secondary text-white" },
  { hex: "#F6F3ED", className: "bg-surface-low text-espresso" },
] as const;

const insets = [
  {
    icon: Pointer,
    title: "Digital Touchpoints",
    text: "Interactive countdown timer with localized time zone switching for international destination attendees.",
  },
  {
    icon: Sparkles,
    title: "Blind Letterpress",
    text: "Deep 3D deboss impression on 800gsm duplex board with edge gilding in matte champagne foil.",
  },
] as const;

export function KyotoIntermezzo() {
  return (
    <section className="relative w-full overflow-hidden bg-espresso py-20 text-white lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e3d4be_1px,transparent_1px)] bg-[length:36px_36px] opacity-10"
      />
      <Container className="relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-6 pb-12 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-champagne uppercase">
              Curator&rsquo;s Master Study
            </span>
            <span aria-hidden className="h-px w-8 bg-white/20" />
            <span className="text-[13px] leading-5 text-white/60">
              Monolith Noir Edition
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-white/70 uppercase">
              Atelier Archival Code: NOCT-88
            </span>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-[12px] leading-4 font-semibold tracking-[0.12em] text-champagne uppercase transition-colors hover:text-white"
            >
              <span>Read Typographic Essay</span>
              <ExternalLink aria-hidden size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div>
              <span className="mb-3 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-champagne uppercase">
                Nocturne Series
              </span>
              <h2 className="mb-6 font-serif text-[36px] leading-none tracking-tight text-white md:text-[56px]">
                Kyoto{" "}
                <span className="font-normal text-champagne italic">
                  Whisper
                </span>
              </h2>
              <p className="mb-8 text-[15px] leading-relaxed text-white/80 md:text-[18px]">
                A high-fashion exploration of restrained Japanese wabi-sabi
                minimalism paired with dramatic high-contrast typography.
                Conceived for evening celebrations in gallery spaces,
                glasshouses, and historic stone villas.
              </p>
            </div>

            <div className="rounded-[12px] bg-white/5 p-6 backdrop-blur-md">
              <span className="mb-4 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-champagne uppercase">
                Curated Material Palette
              </span>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {palette.map(({ hex, className }) => (
                  <div
                    key={hex}
                    className={`grid size-12 place-items-center rounded-[8px] font-mono text-[10px] shadow-md ${className}`}
                  >
                    {hex}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60">
                Charcoal Noir cardstock • Champagne blind deboss • Terracotta
                sealing wax • Mulberry paper translucent jacket.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link
                href="/templates/nocturne-01"
                className="rounded-[8px] bg-champagne px-8 py-4 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-espresso uppercase shadow-lg transition-colors hover:bg-white"
              >
                Explore Kyoto Whisper
              </Link>
              <Link
                href="/digital"
                className="flex items-center justify-center gap-2 rounded-[8px] bg-transparent px-6 py-4 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-white/10"
              >
                <PlayCircle aria-hidden size={18} />
                <span>Watch Experience</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div className="overflow-hidden rounded-[16px] bg-white/5 shadow-2xl">
                <div className="bg-gradient-to-b from-white/10 to-transparent p-8 text-center sm:p-12">
                  <span className="mb-4 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-champagne uppercase">
                    Typographic Specimen 24pt / 60pt
                  </span>
                  <p className="mb-4 font-serif text-3xl leading-tight text-champagne italic sm:text-5xl">
                    &ldquo;Together in quiet reverence.&rdquo;
                  </p>
                  <span
                    aria-hidden
                    className="mx-auto my-6 block h-px w-16 bg-champagne/40"
                  />
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs text-white/60">
                    <span>PLAYFAIR DISPLAY</span>
                    <span aria-hidden>•</span>
                    <span>PLUS JAKARTA SANS</span>
                    <span aria-hidden>•</span>
                    <span>CUSTOM CREST MONOGRAM</span>
                  </div>
                </div>
              </div>

              <div className="-mt-8 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
                {insets.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-[12px] bg-[#1c1b1a] p-5 shadow-xl"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Icon aria-hidden size={18} className="text-champagne" />
                      <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] text-white uppercase">
                        {title}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-white/70">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
