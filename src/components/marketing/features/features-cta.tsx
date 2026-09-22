import { Check } from "lucide-react";
import Link from "next/link";

export function FeaturesCta() {
  return (
    <section className="bg-espresso py-12 text-[#fcf9f3] sm:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 text-center sm:px-8 lg:px-14">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#ffb59c] uppercase sm:text-[11px]">
          Experience Elevated Nuance
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-white sm:text-[56px] sm:leading-[1.14]">
          Experience the grace of modern digital invitations.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#c8c6c5] sm:text-lg sm:leading-8">
          Begin with a curated template, shape every meaningful detail, and
          welcome guests into a celebration that feels unmistakably yours.
        </p>
        <div className="mt-7 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/templates"
            className="w-full rounded-full bg-secondary px-8 py-4 text-[10px] font-semibold tracking-wider text-white uppercase shadow-md transition-opacity hover:opacity-90 sm:w-auto"
          >
            Explore Digital Templates
          </Link>
          <Link
            href="/register"
            className="w-full rounded-full bg-transparent px-8 py-4 text-[10px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-white/10 sm:w-auto"
          >
            Start Your Invitation
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[#c8c6c5]">
          <span className="flex items-center gap-1.5">
            <Check aria-hidden size={15} className="text-secondary" />
            No Credit Card Required
          </span>
          <span className="flex items-center gap-1.5">
            <Check aria-hidden size={15} className="text-secondary" />
            Start with a Curated Template
          </span>
        </div>
      </div>
    </section>
  );
}
