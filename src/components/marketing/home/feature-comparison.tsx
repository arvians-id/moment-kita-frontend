import { Blend, Check, MonitorSmartphone, ScrollText } from "lucide-react";
import Link from "next/link";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const comparisonCards = [
  {
    title: "The Digital Suite",
    description:
      "Effortless logistics, guest responses, and multi-event coordination.",
    features: [
      "RSVP and dietary response tracking",
      "Personal links for invited guests",
      "Event schedules and directions",
      "Gallery, story, and wishes sections",
      "Mobile-first invitation delivery",
    ],
    footnote: "Fastest setup · ready to personalize",
    kind: "digital",
  },
  {
    title: "The Print Atelier",
    description:
      "Tactile heirloom presence, cotton papers, and considered finishing.",
    features: [
      "Heavy cotton and deckled papers",
      "Blind deboss and metallic foil",
      "Engraved monogram options",
      "Hand-finished presentation details",
      "Keepsakes made for family archives",
    ],
    footnote: "Bespoke production · discussed directly",
    kind: "print",
  },
  {
    title: "The Harmonized Suite",
    description:
      "The modern celebration format: tactile keepsakes with digital ease.",
    features: [
      "Printed keepsakes for your closest circle",
      "Matching digital invitation for every guest",
      "One visual identity across both formats",
      "A coordinated studio consultation",
    ],
    footnote: "A complete expression across paper and pixel",
    kind: "hybrid",
  },
] as const;

export function FeatureComparison() {
  return (
    <section
      id="features"
      className="scroll-mt-20 bg-surface-container py-20 lg:py-28"
    >
      <Container>
        <EditorialHeading
          kicker="03 — Medium synthesis"
          title="Digital Intelligence vs. Tactile Permanence"
          description={
            <p className="mx-auto max-w-3xl">
              Pair an immediate digital guest journey with a limited fine-paper
              edition, or choose the medium that best fits your celebration.
            </p>
          }
          align="center"
          className="max-w-4xl"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {comparisonCards.map((card) => {
            const isHybrid = card.kind === "hybrid";

            return (
              <article
                key={card.title}
                className={`relative flex flex-col justify-between overflow-hidden p-7 sm:p-8 ${
                  isHybrid
                    ? "bg-primary text-primary-foreground shadow-xl"
                    : "bg-surface-lowest text-on-surface shadow-sm"
                }`}
              >
                {isHybrid ? (
                  <div className="absolute -right-14 -top-14 size-44 rounded-full bg-secondary/30 blur-3xl" />
                ) : null}
                <div className="relative">
                  <span
                    className={`grid size-12 place-items-center rounded-full ${
                      isHybrid
                        ? "bg-secondary"
                        : card.kind === "digital"
                          ? "bg-accent"
                          : "bg-surface-highest"
                    }`}
                  >
                    {card.kind === "digital" ? (
                      <MonitorSmartphone
                        aria-hidden="true"
                        size={20}
                        className="text-secondary"
                      />
                    ) : card.kind === "print" ? (
                      <ScrollText aria-hidden="true" size={20} />
                    ) : (
                      <Blend aria-hidden="true" size={20} />
                    )}
                  </span>
                  {isHybrid ? (
                    <p className="mt-5 inline-flex bg-terracotta-soft px-3 py-1 text-[9px] font-semibold tracking-[0.15em] text-[#703722] uppercase">
                      Most complete expression
                    </p>
                  ) : null}
                  <h3 className="mt-5 font-serif text-2xl">{card.title}</h3>
                  <p
                    className={`mt-3 text-xs leading-5 ${isHybrid ? "text-white/65" : "text-on-surface-variant"}`}
                  >
                    {card.description}
                  </p>
                  <ul className="mt-7 space-y-3 text-xs leading-5">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden="true"
                          size={15}
                          className={`mt-0.5 shrink-0 ${isHybrid ? "text-champagne" : "text-secondary"}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-9 border-t border-current/10 pt-6">
                  <p
                    className={`text-[9px] font-semibold tracking-[0.12em] uppercase ${isHybrid ? "text-champagne" : "text-secondary"}`}
                  >
                    {card.footnote}
                  </p>
                  {isHybrid ? (
                    <Link
                      href="/contact"
                      className="mt-5 flex min-h-11 items-center justify-center bg-secondary px-4 text-[9px] font-semibold tracking-[0.13em] uppercase transition-colors hover:bg-white hover:text-primary"
                    >
                      Inquire about both
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
