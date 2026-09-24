"use client";

import { CheckCircle2, Info, ReceiptText, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  effectDescription,
  idrFormat,
  purposeLabel,
} from "@/components/admin/transactions/transaction-list-utils";
import type { AdminTransactionListItem } from "@/types";

export function ConfirmPaymentDialog({
  transaction,
  onClose,
  onConfirm,
}: {
  transaction: AdminTransactionListItem;
  onClose: () => void;
  onConfirm: (note: string) => void;
}) {
  const [note, setNote] = useState("");

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

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-payment-title"
        className="relative my-auto w-full max-w-lg bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Manual payment verification
            </p>
            <h2
              id="confirm-payment-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              Confirm Payment
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close payment confirmation"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="grid gap-3 bg-surface-low p-4 sm:grid-cols-2">
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
                Purchase
              </p>
              <p className="mt-1 text-[13px] font-semibold">
                {transaction.productName}
              </p>
              <p className="text-[9px] text-on-surface-variant">
                {purposeLabel[transaction.purpose]}
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
            <div>
              <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Payment Proof
              </p>
              {transaction.payment ? (
                <p className="mt-1 text-[11px] leading-4">
                  {transaction.payment.method}
                  {transaction.payment.bankReferenceNumber ? (
                    <>
                      <br />
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        Ref: {transaction.payment.bankReferenceNumber}
                      </span>
                    </>
                  ) : null}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  No proof on file yet
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 bg-accent p-4 text-accent-foreground">
            <ReceiptText aria-hidden size={17} className="mt-0.5 shrink-0" />
            <p className="text-[11px] leading-5">
              {effectDescription(transaction)}
            </p>
          </div>

          <label className="block space-y-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
            Verification Note{" "}
            <span className="font-normal normal-case">(optional)</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={2}
              placeholder="e.g. Matched wire reference against bank statement..."
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
              A real confirmation applies its commercial effect exactly once;
              this transaction cannot be confirmed again after this action.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(note.trim())}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <CheckCircle2 aria-hidden size={15} /> Confirm Payment
          </button>
        </div>
      </section>
    </div>
  );
}
