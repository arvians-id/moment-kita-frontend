import { CreditCard, Gauge, Plus, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AdminQuickAction {
  label: string;
  hint: string;
  icon: LucideIcon;
}

const actions: AdminQuickAction[] = [
  { label: "Create Invitation", hint: "Provision a new suite", icon: Plus },
  { label: "Add Customer", hint: "Register a client", icon: UserPlus },
  {
    label: "Confirm Payment",
    hint: "Settle a pending transaction",
    icon: CreditCard,
  },
  { label: "Adjust Quota", hint: "Grant or reduce credits", icon: Gauge },
];

/**
 * Shortcuts into flows that are not built yet — every tile stays inert
 * (`available: false`-style presentation) until its destination page lands,
 * matching the Customer CMS's own convention for not-yet-built actions.
 */
export function AdminQuickActions() {
  return (
    <section className="flex flex-col gap-4 border border-border bg-surface-lowest p-5 sm:p-6">
      <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
        Quick Actions
      </span>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ label, hint, icon: Icon }) => (
          <span
            key={label}
            aria-disabled="true"
            title={`${label} (coming soon)`}
            className="flex cursor-not-allowed items-center gap-3 bg-surface-container p-3.5 text-left"
          >
            <span className="grid size-9 shrink-0 place-items-center bg-surface-lowest">
              <Icon aria-hidden size={18} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] leading-5 font-semibold">
                {label}
              </span>
              <span className="truncate text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                {hint}
              </span>
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
