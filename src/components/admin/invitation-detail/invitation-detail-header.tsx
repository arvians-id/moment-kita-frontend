"use client";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Eye,
  FilePenLine,
  Gift,
  LayoutTemplate,
  Link2,
  MoreHorizontal,
  Send,
  ShieldAlert,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { AdminInvitationDetailData } from "@/types";

import {
  adminInvitationDateFormat,
  formatMaybeDate,
} from "./invitation-detail-formatters";
import {
  InvitationPrivilegedDialog,
  type InvitationAdminAction,
} from "./invitation-privileged-dialog";

export function InvitationDetailHeader({
  data,
  publicUrl,
}: {
  data: AdminInvitationDetailData;
  publicUrl: string;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [action, setAction] = useState<InvitationAdminAction | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const invitation = data.invitation;
  const lifecycleAction =
    invitation.status === "published"
      ? "unpublish"
      : invitation.status === "finalized"
        ? "publish"
        : null;

  function chooseAction(next: InvitationAdminAction) {
    setMoreOpen(false);
    setAction(next);
  }

  return (
    <div className="space-y-4">
      {notice ? (
        <div
          role="status"
          className="flex items-center justify-between gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[10px] text-emerald-950"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="grid size-7 place-items-center"
          >
            <X aria-hidden size={14} />
          </button>
        </div>
      ) : null}

      <section className="relative border border-border bg-surface-low p-5 shadow-sm sm:p-7 lg:p-8">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-secondary via-accent to-transparent" />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <InvitationStatusBadge
                status={invitation.status}
                className="rounded-none"
              />
              <span className="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] uppercase">
                <LayoutTemplate aria-hidden size={12} />{" "}
                {invitation.templateName} v{invitation.templateVersion}
              </span>
            </div>

            <div className="mt-4">
              <AdminPageHeader
                eyebrow={`Dossier ${invitation.id}`}
                title={
                  <span className="block text-[38px] leading-[1.02] sm:text-[48px] lg:text-[56px]">
                    {invitation.coupleLabel}
                  </span>
                }
                description={`${invitation.venue} — ${adminInvitationDateFormat.format(new Date(invitation.eventDate))}`}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-[10px] text-on-surface-variant">
              <span className="inline-flex min-w-0 items-center gap-2 bg-surface-lowest px-3 py-2 shadow-sm">
                <Link2 aria-hidden size={13} className="text-secondary" />
                <span className="truncate font-mono text-on-surface">
                  {publicUrl}
                </span>
                <ExternalLink aria-hidden size={12} />
              </span>
              <Link
                href={`/admin/customers/${data.customer.id}`}
                className="inline-flex items-center gap-2 bg-surface-lowest px-3 py-2 shadow-sm transition-colors hover:text-secondary"
              >
                <UserRound aria-hidden size={13} /> Customer:{" "}
                <strong className="text-on-surface">
                  {data.customer.name}
                </strong>
                <span className="bg-accent px-1.5 py-0.5 text-[8px] font-semibold uppercase">
                  {data.customer.linkedUserId
                    ? "Registered"
                    : "Managed · No login"}
                </span>
              </Link>
              <span className="inline-flex items-center gap-2 bg-surface-lowest px-3 py-2 shadow-sm">
                <Clock3 aria-hidden size={13} className="text-secondary" />{" "}
                Expires:{" "}
                <strong className="text-on-surface">
                  {formatMaybeDate(invitation.expiresAt)}
                </strong>
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap xl:max-w-[420px] xl:justify-end">
            <a
              href="#invitation-preview"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.1em] uppercase shadow-sm"
            >
              <Eye aria-hidden size={15} /> Preview
            </a>
            <Link
              href={`/admin/invitations/${invitation.id}/edit`}
              prefetch={false}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
            >
              <FilePenLine aria-hidden size={15} /> Edit Invitation
            </Link>
            {lifecycleAction ? (
              <button
                type="button"
                onClick={() => chooseAction(lifecycleAction)}
                className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase hover:bg-accent"
              >
                <Send aria-hidden size={14} />{" "}
                {lifecycleAction === "publish" ? "Publish" : "Unpublish"}
              </button>
            ) : (
              <span
                title="Finalize, extend, or restore this invitation before publishing"
                className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase opacity-65"
              >
                <ShieldAlert aria-hidden size={14} />{" "}
                {invitation.status === "draft"
                  ? "Finalize Required"
                  : "Publishing Unavailable"}
              </span>
            )}
            <div className="relative">
              <button
                type="button"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((current) => !current)}
                className="inline-flex min-h-10 w-full items-center justify-center gap-2 bg-surface-lowest px-4 text-[9px] font-semibold tracking-[0.1em] uppercase shadow-sm"
              >
                <MoreHorizontal aria-hidden size={14} /> More Actions{" "}
                <ChevronDown aria-hidden size={13} />
              </button>
              {moreOpen ? (
                <div className="absolute right-0 z-30 mt-1 w-full min-w-56 border border-border bg-surface-lowest p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() => chooseAction("change_slug")}
                    className="block min-h-10 w-full px-3 text-left text-[10px] font-semibold hover:bg-surface-low"
                  >
                    Change Slug
                  </button>
                  <button
                    type="button"
                    onClick={() => chooseAction("change_template")}
                    className="block min-h-10 w-full px-3 text-left text-[10px] font-semibold hover:bg-surface-low"
                  >
                    Change Template
                  </button>
                  <button
                    type="button"
                    onClick={() => chooseAction("extend")}
                    className="block min-h-10 w-full px-3 text-left text-[10px] font-semibold hover:bg-surface-low"
                  >
                    <Gift aria-hidden size={13} className="mr-2 inline" />
                    Extend Duration
                  </button>
                  {invitation.status !== "cancelled" ? (
                    <button
                      type="button"
                      onClick={() => chooseAction("cancel")}
                      className="mt-1 block min-h-10 w-full border-t border-border px-3 text-left text-[10px] font-semibold text-red-700 hover:bg-red-50"
                    >
                      Cancel Invitation
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-border pt-5 text-[10px] text-on-surface-variant sm:grid-cols-2 xl:grid-cols-4">
          <span className="flex items-center gap-2">
            <CalendarDays aria-hidden size={13} /> Wedding{" "}
            <strong className="text-on-surface">
              {adminInvitationDateFormat.format(new Date(invitation.eventDate))}
            </strong>
          </span>
          <span>
            Template{" "}
            <strong className="text-on-surface">
              {invitation.templateName} v{invitation.templateVersion}
            </strong>
          </span>
          <span>
            Published{" "}
            <strong className="text-on-surface">
              {formatMaybeDate(invitation.publishedAt)}
            </strong>
          </span>
          <span>
            Quota{" "}
            <strong className="text-on-surface">
              {invitation.quotaConsumed
                ? "1 allocation consumed"
                : "Not consumed"}
            </strong>
          </span>
        </div>
      </section>

      {action ? (
        <InvitationPrivilegedDialog
          action={action}
          data={data}
          onClose={() => setAction(null)}
          onConfirm={(message) => {
            setNotice(message);
            setAction(null);
          }}
        />
      ) : null}
    </div>
  );
}
