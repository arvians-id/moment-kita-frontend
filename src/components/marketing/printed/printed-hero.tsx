import {
  BadgeCheck,
  DraftingCompass,
  MessageCircle,
  Truck,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const assurances = [
  { icon: BadgeCheck, label: "Katun Murni 600–900gsm" },
  { icon: DraftingCompass, label: "Letterpress Heidelberg 1950-an" },
  { icon: Truck, label: "Pengiriman dengan Perlindungan" },
] as const;

const annotations = [
  {
    label: "Kertas: Katun 600gsm dengan Tepi Deckle",
    position: "top-8 left-8 hidden sm:flex",
  },
  {
    label: "Finishing: Foil Copper-Rose",
    position: "bottom-16 right-8 hidden sm:flex",
  },
  {
    label: "Detail: Segel Monogram Buatan Tangan",
    position: "top-1/2 -left-4 -translate-y-1/2 hidden md:flex",
  },
] as const;

export function PrintedHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12">
          <div className="z-10 flex flex-col gap-4 lg:col-span-6">
            <p className="inline-flex items-center gap-2 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              <span className="size-2 shrink-0 rounded-full bg-secondary" />
              02 — Undangan Cetak · Fine Stationery &amp; Letterpress Khusus
            </p>
            <h1 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
              Dibuat untuk{" "}
              <em className="font-normal text-secondary">disentuh</em>.
              <br />
              Dirancang untuk{" "}
              <em className="font-normal text-secondary">dikenang</em>.
            </h1>
            <p className="max-w-xl text-[18px] leading-[30px] tracking-[-0.01em] text-on-surface-variant">
              Undangan pernikahan bertekstur yang dicetak di atas kertas katun
              600gsm, diperkaya blind deboss, dan disempurnakan dengan segel
              lilin. Setiap rangkaian dibuat melalui konsultasi personal.
            </p>
            <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
              <a
                href="#collection"
                className="inline-flex items-center justify-center bg-primary px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase shadow-md transition-colors hover:bg-secondary"
              >
                Jelajahi Koleksi
              </a>
              <a
                href={whatsappHref(
                  "Halo Moment Kita, saya ingin berkonsultasi tentang stationery pernikahan cetak.",
                )}
                {...externalLinkProps}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-surface-lowest px-6 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase shadow-sm transition-colors hover:bg-surface-container"
              >
                <MessageCircle
                  aria-hidden
                  size={18}
                  className="text-secondary"
                />
                <span>Konsultasi via WhatsApp</span>
                <span className="rounded-full bg-accent/60 px-2 py-0.5 text-[10px] font-normal tracking-normal text-secondary lowercase">
                  ±20 mnt
                </span>
              </a>
            </div>
            <ul className="flex flex-col gap-3 pt-4 text-[13px] leading-5 text-on-surface-variant sm:flex-row sm:flex-wrap sm:gap-7">
              {assurances.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon aria-hidden size={16} className="text-secondary" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-7 lg:col-span-6 lg:mt-0">
            <div className="relative overflow-hidden rounded-[8px] bg-surface-low p-3 shadow-2xl md:p-5">
              <Image
                src="/images/marketing/hero-stationery-suite.png"
                alt="Rangkaian undangan pernikahan dengan pita sutra, segel lilin, dan bunga kering"
                width={1376}
                height={768}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full rounded-[4px] object-cover shadow-inner"
              />
              {annotations.map(({ label, position }) => (
                <p
                  key={label}
                  className={`absolute items-center gap-2 rounded-[4px] bg-surface-lowest/95 px-3.5 py-2 text-[11px] leading-4 font-semibold tracking-[0.2em] uppercase shadow-md backdrop-blur-md ${position}`}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-secondary" />
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
