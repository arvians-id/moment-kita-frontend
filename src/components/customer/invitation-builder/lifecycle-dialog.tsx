import { AlertCircle, CheckCircle2, Lock, Rocket, X } from "lucide-react";
import Link from "next/link";

import type { LifecycleDialogKind } from "@/components/customer/invitation-builder/builder-header";
import type { CustomerInvitation, EntitlementSummary } from "@/types";

export function LifecycleDialog({
  kind,
  invitation,
  entitlement,
  onClose,
  onConfirm,
}: {
  kind: LifecycleDialogKind;
  invitation: CustomerInvitation;
  entitlement: EntitlementSummary;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const canFinalize = entitlement.quotaRemaining > 0;
  const presentation = {
    finalize: {
      kicker: "Finalize invitation",
      title: "Commit 1 Invitation Quota",
      description:
        "Finalizing reserves one invitation quota and locks the selected template and public address. Invitation content remains editable.",
      confirm: "Confirm & Finalize",
      Icon: Lock,
    },
    publish: {
      kicker: "Publish invitation",
      title: "Start the Active Invitation Period",
      description:
        "Publishing makes the invitation publicly accessible. The first Publish starts this invitation’s active hosting duration.",
      confirm: "Confirm & Publish",
      Icon: Rocket,
    },
    unpublish: {
      kicker: "Unpublish invitation",
      title: "Pause Public Guest Access",
      description:
        "Guests will no longer be able to open the public invitation. Your content and responses remain preserved.",
      confirm: "Confirm Unpublish",
      Icon: AlertCircle,
    },
  }[kind];
  const Icon = presentation.Icon;
  const blocked = kind === "finalize" && !canFinalize;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lifecycle-dialog-title"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/60 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-[14px] bg-surface-lowest p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-low hover:text-on-surface"
        >
          <X aria-hidden size={18} />
        </button>

        <div className="flex items-start gap-3 pr-8">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-secondary">
            <Icon aria-hidden size={21} />
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              {presentation.kicker}
            </p>
            <h2
              id="lifecycle-dialog-title"
              className="mt-1 font-serif text-[24px] leading-8 font-semibold"
            >
              {presentation.title}
            </h2>
          </div>
        </div>

        <p className="mt-5 text-[13px] leading-6 text-on-surface-variant">
          {presentation.description}
        </p>

        {kind === "finalize" ? (
          <div className="mt-5 space-y-3">
            <div className="rounded-[8px] bg-surface-low p-4">
              <p className="text-[11px] font-semibold">What gets locked</p>
              <ul className="mt-2 space-y-1 text-[11px] leading-5 text-on-surface-variant">
                <li>Template: {invitation.templateName}</li>
                <li>Public address: /{invitation.slug}</li>
              </ul>
            </div>
            <div className="flex items-start gap-2 rounded-[8px] bg-accent/35 p-4 text-[11px] leading-5 text-accent-foreground">
              {canFinalize ? (
                <CheckCircle2
                  aria-hidden
                  size={17}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <AlertCircle
                  aria-hidden
                  size={17}
                  className="mt-0.5 shrink-0"
                />
              )}
              <span>
                {canFinalize
                  ? entitlement.quotaRemaining +
                    " quota available. Finalizing uses exactly 1."
                  : "No invitation quota is currently available. Your draft remains safe and editable; choose a package before Finalizing."}
              </span>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-[6px] bg-surface-container px-5 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            Return to Studio
          </button>
          {blocked ? (
            <Link
              href="/pricing"
              className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-5 py-2 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
            >
              View Packages
            </Link>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              className="min-h-11 rounded-[6px] bg-secondary px-5 py-2 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {presentation.confirm}
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-[9px] leading-4 text-on-surface-variant">
          Frontend lifecycle preview only. Backend persistence is not connected.
        </p>
      </div>
    </div>
  );
}
