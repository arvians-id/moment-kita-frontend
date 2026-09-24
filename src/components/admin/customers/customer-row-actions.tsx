import {
  Gauge,
  MailPlus,
  MoreVertical,
  ReceiptText,
  UserRoundSearch,
} from "lucide-react";
import Link from "next/link";

import type { AdminCustomer } from "@/types";

export function CustomerRowActions({
  customer,
  isOpen,
  onToggle,
}: {
  customer: AdminCustomer;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        aria-label={`Actions for ${customer.name}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
      >
        <MoreVertical aria-hidden size={17} />
      </button>
      {isOpen ? (
        <div className="absolute top-full right-0 z-20 mt-1 w-52 border border-border bg-surface-lowest p-1.5 text-left shadow-xl">
          <Link
            href={`/admin/customers/${customer.id}`}
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <UserRoundSearch aria-hidden size={15} /> View Customer
          </Link>
          <Link
            href={`/admin/invitations/new?customerId=${customer.id}`}
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <MailPlus aria-hidden size={15} /> Create Invitation
          </Link>
          <Link
            href={`/admin/customers/${customer.id}`}
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <Gauge aria-hidden size={15} /> Manage Quota
          </Link>
          <Link
            href="/admin/transactions"
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <ReceiptText aria-hidden size={15} /> View Transactions
          </Link>
        </div>
      ) : null}
    </div>
  );
}
