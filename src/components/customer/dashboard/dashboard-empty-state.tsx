import { PenLine, Plus } from "lucide-react";

/** Shown when the customer has no invitation yet. */
export function DashboardEmptyState() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-[12px] bg-surface-lowest p-8 text-center shadow-sm">
      <span className="grid size-14 place-items-center rounded-full bg-surface-low text-secondary">
        <PenLine aria-hidden size={26} />
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          A new beginning
        </span>
        <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
          Begin crafting your love story
        </h2>
        <p className="text-[13px] leading-5 text-on-surface-variant">
          Choose a template, add your dates and venue, then share a personal
          link with every guest you love.
        </p>
      </div>
      <span className="inline-flex cursor-not-allowed items-center gap-2 bg-primary px-6 py-3 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase">
        <Plus aria-hidden size={14} />
        Create your first invitation
      </span>
    </section>
  );
}
