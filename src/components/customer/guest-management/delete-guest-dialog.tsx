"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

import type { InvitationGuest } from "@/types";

export function DeleteGuestDialog({
  guest,
  onClose,
  onConfirm,
}: {
  guest: InvitationGuest;
  onClose: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-guest-title"
        aria-describedby="delete-guest-description"
        className="relative w-full max-w-md bg-surface-lowest p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute top-4 right-4 grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
        >
          <X aria-hidden size={18} />
        </button>
        <span className="grid size-11 place-items-center rounded-full bg-error-container text-error">
          <AlertTriangle aria-hidden size={20} />
        </span>
        <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-error uppercase">
          Remove invitation entry
        </p>
        <h2
          id="delete-guest-title"
          className="mt-1 pr-8 font-serif text-[26px] leading-8"
        >
          Delete {guest.name}?
        </h2>
        <p
          id="delete-guest-description"
          className="mt-3 text-[13px] leading-6 text-on-surface-variant"
        >
          This frontend preview removes the guest from the current directory. In
          production, deletion also invalidates that guest’s secure link.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.12em] uppercase"
          >
            Keep Guest
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 bg-error px-5 text-[10px] font-semibold tracking-[0.12em] text-on-error uppercase transition-opacity hover:opacity-90"
          >
            Delete Guest
          </button>
        </div>
      </section>
    </div>
  );
}
