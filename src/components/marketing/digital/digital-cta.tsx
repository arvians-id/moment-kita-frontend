import { Heart, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";

export function DigitalCta() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e3d4be_1px,transparent_1px)] bg-[length:24px_24px] opacity-10" />
      <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-5 text-center sm:px-8 lg:px-14">
        <p className="text-[10px] font-semibold tracking-[0.25em] text-accent uppercase sm:text-[11px]">
          Start Your Celebration
        </p>
        <h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.02em] sm:text-[56px] sm:leading-[1.14]">
          Start building{" "}
          <em className="font-normal text-accent">your invitation.</em>
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-7 text-surface-container sm:text-lg sm:leading-8">
          Begin with timeless typography, a considered template, and a guest
          journey designed to keep every important detail beautifully clear.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full bg-secondary px-9 py-4 text-[10px] font-semibold tracking-wider uppercase shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            Create Your Invitation
          </Link>
          <Link
            href="/templates"
            className="w-full bg-transparent px-9 py-4 text-[10px] font-semibold tracking-wider uppercase shadow-sm transition-colors hover:bg-white/10 sm:w-auto"
          >
            Browse All Templates
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-8 text-[9px] font-semibold tracking-wider text-white/55 uppercase">
          <span className="flex items-center gap-1.5">
            <Sparkles aria-hidden size={14} className="text-accent" />
            Guided Setup
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <LockKeyhole aria-hidden size={14} className="text-accent" />
            Private by Design
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <Heart aria-hidden size={14} className="text-accent" />
            Made for Your Story
          </span>
        </div>
      </div>
    </section>
  );
}
