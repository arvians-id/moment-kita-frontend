import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Choose Template", detail: "Select an atelier theme" },
  { id: 2, label: "Wedding Basics", detail: "Couple names & date" },
  { id: 3, label: "Invitation Address", detail: "Claim your public URL" },
  { id: 4, label: "Review & Create", detail: "Create the draft" },
] as const;

export function CreationProgress({
  activeStep,
  completedThrough,
  onSelect,
}: {
  activeStep: number;
  completedThrough: number;
  onSelect: (step: number) => void;
}) {
  return (
    <nav
      aria-label="Invitation creation progress"
      className="mb-8 rounded-[12px] bg-surface-lowest p-3 shadow-sm sm:p-5"
    >
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          const isComplete = step.id <= completedThrough;

          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelect(step.id)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[8px] p-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                  isActive ? "bg-surface-low" : "hover:bg-surface-low/70",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold tracking-[0.08em]",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : isComplete
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-high text-on-surface-variant",
                  )}
                >
                  {isComplete && !isActive ? (
                    <Check aria-hidden size={15} />
                  ) : (
                    String(step.id).padStart(2, "0")
                  )}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[10px] leading-4 font-semibold tracking-[0.16em] uppercase",
                      isActive || isComplete
                        ? "text-secondary"
                        : "text-on-surface-variant",
                    )}
                  >
                    {isActive
                      ? "Active step"
                      : isComplete
                        ? "Step " + String(step.id).padStart(2, "0")
                        : step.id === 4
                          ? "Final step"
                          : "Step " + String(step.id).padStart(2, "0")}
                  </span>
                  <span className="block truncate text-[13px] leading-5 font-semibold">
                    {step.label}
                  </span>
                  <span className="block truncate text-[10px] leading-4 tracking-[0.06em] text-on-surface-variant">
                    {step.detail}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
