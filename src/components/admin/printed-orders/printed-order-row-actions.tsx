import {
  Eye,
  MoreVertical,
  ReceiptText,
  RefreshCw,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { validStatusTransitions } from "@/components/admin/printed-orders/printed-order-utils";
import type { AdminPrintedOrderItem } from "@/types";

export function PrintedOrderRowActions({
  order,
  isOpen,
  onToggle,
  onUpdateStatus,
}: {
  order: AdminPrintedOrderItem;
  isOpen: boolean;
  onToggle: () => void;
  onUpdateStatus: () => void;
}) {
  const canUpdate = validStatusTransitions[order.orderStatus].length > 0;
  const isStaged = order.id.startsWith("adm_txn_print_local_");

  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        aria-label={`Actions for ${order.reference}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
      >
        <MoreVertical aria-hidden size={17} />
      </button>

      {isOpen ? (
        <div className="absolute top-full right-0 z-30 mt-1 w-56 border border-border bg-surface-lowest p-1.5 text-left shadow-xl">
          {isStaged ? (
            <span
              aria-disabled="true"
              title="Order detail is available after backend persistence"
              className="flex cursor-not-allowed items-center gap-2 px-3 py-2 text-[12px] text-on-surface-variant/55"
            >
              <Eye aria-hidden size={15} /> View Order
            </span>
          ) : (
            <Link
              href={`/admin/printed-orders/${order.id}`}
              prefetch={false}
              className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
            >
              <Eye aria-hidden size={15} /> View Order
            </Link>
          )}
          {order.customer.id ? (
            <Link
              href={`/admin/customers/${order.customer.id}`}
              prefetch={false}
              className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
            >
              <UserRound aria-hidden size={15} /> View Customer
            </Link>
          ) : (
            <span className="flex cursor-not-allowed items-center gap-2 px-3 py-2 text-[12px] text-on-surface-variant/55">
              <UserRound aria-hidden size={15} /> No Customer Profile
            </span>
          )}
          {isStaged ? (
            <span
              aria-disabled="true"
              title="Transaction detail is available after backend persistence"
              className="flex cursor-not-allowed items-center gap-2 px-3 py-2 text-[12px] text-on-surface-variant/55"
            >
              <ReceiptText aria-hidden size={15} /> View Transaction
            </span>
          ) : (
            <Link
              href={`/admin/transactions/${order.id}`}
              prefetch={false}
              className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
            >
              <ReceiptText aria-hidden size={15} /> View Transaction
            </Link>
          )}
          <div className="my-1 border-t border-border" />
          {canUpdate ? (
            <button
              type="button"
              onClick={onUpdateStatus}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium transition-colors hover:bg-surface-low"
            >
              <RefreshCw aria-hidden size={15} /> Update Status
            </button>
          ) : (
            <p className="px-3 py-2 text-[10px] leading-4 text-on-surface-variant">
              This order has reached a terminal state.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
