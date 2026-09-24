"use client";

import { Eye, ReceiptText } from "lucide-react";
import { useState } from "react";

import { TransactionProofViewerDialog } from "@/components/admin/transactions/transaction-proof-viewer-dialog";
import { transactionDateTimeFormat } from "@/components/admin/transactions/transaction-list-utils";
import type { AdminTransactionListItem } from "@/types";

export function TransactionPaymentProofSection({
  transaction,
}: {
  transaction: AdminTransactionListItem;
}) {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Verification
      </p>
      <h2 className="mt-1 font-serif text-[24px]">Payment proof</h2>

      {transaction.payment ? (
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center bg-surface-low text-secondary">
              <ReceiptText aria-hidden size={20} />
            </span>
            <div>
              <p className="text-[12px] font-semibold">{transaction.payment.method}</p>
              {transaction.payment.bankReferenceNumber ? (
                <p className="mt-0.5 font-mono text-[10px] text-on-surface-variant">
                  Ref: {transaction.payment.bankReferenceNumber}
                </p>
              ) : null}
              <p className="mt-0.5 text-[10px] text-on-surface-variant">
                Submitted{" "}
                {transactionDateTimeFormat.format(new Date(transaction.createdAt))}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setViewerOpen(true)}
            className="inline-flex min-h-10 items-center justify-center gap-2 border border-border px-4 text-[9px] font-semibold tracking-[0.1em] uppercase transition-colors hover:bg-surface-low"
          >
            <Eye aria-hidden size={14} /> Inspect Proof
          </button>
        </div>
      ) : (
        <p className="mt-5 bg-surface-low p-4 text-[11px] text-on-surface-variant">
          No payment proof is on file for this transaction.
        </p>
      )}

      {viewerOpen && transaction.payment ? (
        <TransactionProofViewerDialog
          payment={transaction.payment}
          onClose={() => setViewerOpen(false)}
        />
      ) : null}
    </section>
  );
}
