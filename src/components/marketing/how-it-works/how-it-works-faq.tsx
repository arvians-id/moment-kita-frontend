"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question:
      "Can I transition from a digital invitation to a printed suite later?",
    answer:
      "Yes. A shared typographic direction, palette, and monogram can move from the digital invitation into a later stationery conversation. The printed commission is confirmed separately with the studio.",
  },
  {
    question: "How do revisions work for printed typography proofs?",
    answer:
      "Your studio proposal sets out the proofing rhythm before production begins. Typography, wording, hierarchy, and finishing notes are reviewed and approved before the commission reaches the press.",
  },
  {
    question:
      "What happens if our wedding date or venue changes after publishing?",
    answer:
      "Supported digital content can be updated after publishing without changing the invitation address. Printed pieces cannot be altered once production is approved, so the studio will discuss the most appropriate next step with you.",
  },
  {
    question:
      "Can we review paper and finish options before making our decision?",
    answer:
      "Absolutely. Begin with a studio conversation about the papers, weight, foil, deboss, and edge treatments you are considering. Any physical sampling and its cost will be confirmed manually with the studio.",
  },
] as const;

export function HowItWorksFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pb-24 lg:pb-32">
      <Container className="max-w-4xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Concierge advisory
          </p>
          <h2 className="mt-3 font-serif text-3xl text-primary sm:text-4xl">
            Frequently Answered
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="rounded-lg bg-surface-lowest px-6 shadow-sm sm:px-7"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-serif text-lg leading-7 text-primary sm:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={20}
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p className="border-t border-border pb-6 pt-4 text-sm leading-7 text-on-surface-variant">
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
