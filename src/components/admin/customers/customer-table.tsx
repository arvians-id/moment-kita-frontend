import { Mail, MessageCircle } from "lucide-react";

import { CustomerRowActions } from "@/components/admin/customers/customer-row-actions";
import {
  CustomerAccountBadge,
  CustomerStatusBadge,
} from "@/components/admin/customers/customer-status-badge";
import type { AdminCustomer } from "@/types";
import { idrFormat as currencyFormat } from "@/lib/format";


const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function CustomerTable({
  customers,
  openActionId,
  onToggleActions,
}: {
  customers: AdminCustomer[];
  openActionId: string | null;
  onToggleActions: (id: string) => void;
}) {
  return (
    <div className="hidden overflow-visible bg-surface-lowest shadow-sm xl:block">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="bg-surface-low text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            <th className="w-[17%] px-3 py-3 font-semibold">Customer</th>
            <th className="w-[20%] px-3 py-3 font-semibold">
              Email &amp; WhatsApp
            </th>
            <th className="w-[13%] px-3 py-3 font-semibold">Account Type</th>
            <th className="w-[7%] px-3 py-3 text-center font-semibold">
              Invites
            </th>
            <th className="w-[11%] px-3 py-3 font-semibold">Remaining Quota</th>
            <th className="w-[12%] px-3 py-3 text-right font-semibold">
              Total Spending
            </th>
            <th className="w-[10%] px-3 py-3 text-center font-semibold">
              Status
            </th>
            <th className="hidden w-[10%] px-3 py-3 font-semibold 2xl:table-cell">
              Joined
            </th>
            <th className="w-[5%] px-3 py-3 text-right font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {customers.map((customer) => {
            const quotaPercent =
              customer.quotaGranted === 0
                ? 0
                : Math.round(
                    (customer.quotaRemaining / customer.quotaGranted) * 100,
                  );

            return (
              <tr
                key={customer.id}
                className="transition-colors hover:bg-surface-low/75"
              >
                <td className="px-3 py-3.5 align-middle">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`grid size-9 shrink-0 place-items-center text-[12px] font-semibold ${customer.accountType === "managed" ? "bg-accent text-accent-foreground" : "bg-surface-container text-primary"}`}
                    >
                      {customer.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold">
                        {customer.name}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-on-surface-variant">
                        {customer.linkedUserId
                          ? "Linked user account"
                          : "Studio-managed profile"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5 align-middle">
                  <div className="flex min-w-0 flex-col gap-1 text-[10px]">
                    <span className="flex min-w-0 items-center gap-1.5 text-on-surface-variant">
                      <Mail aria-hidden size={12} className="shrink-0" />
                      <span className="truncate">
                        {customer.email ?? "No email on file"}
                      </span>
                    </span>
                    <span className="flex min-w-0 items-center gap-1.5 text-secondary">
                      <MessageCircle
                        aria-hidden
                        size={12}
                        className="shrink-0"
                      />
                      <span className="truncate">{customer.whatsapp}</span>
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3.5 align-middle">
                  <CustomerAccountBadge accountType={customer.accountType} />
                </td>
                <td className="px-3 py-3.5 text-center align-middle text-[12px] font-semibold">
                  {customer.invitationCount}
                </td>
                <td className="px-3 py-3.5 align-middle">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[10px]">
                      <span className="font-semibold">
                        {customer.quotaRemaining}
                      </span>
                      <span className="text-on-surface-variant">
                        of {customer.quotaGranted}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden bg-surface-container">
                      <div
                        className={`h-full ${customer.quotaRemaining === 0 ? "bg-amber-600" : "bg-secondary"}`}
                        style={{ width: `${quotaPercent}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5 text-right align-middle text-[11px] font-semibold whitespace-nowrap">
                  {currencyFormat.format(customer.totalSpending)}
                </td>
                <td className="px-3 py-3.5 text-center align-middle">
                  <CustomerStatusBadge status={customer.status} />
                </td>
                <td className="hidden px-3 py-3.5 align-middle text-[10px] whitespace-nowrap text-on-surface-variant 2xl:table-cell">
                  {dateFormat.format(new Date(customer.joinedAt))}
                </td>
                <td className="px-3 py-3.5 text-right align-middle">
                  <CustomerRowActions
                    customer={customer}
                    isOpen={openActionId === customer.id}
                    onToggle={() => onToggleActions(customer.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
