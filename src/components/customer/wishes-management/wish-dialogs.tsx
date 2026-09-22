"use client";

import { AlertTriangle, ExternalLink, Quote, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { formatWishDate, type WishViewItem } from "./wish-utils";

function useDialogEscape(onClose: () => void) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);
}

export function WishDetailDialog({
  invitationId,
  wish,
  onClose,
}: {
  invitationId: string;
  wish: WishViewItem;
  onClose: () => void;
}) {
  useDialogEscape(onClose);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="wish-detail-title"
        className="relative w-full max-w-2xl bg-surface-lowest p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full message"
          className="absolute top-4 right-4 grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container"
        >
          <X aria-hidden size={18} />
        </button>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
          Full Guest Message
        </p>
        <h2
          id="wish-detail-title"
          className="mt-1 pr-10 font-serif text-[28px] leading-9"
        >
          {wish.author}
        </h2>
        <p className="mt-1 text-[10px] text-on-surface-variant">
          {wish.source === "public_link"
            ? "Public-link submission"
            : `${wish.group} · ${wish.context}`}
          {" · "}
          {formatWishDate(wish.submittedAt)}
        </p>

        <div className="relative mt-6 bg-surface-low p-5 sm:p-7">
          <Quote
            aria-hidden
            size={54}
            className="absolute right-4 bottom-3 text-secondary/10"
          />
          <p className="relative font-serif text-[21px] leading-9 italic sm:text-[24px] sm:leading-10">
            “{wish.message}”
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          {wish.guestId ? (
            <Link
              href={`/app/invitations/${invitationId}/guests`}
              className="inline-flex h-10 items-center gap-2 text-[10px] font-semibold tracking-[0.11em] text-secondary uppercase"
            >
              View Related Guest <ExternalLink aria-hidden size={14} />
            </Link>
          ) : (
            <p className="max-w-md text-[11px] leading-5 text-on-surface-variant">
              This message was shared through the public invitation link.
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="h-10 bg-primary px-5 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}

export function DeleteWishDialog({
  wish,
  onClose,
  onConfirm,
}: {
  wish: WishViewItem;
  onClose: () => void;
  onConfirm: () => void;
}) {
  useDialogEscape(onClose);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-wish-title"
        aria-describedby="delete-wish-description"
        className="relative w-full max-w-md bg-surface-lowest p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute top-4 right-4 grid size-8 place-items-center text-on-surface-variant hover:bg-surface-container"
        >
          <X aria-hidden size={18} />
        </button>
        <span className="grid size-11 place-items-center rounded-full bg-error-container text-error">
          <AlertTriangle aria-hidden size={20} />
        </span>
        <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-error uppercase">
          Permanent deletion
        </p>
        <h2
          id="delete-wish-title"
          className="mt-1 pr-8 font-serif text-[26px] leading-8"
        >
          Delete this wish?
        </h2>
        <p
          id="delete-wish-description"
          className="mt-3 text-[13px] leading-6 text-on-surface-variant"
        >
          The message from {wish.author} will be permanently removed. Hide it
          instead if you may want to restore it later.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.12em] uppercase"
          >
            Keep Wish
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 bg-error px-5 text-[10px] font-semibold tracking-[0.12em] text-on-error uppercase"
          >
            Delete Permanently
          </button>
        </div>
      </section>
    </div>
  );
}
