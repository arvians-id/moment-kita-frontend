import { MessageCircle, Package, Palette } from "lucide-react";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

const bespokeServices = [
  { title: "Custom Monograms", text: "Hand-drawn vector crests" },
  { title: "Venue Line-Art", text: "Custom venue & villa art" },
] as const;

export function ConciergeCallouts() {
  return (
    <section
      id="concierge-sample"
      className="scroll-mt-20 bg-surface-low py-16"
    >
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex h-full flex-col justify-between rounded-[16px] bg-surface-lowest p-8 shadow-sm sm:p-10 lg:col-span-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Package aria-hidden size={24} className="text-secondary" />
                <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  Physical Material Experience
                </span>
              </div>
              <h2 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                Order the Atelier Monograph Swatch Box
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
                Hold the tactile reality in your hands before committing.
                Includes full-weight 600gsm &amp; 800gsm cotton cards, metallic
                foil swatches (rose gold, champagne, matte copper), physical wax
                seal impressions, and fine-milled paper envelopes.
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-[12px] bg-surface-low px-4 py-3">
                <span className="font-serif text-[22px] leading-[30px] font-semibold">
                  Rp250.000
                </span>
                <span className="flex-1 text-xs leading-tight text-on-surface-variant">
                  <strong className="font-semibold">100% credited</strong>{" "}
                  toward your final invitation suite production run or print
                  order.
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappHref(
                  "Hello Moment Kita, I would like to request the Atelier Monograph Swatch Box.",
                )}
                {...externalLinkProps}
                className="w-full rounded-[8px] bg-primary px-6 py-3.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary sm:w-auto"
              >
                Request Curated Swatch Box
              </a>
              <span className="font-mono text-xs text-on-surface-variant">
                Dispatched after studio confirmation
              </span>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between rounded-[16px] bg-surface-lowest p-8 shadow-sm sm:p-10 lg:col-span-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Palette aria-hidden size={24} className="text-secondary" />
                <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  Bespoke Typographic Monogram
                </span>
              </div>
              <h2 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                Need Tailored Crests or Illustrated Venues?
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-on-surface-variant">
                Every curated template can be elevated with our hand-drafted
                custom illustration services. Our studio typographers will
                hand-render your wedding venue, custom family monogram crest, or
                illustrated map coordinates into your selected template.
              </p>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {bespokeServices.map(({ title, text }) => (
                  <div key={title} className="rounded-[8px] bg-surface-low p-3">
                    <span className="block text-[11px] font-semibold tracking-[0.12em] uppercase">
                      {title}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappHref(
                  "Hello Moment Kita, I would like to discuss a bespoke crest or illustrated venue.",
                )}
                {...externalLinkProps}
                className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-surface-container px-6 py-3.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
              >
                <MessageCircle aria-hidden size={16} />
                <span>Inquire with Concierge</span>
              </a>
              <span className="font-mono text-xs text-on-surface-variant">
                Replies during studio hours
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
