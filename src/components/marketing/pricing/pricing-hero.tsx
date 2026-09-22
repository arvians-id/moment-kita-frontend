import { Circle } from "lucide-react";

import { Container } from "@/components/shared/container";

export function PricingHero() {
  return (
    <>
      <section className="border-b border-border bg-surface-low py-3.5">
        <Container className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.18em] text-secondary uppercase">
            <Circle aria-hidden size={6} fill="currentColor" /> Honest craft
            &amp; clear architecture
          </p>
          <p className="text-center text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase sm:text-right">
            One-time digital packages · Defined invitation lifecycle · Artisan
            studio support
          </p>
        </Container>
      </section>

      <section className="pt-16 pb-10 sm:pt-20 lg:pt-24 lg:pb-12">
        <Container className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              01 — Transparent investment
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.75rem] leading-[1.08] tracking-[-0.025em] sm:text-6xl">
              Choose what fits your{" "}
              <em className="font-normal text-secondary">celebration.</em>
            </h1>
          </div>
          <p className="text-sm leading-7 text-on-surface-variant lg:col-span-4">
            Two distinct expressions of love. Our Digital Invitation Suites
            offer clear one-time package choices, while Artisan Printed Atelier
            pricing is tailored to paper, finishing, and quantity.
          </p>
        </Container>
      </section>
    </>
  );
}
