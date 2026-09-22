import { BadgeCheck, Leaf, MessageCircle, PlaneTakeoff } from "lucide-react";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const assurances = [
  { icon: BadgeCheck, label: "Handcrafted in our studio atelier" },
  { icon: PlaneTakeoff, label: "Insured express delivery" },
  { icon: Leaf, label: "100% Archival Cotton Guaranteed" },
] as const;

export function ConsultationCta() {
  return (
    <section className="relative w-full overflow-hidden bg-primary py-12 text-white lg:py-28">
      <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-5 text-center sm:px-8 lg:px-14">
        <p className="mb-2 text-[11px] leading-4 font-semibold tracking-[0.2em] text-accent uppercase">
          Start Your Heirloom Commission
        </p>
        <h2 className="mx-auto max-w-2xl font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
          Let&rsquo;s create something worth{" "}
          <em className="font-normal text-accent">keeping</em>.
        </h2>
        <p className="mx-auto mt-4 mb-7 max-w-xl text-[18px] leading-[30px] tracking-[-0.01em] text-white/75">
          Connect directly with our atelier director on WhatsApp. Share your
          date, approximate count, and visual aspirations for personalized
          guidance.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappHref(
              "Hello Moment Kita, I would love to consult on printed wedding invitations.",
            )}
            {...externalLinkProps}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-secondary px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary-foreground uppercase shadow-lg transition-opacity hover:opacity-90 sm:w-auto"
          >
            <MessageCircle aria-hidden size={20} />
            <span>Start Consultation on WhatsApp</span>
          </a>
          <a
            href={whatsappHref("Order the Artisan Swatch Kit")}
            {...externalLinkProps}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-white/10 sm:w-auto"
          >
            Order Swatch Kit (Rp250.000)
          </a>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 pt-12 text-[13px] leading-5 text-white/75">
          {assurances.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon aria-hidden size={16} className="text-accent" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
