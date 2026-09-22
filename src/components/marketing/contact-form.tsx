"use client";

import {
  ArrowRight,
  ExternalLink,
  Handshake,
  Layers3,
  Lightbulb,
  MessageCircle,
  MonitorSmartphone,
  ScrollText,
} from "lucide-react";
import { useState } from "react";

const fieldClass =
  "mt-1.5 min-h-12 w-full border-0 bg-surface-low px-4 py-3 text-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant/55 focus:bg-surface-lowest focus:shadow-[inset_0_0_0_1px_var(--secondary)]";
const labelClass =
  "text-[10px] font-semibold tracking-[0.12em] text-primary uppercase";

const inquiryOptions = [
  {
    value: "digital",
    label: "Digital Invitation Suite",
    description: "Interactive web suite & RSVP",
    icon: MonitorSmartphone,
  },
  {
    value: "printed",
    label: "Printed Letterpress Suite",
    description: "Archival cotton & hot foil",
    icon: ScrollText,
  },
  {
    value: "hybrid",
    label: "Hybrid Fine Curation",
    description: "Unified print + digital suite",
    icon: Layers3,
  },
  {
    value: "press",
    label: "Partnership / Editorial",
    description: "Venues, planners & press",
    icon: Handshake,
  },
] as const;

export function ContactForm() {
  const [topic, setTopic] = useState("printed");
  const [status, setStatus] = useState("");
  const showPrintNote = topic === "printed" || topic === "hybrid";

  return (
    <div className="bg-surface-lowest p-6 shadow-[0_8px_24px_-16px_rgba(28,28,24,0.3)] sm:p-8 lg:p-12">
      <div className="mb-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
          Direct letter
        </p>
        <h2 className="mt-1 font-serif text-3xl tracking-tight sm:text-4xl">
          Send a Correspondence
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-on-surface-variant">
          Provide the contours of your celebration. Our studio will respond with
          thoughtful guidance and preliminary concepts.
        </p>
      </div>

      <form
        id="correspondence-form"
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus(
            "Preview only — your correspondence has not been sent. Studio delivery will be connected in a later phase.",
          );
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Your name(s) <span className="text-secondary">*</span>
            <input
              required
              name="names"
              autoComplete="name"
              placeholder="e.g. Sophia Laurent & Alexander"
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            Email or WhatsApp <span className="text-secondary">*</span>
            <input
              required
              name="contactChannel"
              placeholder="email@domain.com or +62…"
              className={fieldClass}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Celebration date / season
            <input
              name="celebrationDate"
              placeholder="e.g. October 2027"
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            Estimated guest households
            <input
              name="guestCount"
              inputMode="numeric"
              placeholder="e.g. 120 guests / 70 suites"
              className={fieldClass}
            />
          </label>
        </div>

        <fieldset>
          <legend className={labelClass}>
            Inquiry focus <span className="text-secondary">*</span>
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {inquiryOptions.map(({ value, label, description, icon: Icon }) => {
              const isSelected = topic === value;
              return (
                <label
                  key={value}
                  className={`flex min-h-[68px] cursor-pointer items-start justify-between gap-3 p-3 transition-colors focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 ${isSelected ? "bg-primary text-white" : "bg-surface-low text-primary hover:bg-surface-container"}`}
                >
                  <input
                    required
                    className="sr-only"
                    type="radio"
                    name="topic"
                    value={value}
                    checked={isSelected}
                    onChange={() => setTopic(value)}
                  />
                  <span className="flex flex-col">
                    <span className="text-[10px] font-semibold tracking-[0.08em] uppercase">
                      {label}
                    </span>
                    <span className="mt-1 text-[11px] opacity-70">
                      {description}
                    </span>
                  </span>
                  <Icon aria-hidden size={16} className="mt-0.5 shrink-0" />
                </label>
              );
            })}
          </div>
        </fieldset>

        {showPrintNote ? (
          <div className="flex items-start gap-3 bg-accent p-3 text-accent-foreground">
            <Lightbulb
              aria-hidden
              size={18}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase">
                Studio recommendation for print
              </p>
              <p className="mt-1 text-xs leading-5">
                For physical suites involving blind deboss, custom monograms, or
                wax seals, a direct conversation helps us review material and
                proofing needs clearly.
              </p>
            </div>
          </div>
        ) : null}

        <label className={`block ${labelClass}`}>
          Celebration context &amp; aesthetic vision{" "}
          <span className="text-secondary">*</span>
          <textarea
            required
            name="message"
            rows={5}
            className={`${fieldClass} resize-y`}
            placeholder="Tell us about your celebration, venue, aesthetic mood, guest count, or printing finishes you have in mind…"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-on-surface-variant">
          <input
            name="catalogOptIn"
            type="checkbox"
            defaultChecked
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          I would also like to receive the digital swatch catalogue and type
          specimen when it becomes available.
        </label>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-8 text-[10px] font-semibold tracking-[0.15em] text-white uppercase shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Prepare correspondence
            <ArrowRight aria-hidden size={15} />
          </button>
          <p className="text-center text-[11px] leading-5 text-on-surface-variant sm:max-w-56 sm:text-left">
            This frontend preview does not transmit your information.
          </p>
        </div>

        {status ? (
          <p
            role="status"
            className="border-l-2 border-secondary bg-surface-container px-4 py-3 text-xs leading-5"
          >
            {status}
          </p>
        ) : null}
      </form>

      <div className="mt-7 flex flex-col gap-3 border-t border-surface-high bg-surface-low p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <MessageCircle aria-hidden size={16} />
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-wide uppercase">
              Need immediate guidance?
            </p>
            <p className="text-[11px] text-on-surface-variant">
              Start a real-time studio conversation on WhatsApp
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/?text=Hello%20Moment%20Kita%2C%20I%20would%20like%20to%20speak%20with%20the%20studio."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-secondary uppercase hover:text-primary"
        >
          Start dialogue now <ExternalLink aria-hidden size={12} />
        </a>
      </div>
    </div>
  );
}
