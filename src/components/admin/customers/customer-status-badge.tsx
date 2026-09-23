import { cn } from "@/lib/utils";
import type { AdminCustomerAccountType, AdminCustomerStatus } from "@/types";

const statusLabel: Record<AdminCustomerStatus, string> = {
  active: "Active",
  no_quota: "No Quota",
  pending_payment: "Pending Payment",
};

const statusClass: Record<AdminCustomerStatus, string> = {
  active: "bg-emerald-100 text-emerald-900",
  no_quota: "bg-amber-100 text-amber-900",
  pending_payment: "bg-accent text-accent-foreground",
};

export function CustomerStatusBadge({
  status,
  className,
}: {
  status: AdminCustomerStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 text-[9px] leading-3 font-semibold tracking-[0.1em] whitespace-nowrap uppercase",
        statusClass[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {statusLabel[status]}
    </span>
  );
}

export function CustomerAccountBadge({
  accountType,
}: {
  accountType: AdminCustomerAccountType;
}) {
  return accountType === "registered" ? (
    <span className="inline-flex bg-primary px-2 py-1 text-[9px] leading-3 font-semibold tracking-[0.1em] whitespace-nowrap text-primary-foreground uppercase">
      Registered
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 bg-accent px-2 py-1 text-[9px] leading-3 font-semibold tracking-[0.1em] whitespace-nowrap text-accent-foreground uppercase">
      <span className="size-1.5 rounded-full bg-secondary" />
      Managed Customer
    </span>
  );
}
