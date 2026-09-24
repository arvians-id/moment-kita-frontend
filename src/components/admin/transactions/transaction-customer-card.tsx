import { Mail, MessageCircle, UserRound } from "lucide-react";
import Link from "next/link";

import type { AdminCustomer, AdminTransactionCustomerRef } from "@/types";

export function TransactionCustomerCard({
  customer,
  customerProfile,
}: {
  customer: AdminTransactionCustomerRef;
  customerProfile: AdminCustomer | null;
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Customer
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-terracotta-soft/50 text-[13px] font-semibold text-accent-foreground">
          {customerProfile?.initials ?? <UserRound aria-hidden size={18} />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold">{customer.name}</p>
          <p className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            {customer.accountType === "managed"
              ? "Managed · No login"
              : customer.accountType === "registered"
                ? "Registered"
                : "Unresolved profile"}
          </p>
        </div>
      </div>

      {customerProfile ? (
        <dl className="mt-4 space-y-2 text-[11px]">
          <div className="flex items-center gap-2 bg-surface-low p-3">
            <Mail aria-hidden size={13} className="shrink-0 text-secondary" />
            <dd className="truncate">{customerProfile.email ?? "No email on file"}</dd>
          </div>
          <div className="flex items-center gap-2 bg-surface-low p-3">
            <MessageCircle aria-hidden size={13} className="shrink-0 text-secondary" />
            <dd className="truncate">{customerProfile.whatsapp}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 bg-surface-low p-3 text-[10px] leading-5 text-on-surface-variant">
          This transaction does not resolve to a customer profile on file.
        </p>
      )}

      {customer.id ? (
        <Link
          href={`/admin/customers/${customer.id}`}
          className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
        >
          View Customer Profile
        </Link>
      ) : null}
    </section>
  );
}
