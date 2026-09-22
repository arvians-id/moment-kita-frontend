"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "What is the minimum order quantity for printed invitations?",
    answer:
      "Our standard production run begins at 50 suites to maintain economic feasibility for custom metal die manufacturing and Heidelberg press setup. Smaller boutique runs (30 suites) are easily accommodated under our Intimate Gatherings tier.",
  },
  {
    question: "How long does the design and production process take?",
    answer:
      "Typographic proofs are delivered within 48 hours via WhatsApp. Following your final sign-off, production, manual edge tearing, foil stamping, and drying require 3 to 4 weeks. Rush 14-day production is available upon atelier capacity verification.",
  },
  {
    question: "Can we request physical paper and foil samples before ordering?",
    answer:
      "Yes, wholeheartedly. We recommend ordering our curated Artisan Swatch Kit (Rp250.000, fully credited toward your eventual invitation commission). It contains all paper densities, foil shades, ribbon swatches, and wax seal examples.",
  },
  {
    question:
      "Why do you take orders via WhatsApp rather than an automated checkout?",
    answer:
      "Heirloom letterpress is an haute-couture medium. Dialogue regarding paper absorbency, plate deboss depth, venue color palettes, and wording etiquette cannot be properly solved by an impersonal web dropdown. Our clients enjoy frictionless 1-on-1 WhatsApp consultations with real typographers.",
  },
  {
    question:
      "Can we pair our printed stationery with a matching digital invitation?",
    answer:
      "Yes. Our harmonization approach keeps your digital invitation aligned with the same typography, hand-drawn monogram crest, and color tonalities. Printed cards can also feature subtle micro-QR codes stamped in foil on details inserts.",
  },
  {
    question: "Do you handle guest addressing and calligraphy?",
    answer:
      "We provide both archival digital calligraphic guest address printing that matches your primary suite typeface, as well as true hand-lettered dip-pen pointed nib calligraphy executed by our studio scribes.",
  },
] as const;

export function PrintedFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-surface-low py-12">
      <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8 lg:px-14">
        <div className="mb-12 text-center">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Guidance &amp; Clarifications
          </p>
          <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Frequently Answered Questions
          </h2>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="rounded-[8px] bg-surface-lowest p-6 shadow-sm"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`printed-faq-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-serif text-base leading-6 sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden
                      size={20}
                      className={`shrink-0 text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <p
                    id={`printed-faq-${index}`}
                    className="mt-3 border-t border-surface-container pt-3 text-[13px] leading-5 text-on-surface-variant"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
