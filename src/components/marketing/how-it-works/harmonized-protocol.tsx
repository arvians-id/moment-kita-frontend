import { Award } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/shared/container";

const expressions = [
  {
    kicker: "Physical artifact",
    title: "The Heirloom Card",
    description:
      "A tactile first impression composed in substantial cotton stock, pressed detail, and a visual language made to live beyond the day.",
    image: "/images/marketing/embossed-cotton-invitation.png",
    alt: "Embossed cotton wedding invitation with a botanical monogram",
  },
  {
    kicker: "Digital intelligence",
    title: "The Cloud Portal",
    description:
      "The same story continues online with responsive event details, personal guest access, RSVP capture, wishes, and live updates.",
    image: "/images/marketing/digital-invitation-phone.png",
    alt: "Wedding invitation displayed on a phone beside dried flowers",
  },
] as const;

export function HarmonizedProtocol() {
  return (
    <section className="my-10 bg-surface-low py-20 lg:my-12 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Moment Kita synergy
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-primary lg:text-[56px] lg:leading-[1.12]">
            The Harmonized Protocol.
          </h2>
          <p className="mt-6 font-serif text-xl leading-8 text-primary sm:text-2xl sm:leading-9">
            Physical keepsake for the mantelpiece; digital clarity for the guest
            experience.
          </p>
          <p className="mt-5 text-sm leading-7 text-on-surface-variant">
            The two mediums can move in unison. A shared typographic direction,
            palette, and monogram creates continuity while a discreet printed QR
            or private link brings guests into the responsive invitation, RSVP
            details, and live event information.
          </p>
          <div className="mt-8 rounded-lg bg-surface-container p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Award aria-hidden size={20} className="text-secondary" />
              <p className="text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
                One considered visual system
              </p>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-on-surface-variant">
              The studio can carry the same invitation language across screen
              and paper while respecting the strengths of each medium.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:col-span-7">
          {expressions.map((expression) => (
            <article
              key={expression.title}
              className="flex flex-col justify-between rounded-lg bg-surface-lowest p-7 shadow-sm sm:p-8"
            >
              <div>
                <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  {expression.kicker}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-primary">
                  {expression.title}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-on-surface-variant">
                  {expression.description}
                </p>
              </div>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-surface-container">
                <Image
                  src={expression.image}
                  alt={expression.alt}
                  fill
                  sizes="(min-width: 1024px) 27vw, (min-width: 768px) 42vw, 88vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
