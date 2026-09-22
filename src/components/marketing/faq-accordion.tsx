"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-border">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-serif text-xl leading-7">
                {item.question}
              </span>
              {isOpen ? (
                <Minus
                  aria-hidden
                  className="shrink-0 text-secondary"
                  size={18}
                />
              ) : (
                <Plus
                  aria-hidden
                  className="shrink-0 text-secondary"
                  size={18}
                />
              )}
            </button>
            {isOpen ? (
              <p className="max-w-3xl pb-6 text-sm leading-7 text-on-surface-variant">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
