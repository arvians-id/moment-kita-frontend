import {
  Ban,
  CircleCheck,
  Eye,
  Heart,
  MoreVertical,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import type { AdminTransactionListItem } from "@/types";

export type TransactionRowAction = "confirm" | "cancel";

function ActionButton({
  icon: Icon,
  label,
  tone = "default",
  onClick,
}: {
  icon: typeof CircleCheck;
  label: string;
  tone?: "default" | "danger";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium transition-colors hover:bg-surface-low ${tone === "danger" ? "text-error" : "text-on-surface"}`}
    >
      <Icon aria-hidden size={15} /> {label}
    </button>
  );
}

export function TransactionRowActions({
  transaction,
  isOpen,
  onToggle,
  onAction,
}: {
  transaction: AdminTransactionListItem;
  isOpen: boolean;
  onToggle: () => void;
  onAction: (action: TransactionRowAction) => void;
}) {
  const canConfirm = transaction.status === "pending";
  const canCancel =
    transaction.status === "pending" || transaction.status === "paid";

  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        aria-label={`Actions for ${transaction.reference}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
      >
        <MoreVertical aria-hidden size={17} />
      </button>

      {isOpen ? (
        <div className="absolute top-full right-0 z-30 mt-1 w-60 border border-border bg-surface-lowest p-1.5 text-left shadow-xl">
          <Link
            href={`/admin/transactions/${transaction.id}`}
            prefetch={false}
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <Eye aria-hidden size={15} /> View Details
          </Link>

          {transaction.customer.id ? (
            <Link
              href={`/admin/customers/${transaction.customer.id}`}
              className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
            >
              <UserRound aria-hidden size={15} /> View Customer
            </Link>
          ) : (
            <span
              aria-disabled="true"
              title="This transaction has no linked customer profile"
              className="flex cursor-not-allowed items-center gap-2 px-3 py-2 text-[12px] text-on-surface-variant/55"
            >
              <UserRound aria-hidden size={15} /> View Customer
            </span>
          )}

          {transaction.relatedInvitation ? (
            <Link
              href={`/admin/invitations/${transaction.relatedInvitation.id}`}
              prefetch={false}
              className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
            >
              <Heart aria-hidden size={15} /> View Related Invitation
            </Link>
          ) : null}

          {canConfirm || canCancel ? (
            <div className="my-1 border-t border-border" />
          ) : null}

          {canConfirm ? (
            <ActionButton
              icon={CircleCheck}
              label="Confirm Payment"
              onClick={() => onAction("confirm")}
            />
          ) : null}
          {canCancel ? (
            <ActionButton
              icon={Ban}
              label="Cancel Transaction"
              tone="danger"
              onClick={() => onAction("cancel")}
            />
          ) : null}
          {!canConfirm && !canCancel ? (
            <p className="px-3 py-2 text-[10px] leading-4 text-on-surface-variant">
              This transaction is settled and has no further actions.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
