import Link from "next/link";

import { Container } from "@/components/shared/container";

export function ContactCta() {
  return (
    <section className="bg-primary py-12 text-white sm:py-14">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-terracotta-soft uppercase">
            The Moment Kita commitment
          </p>
          <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
            Every memorable celebration begins with an{" "}
            <em className="font-normal">intentional</em> invitation.
          </h2>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-white/65">
            Considered digital guest journeys and tactile press work, composed
            with the same editorial care.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href="https://wa.me/?text=Hello%20Moment%20Kita%2C%20I%20would%20like%20to%20speak%20with%20the%20studio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-white px-6 text-[10px] font-semibold tracking-wider text-primary uppercase transition-colors hover:bg-accent"
          >
            Concierge WhatsApp
          </a>
          <Link
            href="#correspondence-form"
            className="inline-flex min-h-11 items-center justify-center px-6 text-[10px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-white/10"
          >
            Return to brief
          </Link>
        </div>
      </Container>
    </section>
  );
}
