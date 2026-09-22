"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Can I change our wedding information after publishing?",
    answer:
      "Yes. Supported invitation content can be updated after finalization while the selected template and invitation address remain intentionally stable.",
  },
  {
    question: "Can I use a personal custom domain name?",
    answer:
      "Custom domains are not part of the current Moment Kita MVP. Invitations use the supported public invitation address shown during setup.",
  },
  {
    question: "Can I switch templates after entering my details?",
    answer:
      "The selected template becomes fixed at finalization so the published invitation remains compatible with its saved renderer version. Preview designs before making that choice.",
  },
  {
    question: "How long does our wedding invitation remain online?",
    answer:
      "Availability follows the duration and lifecycle rules of the selected package. Moment Kita does not make an unsupported lifetime-hosting promise.",
  },
  {
    question: "What guest responses can the invitation collect?",
    answer:
      "Supported templates and packages can collect attendance, party details, dietary information, wishes, and other enabled guest fields.",
  },
  {
    question: "Can we include gifting details?",
    answer:
      "Yes. Supported invitation sections can present the couple’s chosen gift or bank information with the same restraint as the rest of the guest experience.",
  },
] as const;

export function DigitalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            Curator Knowledge
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Frequently Answered
          </h2>
        </div>
        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={item.question} className="bg-white p-6 shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`digital-faq-${index}`}
                >
                  <span className="font-serif text-base leading-6 sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={19}
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p
                    id={`digital-faq-${index}`}
                    className="pt-4 text-[13px] leading-6 text-on-surface-variant"
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
