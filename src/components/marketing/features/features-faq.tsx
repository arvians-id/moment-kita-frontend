"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question:
      "Can guests view our invitation without downloading an app or creating an account?",
    answer:
      "Yes. Guests can open the invitation in a modern browser without installing an application or creating a separate account.",
  },
  {
    question: "How does the digital envelope work?",
    answer:
      "The invitation can present the couple’s chosen gifting instructions in a discreet chapter, keeping guests within the same considered experience.",
  },
  {
    question:
      "Can we update wedding details after the invitation has been distributed?",
    answer:
      "Yes. Supported content can be revised after finalization while the chosen template and invitation address remain stable.",
  },
  {
    question: "Is our guest list and personal ceremony data kept confidential?",
    answer:
      "Moment Kita is designed around private invitation access. We do not turn the guest journey into an advertising feed, and public views expose only the content intended for invitees.",
  },
] as const;

export function FeaturesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="features-faq"
      className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="pb-2 text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            06 — Clarity &amp; Support
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Frequently answered inquiries.
          </h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            The essentials about browser access, invitation updates, gifting,
            and guest privacy.
          </p>
        </div>
        <div className="space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl bg-surface-low"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 p-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`features-faq-answer-${index}`}
                >
                  <span className="font-serif text-lg leading-6">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={20}
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p
                    id={`features-faq-answer-${index}`}
                    className="px-4 pb-4 text-sm leading-6 text-on-surface-variant"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
