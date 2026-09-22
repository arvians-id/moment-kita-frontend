import {
  ArrowRight,
  BookOpen,
  CloudCog,
  Fingerprint,
  MoveUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const pillars = [
  {
    icon: BookOpen,
    kicker: "01 / Aesthetic",
    title: "Typographic Reverence & Restraint",
    text: "Drawing from classic editorial layouts and Swiss architectural proportions. Every font pairing, line height, and whitespace margin is calibrated for emotional weight and visual timelessness—never succumbing to ephemeral internet design fads.",
    footnote: "Hand-balanced kerning",
  },
  {
    icon: CloudCog,
    kicker: "02 / Infrastructure",
    title: "Quiet Cloud Architecture",
    text: "Technology should never feel cold or algorithmic. Our digital suites load quickly on edge networks worldwide, provide seamless real-time RSVP coordination, zero-commission cash gifts, and private guest intimacy without ads, third-party trackers, or app downloads.",
    footnote: "Encrypted guest journeys",
  },
  {
    icon: Fingerprint,
    kicker: "03 / Materiality",
    title: "The Permanent Artifact",
    text: "Working alongside master artisans with restored 1950s Heidelberg platen presses. 600 to 900gsm wild European cotton papers, hand-torn deckle edges, heated copper foils, and hand-poured wax monograms engineered to become cherished heirlooms for generations.",
    footnote: "Heidelberg platen archival press",
  },
] as const;

export function AboutPhilosophy() {
  return (
    <section className="w-full bg-surface-low py-12 lg:py-28">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-1">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Our Philosophy
            </span>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Three commitments that guide every typographic stroke, line of
              code, and cotton press run.
            </h2>
          </div>
          <p className="hidden text-right text-[12px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase lg:block">
            Architecture &amp; Atelier
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, kicker, title, text, footnote }) => (
            <article
              key={kicker}
              className="flex flex-col justify-between bg-surface-lowest p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                    {kicker}
                  </span>
                  <Icon
                    aria-hidden
                    size={20}
                    className="shrink-0 text-on-surface-variant"
                  />
                </div>
                <h3 className="font-serif text-[22px] leading-[30px] font-semibold">
                  {title}
                </h3>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">
                  {text}
                </p>
              </div>
              <p className="flex items-center gap-1 pt-7 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
                <span>{footnote}</span>
                <ArrowRight aria-hidden size={14} />
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="overflow-hidden shadow-md md:col-span-7">
            <div className="relative h-[280px] w-full sm:h-[360px]">
              <Image
                src="/images/marketing/embossed-cotton-invitation.png"
                alt="Blind deboss and warm copper-rose foil letterpress on thick handmade deckle-edge cotton paper"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-surface-container p-7 md:col-span-5">
            <span className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              The Tactile Impression
            </span>
            <h3 className="mb-2 font-serif text-[22px] leading-[30px] font-semibold">
              Deep blind deboss &amp; warm copper foil.
            </h3>
            <p className="text-[13px] leading-relaxed text-on-surface-variant">
              Every sheet in our print atelier is pulled by hand. We believe in
              the physical weight of an invitation—the unmistakable, textured
              resistance of 100% rag cotton meeting high-tonnage mechanical
              impression dies.
            </p>
            <Link
              href="/printed"
              className="mt-4 flex items-center gap-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
            >
              <span>View Material Swatchbook</span>
              <MoveUpRight aria-hidden size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
