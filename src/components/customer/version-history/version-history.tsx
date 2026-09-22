"use client";

import {
  Archive,
  CheckCircle2,
  Clock3,
  Eye,
  History,
  LockKeyhole,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { InvitationVersion, VersionHistoryData } from "@/types";

import { VersionCard } from "./version-card";
import { RestoreVersionDialog, VersionPreviewDialog } from "./version-dialogs";
import { createRestoredVersion, formatVersionDate } from "./version-utils";

const HISTORY_LIMIT = 10;

export function VersionHistoryPage({
  initialData,
}: {
  initialData: VersionHistoryData;
}) {
  const [versions, setVersions] = useState<InvitationVersion[]>(() =>
    initialData.versions.map((version) => ({
      ...version,
      sections: version.sections.map((section) => ({ ...section })),
    })),
  );
  const [previewVersion, setPreviewVersion] =
    useState<InvitationVersion | null>(null);
  const [restoreVersion, setRestoreVersion] =
    useState<InvitationVersion | null>(null);
  const [restoredVersion, setRestoredVersion] =
    useState<InvitationVersion | null>(null);

  const visibleVersions = useMemo(
    () =>
      [...versions]
        .sort((a, b) => b.versionNumber - a.versionNumber)
        .slice(0, HISTORY_LIMIT),
    [versions],
  );
  const currentVersion =
    versions.find((version) => version.isCurrent) ?? visibleVersions[0];
  const historicalCount = Math.max(visibleVersions.length - 1, 0);

  if (!currentVersion) return null;

  function requestRestore(version: InvitationVersion) {
    setPreviewVersion(null);
    setRestoreVersion(version);
  }

  function confirmRestore() {
    if (!restoreVersion) return;
    const nextVersionNumber =
      Math.max(...versions.map((version) => version.versionNumber)) + 1;
    const restored = createRestoredVersion(restoreVersion, nextVersionNumber);

    setVersions((current) => [
      restored,
      ...current.map((version) => ({ ...version, isCurrent: false })),
    ]);
    setRestoredVersion(restored);
    setRestoreVersion(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="-mx-4 -my-8 overflow-x-clip sm:-mx-6 lg:-mx-8">
      <header className="border-b border-border bg-surface-low">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
            <Link
              href="/app/invitations"
              className="transition-colors hover:text-on-surface"
            >
              My Invitations
            </Link>
            <span aria-hidden>/</span>
            <span className="max-w-[16rem] truncate font-serif text-[17px] font-normal tracking-normal text-on-surface normal-case">
              {initialData.invitation.coupleLabel} ·{" "}
              {initialData.invitation.templateName}
            </span>
            <span aria-hidden>/</span>
            <span className="text-secondary">Version History</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-lowest px-3 text-[9px] font-semibold tracking-[0.1em] uppercase shadow-sm">
              <Archive aria-hidden size={14} className="text-secondary" />
              {visibleVersions.length} of {HISTORY_LIMIT} Versions
            </span>
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-container px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              <ShieldCheck aria-hidden size={14} />
              Content-Only Restore
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Saved Invitation Content
            </p>
            <h1 className="mt-2 font-serif text-[38px] leading-[1.02] tracking-[-0.025em] sm:text-[48px] lg:text-[56px]">
              Version History
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-on-surface-variant sm:text-[16px]">
              Review recent saved versions and safely restore earlier invitation
              content. Every restore becomes a new version, so your history
              stays intact.
            </p>
          </div>
          <div className="flex items-start gap-3 border border-border bg-surface-lowest px-4 py-3 shadow-sm">
            <Clock3
              aria-hidden
              size={18}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <div>
              <p className="text-[9px] font-semibold tracking-[0.11em] uppercase">
                Explicit Saves Only
              </p>
              <p className="mt-1 text-[10px] leading-4 text-on-surface-variant">
                The 10 most recent changed saves remain restorable.
              </p>
            </div>
          </div>
        </section>

        {restoredVersion ? (
          <section
            role="status"
            className="mt-7 flex flex-col justify-between gap-4 border border-secondary/30 bg-secondary/5 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <CheckCircle2 aria-hidden size={19} />
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.13em] text-secondary uppercase">
                  Restore Complete
                </p>
                <h2 className="mt-1 font-serif text-[23px]">
                  Restored from Version {restoredVersion.restoredFromVersion}
                </h2>
                <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                  Version {restoredVersion.versionNumber} is now current. Your
                  earlier history remains preserved.
                </p>
              </div>
            </div>
            <Link
              href={`/app/invitations/${initialData.invitation.id}/edit`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase"
            >
              <PenLine aria-hidden size={15} />
              Open Invitation Editor
            </Link>
          </section>
        ) : null}

        <div className="mt-8 grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_330px]">
          <div className="min-w-0">
            <CurrentVersionCard
              version={currentVersion}
              invitation={initialData.invitation}
              onPreview={() => setPreviewVersion(currentVersion)}
            />

            <section
              aria-labelledby="version-timeline-heading"
              className="mt-8"
            >
              <div className="flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
                    Recent Saved Versions
                  </p>
                  <h2
                    id="version-timeline-heading"
                    className="mt-1 font-serif text-[29px]"
                  >
                    Invitation Timeline
                  </h2>
                </div>
                <p className="text-[10px] text-on-surface-variant">
                  Newest first · Up to {HISTORY_LIMIT} versions
                </p>
              </div>

              <div className="relative mt-5 space-y-3 sm:pl-3">
                <span
                  aria-hidden
                  className="absolute top-5 bottom-5 left-[30px] hidden w-px bg-surface-highest sm:block"
                />
                {visibleVersions.map((version) => (
                  <VersionCard
                    key={`${version.versionNumber}-${version.savedAt}`}
                    version={version}
                    onPreview={() => setPreviewVersion(version)}
                    onRestore={() => requestRestore(version)}
                  />
                ))}
              </div>

              {historicalCount === 0 ? (
                <div className="mt-4 border border-dashed border-border bg-surface-low p-6 text-center">
                  <h3 className="font-serif text-[22px]">
                    This is your first saved version
                  </h3>
                  <p className="mx-auto mt-2 max-w-lg text-[11px] leading-5 text-on-surface-variant">
                    Historical versions will appear after you make content
                    changes and successfully choose Save Changes in the
                    Invitation Editor.
                  </p>
                  <Link
                    href={`/app/invitations/${initialData.invitation.id}/edit`}
                    className="mt-4 inline-flex min-h-10 items-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.11em] text-primary-foreground uppercase"
                  >
                    <PenLine aria-hidden size={14} />
                    Open Invitation Editor
                  </Link>
                </div>
              ) : null}
            </section>
          </div>

          <ReassurancePanel status={initialData.invitation.status} />
        </div>
      </div>

      {previewVersion ? (
        <VersionPreviewDialog
          invitation={initialData.invitation}
          version={previewVersion}
          onClose={() => setPreviewVersion(null)}
          onRestore={() => requestRestore(previewVersion)}
        />
      ) : null}
      {restoreVersion ? (
        <RestoreVersionDialog
          version={restoreVersion}
          currentVersionNumber={currentVersion.versionNumber}
          invitationStatus={initialData.invitation.status}
          templateName={initialData.invitation.templateName}
          slug={initialData.invitation.slug}
          onClose={() => setRestoreVersion(null)}
          onConfirm={confirmRestore}
        />
      ) : null}
    </div>
  );
}

function CurrentVersionCard({
  version,
  invitation,
  onPreview,
}: {
  version: InvitationVersion;
  invitation: VersionHistoryData["invitation"];
  onPreview: () => void;
}) {
  return (
    <section
      aria-labelledby="current-version-heading"
      className="relative overflow-hidden border border-border bg-surface-lowest p-5 shadow-md sm:p-7"
    >
      <span
        aria-hidden
        className="absolute -top-14 -right-14 size-52 rounded-full bg-secondary/8"
      />
      <div className="relative">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="size-2.5 rounded-full bg-secondary" />
            <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
              Current Version
            </p>
            <InvitationStatusBadge status={invitation.status} />
          </div>
          <time
            dateTime={version.savedAt}
            className="inline-flex items-center gap-1.5 text-[10px] text-on-surface-variant"
          >
            <Clock3 aria-hidden size={13} />
            Saved {formatVersionDate(version.savedAt)}
          </time>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="current-version-heading"
              className="font-serif text-[34px] leading-10"
            >
              Version {version.versionNumber}
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-on-surface-variant">
              {version.summary}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:flex">
            <button
              type="button"
              onClick={onPreview}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.11em] text-primary-foreground uppercase"
            >
              <Eye aria-hidden size={15} />
              Preview Current
            </button>
            <Link
              href={`/app/invitations/${invitation.id}/edit`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.11em] uppercase"
            >
              <PenLine aria-hidden size={15} />
              Edit Invitation
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <InfoTile
            icon={History}
            label="Saved Version"
            value={`Version ${version.versionNumber}`}
          />
          <InfoTile
            icon={LockKeyhole}
            label="Template"
            value={invitation.templateName}
          />
          <InfoTile
            icon={ShieldCheck}
            label="Restore Scope"
            value="Invitation content"
          />
        </div>
      </div>
    </section>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof History;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 bg-surface-low p-3">
      <Icon aria-hidden size={17} className="shrink-0 text-secondary" />
      <div className="min-w-0">
        <p className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[11px] font-medium">{value}</p>
      </div>
    </div>
  );
}

function ReassurancePanel({
  status,
}: {
  status: VersionHistoryData["invitation"]["status"];
}) {
  return (
    <aside className="space-y-4 xl:sticky xl:top-6">
      <section className="border border-border bg-surface-lowest p-5 shadow-sm">
        <span className="grid size-10 place-items-center rounded-full bg-secondary/10 text-secondary">
          <ShieldCheck aria-hidden size={19} />
        </span>
        <p className="mt-4 text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Safe Restore
        </p>
        <h2 className="mt-1 font-serif text-[25px] leading-8">
          Your history stays intact
        </h2>
        <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
          Restoring an earlier version creates a new current version. It never
          rewrites existing saves or consumes invitation quota.
        </p>
      </section>

      <section className="border border-border bg-surface-low p-5">
        <div className="flex items-center gap-2 text-secondary">
          <LockKeyhole aria-hidden size={17} />
          <h2 className="text-[9px] font-semibold tracking-[0.13em] uppercase">
            Content Only
          </h2>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
          Guest responses, wishes, gift activity, template choice, and public
          address are kept separate from version restoration.
        </p>
      </section>

      {status === "published" ? (
        <section className="border border-secondary/20 bg-secondary/5 p-5">
          <p className="text-[9px] font-semibold tracking-[0.13em] text-secondary uppercase">
            Published Invitation
          </p>
          <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
            Restoring content does not automatically unpublish this invitation.
            You will see a reminder before confirming.
          </p>
        </section>
      ) : null}
    </aside>
  );
}
