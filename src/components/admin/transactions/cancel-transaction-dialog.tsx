"use client";

import { AlertTriangle, Ban, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  idrFormat,
  purposeLabel,
} from "@/components/admin/transactions/transaction-list-utils";
import type { AdminTransactionListItem } from "@/types";

export function CancelTransactionDialog({
  transaction,
  onClose,
  onConfirm,
}: {
  transaction: AdminTransactionListItem;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const canConfirm = reason.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-transaction-title"
        className="relative my-auto w-full max-w-lg bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Commercial confirmation
            </p>
            <h2
              id="cancel-transaction-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              Cancel Transaction
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cancellation confirmation"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="grid gap-3 bg-surface-low p-4 sm:grid-cols-2">
            <div>
              <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Transaction
              </p>
              <p className="mt-1 font-mono text-[12px] font-semibold">
                {transaction.reference}
              </p>
              <p className="text-[9px] text-on-surface-variant">
                {purposeLabel[transaction.purpose]}
              </p>
            </div>
            <div>
              <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Customer
              </p>
              <p className="mt-1 text-[13px] font-semibold">
                {transaction.customer.name}
              </p>
            </div>
            <div>
              <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Amount
              </p>
              <p className="mt-1 font-serif text-[20px]">
                {idrFormat.format(transaction.amount)}
              </p>
            </div>
          </div>

          <div className="flex gap-3 bg-accent p-4 text-accent-foreground">
            <AlertTriangle aria-hidden size={17} className="mt-0.5 shrink-0" />
            <p className="text-[11px] leading-5">
              {transaction.status === "paid"
                ? "This transaction was already paid. Cancelling it does not automatically reverse the payment or return any granted quota — use a refund for settled funds."
                : "Cancelling a pending transaction never grants its commercial effect. No quota, package, or extension is applied."}
            </p>
          </div>

          <label className="block space-y-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
            Cancellation Reason
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={2}
              placeholder="e.g. Duplicate payment, customer requested package swap..."
              className="w-full resize-none border border-border bg-surface px-3 py-2.5 text-[12px] font-normal tracking-normal normal-case outline-none focus:border-secondary"
            />
          </label>

          <div className="flex gap-3 border border-border p-4 text-on-surface-variant">
            <Info
              aria-hidden
              size={17}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p className="text-[10px] leading-5">
              This mock registry updates locally for interface verification.
              Backend persistence is intentionally deferred.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container"
          >
            Keep Transaction
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm(reason.trim())}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-red-700 px-6 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors enabled:hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Ban aria-hidden size={15} /> Confirm Cancellation
          </button>
        </div>
      </section>
    </div>
  );
}
