import { AlertCircle, CheckCircle2, Globe2, Link2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export type SlugAvailability =
  "empty" | "invalid" | "unavailable" | "available";

const statePresentation: Record<
  SlugAvailability,
  { label: string; className: string }
> = {
  empty: {
    label: "Enter address",
    className: "bg-surface-high text-on-surface-variant",
  },
  invalid: {
    label: "Check format",
    className: "bg-red-50 text-red-800",
  },
  unavailable: {
    label: "Unavailable",
    className: "bg-amber-50 text-amber-900",
  },
  available: {
    label: "Available",
    className: "bg-emerald-50 text-emerald-800",
  },
};

export function InvitationAddressStep({
  slug,
  availability,
  suggestions,
  error,
  onSlugChange,
  onSuggestion,
  onActivate,
}: {
  slug: string;
  availability: SlugAvailability;
  suggestions: string[];
  error?: string;
  onSlugChange: (value: string) => void;
  onSuggestion: (value: string) => void;
  onActivate: () => void;
}) {
  const state = statePresentation[availability];
  const isAvailable = availability === "available";

  return (
    <section
      id="create-step-3"
      onFocusCapture={onActivate}
      className="relative scroll-mt-28 overflow-hidden rounded-[12px] bg-surface-lowest p-5 shadow-md sm:p-6"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-secondary" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
              03 — Invitation address
            </span>
            <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] leading-4 font-semibold tracking-[0.12em] text-accent-foreground uppercase">
              Priority setting
            </span>
          </div>
          <h2 className="mt-1 font-serif text-[22px] leading-7 font-semibold">
            Invitation Address &amp; Slug
          </h2>
          <p className="mt-0.5 text-[12px] leading-5 text-on-surface-variant">
            The permanent link guests will open from WhatsApp, social media, or
            a printed QR card.
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-container">
          <Link2 aria-hidden size={18} />
        </span>
      </div>

      <div
        className={cn(
          "flex flex-col gap-2 rounded-[12px] bg-surface-low p-2 transition-shadow focus-within:ring-2 sm:flex-row sm:items-center",
          availability === "unavailable" || availability === "invalid"
            ? "focus-within:ring-red-600/40"
            : "focus-within:ring-secondary",
        )}
      >
        <span className="flex shrink-0 items-center gap-2 px-3 py-2 text-[13px] font-semibold">
          <Globe2 aria-hidden size={17} className="text-secondary" />
          momentkita.id/
        </span>
        <label htmlFor="invitation-slug" className="sr-only">
          Invitation public address
        </label>
        <input
          id="invitation-slug"
          value={slug}
          onChange={(event) => onSlugChange(event.target.value)}
          placeholder="your-custom-slug"
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
          aria-invalid={
            availability === "invalid" || availability === "unavailable"
          }
          className="min-w-0 flex-1 rounded-[8px] bg-surface-lowest px-4 py-2.5 text-[14px] font-semibold tracking-[0.03em] outline-none shadow-inner placeholder:text-on-surface-variant/45"
        />
        <span
          role="status"
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 self-start rounded-[8px] px-3 py-2 text-[9px] leading-4 font-bold tracking-[0.12em] uppercase sm:self-auto",
            state.className,
          )}
        >
          {isAvailable ? (
            <CheckCircle2 aria-hidden size={14} />
          ) : (
            <AlertCircle aria-hidden size={14} />
          )}
          {state.label}
        </span>
      </div>

      <div className="mt-2 flex flex-col justify-between gap-1 px-1 text-[10px] leading-4 text-on-surface-variant sm:flex-row">
        <span>
          {error ??
            "Lowercase letters, numbers, and dashes only. You can change it before publishing."}
        </span>
        <span className="shrink-0 font-semibold tracking-[0.14em] text-secondary uppercase">
          SSL secured · CDN ready
        </span>
      </div>

      <div className="mt-5">
        <span className="text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Curated address suggestions
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestion(suggestion)}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-low px-3 py-1.5 text-[11px] leading-4 transition-colors hover:bg-surface-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <Plus aria-hidden size={13} className="text-secondary" />
              <span>
                momentkita.id/<strong>{suggestion}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
