import { Check, MessageCircle, Palette } from "lucide-react";
import Link from "next/link";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";
import type { Package } from "@/types";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const tierLabels: Record<string, string> = {
  essential: "Self-guided",
  signature: "Complete experience",
  prestige: "Studio assisted",
};

export function PricingSection({ packages }: { packages: Package[] }) {
  return (
    <section className="py-20 lg:py-28" id="pricing-preview">
      <Container>
        <EditorialHeading
          kicker="07 — Transparent investment"
          title="Simple Tiers for Modern Celebrations"
          description="Clear one-time packages for digital invitations, with individual quotations for tactile stationery commissions."
          align="center"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.id}
              className={`relative flex flex-col justify-between bg-surface-lowest p-7 shadow-sm sm:p-8 ${
                item.featured ? "ring-1 ring-secondary/25 shadow-md" : ""
              }`}
            >
              {item.featured ? (
                <span className="absolute right-4 top-4 bg-secondary px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase">
                  Most selected
                </span>
              ) : null}
              <div>
                <p className="text-[9px] font-semibold tracking-[0.17em] text-secondary uppercase">
                  {tierLabels[item.id] ?? "Digital suite"}
                </p>
                <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
                <p className="mt-3 min-h-12 text-xs leading-5 text-on-surface-variant">
                  {item.description}
                </p>
                <p className="my-7">
                  <span className="font-serif text-4xl">
                    {currency.format(item.price)}
                  </span>
                  <span className="ml-1 text-[10px] text-on-surface-variant">
                    one-time
                  </span>
                </p>
                <ul className="space-y-3 text-xs leading-5">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        size={14}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={item.id === "prestige" ? "/contact" : "/templates"}
                className={`mt-9 flex min-h-11 items-center justify-center px-5 text-[9px] font-semibold tracking-[0.13em] uppercase transition-colors ${
                  item.featured
                    ? "bg-primary text-primary-foreground hover:bg-secondary"
                    : "bg-surface-container hover:bg-surface-highest"
                }`}
              >
                {item.id === "prestige"
                  ? "Book studio consultation"
                  : `Choose ${item.name}`}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-8 bg-surface-low p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
              <Palette aria-hidden="true" size={15} /> Artisan letterpress &amp;
              stationery suites
            </p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl">
              Tangible invitations, quoted around your chosen material and
              finish.
            </h3>
            <p className="mt-3 text-xs leading-5 text-on-surface-variant">
              Cotton paper, letterpress, embossing, envelope details, wax seals,
              and day-of stationery are composed as one cohesive suite.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/printed"
              className="flex min-h-12 items-center justify-center bg-surface-container px-6 text-[9px] font-semibold tracking-[0.13em] uppercase hover:bg-surface-highest"
            >
              Explore print
            </Link>
            <Link
              href="/contact"
              className="flex min-h-12 items-center justify-center gap-2 bg-primary px-6 text-[9px] font-semibold tracking-[0.13em] text-primary-foreground uppercase hover:bg-secondary"
            >
              <MessageCircle aria-hidden="true" size={15} /> Request a quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
