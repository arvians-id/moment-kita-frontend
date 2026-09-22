"use client";

import { ArrowRight, Check, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const logistics = [
  {
    title: "Segmented Multi-Event Visibility",
    description:
      "Show each guest only the events relevant to their invitation, from an intimate family gathering to the main reception.",
  },
  {
    title: "Caterer-Ready Dietary Ledger",
    description:
      "Keep allergies and meal preferences organized in one clear place for the final catering handoff.",
  },
  {
    title: "Digital Wishes Guestbook",
    description:
      "Collect warm sentiments and marriage blessings in a lasting digital keepsake.",
  },
] as const;

const entrees = [
  ["Pan-Seared Chilean Sea Bass", "Brown Butter & Fennel"],
  ["Slow-Braised Wagyu Tenderloin", "Truffle Mousseline"],
  ["Wild Morel & Truffle Risotto", "Plant-Based / GF"],
] as const;

export function RsvpSection() {
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(2);

  return (
    <section
      id="rsvp-intelligence"
      className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16 lg:px-14"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            02 — Logistics Without Friction
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Eliminate spreadsheet chaos with live attendance intelligence.
          </h2>
          <p className="text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Replace manual tallying with a clear RSVP flow for attendance, party
            size, dietary requirements, and multi-event celebrations.
          </p>
          <div className="space-y-3 pt-1">
            {logistics.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle2
                  aria-hidden
                  size={19}
                  className="mt-1 shrink-0 text-secondary"
                />
                <div>
                  <h3 className="font-serif text-base font-medium">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-5 text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/how-it-works"
            className="inline-flex w-fit items-center gap-2 pt-1 text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:text-secondary"
          >
            Explore RSVP Management Workflows
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>

        <div className="rounded-2xl bg-surface-low p-4 shadow-sm sm:p-7 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
                Live Demo Experience
              </p>
              <h3 className="font-serif text-xl font-semibold">
                RSVP &amp; Entrée Selection
              </h3>
            </div>
            <span className="rounded-full bg-surface-high px-3 py-1 text-[10px] font-semibold tracking-widest uppercase">
              Guest Link #094
            </span>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md">
            <fieldset>
              <legend className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Will you be celebrating with us?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  aria-pressed={attending}
                  onClick={() => setAttending(true)}
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[10px] font-semibold tracking-wider uppercase transition-colors ${attending ? "bg-primary text-white" : "bg-surface-container text-primary"}`}
                >
                  <Check aria-hidden size={17} /> Attending with Joy
                </button>
                <button
                  type="button"
                  aria-pressed={!attending}
                  onClick={() => setAttending(false)}
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[10px] font-semibold tracking-wider uppercase transition-colors ${!attending ? "bg-primary text-white" : "bg-surface-container text-primary"}`}
                >
                  <X aria-hidden size={17} /> Regretfully Declining
                </button>
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-low p-3">
              <div>
                <p className="text-[10px] font-semibold tracking-wider uppercase">
                  Reserved Seats
                </p>
                <p className="text-[12px] text-on-surface-variant">
                  Sarah Jenkins &amp; David Miller
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-white px-3 py-1 shadow-sm">
                <button
                  type="button"
                  aria-label="Decrease guest count"
                  onClick={() =>
                    setGuestCount((count) => Math.max(1, count - 1))
                  }
                  className="text-lg font-bold leading-none transition-colors hover:text-secondary"
                >
                  −
                </button>
                <output
                  aria-live="polite"
                  className="w-4 text-center font-serif text-base"
                >
                  {guestCount}
                </output>
                <button
                  type="button"
                  aria-label="Increase guest count"
                  onClick={() =>
                    setGuestCount((count) => Math.min(6, count + 1))
                  }
                  className="text-lg font-bold leading-none transition-colors hover:text-secondary"
                >
                  +
                </button>
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Curated Dinner Entrée Selection
              </legend>
              <div className="space-y-2">
                {entrees.map(([title, detail], index) => (
                  <label
                    key={title}
                    className="flex cursor-pointer flex-col justify-between gap-2 rounded-lg bg-surface-low p-3 transition-colors hover:bg-surface-container sm:flex-row sm:items-center"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <input
                        type="radio"
                        name="feature-entree"
                        defaultChecked={index === 0}
                        className="size-4 accent-secondary"
                      />
                      {title}
                    </span>
                    <span
                      className={`text-[9px] font-semibold tracking-wider uppercase ${index === 2 ? "text-secondary" : "text-on-surface-variant"}`}
                    >
                      {detail}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="flex flex-col gap-1 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Dietary Notes &amp; Allergies
              <input
                type="text"
                placeholder="e.g., Severe shellfish allergy, strict celiac"
                className="rounded-lg bg-surface-low px-3 py-2 text-sm font-normal tracking-normal text-primary normal-case outline-none transition-colors placeholder:text-on-surface-variant/50 focus:bg-surface-high"
              />
            </label>
            <button
              type="button"
              className="w-full rounded-lg bg-secondary py-3 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm transition-opacity hover:opacity-90"
            >
              Record Attendance In Real Time
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
