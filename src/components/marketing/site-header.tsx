import { ChevronDown, MessageCircle, UserRound } from "lucide-react";
import Link from "next/link";

import { MobileNavigation } from "@/components/marketing/mobile-navigation";
import {
  primaryNavigation,
  productNavigation,
} from "@/components/marketing/navigation";
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

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            <li className="group relative py-4 focus-within:text-secondary">
              <button
                type="button"
                className={`${navigationClass} flex items-center gap-1`}
              >
                Products
                <ChevronDown
                  aria-hidden="true"
                  size={13}
                  className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                />
              </button>
              <div className="invisible absolute left-0 top-full w-64 translate-y-2 bg-surface-lowest p-2 opacity-0 shadow-[0_18px_40px_-14px_rgba(46,38,33,0.16)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Link
                  href={productNavigation[0].href}
                  className="flex flex-col p-4 hover:bg-surface-low"
                >
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
                    01 — Suite
                  </span>
                  <span className="mt-1 text-sm">
                    {productNavigation[0].label}
                  </span>
                </Link>
                <Link
                  href={productNavigation[1].href}
                  className="flex flex-col p-4 hover:bg-surface-low"
                >
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
                    02 — Atelier
                  </span>
                  <span className="mt-1 text-sm">
                    {productNavigation[1].label}
                  </span>
                </Link>
              </div>
            </li>
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navigationClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
