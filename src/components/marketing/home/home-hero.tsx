import { ArrowRight, Leaf, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/marketing/fade-in";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="overflow-hidden pb-20 pt-9 lg:pb-32 lg:pt-14">
      <Container>
        <FadeIn className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-4 py-2 text-secondary">
            <span
              className="size-1.5 animate-pulse rounded-full bg-secondary"
              aria-hidden="true"
            />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
              Jakarta · The Cloud — Est. 2024
            </span>
          </div>
          <h1 className="mt-7 font-serif text-[2.8rem] leading-[1.04] tracking-[-0.025em] text-primary sm:text-6xl lg:text-[5.25rem]">
            Where Poetry Meets
            <br className="hidden sm:block" />
            <em className="font-normal text-secondary"> Paper &amp; Pixel</em>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
            A modern wedding studio with two distinct disciplines: intelligent
            interactive invitations for today and tactile fine stationery made
            to be remembered.
          </p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 px-8 text-[11px] tracking-[0.14em] uppercase shadow-lg"
            >
              <Link href="/templates">
                Create digital invitation
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-13 bg-surface-container px-8 text-[11px] tracking-[0.14em] uppercase hover:bg-surface-highest"
            >
              <Link href="/printed">
                <MessageCircle
                  aria-hidden="true"
                  size={16}
                  className="text-secondary"
                />
                Explore fine print atelier
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn
          className="relative mt-14 lg:mt-20"
          transition={{ delay: 0.08, duration: 0.65 }}
        >
          <div className="relative h-[380px] overflow-hidden rounded-lg shadow-[0_22px_55px_-24px_rgba(46,38,33,0.35)] sm:h-[520px] lg:h-[640px]">
            <Image
              src="/images/marketing/hero-stationery-suite.png"
              alt="Artisanal wedding stationery with torn cotton edges, floral arrangements, silk ribbon, and a custom wax seal."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1328px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex flex-col items-start justify-between gap-3 sm:inset-x-6 sm:bottom-6 lg:flex-row lg:items-end">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex items-center gap-2 bg-white/90 px-4 py-3 text-[10px] font-semibold tracking-[0.11em] text-primary uppercase shadow-md backdrop-blur-md">
                  <span className="text-secondary">01</span>
                  Interactive RSVP · Personal guest links
                </div>
                <div className="hidden items-center gap-2 bg-white/90 px-4 py-3 text-[10px] font-semibold tracking-[0.11em] text-primary uppercase shadow-md backdrop-blur-md sm:flex">
                  <span className="text-secondary">02</span>
                  Cotton paper · Warm foil deboss
                </div>
              </div>
              <div className="hidden items-center gap-2 bg-primary/85 px-4 py-2.5 text-xs text-primary-foreground backdrop-blur-md md:flex">
                <Leaf aria-hidden="true" size={15} className="text-champagne" />
                Considered digital and fine-print craft
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
