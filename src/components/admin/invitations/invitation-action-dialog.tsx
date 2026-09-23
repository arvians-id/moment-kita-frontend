"use client";

import { AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";

import type { InvitationLifecycleAction } from "./invitation-row-actions";

const actionCopy: Record<
  InvitationLifecycleAction,
  { title: string; description: string; warning: string }
> = {
  publish: {
    title: "Publish Invitation",
    description:
      "Publishing makes the invitation public. First publish starts its expiration timer; republishing does not reset it.",
    warning: "Finalize and Publish remain separate lifecycle actions.",
  },
  unpublish: {
    title: "Unpublish Invitation",
    description:
      "Unpublishing returns a published invitation to Finalized while its existing expiration timer continues.",
    warning: "Unpublishing does not pause or reset expiration.",
  },
  extend: {
    title: "Extend Expiration",
    description:
      "An extension would add validity through the future Admin extension endpoint and transaction rules.",
    warning:
      "Expired invitations return to Finalized after extension and still require an explicit Publish action.",
  },
  cancel: {
    title: "Cancel Invitation",
    description:
      "Cancellation is a sensitive lifecycle action and requires an explicit Admin reason in production.",
    warning: "Cancellation does not automatically return consumed quota.",
  },
};

export function InvitationActionDialog({
  action,
  coupleLabel,
  onClose,
  onConfirm,
}: {
  action: InvitationLifecycleAction;
  coupleLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const copy = actionCopy[action];

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
        aria-labelledby="invitation-action-title"
        className="relative my-auto w-full max-w-lg bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Lifecycle confirmation
            </p>
            <h2
              id="invitation-action-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              {copy.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lifecycle confirmation"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="bg-surface-low p-4">
            <p className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Invitation
            </p>
            <p className="mt-1 font-serif text-[20px]">{coupleLabel}</p>
          </div>
          <p className="text-[12px] leading-6 text-on-surface-variant">
            {copy.description}
          </p>
          <div className="flex gap-3 bg-accent p-4 text-accent-foreground">
            <AlertTriangle aria-hidden size={17} className="mt-0.5 shrink-0" />
            <p className="text-[11px] leading-5">{copy.warning}</p>
          </div>
          <div className="flex gap-3 border border-border p-4 text-on-surface-variant">
            <Info
              aria-hidden
              size={17}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p className="text-[10px] leading-5">
              This frontend-only confirmation does not change invitation state
              or call an API. Backend lifecycle enforcement is intentionally
              deferred.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container"
          >
            Keep Current State
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Confirm Preview
          </button>
        </div>
      </section>
    </div>
  );
}
