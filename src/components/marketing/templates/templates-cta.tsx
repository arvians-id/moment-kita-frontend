import Link from "next/link";

import { Container } from "@/components/shared/container";

const assurances = [
  "Instant Cloud Activation",
  "Worldwide Fine Paper Delivery",
  "Dedicated Studio Typographer",
] as const;

export function TemplatesCta() {
  return (
    <section className="relative w-full overflow-hidden bg-espresso py-20 text-white lg:py-28">
      <Container className="relative z-10 text-center">
        <span className="mb-4 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-champagne uppercase">
          The Moment Kita Experience
        </span>
        <h2 className="mx-auto mb-6 max-w-3xl font-serif text-[44px] leading-tight tracking-[-0.02em] text-white lg:text-[56px] lg:tracking-[-0.03em]">
          Ready to preview your celebration?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-white/70 lg:text-[18px]">
          Begin customizing any digital suite immediately with zero obligation.
          Or connect directly with our print concierge to orchestrate physical
          stationery proofs.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/digital"
            className="w-full rounded-[8px] bg-champagne px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-espresso uppercase shadow-lg transition-colors hover:bg-white sm:w-auto"
          >
            Explore Live Digital Demo
          </Link>
          <Link
            href="#concierge-sample"
            className="w-full rounded-[8px] bg-white/10 px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-white/20 sm:w-auto"
          >
            Request Sample Swatch Box (Rp250.000)
          </Link>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-12 font-mono text-xs text-white/50">
          {assurances.map((item, index) => (
            <li key={item} className="flex items-center gap-6">
              {index > 0 ? <span aria-hidden>•</span> : null}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
