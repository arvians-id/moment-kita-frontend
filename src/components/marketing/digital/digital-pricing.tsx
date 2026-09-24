import { Check } from "lucide-react";
import Link from "next/link";

import type { Package } from "@/types";
import { idrFormat as currency } from "@/lib/format";


export function DigitalPricing({ packages }: { packages: Package[] }) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
          04 — Investment
        </p>
        <h2 className="mt-3 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
          Clear Digital Suite Options
        </h2>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
          Choose the level of story space and studio assistance that fits your
          celebration. Package availability follows the published service terms.
        </p>
      </div>

      <div className="grid items-stretch gap-8 lg:grid-cols-3">
        {packages.map((item) => (
          <article
            key={item.id}
            className={`relative flex flex-col justify-between gap-8 p-8 shadow-sm lg:p-10 ${item.featured ? "my-2 bg-primary text-white shadow-2xl lg:-mt-4 lg:mb-4" : "bg-white"}`}
          >
            {item.featured ? (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-[9px] font-semibold tracking-widest whitespace-nowrap text-white uppercase shadow-md">
                Most Popular Choice
              </span>
            ) : null}
            <div className="space-y-6">
              <div>
                <p
                  className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${item.featured ? "text-accent" : "text-secondary"}`}
                >
                  {item.featured
                    ? "Complete Experience"
                    : item.id === "prestige"
                      ? "Concierge Guided"
                      : "Suite Standard"}
                </p>
                <h3 className="mt-2 font-serif text-[28px] font-medium">
                  {item.name}
                </h3>
                <div className="flex flex-wrap items-baseline gap-2 pt-2">
                  <span className="font-serif text-[42px] leading-none sm:text-[48px]">
                    {currency.format(item.price)}
                  </span>
                  <span
                    className={`text-[10px] uppercase ${item.featured ? "text-white/60" : "text-on-surface-variant"}`}
                  >
                    starting price
                  </span>
                </div>
                <p
                  className={`mt-4 text-[13px] leading-5 ${item.featured ? "text-white/75" : "text-on-surface-variant"}`}
                >
                  {item.description}
                </p>
              </div>
              <div
                className={`h-px w-full ${item.featured ? "bg-white/15" : "bg-surface-container"}`}
              />
              <ul className="space-y-3 text-[13px]">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      aria-hidden
                      size={17}
                      className={`mt-0.5 shrink-0 ${item.featured ? "text-accent" : "text-secondary"}`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={item.id === "prestige" ? "/contact" : "/register"}
              className={`block w-full py-4 text-center text-[10px] font-semibold tracking-wider uppercase transition-colors ${item.featured ? "bg-secondary text-white hover:bg-accent hover:text-accent-foreground" : "bg-surface-container text-primary hover:bg-surface-high"}`}
            >
              {item.id === "prestige"
                ? "Consult the Studio"
                : `Select ${item.name}`}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
