import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";

export function HowItWorksCta() {
  return (
    <section className="bg-primary py-24 text-white lg:py-32">
      <Container className="flex max-w-5xl flex-col items-center text-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-terracotta-soft uppercase">
          The Moment Kita promise
        </p>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px]">
          Every memorable celebration begins with an{" "}
          <em className="font-normal text-terracotta-soft">intentional</em>{" "}
          invitation.
        </h2>
        <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
          Let us shape the first glimpse into your wedding day with quiet care,
          editorial clarity, and attention to the details that matter.
        </p>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/templates"
            className="inline-flex min-h-12 w-full items-center justify-center bg-white px-8 text-[10px] font-semibold tracking-[0.12em] text-primary uppercase transition-colors hover:bg-accent sm:w-auto"
          >
            Explore curated templates
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 px-8 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-white/10 sm:w-auto"
          >
            <MessageCircle aria-hidden size={16} /> Speak with the studio
          </Link>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-semibold tracking-[0.12em] text-white/35 uppercase">
          <span>Digital invitation studio</span>
          <span aria-hidden>•</span>
          <span>Fine paper consultation</span>
          <span aria-hidden>•</span>
          <span>One considered visual language</span>
        </div>
      </Container>
    </section>
  );
}
