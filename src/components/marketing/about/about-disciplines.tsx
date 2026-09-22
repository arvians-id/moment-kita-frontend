import { ArrowRight, Check, Network } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const disciplines = [
  {
    kicker: "01 — Digital Experience",
    badge: "Interactive Suite",
    title: "The Digital Invitation Suite",
    text: "Architected for the modern celebration requiring fluid agility without synthetic aesthetics. Delivered directly to guest inboxes or instant messaging with digital wax seals.",
    features: [
      "Interactive digital envelopes with custom audio accompaniment",
      "Personal Moment Kita invitation addresses for every celebration",
      "Real-time RSVP intelligence, dietary logic, & guest capacity caps",
      "0% fee gifting details linked to the couple's chosen accounts",
    ],
    cta: { href: "/digital", label: "Explore Digital Suite" },
    surface: "bg-surface-lowest",
    badgeSurface: "bg-surface-container",
  },
  {
    kicker: "02 — Bespoke Print",
    badge: "Archival Craft",
    title: "The Artisan Printed Atelier",
    text: "Tactile paper heirlooms designed to outlive the celebration. Handcrafted with traditional platen letterpress techniques, foil stamping, and organic raw deckle edges.",
    features: [
      "600–900gsm wild European 100% cotton handmade cardstock",
      "Hand-mixed custom Pantone ink debossing and hot foil stamping",
      "Calligraphic envelope addressing and bespoke wax seals",
      "Direct 1-on-1 proofing sessions with studio typographers",
    ],
    cta: { href: "/printed", label: "Explore Printed Atelier" },
    surface: "bg-surface-high",
    badgeSurface: "bg-surface-highest",
  },
] as const;

export function AboutDisciplines() {
  return (
    <section className="w-full bg-surface py-12 lg:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-1 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            The Dual Disciplines
          </span>
          <h2 className="mb-2 font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Two distinct expressions of love. One elevated studio.
          </h2>
          <p className="text-[15px] leading-6 text-on-surface-variant">
            Both mediums share our uncompromising aesthetic standard, yet each
            serves your celebration with distinct autonomy. Choose one, or
            harmoniously unite both.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {disciplines.map((discipline) => (
            <article
              key={discipline.kicker}
              className={`relative flex flex-col justify-between overflow-hidden p-7 shadow-sm lg:p-12 ${discipline.surface}`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                    {discipline.kicker}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap uppercase ${discipline.badgeSurface}`}
                  >
                    {discipline.badge}
                  </span>
                </div>
                <h3 className="font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                  {discipline.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">
                  {discipline.text}
                </p>
                <ul className="flex flex-col gap-2 pt-2 text-[13px] leading-5 text-on-surface-variant">
                  {discipline.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-7">
                <Link
                  href={discipline.cta.href}
                  className="inline-flex items-center justify-center bg-primary px-6 py-3.5 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
                >
                  {discipline.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-4 bg-surface-low p-7 shadow-sm md:flex-row">
          <div className="flex items-start gap-4">
            <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary">
              <Network aria-hidden size={20} />
            </span>
            <div className="flex flex-col">
              <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase">
                The Harmonized Protocol
              </span>
              <p className="max-w-2xl text-[13px] leading-relaxed text-on-surface-variant">
                Most of our couples harmonize both worlds: a printed keepsake
                suite for the mantelpiece and elder family members, complemented
                by a digital companion suite for effortless guest logistics,
                live directions, and multi-event itineraries.
              </p>
            </div>
          </div>
          <Link
            href="/how-it-works"
            className="flex shrink-0 items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
          >
            <span>Learn about hybrid suites</span>
            <ArrowRight aria-hidden size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
