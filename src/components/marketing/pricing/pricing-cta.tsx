import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";

export function PricingCta() {
  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <Container className="relative flex flex-col items-center text-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-terracotta-soft uppercase">
          Mulai Undangan Anda
        </p>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          Pilih undangan yang akan{" "}
          <em className="font-normal text-terracotta-soft">dikenang tamu.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
          Pilih kemudahan undangan digital, kehangatan kertas katun, atau
          perpaduan keduanya—semuanya dirancang dengan pendampingan yang cermat.
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="inline-flex min-h-12 items-center justify-center bg-surface px-8 text-[10px] font-semibold tracking-wider text-espresso uppercase transition-colors hover:bg-terracotta-soft hover:text-white"
          >
            Mulai undangan digital
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-8 text-[10px] font-semibold tracking-wider uppercase transition-colors hover:border-terracotta-soft hover:text-terracotta-soft"
          >
            <MessageCircle aria-hidden size={16} /> Hubungi kami
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-semibold tracking-wider text-white/35 uppercase">
          <span>Pilihan paket yang jelas</span>
          <span aria-hidden>•</span>
          <span>Konsultasi tanpa biaya</span>
          <span aria-hidden>•</span>
          <span>Pesanan cetak via konsultasi</span>
        </div>
      </Container>
    </section>
  );
}
