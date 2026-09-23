"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

import { publicConfig } from "@/lib/config";
import type { AdminInvitationDetailData } from "@/types";

export type InvitationAdminAction =
  | "publish"
  | "unpublish"
  | "change_slug"
  | "change_template"
  | "extend"
  | "cancel";

const labels: Record<InvitationAdminAction, string> = {
  publish: "Publish Invitation",
  unpublish: "Unpublish Invitation",
  change_slug: "Change Public Slug",
  change_template: "Change Template",
  extend: "Extend Duration",
  cancel: "Cancel Invitation",
};

const descriptions: Record<InvitationAdminAction, string> = {
  publish:
    "Publishing makes this finalized invitation public. First publish starts the expiration timer; republishing never resets it.",
  unpublish:
    "Public access will stop, but the active expiration timer continues and invitation data remains intact.",
  change_slug:
    "This privileged override changes the public URL. Production must preserve redirects and record an audit reason.",
  change_template:
    "This privileged override may alter available sections and presentation. Existing content remains subject to template compatibility checks.",
  extend:
    "An extension adds time to the current expiration. It never silently restarts or replaces the active duration.",
  cancel:
    "Cancellation stops this suite’s lifecycle. Consumed quota is not automatically returned and content remains preserved.",
};

export function InvitationPrivilegedDialog({
  action,
  data,
  templateOptions,
  reservedSlugs = [],
  onClose,
  onConfirm,
}: {
  action: InvitationAdminAction;
  data: AdminInvitationDetailData;
  templateOptions?: string[];
  reservedSlugs?: string[];
  onClose: () => void;
  onConfirm: (message: string) => void;
}) {
  const [reason, setReason] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [targetTemplate, setTargetTemplate] = useState("");
  const [extensionDays, setExtensionDays] = useState("30");
  const [referenceNow] = useState(() => new Date());
  const requiresReason = [
    "change_slug",
    "change_template",
    "extend",
    "cancel",
  ].includes(action);
  const slugUnavailable = reservedSlugs.includes(newSlug);
  const hasActionValue =
    action === "change_slug"
      ? newSlug.trim().length >= 3 && !slugUnavailable
      : action === "change_template"
        ? targetTemplate !== ""
        : action === "extend"
          ? Number(extensionDays) > 0
          : true;
  const canConfirm =
    (!requiresReason || reason.trim().length >= 8) && hasActionValue;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const currentExpiry = data.invitation.expiresAt
    ? new Date(data.invitation.expiresAt)
    : null;
  const extensionBase = currentExpiry
    ? new Date(Math.max(referenceNow.getTime(), currentExpiry.getTime()))
    : null;
  const proposedExpiry = extensionBase
    ? new Date(
        extensionBase.getTime() + Number(extensionDays || 0) * 86_400_000,
      )
    : null;

  function submit() {
    if (!canConfirm) return;
    onConfirm(`${labels[action]} acknowledged; no mock data was changed.`);
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/45 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="invitation-admin-action-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
              <AlertTriangle aria-hidden size={14} /> Privileged Admin Action
            </p>
            <h2
              id="invitation-admin-action-title"
              className="mt-2 font-serif text-[27px]"
            >
              {labels[action]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privileged action"
            className="grid size-9 place-items-center bg-surface-low text-on-surface-variant"
          >
            <X aria-hidden size={16} />
          </button>
        </div>

        <div className="mt-5 bg-surface-low p-4">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Invitation
          </p>
          <p className="mt-1 text-[13px] font-semibold">
            {data.invitation.coupleLabel}
          </p>
          <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
            {descriptions[action]}
          </p>
        </div>

        {action === "change_slug" ? (
          <div className="mt-5 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                Current Slug
                <input
                  readOnly
                  value={data.invitation.slug}
                  className="mt-2 h-11 w-full bg-surface-low px-3 font-mono text-[11px] text-on-surface-variant"
                />
              </label>
              <label className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                New Slug
                <input
                  value={newSlug}
                  onChange={(event) =>
                    setNewSlug(
                      event.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  placeholder="new-public-slug"
                  className="mt-2 h-11 w-full border border-border bg-white px-3 font-mono text-[11px] outline-none focus:border-secondary"
                />
                {slugUnavailable ? (
                  <span className="mt-1 block tracking-normal text-red-700 normal-case">
                    This address is already active or permanently reserved.
                  </span>
                ) : null}
              </label>
            </div>
            <div className="bg-surface-low p-3 text-[10px] leading-5 text-on-surface-variant">
              Resulting URL:{" "}
              <strong className="font-mono text-on-surface">
                {publicConfig.appUrl}/{newSlug || "new-public-slug"}
              </strong>
              <span className="mt-1 block">
                The previous address remains permanently reserved. Redirect and
                tombstone persistence will be handled by the backend.
              </span>
            </div>
          </div>
        ) : null}

        {action === "change_template" ? (
          <div className="mt-5 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                Current Template
                <input
                  readOnly
                  value={data.invitation.templateName}
                  className="mt-2 h-11 w-full bg-surface-low px-3 text-[11px] text-on-surface-variant"
                />
              </label>
              <label className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                New Template
                <select
                  value={targetTemplate}
                  onChange={(event) => setTargetTemplate(event.target.value)}
                  className="mt-2 h-11 w-full border border-border bg-white px-3 text-[11px] outline-none focus:border-secondary"
                >
                  <option value="">Select a compatible template</option>
                  {(
                    templateOptions ?? [
                      "Botanique",
                      "Château de Chantilly",
                      "Kyoto Whisper",
                      "Minimalist Modern",
                      "Velvet",
                    ]
                  )
                    .filter((item) => item !== data.invitation.templateName)
                    .map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                </select>
              </label>
            </div>
            <p className="border-l-2 border-secondary bg-accent/35 px-3 py-2 text-[10px] leading-5 text-accent-foreground">
              Unsupported content must be retained as orphaned content until a
              compatibility review is completed. This preview does not run a
              template migration or discard content.
            </p>
          </div>
        ) : null}

        {action === "extend" ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              Extension
              <select
                value={extensionDays}
                onChange={(event) => setExtensionDays(event.target.value)}
                className="mt-2 h-11 w-full border border-border bg-white px-3 text-[11px]"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </label>
            <div className="bg-surface-low p-3 text-[10px] text-on-surface-variant">
              <p>
                Current:{" "}
                {currentExpiry?.toLocaleDateString("en-GB") ?? "Not started"}
              </p>
              <p className="mt-1 font-semibold text-on-surface">
                Result:{" "}
                {proposedExpiry?.toLocaleDateString("en-GB") ??
                  "Starts after first publish"}
              </p>
            </div>
          </div>
        ) : null}

        {requiresReason ? (
          <label className="mt-5 block text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Audit Reason
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={3}
              placeholder="Explain why this override is required…"
              className="mt-2 w-full resize-none border border-border bg-white p-3 text-[11px] leading-5 normal-case outline-none focus:border-secondary"
            />
            <span className="mt-1 block tracking-normal normal-case">
              Minimum 8 characters. This will be recorded by the backend when
              implemented.
            </span>
          </label>
        ) : null}

        <p className="mt-5 border-l-2 border-secondary bg-accent/45 px-4 py-3 text-[10px] leading-5 text-accent-foreground">
          Frontend confirmation only: no API is called and lifecycle data will
          not be mutated.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.1em] uppercase"
          >
            Keep Current State
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={submit}
            className={`min-h-11 px-5 text-[10px] font-semibold tracking-[0.1em] uppercase disabled:cursor-not-allowed disabled:opacity-40 ${action === "cancel" ? "bg-red-700 text-white" : "bg-primary text-primary-foreground"}`}
          >
            Confirm Preview
          </button>
        </div>
      </section>
    </div>
  );
}
