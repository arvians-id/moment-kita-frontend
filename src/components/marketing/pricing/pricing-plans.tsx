"use client";

import {
  ArrowRight,
  Check,
  Gem,
  Layers3,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  PackageOpen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/shared/container";
import type { Package, PrintedProduct } from "@/types";

type Mode = "digital" | "print";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const planPresentation = {
  essential: {
    label: "Self-serve",
    extras: [
      "Responsive guest experience",
      "Event schedule and location details",
      "Standard template collection",
      "Studio email support",
    ],
  },
  signature: {
    label: "Recommended",
    extras: [
      "Guest RSVP and dietary details",
      "Gallery and story sections",
      "Expanded visual personalization",
      "Priority studio guidance",
    ],
  },
  prestige: {
    label: "Concierge managed",
    extras: [
      "Everything in Signature",
      "Dedicated setup assistance",
      "Bespoke typographic direction",
      "Direct studio consultation",
    ],
  },
} as const;

const comparisonGroups = [
  {
    title: "01 — Invitation foundation",
    rows: [
      ["Digital invitations included", "1", "1", "1"],
      [
        "Template access",
        "Standard collection",
        "Curated collection",
        "Curated collection",
      ],
      ["Event and venue details", "Included", "Included", "Included"],
    ],
  },
  {
    title: "02 — Guest experience",
    rows: [
      ["RSVP collection", "Core", "Extended", "Extended"],
      ["Dietary and household details", "Core", "Extended", "Extended"],
      ["Guest wishes", "Included", "Included", "Included"],
    ],
  },
  {
    title: "03 — Story and media",
    rows: [
      ["Story sections", "Core", "Extended", "Extended"],
      ["Gallery presentation", "Core", "Extended", "Extended"],
      ["Visual identity refinement", "—", "Included", "Studio assisted"],
    ],
  },
  {
    title: "04 — Studio support",
    rows: [
      ["Setup assistance", "Self-guided", "Priority", "White-glove"],
      [
        "Design consultation",
        "—",
        "Priority support",
        "Dedicated consultation",
      ],
      ["Content preparation", "Self-guided", "Self-guided", "Studio assisted"],
    ],
  },
] as const;

const printPresentation = [
  {
    title: "Essential Collection",
    label: "Minimum discussed",
    featured: false,
    features: [
      "Archival cotton-paper direction",
      "Letterpress or blind-deboss option",
      "Coordinated invitation and details cards",
      "Digital typographic proofing",
    ],
  },
  {
    title: "Premium Collection",
    label: "Atelier favorite",
    featured: true,
    features: [
      "Double-thick cotton-paper direction",
      "Metallic foil and deboss options",
      "Vellum, seals, or silk finishing",
      "Envelope-addressing consultation",
    ],
  },
  {
    title: "Custom Haute Couture",
    label: "Private commission",
    featured: false,
    features: [
      "Unconstrained material direction",
      "Sculptural press and finishing options",
      "Custom monogram consultation",
      "Coordinated day-of stationery direction",
    ],
  },
] as const;

const costArchitecture = [
  [
    "01 — Volume",
    "Quantity Scale",
    "Production setup is distributed across the final suite quantity.",
    "Discussed per commission",
  ],
  [
    "02 — Density",
    "Paper & Texture",
    "Paper weight, texture, layers, and deckle treatment shape the quote.",
    "Cotton and specialty stocks",
  ],
  [
    "03 — Pressing",
    "Finishes & Foil",
    "Each ink, impression, foil, or embossing pass requires its own setup.",
    "Letterpress & foil",
  ],
  [
    "04 — Embellish",
    "Seals & Ribbons",
    "Wax, vellum, ribbon, and assembly add distinct material and handwork.",
    "Handcrafted details",
  ],
  [
    "05 — Script",
    "Guest Calligraphy",
    "Envelope addressing can range from archival print to hand-penned script.",
    "Digital or hand-penned",
  ],
] as const;

function DigitalPricing({ packages }: { packages: Package[] }) {
  return (
    <div>
      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {packages.map((item, index) => {
          const presentation =
            planPresentation[item.id as keyof typeof planPresentation] ??
            planPresentation.essential;
          const features = [...item.features, ...presentation.extras].slice(
            0,
            7,
          );
          return (
            <article
              key={item.id}
              className={`relative flex flex-col justify-between rounded-xl bg-surface-lowest p-8 transition-shadow lg:p-10 ${item.featured ? "shadow-[0_18px_45px_-18px_rgba(28,28,24,0.34)] lg:-translate-y-2" : "shadow-sm hover:shadow-md"}`}
            >
              {item.featured ? (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary px-4 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-white uppercase shadow-sm">
                  <Sparkles aria-hidden size={13} /> Most celebrated choice
                </span>
              ) : null}
              <div>
                <div
                  className={`mb-4 flex items-center justify-between gap-3 ${item.featured ? "mt-2" : ""}`}
                >
                  <span
                    className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${item.featured ? "text-secondary" : "text-on-surface-variant"}`}
                  >
                    Plan 0{index + 1}
                  </span>
                  <span
                    className={`rounded px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase ${item.featured ? "bg-accent text-accent-foreground" : "bg-surface-low text-on-surface-variant"}`}
                  >
                    {presentation.label}
                  </span>
                </div>
                <h2 className="font-serif text-3xl">{item.name}</h2>
                <p className="mt-2 min-h-16 text-xs leading-6 text-on-surface-variant">
                  {item.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2 border-b border-surface-container pb-6">
                  <span className="font-serif text-[2.75rem] leading-none">
                    {currency.format(item.price)}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    / one-time package
                  </span>
                </div>
                <ul className="my-8 space-y-3.5 text-xs leading-5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/register"
                className={`inline-flex min-h-11 items-center justify-center rounded px-6 text-[10px] font-semibold tracking-wider uppercase transition-colors ${item.featured ? "bg-primary text-white hover:bg-secondary" : "bg-surface-container text-primary hover:bg-surface-high"}`}
              >
                Choose {item.name}
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-20 overflow-hidden rounded-xl bg-surface-lowest p-6 shadow-sm sm:p-8 lg:p-12">
        <div className="flex flex-col justify-between gap-3 border-b border-surface-container pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Detailed architecture
            </p>
            <h2 className="mt-1 font-serif text-3xl">
              Compare Suite Capabilities
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant">
            Package configuration remains backend-controlled.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-surface-container">
                <th className="w-2/5 px-3 py-4 text-[10px] tracking-wider text-on-surface-variant uppercase">
                  Capabilities
                </th>
                {packages.map((item, index) => (
                  <th
                    key={item.id}
                    className={`w-1/5 py-4 text-center font-serif text-lg ${index === 1 ? "bg-accent/45 text-secondary" : ""}`}
                  >
                    {item.name}
                    <span className="mt-1 block font-sans text-[10px] font-normal text-on-surface-variant">
                      {currency.format(item.price)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <FragmentRows key={group.title} group={group} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FragmentRows({ group }: { group: (typeof comparisonGroups)[number] }) {
  return (
    <>
      <tr className="bg-surface-low">
        <th
          colSpan={4}
          className="px-3 py-2.5 text-[9px] font-semibold tracking-wider uppercase"
        >
          {group.title}
        </th>
      </tr>
      {group.rows.map(([label, essential, signature, prestige]) => (
        <tr
          key={label}
          className="border-b border-surface-container last:border-0"
        >
          <th className="px-3 py-3.5 font-normal text-primary">{label}</th>
          {[essential, signature, prestige].map((value, index) => (
            <td
              key={`${label}-${index}`}
              className={`px-3 py-3.5 text-center text-on-surface-variant ${index === 1 ? "bg-accent/20 font-medium text-secondary" : ""}`}
            >
              {value === "Included" ? (
                <Check
                  aria-label="Included"
                  className="mx-auto text-secondary"
                  size={16}
                />
              ) : (
                value
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function PrintPricing({ products }: { products: PrintedProduct[] }) {
  return (
    <div>
      <section className="mb-14 rounded-xl bg-surface-container p-8 lg:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              02 — The tactile atelier
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
              Fine letterpress is bespoke craftsmanship, not an automated
              checkout.
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              Every commission responds to paper weight, impression, finishing,
              quantity, and assembly. The studio quotes each suite after
              understanding the complete specification.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-6 text-[10px] font-semibold tracking-wider text-white uppercase hover:bg-secondary"
            >
              <MessageCircle aria-hidden size={16} /> Inquire via studio
            </Link>
            <p className="mt-2 text-[11px] text-on-surface-variant">
              Consultation-led · Manually confirmed
            </p>
          </div>
        </div>
      </section>

      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {products.slice(0, 3).map((product, index) => {
          const presentation = printPresentation[index] ?? printPresentation[0];
          return (
            <article
              key={product.id}
              className={`relative flex flex-col justify-between rounded-xl bg-surface-lowest p-8 lg:p-10 ${presentation.featured ? "shadow-[0_18px_45px_-18px_rgba(28,28,24,0.34)] lg:-translate-y-2" : "shadow-sm"}`}
            >
              {presentation.featured ? (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary px-4 py-1.5 text-[9px] font-semibold tracking-wider text-white uppercase">
                  <Gem aria-hidden size={13} /> Atelier favorite
                </span>
              ) : null}
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-on-surface-variant uppercase">
                    Collection 0{index + 1}
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider text-secondary uppercase">
                    {presentation.label}
                  </span>
                </div>
                <h2 className="font-serif text-3xl">{presentation.title}</h2>
                <p className="mt-2 min-h-16 text-xs leading-6 text-on-surface-variant">
                  {product.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2 border-b border-surface-container pb-6">
                  <span className="font-serif text-4xl">
                    From {currency.format(product.startingPrice)}
                  </span>
                </div>
                <ul className="my-8 space-y-3.5 text-xs leading-5">
                  {presentation.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className={`inline-flex min-h-11 items-center justify-center rounded px-6 text-[10px] font-semibold tracking-wider uppercase ${presentation.featured ? "bg-primary text-white hover:bg-secondary" : "bg-surface-container hover:bg-surface-high"}`}
              >
                Request consultation
              </Link>
            </article>
          );
        })}
      </div>

      <section className="mt-20 rounded-xl bg-surface-low p-8 lg:p-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Cost architecture
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            Understanding Your Print Investment
          </h2>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Traditional press work combines fixed production setup with material
            and finishing choices. These five details shape a tailored
            quotation.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {costArchitecture.map(([kicker, title, text, footnote]) => (
            <article
              key={title}
              className="flex flex-col justify-between rounded-lg bg-surface-lowest p-6 shadow-sm"
            >
              <div>
                <p className="text-[9px] font-semibold tracking-wider text-secondary uppercase">
                  {kicker}
                </p>
                <h3 className="mt-3 font-serif text-lg">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-on-surface-variant">
                  {text}
                </p>
              </div>
              <p className="mt-5 text-[9px] font-semibold tracking-wider text-secondary uppercase">
                {footnote}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col items-center justify-between gap-6 rounded-xl bg-surface-lowest p-8 shadow-sm md:flex-row lg:p-10">
        <div className="flex items-center gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent/60 text-secondary">
            <PackageOpen aria-hidden size={25} />
          </span>
          <div>
            <h2 className="font-serif text-xl">
              Experience the Tactile Swatch Kit
            </h2>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
              Compare cotton stocks, impression, foil, and finishing before
              confirming a printed commission.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded bg-surface-container px-6 py-3 text-[10px] font-semibold tracking-wider uppercase hover:bg-primary hover:text-white"
        >
          Request sample details
        </Link>
      </section>
    </div>
  );
}

export function PricingPlans({
  packages,
  products,
}: {
  packages: Package[];
  products: PrintedProduct[];
}) {
  const [mode, setMode] = useState<Mode>("digital");
  return (
    <>
      <section id="pricing-plans" className="pb-24">
        <Container>
          <div className="mb-6 flex justify-center">
            <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface-container p-1.5 shadow-sm">
              <button
                type="button"
                aria-pressed={mode === "digital"}
                onClick={() => setMode("digital")}
                className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left transition-colors sm:px-7 ${mode === "digital" ? "bg-primary text-white shadow-sm" : "text-on-surface hover:bg-surface-high"}`}
              >
                <MonitorSmartphone aria-hidden size={18} />
                <span>
                  <span className="block text-[10px] font-semibold tracking-wider uppercase">
                    Digital Invitation Suite
                  </span>
                  <span className="mt-0.5 hidden text-[10px] opacity-70 sm:block">
                    One-time packages, guest-first design
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-pressed={mode === "print"}
                onClick={() => setMode("print")}
                className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left transition-colors sm:px-7 ${mode === "print" ? "bg-primary text-white shadow-sm" : "text-on-surface hover:bg-surface-high"}`}
              >
                <Mail aria-hidden size={18} />
                <span>
                  <span className="block text-[10px] font-semibold tracking-wider uppercase">
                    Artisan Printed Stationery
                  </span>
                  <span className="mt-0.5 hidden text-[10px] opacity-70 sm:block">
                    Cotton paper, press craft, concierge
                  </span>
                </span>
              </button>
            </div>
          </div>
          <p className="mb-12 text-center text-xs text-on-surface-variant">
            {mode === "digital"
              ? "Showing one-time digital package prices. Invitation duration follows the configured package lifecycle."
              : "Showing indicative printed collection starting prices. Every commission is quoted manually."}
          </p>
          {mode === "digital" ? (
            <DigitalPricing packages={packages} />
          ) : (
            <PrintPricing products={products} />
          )}
        </Container>
      </section>

      <section className="border-y border-border bg-surface-low py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 rounded-xl bg-surface-lowest p-8 shadow-sm lg:flex-row lg:p-12">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
                <Layers3 aria-hidden size={16} /> The harmonized atelier
                protocol
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight">
                Bring digital ease and tactile keepsakes into one visual world.
              </h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                A studio consultation can coordinate typography, color,
                monogram, and guest communication across both disciplines. Any
                combined quotation is confirmed manually.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center bg-primary px-6 text-[10px] font-semibold tracking-wider text-white uppercase hover:bg-secondary"
              >
                Consult both formats
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMode("digital");
                  document
                    .getElementById("pricing-plans")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-surface-container px-6 text-[10px] font-semibold tracking-wider uppercase hover:bg-surface-high"
              >
                View digital features <ArrowRight aria-hidden size={14} />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
