import { Check } from "lucide-react";

export const adminCreateSteps = [
  "Customer",
  "Template",
  "Wedding Basics",
  "Commercial",
  "Review",
] as const;

export function CreateInvitationProgress({ step }: { step: number }) {
  return (
    <nav
      aria-label="Create invitation progress"
      className="overflow-x-auto border border-border bg-surface-lowest p-2 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ol className="grid min-w-[680px] grid-cols-5 gap-1">
        {adminCreateSteps.map((label, index) => {
          const active = step === index;
          const complete = step > index;
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className={`flex min-h-14 items-center gap-3 px-3 ${active ? "bg-primary text-primary-foreground" : "bg-surface-low text-on-surface-variant"}`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full border text-[9px] font-semibold ${complete ? "border-secondary bg-secondary text-white" : active ? "border-white/40" : "border-border"}`}
              >
                {complete ? (
                  <Check aria-hidden size={12} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <span>
                <span className="block text-[8px] tracking-[0.13em] uppercase">
                  Step {index + 1}
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold">
                  {label}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
