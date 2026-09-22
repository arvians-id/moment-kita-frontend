import { Calculator, Check } from "lucide-react";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const tiers = [
  {
    tier: "Tier 01",
    name: "Intimate Gatherings",
    summary: "Designed for boutique weddings, microweddings, and elopements.",
    price: "Rp2.400.000–2.900.000",
    unit: "/ complete suite",
    guidance: "Recommended for 30–50 Suites",
    features: [
      "Main Invitation on 600gsm Cotton",
      "RSVP Card + Addressed Return Envelope",
      "Main Envelope with Return Address",
      "1 Metallic Foil or Blind Deboss Pass",
    ],
    cta: "Inquire for 30–50 Suites",
    message: "Quote request for the Intimate Gatherings tier",
    featured: false,
  },
  {
    tier: "Tier 02",
    name: "Classic Celebration",
    summary:
      "Our signature full-suite experience with hand-adorned embellishments.",
    price: "Rp1.850.000–2.250.000",
    unit: "/ complete suite",
    guidance: "Recommended for 75–125 Suites",
    features: [
      "Main Invite on 700gsm French Moulin",
      "RSVP Card & Illustrated Details Card",
      "Custom Monogram Wax Seal & Vellum Liner",
      "Hand-Torn Deckle Edge Finishing",
      "Complimentary Digital RSVP Web Sync",
    ],
    cta: "Inquire for 75–125 Suites",
    message: "Quote request for the Classic Celebration tier",
    featured: true,
  },
  {
    tier: "Tier 03",
    name: "Grand Haute Couture",
    summary:
      "Multi-day destination weddings with day-of stationery harmonization.",
    price: "Custom",
    unit: "/ bespoke curation",
    guidance: "Recommended for 150+ Suites",
    features: [
      "Double-Thick 900gsm Cardstock with Gilded Edges",
      "Full Weekend 5-Piece Suite + Custom Map",
      "Hand-Penned Ink Calligraphy Guest Addressing",
      "Full Day-Of Event Suite (Menus, Vow Books, Signs)",
    ],
    cta: "Request Private Consultation",
    message: "Quote request for the Grand Haute Couture tier",
    featured: false,
  },
] as const;

export function PrintedPricing() {
  return (
    <section className="w-full bg-surface-low py-12">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Investment Clarity
          </p>
          <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Transparent Atelier Pricing
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-on-surface-variant">
            Because every suite utilizes authentic artisan letterpress and
            manual finishing, costs are governed by paper density, foil passes,
            and quantity. No hidden plate fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.tier}
              className={`relative flex flex-col justify-between rounded-[8px] bg-surface-lowest p-8 ${
                tier.featured
                  ? "shadow-md ring-2 ring-secondary/30"
                  : "shadow-sm"
              }`}
            >
              {tier.featured ? (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-[11px] leading-4 font-semibold tracking-[0.2em] whitespace-nowrap text-secondary-foreground uppercase">
                  Most Commissioned
                </span>
              ) : null}
              <div>
                <p className="mb-2 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  {tier.tier}
                </p>
                <h3 className="mb-1 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                  {tier.name}
                </h3>
                <p className="mb-6 text-[13px] leading-5 text-on-surface-variant">
                  {tier.summary}
                </p>
                <p className="mb-6">
                  <span className="font-serif text-3xl sm:text-4xl">
                    {tier.price}
                  </span>{" "}
                  <span className="text-[13px] leading-5 text-on-surface-variant">
                    {tier.unit}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                    {tier.guidance}
                  </span>
                </p>
                <ul className="space-y-3 border-t border-surface-container py-6 text-[13px] leading-5 text-on-surface-variant">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        aria-hidden
                        size={16}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={whatsappHref(tier.message)}
                {...externalLinkProps}
                className={`w-full rounded-[4px] py-3 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-secondary"
                    : "bg-surface-container hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[8px] bg-surface-container p-8 md:flex-row">
          <div>
            <h3 className="font-serif text-xl leading-7">
              Need an exact formal quote for your guest count?
            </h3>
            <p className="text-[13px] leading-5 text-on-surface-variant">
              Send us your quantity and favored pieces on WhatsApp for an
              itemized estimate.
            </p>
          </div>
          <a
            href={whatsappHref(
              "Hello, I would like a tailored printed stationery quote.",
            )}
            {...externalLinkProps}
            className="flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap text-secondary-foreground uppercase shadow-sm transition-opacity hover:opacity-90"
          >
            <Calculator aria-hidden size={18} />
            <span>Instant WhatsApp Estimate</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
