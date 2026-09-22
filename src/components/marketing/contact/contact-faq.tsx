import { ChevronDown } from "lucide-react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question: "How quickly will the studio respond to my inquiry?",
    answer:
      "Response times are confirmed when studio correspondence is connected. For now, this page is a frontend-only preview and does not send inquiries.",
  },
  {
    question: "Can my wedding planner or coordinator liaise with you directly?",
    answer:
      "Yes, a planner may be included in the studio conversation. Account collaboration and shared dashboard access are not part of this public UI phase.",
  },
  {
    question: "Do you offer physical in-person studio consultations?",
    answer:
      "Consultation format and availability are confirmed directly by the studio according to location, timing, and the nature of the commission.",
  },
] as const;

export function ContactFaq() {
  return (
    <section className="pb-12 sm:pb-16">
      <Container>
        <div className="bg-surface-low p-6 shadow-sm sm:p-8 lg:p-12">
          <div className="mb-7 max-w-2xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Punctual clarifications
            </p>
            <h2 className="mt-1 font-serif text-3xl tracking-tight sm:text-4xl">
              Frequently Inquired Matters
            </h2>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
              Essential details on studio timelines, planner collaboration, and
              physical consultations.
            </p>
          </div>
          <div className="space-y-2">
            {questions.map((item, index) => (
              <details
                key={item.question}
                className="group bg-surface-lowest p-4 shadow-sm open:bg-surface"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="flex items-start gap-3 font-serif text-base leading-6 sm:text-lg">
                    <span className="mt-0.5 font-sans text-[9px] font-semibold tracking-wider text-secondary">
                      0{index + 1}
                    </span>
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={17}
                    className="shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="pt-3 pl-7 text-sm leading-7 text-on-surface-variant">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
