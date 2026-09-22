import { ArrowLeft, Eye, Globe2, Save, Send, Undo2 } from "lucide-react";
import Link from "next/link";

import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { CustomerInvitation, InvitationStatus } from "@/types";

export type LifecycleDialogKind = "finalize" | "publish" | "unpublish";

export function BuilderHeader({
  invitation,
  status,
  isDirty,
  savedLabel,
  onSave,
  onPreview,
  onLifecycle,
}: {
  invitation: CustomerInvitation;
  status: InvitationStatus;
  isDirty: boolean;
  savedLabel: string;
  onSave: () => void;
  onPreview: () => void;
  onLifecycle: (kind: LifecycleDialogKind) => void;
}) {
  return (
    <header className="mb-5 border-b border-surface-highest bg-surface-lowest shadow-sm">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/app/invitations"
              className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase transition-colors hover:text-on-surface"
            >
              <ArrowLeft aria-hidden size={14} />
              My Invitations
            </Link>
            <span aria-hidden className="text-on-surface-variant/40">
              /
            </span>
            <span className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
              Atelier Studio
            </span>
          </div>
          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2.5">
            <h1 className="truncate font-serif text-[24px] leading-8 font-semibold">
              {invitation.coupleLabel}
            </h1>
            <InvitationStatusBadge status={status} />
            <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              {isDirty ? "Unsaved changes" : savedLabel}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[10px] leading-4 text-on-surface-variant">
            <span>Theme: {invitation.templateName}</span>
            <span className="inline-flex items-center gap-1">
              <Globe2 aria-hidden size={12} />
              momentkita.id/{invitation.slug}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex min-h-10 items-center gap-2 rounded-[6px] bg-surface-container px-4 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            <Eye aria-hidden size={15} className="text-secondary" />
            Preview
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!isDirty}
            className="inline-flex min-h-10 items-center gap-2 rounded-[6px] bg-primary px-4 py-2 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary disabled:cursor-default disabled:opacity-45"
          >
            <Save aria-hidden size={15} />
            Save Changes
          </button>

          {status === "draft" ? (
            <button
              type="button"
              onClick={() => onLifecycle("finalize")}
              className="inline-flex min-h-10 items-center gap-2 rounded-[6px] bg-secondary px-4 py-2 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Send aria-hidden size={15} />
              Finalize
            </button>
          ) : null}

          {status === "finalized" ? (
            <button
              type="button"
              onClick={() => onLifecycle("publish")}
              className="inline-flex min-h-10 items-center gap-2 rounded-[6px] bg-secondary px-4 py-2 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Send aria-hidden size={15} />
              Publish
            </button>
          ) : null}

          {status === "published" ? (
            <>
              <Link
                href={"/" + invitation.slug}
                className="inline-flex min-h-10 items-center gap-2 rounded-[6px] bg-secondary px-4 py-2 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Eye aria-hidden size={15} />
                View Invitation
              </Link>
              <button
                type="button"
                onClick={() => onLifecycle("unpublish")}
                className="inline-flex min-h-10 items-center gap-2 rounded-[6px] border border-surface-highest px-3 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-container"
              >
                <Undo2 aria-hidden size={14} />
                Unpublish
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 bg-surface-low px-4 py-2.5 text-[10px] leading-4 text-on-surface-variant sm:flex-row sm:items-center sm:px-5">
        <span className="font-semibold tracking-[0.12em] uppercase">
          Studio canvas · Explicit save
        </span>
        <span>
          {status === "draft"
            ? "Quota is uncommitted until Finalize."
            : status === "finalized"
              ? "Content stays editable. Template and slug are locked."
              : status === "published"
                ? "Live content remains editable through explicit saves."
                : status === "expired"
                  ? "Public invitation inactive. Editing remains available."
                  : "Invitation is inactive. Saved content remains available."}
        </span>
      </div>
    </header>
  );
}
