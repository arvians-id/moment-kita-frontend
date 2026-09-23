import { CalendarDays, Mail, MessageCircle } from "lucide-react";

import { CustomerRowActions } from "@/components/admin/customers/customer-row-actions";
import {
  CustomerAccountBadge,
  CustomerStatusBadge,
} from "@/components/admin/customers/customer-status-badge";
import type { AdminCustomer } from "@/types";

const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function CustomerCardList({
  customers,
  openActionId,
  onToggleActions,
}: {
  customers: AdminCustomer[];
  openActionId: string | null;
  onToggleActions: (id: string) => void;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:hidden">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className="relative bg-surface-lowest p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={`grid size-10 shrink-0 place-items-center text-[12px] font-semibold ${customer.accountType === "managed" ? "bg-accent text-accent-foreground" : "bg-surface-container text-primary"}`}
              >
                {customer.initials}
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-[13px] font-semibold">
                  {customer.name}
                </h2>
                <p className="mt-0.5 text-[10px] text-on-surface-variant">
                  {customer.linkedUserId
                    ? "Linked user account"
                    : "No linked user account"}
                </p>
              </div>
            </div>
            <CustomerRowActions
              customer={customer}
              isOpen={openActionId === customer.id}
              onToggle={() => onToggleActions(customer.id)}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <CustomerAccountBadge accountType={customer.accountType} />
            <CustomerStatusBadge status={customer.status} />
          </div>

          <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[11px] text-on-surface-variant">
            <p className="flex min-w-0 items-center gap-2">
              <Mail aria-hidden size={13} className="shrink-0" />
              <span className="truncate">
                {customer.email ?? "No email on file"}
              </span>
            </p>
            <p className="flex min-w-0 items-center gap-2 text-secondary">
              <MessageCircle aria-hidden size={13} className="shrink-0" />
              <span className="truncate">{customer.whatsapp}</span>
            </p>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 bg-surface-low p-3 text-center">
            <div>
              <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                Invitations
              </dt>
              <dd className="mt-1 text-[13px] font-semibold">
                {customer.invitationCount}
              </dd>
            </div>
            <div className="border-x border-border px-1">
              <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                Quota
              </dt>
              <dd className="mt-1 text-[13px] font-semibold">
                {customer.quotaRemaining} / {customer.quotaGranted}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                Spending
              </dt>
              <dd className="mt-1 truncate text-[11px] font-semibold">
                {currencyFormat.format(customer.totalSpending)}
              </dd>
            </div>
          </dl>

          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-on-surface-variant">
            <CalendarDays aria-hidden size={12} /> Joined{" "}
            {dateFormat.format(new Date(customer.joinedAt))}
          </p>
        </li>
      ))}
    </ul>
  );
}
