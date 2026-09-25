import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";

export function FinalCta() {
  return (
    <section className="py-24 text-center lg:py-36">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Mulai kisah Anda
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
            Siap menciptakan kesan pertama yang tak terlupakan?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-lg">
            Sambut perayaan dengan tipografi yang indah, material bertekstur,
            dan pengalaman digital yang dirancang sepenuh hati.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/templates"
              className="flex min-h-13 items-center justify-center bg-primary px-8 text-[10px] font-semibold tracking-[0.15em] text-primary-foreground uppercase shadow-md transition-colors hover:bg-secondary"
            >
              Mulai undangan digital
            </Link>
            <Link
              href="/contact"
              className="flex min-h-13 items-center justify-center gap-2 bg-surface-high px-8 text-[10px] font-semibold tracking-[0.15em] uppercase transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              <MessageCircle aria-hidden="true" size={16} /> Hubungi kami
            </Link>
          </div>
          <p className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
            <span>Dirancang di Jakarta</span>
            <span>·</span>
            <span>Nyaman di setiap layar</span>
            <span>·</span>
            <span>Dicetak dengan teliti</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
