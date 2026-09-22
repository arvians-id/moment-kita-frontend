"use client";

import { LockKeyholeOpen, MessageCircle } from "lucide-react";
import type { FormEvent } from "react";

import { Container } from "@/components/shared/container";

export function PhilosophySection() {
  function openWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const weddingDate =
      form.get("weddingDate")?.toString().trim() || "a future date";
    const discipline =
      form.get("discipline")?.toString() || "Moment Kita studio services";
    const message = `Hello Moment Kita, we are planning our wedding for ${weddingDate} and would love to discuss ${discipline}. Please share your consultation availability.`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section className="bg-espresso py-24 text-[#f9f6f0] lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-champagne uppercase">
              06 — The sensory philosophy
            </p>
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.12] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
              “We believe an invitation is not a notification. It is the
              architectural prelude to the memory of your life.”
            </h2>
            <p className="max-w-xl text-sm leading-6 text-white/65">
              In an age of fleeting messages, we design both the immediate joy
              of a digital opening and the archival weight of paper made to
              outlive the moment.
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[9px] font-semibold tracking-[0.16em] text-champagne uppercase">
              <span>Fine paper craft</span>
              <span>·</span>
              <span>Guest-first digital</span>
              <span>·</span>
              <span>Considered typography</span>
            </p>
          </div>

          <form
            onSubmit={openWhatsApp}
            className="space-y-6 border border-white/8 bg-white/[0.035] p-7 shadow-2xl lg:col-span-5 lg:p-10"
          >
            <div>
              <div className="mb-2 flex items-center gap-2 text-champagne">
                <LockKeyholeOpen aria-hidden="true" size={16} />
                <span className="text-[9px] font-semibold tracking-[0.15em] uppercase">
                  Direct studio concierge
                </span>
              </div>
              <h3 className="font-serif text-2xl">
                Plan with our creative studio
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Begin a direct WhatsApp conversation about digital, print, or a
                harmonized celebration suite.
              </p>
            </div>
            <div>
              <label
                htmlFor="wedding-date"
                className="mb-2 block text-[9px] font-semibold tracking-[0.13em] text-white/70 uppercase"
              >
                Approximate wedding date and city
              </label>
              <input
                id="wedding-date"
                name="weddingDate"
                placeholder="e.g. October 2027 · Jakarta"
                className="min-h-12 w-full border border-white/10 bg-[#1c1b1a] px-4 text-xs text-white placeholder:text-white/35 focus:border-champagne focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="discipline"
                className="mb-2 block text-[9px] font-semibold tracking-[0.13em] text-white/70 uppercase"
              >
                Primary discipline of interest
              </label>
              <select
                id="discipline"
                name="discipline"
                className="min-h-12 w-full border border-white/10 bg-[#1c1b1a] px-4 text-xs text-white focus:border-champagne focus:outline-none"
              >
                <option>the Harmonized Suite</option>
                <option>fine print stationery</option>
                <option>an interactive digital suite</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex min-h-13 w-full items-center justify-center gap-2 bg-champagne px-5 text-[10px] font-semibold tracking-[0.13em] text-[#380d00] uppercase transition-colors hover:bg-[#ffb59c]"
            >
              <MessageCircle aria-hidden="true" size={16} />
              Start WhatsApp conversation
            </button>
            <p className="text-center text-[10px] text-white/35">
              No details are stored or submitted to Moment Kita.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
