"use client";

import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface NewManagedCustomerInput {
  name: string;
  email: string;
  whatsapp: string;
  notes: string;
}

export function AddCustomerDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (input: NewManagedCustomerInput) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");

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

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCreate({
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      notes: notes.trim(),
    });
  }

  const fieldClass =
    "min-h-11 w-full border border-transparent bg-surface-low px-3 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary";
  const labelClass =
    "text-[10px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase";

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-customer-title"
        className="relative my-auto w-full max-w-xl bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Client onboarding
            </p>
            <h2
              id="add-customer-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              Add Customer
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add customer dialog"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="new-customer-name" className={labelClass}>
              Name <span aria-hidden>*</span>
            </label>
            <input
              id="new-customer-name"
              autoFocus
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Customer or couple contact name"
              className={fieldClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="new-customer-email" className={labelClass}>
                Email
              </label>
              <input
                id="new-customer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="client@example.com"
                className={fieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="new-customer-whatsapp" className={labelClass}>
                WhatsApp <span aria-hidden>*</span>
              </label>
              <input
                id="new-customer-whatsapp"
                required
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                placeholder="+62 812 3456 7890"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="new-customer-account-type" className={labelClass}>
              Account Type
            </label>
            <select
              id="new-customer-account-type"
              disabled
              className={`${fieldClass} cursor-not-allowed text-on-surface-variant`}
            >
              <option>Managed Customer — no linked login account</option>
            </select>
          </div>

          <div className="flex gap-2.5 bg-surface-container px-3.5 py-3 text-[11px] leading-5 text-on-surface-variant">
            <Info
              aria-hidden
              size={16}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p>
              This creates a presentation-only managed customer record. It does
              not provision or match a user account by email.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="new-customer-notes" className={labelClass}>
              Notes <span className="font-normal normal-case">(optional)</span>
            </label>
            <textarea
              id="new-customer-notes"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Venue, preferred aesthetic, or concierge context..."
              className="w-full resize-none border border-transparent bg-surface-low px-3 py-2.5 text-[13px] leading-6 outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary"
            />
          </div>

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
              Add Managed Customer
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
