"use client";

import {
  AlertCircle,
  CheckCircle2,
  FileLock2,
  Rocket,
  Undo2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import type { AdminInvitationDetailData } from "@/types";

import type { AdminEditorLifecycleAction } from "./admin-editor-header";

export function AdminEditorLifecycleDialog({
  action,
  data,
  onClose,
  onConfirm,
}: {
  action: AdminEditorLifecycleAction;
  data: AdminInvitationDetailData;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const canFinalize = data.customer.quotaRemaining > 0;
  const blocked = action === "finalize" && !canFinalize;
  const presentation = {
    finalize: {
      kicker: "Finalize invitation",
      title: "Commit One Invitation Quota",
      description:
        "Finalize consumes exactly 1 invitation quota. Content stays editable, while the customer’s selected template and public slug become locked. Admin overrides remain available through protected actions.",
      confirm: "Confirm & Finalize",
      Icon: FileLock2,
    },
    publish: {
      kicker: "Publish invitation",
      title: "Make the Invitation Public",
      description:
        "Publish is separate from Finalize. The first Publish starts the active duration; republishing never resets an existing expiration date.",
      confirm: "Confirm & Publish",
      Icon: Rocket,
    },
    unpublish: {
      kicker: "Unpublish invitation",
      title: "Stop Public Guest Access",
      description:
        "Unpublishing does not return consumed quota and does not pause expiration. Content and guest data remain preserved.",
      confirm: "Confirm Unpublish",
      Icon: Undo2,
    },
  }[action];
  const Icon = presentation.Icon;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[90] grid place-items-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-editor-lifecycle-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-secondary">
              <Icon aria-hidden size={20} />
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
                {presentation.kicker}
              </p>
              <h2
                id="admin-editor-lifecycle-title"
                className="mt-1 font-serif text-[26px] leading-8"
              >
                {presentation.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lifecycle confirmation"
            className="grid size-9 shrink-0 place-items-center bg-surface-low"
          >
            <X aria-hidden size={16} />
          </button>
        </div>

        <p className="mt-5 text-[12px] leading-6 text-on-surface-variant">
          {presentation.description}
        </p>

        {action === "finalize" ? (
          <div className="mt-5 space-y-3">
            <div className="grid gap-2 bg-surface-low p-4 text-[10px] leading-5 sm:grid-cols-2">
              <span>
                Template
                <strong className="block text-on-surface">
                  {data.invitation.templateName}
                </strong>
              </span>
              <span>
                Public slug
                <strong className="block font-mono text-on-surface">
                  /{data.invitation.slug}
                </strong>
              </span>
            </div>
            <div
              className={`flex items-start gap-2 p-4 text-[11px] leading-5 ${
                canFinalize
                  ? "bg-emerald-50 text-emerald-950"
                  : "bg-red-50 text-red-900"
              }`}
            >
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
                  ? `${data.customer.quotaRemaining} quota available. Finalize will consume exactly 1.`
                  : "No quota is available. The draft remains editable; adjust the customer quota before finalizing."}
              </span>
            </div>
          </div>
        ) : null}

        <p className="mt-5 border-l-2 border-secondary bg-accent/35 px-4 py-3 text-[10px] leading-5 text-accent-foreground">
          Frontend workflow preview only. Backend lifecycle and version-history
          persistence are intentionally not connected.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.1em] uppercase"
          >
            Return to Editor
          </button>
          {blocked ? (
            <Link
              href={`/admin/customers/${data.customer.id}`}
              className="inline-flex min-h-11 items-center justify-center bg-primary px-5 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
            >
              Manage Customer Quota
            </Link>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              className="min-h-11 bg-secondary px-5 text-[10px] font-semibold tracking-[0.1em] text-secondary-foreground uppercase"
            >
              {presentation.confirm}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
