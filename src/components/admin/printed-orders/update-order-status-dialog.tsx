"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  PrintedOrderStatusBadge,
  printedOrderStatusLabel,
  validStatusTransitions,
} from "@/components/admin/printed-orders/printed-order-utils";
import type { AdminPrintedOrderItem, AdminPrintedOrderStatus } from "@/types";

export function UpdateOrderStatusDialog({
  order,
  onClose,
  onConfirm,
}: {
  order: AdminPrintedOrderItem;
  onClose: () => void;
  onConfirm: (status: AdminPrintedOrderStatus, note: string) => void;
}) {
  const options = validStatusTransitions[order.orderStatus];
  const [status, setStatus] = useState<AdminPrintedOrderStatus>(
    options[0] ?? order.orderStatus,
  );
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
        aria-labelledby="order-status-title"
        className="my-auto w-full max-w-lg bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-5 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Manual operations update
            </p>
            <h2
              id="order-status-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              Update Order Status
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close status update"
            className="grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="bg-surface-low p-4">
            <p className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Current Status
            </p>
            <div className="mt-2">
              <PrintedOrderStatusBadge status={order.orderStatus} />
            </div>
          </div>
          <label className="space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            New Status
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as AdminPrintedOrderStatus)
              }
              className="h-11 w-full border border-border bg-surface-lowest px-3 text-[12px] font-normal tracking-normal text-on-surface normal-case outline-none focus:border-secondary"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {printedOrderStatusLabel[option]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block space-y-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Internal Note{" "}
          <span className="font-normal normal-case">
            {status === "cancelled"
              ? "(required for cancellation)"
              : "(optional)"}
          </span>
          <textarea
            required={status === "cancelled"}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Add manual fulfillment context..."
            className="w-full resize-none border border-border px-3 py-2.5 text-[12px] font-normal tracking-normal text-on-surface normal-case outline-none focus:border-secondary"
          />
        </label>

        <div className="mt-4 flex gap-3 bg-accent p-4 text-accent-foreground">
          <AlertTriangle aria-hidden size={17} className="mt-0.5 shrink-0" />
          <p className="text-[10px] leading-5">
            Payment remains controlled by transaction status. This operational
            update does not confirm, cancel, or refund payment.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase hover:bg-surface-container"
          >
            Keep Current Status
          </button>
          <button
            type="button"
            onClick={() => onConfirm(status, note)}
            disabled={status === "cancelled" && note.trim() === ""}
            className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45"
          >
            Confirm Update
          </button>
        </div>
      </section>
    </div>
  );
}
