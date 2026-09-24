import { CreditCard, Gauge, Plus, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AdminQuickAction {
  label: string;
  hint: string;
  icon: LucideIcon;
  href: string;
}

const actions: AdminQuickAction[] = [
  {
    label: "Create Invitation",
    hint: "Provision a new suite",
    icon: Plus,
    href: "/admin/invitations/new",
  },
  {
    label: "Add Customer",
    hint: "Open customer registry",
    icon: UserPlus,
    href: "/admin/customers",
  },
  {
    label: "Confirm Payment",
    hint: "Review pending payments",
    icon: CreditCard,
    href: "/admin/transactions",
  },
  {
    label: "Adjust Quota",
    hint: "Open quota operations",
    icon: Gauge,
    href: "/admin/packages",
  },
];

export function AdminQuickActions() {
  return (
    <section className="flex flex-col gap-4 border border-border bg-surface-lowest p-5 sm:p-6">
      <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
        Quick Actions
      </span>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ label, hint, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 bg-surface-container p-3.5 text-left transition-colors hover:bg-surface-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
