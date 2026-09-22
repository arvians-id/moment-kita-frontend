import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  "Upload File",
  "Review & Validate",
  "Handle Duplicates",
  "Confirm Import",
  "Result",
] as const;

export function ImportStepper({ activeStep }: { activeStep: number }) {
  return (
    <nav
      aria-label="Guest import progress"
      className="overflow-hidden rounded-xl border border-border bg-surface-lowest shadow-sm"
    >
      <ol className="grid grid-cols-5">
        {steps.map((label, index) => {
          const number = index + 1;
          const complete = number < activeStep;
          const active = number === activeStep;
          return (
            <li
              key={label}
              className={cn(
                "relative flex min-w-0 items-center gap-2 border-r border-border px-2 py-3 last:border-r-0 sm:px-4 sm:py-4",
                active && "bg-terracotta-soft/50",
              )}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : complete
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-high text-on-surface-variant",
                )}
              >
                {complete ? <Check aria-hidden size={14} /> : number}
              </span>
              <span className="hidden min-w-0 text-[9px] leading-4 font-semibold tracking-[0.08em] uppercase sm:block lg:text-[10px] lg:tracking-[0.1em]">
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
