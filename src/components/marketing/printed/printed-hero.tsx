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
  { icon: BadgeCheck, label: "600–900gsm Pure Cotton" },
  { icon: DraftingCompass, label: "1950s Heidelberg Letterpress" },
  { icon: Truck, label: "Global White-Glove Care" },
] as const;

const annotations = [
  {
    label: "Paper: 600gsm Wild Cotton Deckle Edge",
    position: "top-8 left-8 hidden sm:flex",
  },
  {
    label: "Finishing: Heated Copper-Rose Foil",
    position: "bottom-16 right-8 hidden sm:flex",
  },
  {
    label: "Detail: Hand-Poured Monogram Seal",
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
              02 — The Print Atelier · Heirloom Stationery &amp; Bespoke
              Letterpress
            </p>
            <h1 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
              Made to be <em className="font-normal text-secondary">held</em>.
              <br />
              Designed to be{" "}
              <em className="font-normal text-secondary">remembered</em>.
            </h1>
            <p className="max-w-xl text-[18px] leading-[30px] tracking-[-0.01em] text-on-surface-variant">
              Tactile wedding invitations hand-pressed on archival 600gsm cotton
              papers, sculpted with blind deboss crests, and sealed with antique
              wax. Each heirloom suite is tailored in intimate dialogue with our
              master typographers.
            </p>
            <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
              <a
                href="#collection"
                className="inline-flex items-center justify-center bg-primary px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase shadow-md transition-colors hover:bg-secondary"
              >
                Explore Collection
              </a>
              <a
                href={whatsappHref(
                  "Hello Moment Kita, I would like to consult about printed wedding stationery.",
                )}
                {...externalLinkProps}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-surface-lowest px-6 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase shadow-sm transition-colors hover:bg-surface-container"
              >
                <MessageCircle
                  aria-hidden
                  size={18}
                  className="text-secondary"
                />
                <span>Consult via WhatsApp</span>
                <span className="rounded-full bg-accent/60 px-2 py-0.5 text-[10px] font-normal tracking-normal text-secondary lowercase">
                  avg 20m
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
                alt="Heirloom wedding invitation suite arranged with silk ribbon, wax seal, and pressed florals"
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
