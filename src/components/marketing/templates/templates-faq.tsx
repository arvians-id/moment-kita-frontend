"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question:
      "Can I switch templates after entering my guest list and wedding story?",
    answer:
      "Yes. Your guest list, schedule, dietary preferences, RSVP answers, and photo galleries live independently of your design theme, so the supported template can be changed while your content stays intact and the typography and colour styling adapt with it.",
  },
  {
    question:
      "Can we pair any digital design with an artisan printed counterpart?",
    answer:
      "Every edition in our catalog has a printed counterpart engineered for 600gsm cotton paper. Printed suites can also carry a discreet blind-debossed micro QR seal so guests can open the synchronized digital experience on their phones.",
  },
  {
    question:
      "How do music and interactive maps integrate into digital suites?",
    answer:
      "Guests can open their digital envelope with gentle ambient audio, and venues feature direct interactive directions that open in their preferred maps application, complete with parking and arrival guidance.",
  },
  {
    question:
      "What is the turnaround time for physical printed proofs and production?",
    answer:
      "Digital proofing is completed within a few business days of your order. Once you approve proofs, the letterpress and foil stamping run takes roughly two to three weeks, after which orders are delivered by tracked courier.",
  },
] as const;

export function TemplatesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mb-2 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Frequently Addressed
            </span>
            <h2 className="mb-4 font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
              Guidance for Selecting Your Template
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
              Choosing an invitation suite sets the emotional tone for your
              celebration. Here is how our digital architecture and fine
              stationery blend seamlessly.
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
            >
              <span>Read the full production process</span>
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>

          <div className="space-y-4 lg:col-span-8">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <article
                  key={item.question}
                  className="rounded-[12px] bg-surface-lowest p-6 shadow-sm"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`templates-faq-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-5 text-left"
                    >
                      <span className="font-serif text-lg leading-7 transition-colors group-hover:text-secondary md:text-[22px] md:leading-[30px] md:font-semibold">
                        {item.question}
                      </span>
                      <ChevronDown
                        aria-hidden
                        size={20}
                        className={`shrink-0 text-on-surface-variant transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  {isOpen ? (
                    <p
                      id={`templates-faq-${index}`}
                      className="mt-4 pt-4 text-[15px] leading-relaxed text-on-surface-variant"
                    >
                      {item.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
