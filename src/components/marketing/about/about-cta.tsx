import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

export function AboutCta() {
  return (
    <section className="w-full bg-primary py-12 text-white lg:py-28">
      <Container className="text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-accent uppercase">
            Mulai Undangan Anda
          </span>
          <h2 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
            Ciptakan undangan yang mencerminkan kisah Anda.
          </h2>
          <p className="max-w-xl text-[18px] leading-[30px] tracking-[-0.01em] text-white/80">
            Mulai personalisasi undangan digital dalam hitungan menit, atau
            konsultasikan stationery cetak yang ingin Anda simpan sebagai
            kenang-kenangan.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 pt-4 sm:w-auto sm:flex-row">
            <Link
              href="/templates"
              className="inline-flex w-full items-center justify-center bg-secondary px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-secondary/90 sm:w-auto"
            >
              Jelajahi Desain Kami
            </Link>
            <a
              href={whatsappHref(
                "Halo Moment Kita, saya ingin berkonsultasi tentang undangan pernikahan.",
              )}
              {...externalLinkProps}
              className="inline-flex w-full items-center justify-center gap-2 bg-transparent px-8 py-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle aria-hidden size={16} />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
