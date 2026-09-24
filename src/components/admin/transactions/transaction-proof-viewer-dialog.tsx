"use client";

import { ReceiptText, X } from "lucide-react";
import { useEffect } from "react";

import type { TransactionPayment } from "@/types";

/**
 * A minimal, dependency-free proof viewer. This mock environment has no
 * real uploaded customer files, so it presents a clearly-labeled structured
 * placeholder rather than a fabricated receipt image.
 */
export function TransactionProofViewerDialog({
  payment,
  onClose,
}: {
  payment: TransactionPayment;
  onClose: () => void;
}) {
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
        aria-labelledby="proof-viewer-title"
        className="relative my-auto w-full max-w-md bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <h2 id="proof-viewer-title" className="font-serif text-[22px] leading-8">
            Payment Proof
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close payment proof"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 grid place-items-center gap-3 border border-dashed border-border bg-surface-low p-10 text-center">
          <ReceiptText aria-hidden size={36} className="text-on-surface-variant" />
          <p className="text-[11px] leading-5 text-on-surface-variant">
            No uploaded proof image is available in this mock environment.
            Reconciliation is verified against the reference details below.
          </p>
        </div>

        <dl className="mt-4 space-y-2 text-[11px]">
          <div className="flex justify-between gap-3 bg-surface-low p-3">
            <dt className="text-on-surface-variant">Method</dt>
            <dd className="font-semibold">{payment.method}</dd>
          </div>
          {payment.bankReferenceNumber ? (
            <div className="flex justify-between gap-3 bg-surface-low p-3">
              <dt className="text-on-surface-variant">Reference</dt>
              <dd className="font-mono font-semibold">
                {payment.bankReferenceNumber}
              </dd>
            </div>
          ) : null}
          {payment.channelBadge ? (
            <div className="flex justify-between gap-3 bg-surface-low p-3">
              <dt className="text-on-surface-variant">Channel Status</dt>
              <dd className="font-semibold">{payment.channelBadge}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-6 flex justify-end border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
