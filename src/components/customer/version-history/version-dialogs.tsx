"use client";

import {
  AlertTriangle,
  CheckCircle2,
  LockKeyhole,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect } from "react";

import { InvitationPreview } from "@/components/customer/invitation-builder/invitation-preview";
import type {
  CustomerInvitation,
  InvitationStatus,
  InvitationVersion,
} from "@/types";

import { formatVersionDate } from "./version-utils";

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

export function VersionPreviewDialog({
  invitation,
  version,
  onClose,
  onRestore,
}: {
  invitation: CustomerInvitation;
  version: InvitationVersion;
  onClose: () => void;
  onRestore: () => void;
}) {
  useDialogEscape(onClose);

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-espresso/70 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="version-preview-title"
        className="min-h-full bg-background sm:m-4 sm:min-h-0 sm:border sm:border-border sm:shadow-2xl"
      >
        <header className="sticky top-0 z-30 flex flex-col justify-between gap-3 border-b border-border bg-surface-lowest/95 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
              {version.isCurrent
                ? "Current Invitation"
                : `Previewing Version ${version.versionNumber}`}
            </p>
            <h2
              id="version-preview-title"
              className="mt-1 font-serif text-[24px] leading-8"
            >
              {version.summary}
            </h2>
            <p className="mt-1 text-[10px] text-on-surface-variant">
              {version.isCurrent
                ? "This is your current invitation content."
                : "This is not your current invitation."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!version.isCurrent ? (
              <button
                type="button"
                onClick={onRestore}
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 bg-secondary px-4 text-[9px] font-semibold tracking-[0.1em] text-secondary-foreground uppercase sm:flex-none"
              >
                <RotateCcw aria-hidden size={14} />
                Restore Version
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close version preview"
              className="grid size-10 shrink-0 place-items-center bg-surface-container text-on-surface-variant hover:text-on-surface"
            >
              <X aria-hidden size={18} />
            </button>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-5xl place-items-center px-4 py-8 sm:px-8">
          <InvitationPreview
            invitation={invitation}
            sections={version.sections}
            content={version.content}
            activeSectionLabel={`Version ${version.versionNumber}`}
            previewStatusLabel={
              version.isCurrent ? "Current version" : "Saved version"
            }
            previewNote={`Saved ${formatVersionDate(version.savedAt)}. Preview only; no invitation content has been changed.`}
          />
        </div>
      </section>
    </div>
  );
}

export function RestoreVersionDialog({
  version,
  currentVersionNumber,
  invitationStatus,
  templateName,
  slug,
  onClose,
  onConfirm,
}: {
  version: InvitationVersion;
  currentVersionNumber: number;
  invitationStatus: InvitationStatus;
  templateName: string;
  slug: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  useDialogEscape(onClose);
  const nextVersionNumber = currentVersionNumber + 1;
  const isPublished = invitationStatus === "published";

  return (
    <div className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-espresso/60 p-4 backdrop-blur-sm">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="restore-version-title"
        aria-describedby="restore-version-description"
        className="relative w-full max-w-lg bg-surface-lowest p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close restore confirmation"
          className="absolute top-4 right-4 grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container"
        >
          <X aria-hidden size={18} />
        </button>

        <span className="grid size-11 place-items-center rounded-full bg-secondary/10 text-secondary">
          <RotateCcw aria-hidden size={20} />
        </span>
        <p className="mt-4 text-[10px] font-semibold tracking-[0.17em] text-secondary uppercase">
          Restore Saved Content
        </p>
        <h2
          id="restore-version-title"
          className="mt-1 pr-8 font-serif text-[29px] leading-9"
        >
          Restore Version {version.versionNumber}?
        </h2>
        <p
          id="restore-version-description"
          className="mt-3 text-[13px] leading-6 text-on-surface-variant"
        >
          Your current invitation content will be replaced by the content saved
          in Version {version.versionNumber}. This creates Version{" "}
          {nextVersionNumber} as the new current version.
        </p>

        {isPublished ? (
          <div className="mt-5 flex gap-3 bg-accent/35 p-4 text-[11px] leading-5 text-accent-foreground">
            <AlertTriangle aria-hidden size={18} className="mt-0.5 shrink-0" />
            <p>
              This invitation is published. Restoring updates its content but
              does not unpublish it.
            </p>
          </div>
        ) : null}

        <div className="mt-5 space-y-3 bg-surface-low p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              aria-hidden
              size={17}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p className="text-[11px] leading-5 text-on-surface-variant">
              Existing versions remain preserved. Guest responses, wishes, and
              gift activity are not changed.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <LockKeyhole
              aria-hidden
              size={17}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p className="text-[11px] leading-5 text-on-surface-variant">
              Template <strong>{templateName}</strong> and public address{" "}
              <strong>/{slug}</strong> stay locked. Restoring uses no invitation
              quota.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.11em] uppercase"
          >
            Keep Current Version
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-secondary px-5 text-[10px] font-semibold tracking-[0.11em] text-secondary-foreground uppercase"
          >
            <RotateCcw aria-hidden size={15} />
            Restore Version
          </button>
        </div>
      </section>
    </div>
  );
}
