import { ChevronDown } from "lucide-react";

import { Container } from "@/components/shared/container";

const questions = [
  {
    question:
      "Are there recurring monthly subscriptions or hidden renewal costs?",
    answer:
      "The current package catalogue uses one-time prices. Invitation availability still follows the configured package duration and lifecycle; Moment Kita does not promise lifetime hosting.",
  },
  {
    question: "Can I upgrade from Essential to Signature or Prestige later?",
    answer:
      "Upgrade behavior will follow explicit package, transaction, entitlement, and quota rules when backend integration is implemented. This marketing page does not alter an entitlement.",
  },
  {
    question:
      "How does the Printed Stationery deposit and production workflow operate?",
    answer:
      "Printed commissions are quoted and confirmed manually. Deposit timing, proof approval, remaining payment, production, and delivery are agreed directly with the studio.",
  },
  {
    question:
      "What is the cancellation and refund policy for digital and print orders?",
    answer:
      "Final policies will be presented before a real transaction. This frontend does not collect payment, create orders, or promise refunds outside the approved commercial rules.",
  },
  {
    question:
      "Can I request a physical sample swatch kit before committing to print?",
    answer:
      "Material sampling can be requested through the studio. Availability, contents, pricing, and delivery are confirmed manually for each inquiry.",
  },
] as const;

export function PricingFaq() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            03 — Complete transparency
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
            Frequently Answered Questions
          </h2>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Essential details on digital access, upgrades, print deposits, and
            sample kits.
          </p>
        </div>
        <div className="max-w-4xl space-y-4">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg bg-surface-lowest p-5 shadow-sm sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg leading-7">
                {item.question}
                <ChevronDown
                  aria-hidden
                  size={18}
                  className="shrink-0 text-secondary transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 border-t border-surface-container pt-4 text-sm leading-7 text-on-surface-variant">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
