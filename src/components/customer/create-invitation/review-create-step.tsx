import { ArrowRight, Check, Info, Save } from "lucide-react";
import Link from "next/link";

import type { CatalogTemplate } from "@/types";

export function ReviewCreateStep({
  template,
  canCreate,
  onActivate,
}: {
  template: CatalogTemplate;
  canCreate: boolean;
  onActivate: () => void;
}) {
  return (
    <section
      id="create-step-4"
      onFocusCapture={onActivate}
      className="scroll-mt-28 rounded-[12px] bg-surface-lowest p-5 shadow-md sm:p-6"
    >
      <span className="text-[10px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
        04 — Review &amp; create
      </span>
      <h2 className="mt-0.5 font-serif text-[22px] leading-7 font-semibold">
        What Happens When You Proceed
      </h2>

      <div className="mt-5 space-y-4">
        {[
          "A private draft workspace is prepared with the " +
            template.name +
            " visual foundation.",
          "Your couple details, date, and public address are carried into the future Studio Editor.",
          "You can privately review and keep editing without consuming invitation quota.",
        ].map((item, index) => (
          <div key={item} className="flex items-start gap-3">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-secondary">
              {index + 1}
            </span>
            <p className="text-[12px] leading-5 text-on-surface-variant">
              {item}
            </p>
          </div>
        ))}
      </div>

      {!canCreate ? (
        <div className="mt-5 flex items-start gap-2 rounded-[8px] bg-surface-low p-3 text-[11px] leading-5 text-on-surface-variant">
          <Info
            aria-hidden
            size={15}
            className="mt-0.5 shrink-0 text-secondary"
          />
          Complete the couple details, wedding date, and choose an available
          address before creating your draft.
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-2 rounded-[8px] bg-emerald-50 p-3 text-[11px] leading-5 text-emerald-900">
          <Check aria-hidden size={15} className="shrink-0" />
          Your draft setup is ready to create. No quota will be consumed.
        </div>
      )}

      <div className="mt-5 border-t border-surface-highest pt-4">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-center text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          Create Invitation Draft
          <ArrowRight aria-hidden size={16} />
        </button>
        <div className="mt-3 flex flex-col justify-between gap-2 text-[11px] leading-4 text-on-surface-variant sm:flex-row sm:items-center">
          <span className="inline-flex items-center gap-1.5">
            <Save aria-hidden size={14} />
            Details stay editable before Finalizing
          </span>
          <Link
            href="/app/invitations"
            className="text-secondary hover:underline"
          >
            Cancel &amp; return
          </Link>
        </div>
      </div>
    </section>
  );
}
