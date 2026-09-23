"use client";

import { Gauge, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { AdminCustomer } from "@/types";

export interface EditCustomerInput {
  name: string;
  email: string;
  whatsapp: string;
  notes: string;
}

export interface QuotaAdjustmentInput {
  direction: "increase" | "decrease";
  amount: number;
  reason: string;
}

function useDialogLifecycle(onClose: () => void) {
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
}

const fieldClass =
  "min-h-11 w-full border border-transparent bg-surface-low px-3 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary";
const labelClass =
  "text-[10px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase";

function DialogHeading({
  id,
  eyebrow,
  title,
  closeLabel,
  onClose,
}: {
  id: string;
  eyebrow: string;
  title: string;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
          {eyebrow}
        </p>
        <h2 id={id} className="mt-1 font-serif text-[26px] leading-8">
          {title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
      >
        <X aria-hidden size={19} />
      </button>
    </div>
  );
}

function DialogActions({
  submitLabel,
  onClose,
}: {
  submitLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
      >
        {submitLabel}
      </button>
    </div>
  );
}

export function EditCustomerDialog({
  customer,
  onClose,
  onSave,
}: {
  customer: AdminCustomer;
  onClose: () => void;
  onSave: (input: EditCustomerInput) => void;
}) {
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email ?? "");
  const [whatsapp, setWhatsapp] = useState(customer.whatsapp);
  const [notes, setNotes] = useState(customer.notes ?? "");
  useDialogLifecycle(onClose);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      notes: notes.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-customer-title"
        className="relative my-auto w-full max-w-xl bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <DialogHeading
          id="edit-customer-title"
          eyebrow="Customer profile"
          title="Edit Customer"
          closeLabel="Close edit customer dialog"
          onClose={onClose}
        />

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="edit-customer-name" className={labelClass}>
              Name <span aria-hidden>*</span>
            </label>
            <input
              id="edit-customer-name"
              autoFocus
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="edit-customer-email" className={labelClass}>
                Email
              </label>
              <input
                id="edit-customer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="client@example.com"
                className={fieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="edit-customer-whatsapp" className={labelClass}>
                WhatsApp <span aria-hidden>*</span>
              </label>
              <input
                id="edit-customer-whatsapp"
                required
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex gap-2.5 bg-surface-container px-3.5 py-3 text-[11px] leading-5 text-on-surface-variant">
            <Info
              aria-hidden
              size={16}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p>
              Account linkage is unchanged. Editing an email never matches,
              merges, or claims a login account.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="edit-customer-notes" className={labelClass}>
              Notes <span className="font-normal normal-case">(optional)</span>
            </label>
            <textarea
              id="edit-customer-notes"
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full resize-none border border-transparent bg-surface-low px-3 py-2.5 text-[13px] leading-6 outline-none transition-colors focus:border-secondary"
            />
          </div>

          <DialogActions submitLabel="Save Customer" onClose={onClose} />
        </form>
      </section>
    </div>
  );
}

export function AdjustQuotaDialog({
  currentQuota,
  onClose,
  onConfirm,
}: {
  currentQuota: number;
  onClose: () => void;
  onConfirm: (input: QuotaAdjustmentInput) => void;
}) {
  const [direction, setDirection] = useState<"increase" | "decrease">(
    "increase",
  );
  const [amount, setAmount] = useState(1);
  const [reason, setReason] = useState("");
  useDialogLifecycle(onClose);

  const signedAmount = direction === "increase" ? amount : -amount;
  const nextQuota = Math.max(0, currentQuota + signedAmount);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (direction === "decrease" && amount > currentQuota) return;
    onConfirm({ direction, amount, reason: reason.trim() });
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="adjust-quota-title"
        className="relative my-auto w-full max-w-lg bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <DialogHeading
          id="adjust-quota-title"
          eyebrow="Explicit admin action"
          title="Adjust Quota"
          closeLabel="Close quota adjustment dialog"
          onClose={onClose}
        />

        <form onSubmit={submit} className="mt-5 space-y-5">
          <div
            className="grid grid-cols-2 gap-2"
            role="group"
            aria-label="Adjustment type"
          >
            {(["increase", "decrease"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={direction === item}
                onClick={() => setDirection(item)}
                className={`min-h-11 text-[10px] font-semibold tracking-[0.12em] uppercase ${direction === item ? "bg-primary text-primary-foreground" : "bg-surface-container text-on-surface-variant"}`}
              >
                {item} quota
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="quota-adjustment-amount" className={labelClass}>
              Amount <span aria-hidden>*</span>
            </label>
            <input
              id="quota-adjustment-amount"
              type="number"
              min={1}
              max={direction === "decrease" ? Math.max(1, currentQuota) : 100}
              required
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className={fieldClass}
            />
            {direction === "decrease" && amount > currentQuota ? (
              <p className="text-[10px] text-error">
                Decrease cannot exceed the current quota.
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="quota-adjustment-reason" className={labelClass}>
              Reason <span aria-hidden>*</span>
            </label>
            <textarea
              id="quota-adjustment-reason"
              required
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Why is this quota adjustment required?"
              className="w-full resize-none border border-transparent bg-surface-low px-3 py-2.5 text-[13px] leading-6 outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary"
            />
          </div>

          <div className="flex items-center justify-between gap-4 bg-surface-container p-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              <Gauge aria-hidden size={15} /> Preview
            </span>
            <span className="font-serif text-[21px]">
              {currentQuota} → {nextQuota}
            </span>
          </div>

          <p className="text-[10px] leading-4 text-on-surface-variant">
            This mock action updates the local preview only. Production quota
            rules, persistence, idempotency, and audit enforcement remain
            backend work.
          </p>

          <DialogActions submitLabel="Confirm Adjustment" onClose={onClose} />
        </form>
      </section>
    </div>
  );
}
