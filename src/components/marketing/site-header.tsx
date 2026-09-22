import { MessageCircle, UserRound } from "lucide-react";
import Link from "next/link";

import { MobileNavigation } from "@/components/marketing/mobile-navigation";
import { PrimaryNavigation } from "@/components/marketing/primary-navigation";
import { Container } from "@/components/shared/container";

const navigationClass =
  "text-[11px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase transition-colors hover:text-secondary focus-visible:text-secondary focus-visible:outline-none";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-surface/92 backdrop-blur-xl">
      <Container className="relative flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Moment Kita home"
        >
          <span className="grid size-8 place-items-center rounded-full border border-secondary/30 font-serif text-sm italic text-secondary">
            MK
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg leading-none tracking-tight">
              Moment Kita
            </span>
            <span className="mt-1 text-[8px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
              Digital &amp; Fine Print Studio
            </span>
          </span>
        </Link>

        <PrimaryNavigation />

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className={`${navigationClass} flex items-center gap-1.5`}
          >
            <UserRound aria-hidden="true" size={14} />
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-primary px-5 py-3 text-[10px] font-semibold tracking-[0.13em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Create invitation
          </Link>
          <Link
            href="/contact"
            className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-secondary"
            aria-label="Contact the studio"
          >
            <MessageCircle aria-hidden="true" size={15} />
          </Link>
        </div>

        <MobileNavigation />
      </Container>
    </header>
  );
}
