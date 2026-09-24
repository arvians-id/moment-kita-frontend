import {
  ArrowLeft,
  CalendarPlus,
  Eye,
  FileLock2,
  Globe2,
  LayoutTemplate,
  Save,
  Send,
  ShieldAlert,
  Undo2,
  UserRound,
} from "lucide-react";

import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { AdminInvitationDetailData, InvitationStatus } from "@/types";

import type { InvitationAdminAction } from "../invitation-detail/invitation-privileged-dialog";
import { publicConfig } from "@/lib/config";

export type AdminEditorLifecycleAction = "finalize" | "publish" | "unpublish";

export function AdminEditorHeader({
  data,
  status,
  isDirty,
  savedLabel,
  onNavigate,
  onSave,
  onPreview,
  onLifecycle,
  onPrivileged,
}: {
  data: AdminInvitationDetailData;
  status: InvitationStatus;
  isDirty: boolean;
  savedLabel: string;
  onNavigate: (href: string) => void;
  onSave: () => void;
  onPreview: () => void;
  onLifecycle: (action: AdminEditorLifecycleAction) => void;
  onPrivileged: (action: InvitationAdminAction) => void;
}) {
  const invitation = data.invitation;

  return (
    <header className="mb-5 border-b border-border bg-surface-lowest shadow-sm">
      <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[9px] font-semibold tracking-[0.14em] uppercase">
            <button
              type="button"
              onClick={() => onNavigate(`/admin/invitations/${invitation.id}`)}
              className="inline-flex min-h-8 items-center gap-1.5 text-on-surface-variant transition-colors hover:text-secondary"
            >
              <ArrowLeft aria-hidden size={14} /> Invitation Detail
            </button>
            <span aria-hidden className="text-on-surface-variant/40">
              /
            </span>
            <span className="text-secondary">Studio Editor</span>
          </div>

          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2.5">
            <h1 className="truncate font-serif text-[28px] leading-9 font-medium sm:text-[34px]">
              Editor — {invitation.coupleLabel}
            </h1>
            <InvitationStatusBadge status={status} className="rounded-none" />
            <span className="bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              {isDirty ? "Unsaved changes" : savedLabel}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-on-surface-variant">
            <button
              type="button"
              onClick={() => onNavigate(`/admin/customers/${data.customer.id}`)}
              className="inline-flex min-h-8 items-center gap-1.5 hover:text-secondary"
            >
              <UserRound aria-hidden size={13} /> {data.customer.name}
              <span className="bg-accent px-1.5 py-0.5 text-[8px] font-semibold uppercase">
                {data.customer.linkedUserId
                  ? "Registered"
                  : "Managed · No login"}
              </span>
            </button>
            <span className="inline-flex items-center gap-1.5">
              <LayoutTemplate aria-hidden size={13} />
              {invitation.templateName} v{invitation.templateVersion}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Globe2 aria-hidden size={13} /> {publicConfig.publicHost}/
              {invitation.slug}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:max-w-[520px] lg:justify-end">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex min-h-10 items-center gap-2 bg-surface-container px-4 text-[10px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-high"
          >
            <Eye aria-hidden size={15} className="text-secondary" />
            {status === "published" ? "View Invitation" : "Preview"}
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!isDirty}
            className="inline-flex min-h-10 items-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Save aria-hidden size={15} /> Save Changes
          </button>

          {status === "draft" ? (
            <button
              type="button"
              onClick={() => onLifecycle("finalize")}
              className="inline-flex min-h-10 items-center gap-2 bg-secondary px-4 text-[10px] font-semibold tracking-[0.1em] text-secondary-foreground uppercase"
            >
              <FileLock2 aria-hidden size={15} /> Finalize
            </button>
          ) : null}
          {status === "finalized" ? (
            <button
              type="button"
              onClick={() => onLifecycle("publish")}
              className="inline-flex min-h-10 items-center gap-2 bg-secondary px-4 text-[10px] font-semibold tracking-[0.1em] text-secondary-foreground uppercase"
            >
              <Send aria-hidden size={15} /> Publish
            </button>
          ) : null}
          {status === "published" ? (
            <button
              type="button"
              onClick={() => onLifecycle("unpublish")}
              className="inline-flex min-h-10 items-center gap-2 border border-border px-4 text-[10px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-container"
            >
              <Undo2 aria-hidden size={14} /> Unpublish
            </button>
          ) : null}
          {status === "expired" ? (
            <button
              type="button"
              onClick={() => onPrivileged("extend")}
              className="inline-flex min-h-10 items-center gap-2 bg-secondary px-4 text-[10px] font-semibold tracking-[0.1em] text-secondary-foreground uppercase"
            >
              <CalendarPlus aria-hidden size={15} /> Extend
            </button>
          ) : null}
          {status === "cancelled" ? (
            <span className="inline-flex min-h-10 items-center gap-2 bg-red-50 px-4 text-[10px] font-semibold tracking-[0.1em] text-red-800 uppercase">
              <ShieldAlert aria-hidden size={15} /> Publishing unavailable
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-surface-low px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
            Admin-only controls
          </p>
          <p className="mt-0.5 text-[10px] leading-4 text-on-surface-variant">
            Protected properties require confirmation and an operational reason.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onPrivileged("change_slug")}
            className="min-h-9 border border-border bg-surface-lowest px-3 text-[9px] font-semibold tracking-[0.1em] uppercase"
          >
            Change Slug
          </button>
          <button
            type="button"
            onClick={() => onPrivileged("change_template")}
            className="min-h-9 border border-border bg-surface-lowest px-3 text-[9px] font-semibold tracking-[0.1em] uppercase"
          >
            Change Template
          </button>
          <button
            type="button"
            onClick={() => onPrivileged("extend")}
            className="min-h-9 border border-border bg-surface-lowest px-3 text-[9px] font-semibold tracking-[0.1em] uppercase"
          >
            Extend Duration
          </button>
          {status !== "cancelled" ? (
            <button
              type="button"
              onClick={() => onPrivileged("cancel")}
              className="min-h-9 border border-red-200 bg-red-50 px-3 text-[9px] font-semibold tracking-[0.1em] text-red-800 uppercase"
            >
              Cancel Invitation
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
