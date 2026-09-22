"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const questions = [
  {
    question: "Can we combine digital invitations with printed keepsake sets?",
    answer:
      "Yes. A harmonized direction can pair a digital invitation for your wider guest list with a smaller print edition for family, close friends, or personal archives.",
  },
  {
    question:
      "Why are printed orders discussed directly instead of through a cart?",
    answer:
      "Paper weight, texture, finishing, quantity, and assembly all affect the final piece. A direct conversation lets the studio recommend a combination that fits your celebration and budget.",
  },
  {
    question: "How will digital guest responses be gathered?",
    answer:
      "The final invitation experience will let invited guests respond through the published invitation. The customer management experience is intentionally outside this public-marketing phase.",
  },
  {
    question: "How quickly can we begin personalizing a digital invitation?",
    answer:
      "You can explore the visual collection now. Account creation, editing, publishing, and other authenticated workflows will arrive in their dedicated implementation phases.",
  },
  {
    question: "What print finishes and paper weights are available?",
    answer:
      "The atelier direction includes substantial cotton papers, deckled options, blind debossing, metallic foil, vellum layers, ribbon, and wax-seal finishing. Exact availability is confirmed during consultation.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <Container className="max-w-[960px]">
        <EditorialHeading
          kicker="08 — Questions answered"
          title="Frequently Asked Inquiries"
          align="center"
        />
        <div className="mt-12 space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `home-faq-answer-${index}`;

            return (
              <div key={item.question} className="bg-surface-lowest shadow-sm">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left font-serif text-base sm:p-6 sm:text-xl"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    {isOpen ? (
                      <Minus
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-secondary"
                      />
                    ) : (
                      <Plus
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-secondary"
                      />
                    )}
                  </button>
                </h3>
                <div
                  id={answerId}
                  hidden={!isOpen}
                  className="px-5 pb-6 text-sm leading-6 text-on-surface-variant sm:px-6"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
