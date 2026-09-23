"use client";

import { AlertTriangle, Eye, PenLine, X } from "lucide-react";
import { useEffect, useState } from "react";

import { InvitationPrivilegedDialog } from "@/components/admin/invitation-detail/invitation-privileged-dialog";
import type { InvitationAdminAction } from "@/components/admin/invitation-detail/invitation-privileged-dialog";
import { BuilderFormPanel } from "@/components/customer/invitation-builder/builder-form-panel";
import { BuilderSaveBar } from "@/components/customer/invitation-builder/builder-save-bar";
import { BuilderSectionNavigation } from "@/components/customer/invitation-builder/builder-section-navigation";
import { InvitationPreview } from "@/components/customer/invitation-builder/invitation-preview";
import { cn } from "@/lib/utils";
import type {
  AdminInvitationEditorData,
  InvitationBuilderContent,
  InvitationBuilderSection,
  InvitationStatus,
} from "@/types";

import {
  AdminEditorHeader,
  type AdminEditorLifecycleAction,
} from "./admin-editor-header";
import { AdminEditorLifecycleDialog } from "./admin-editor-lifecycle-dialog";

type MobileMode = "edit" | "preview";

function cloneContent(value: InvitationBuilderContent) {
  return JSON.parse(JSON.stringify(value)) as InvitationBuilderContent;
}

function cloneSections(value: InvitationBuilderSection[]) {
  return value.map((section) => ({ ...section }));
}

export function AdminInvitationEditor({
  initialData,
}: {
  initialData: AdminInvitationEditorData;
}) {
  const [content, setContent] = useState(() =>
    cloneContent(initialData.content),
  );
  const [sections, setSections] = useState(() =>
    cloneSections(initialData.sections),
  );
  const [savedContent, setSavedContent] = useState(() =>
    cloneContent(initialData.content),
  );
  const [savedSections, setSavedSections] = useState(() =>
    cloneSections(initialData.sections),
  );
  const [activeSectionId, setActiveSectionId] = useState(
    initialData.sections[0]?.id ?? "",
  );
  const [status, setStatus] = useState<InvitationStatus>(
    initialData.invitation.status,
  );
  const [isDirty, setIsDirty] = useState(false);
  const [savedLabel, setSavedLabel] = useState("Saved");
  const [notice, setNotice] = useState<string | null>(null);
  const [mobileMode, setMobileMode] = useState<MobileMode>("edit");
  const [lifecycleAction, setLifecycleAction] =
    useState<AdminEditorLifecycleAction | null>(null);
  const [privilegedAction, setPrivilegedAction] =
    useState<InvitationAdminAction | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );

  const activeSection =
    sections.find((section) => section.id === activeSectionId) ?? sections[0];
  const activeIndex = Math.max(
    sections.findIndex((section) => section.id === activeSection?.id),
    0,
  );

  function saveChanges() {
    setSavedContent(cloneContent(content));
    setSavedSections(cloneSections(sections));
    setIsDirty(false);
    setSavedLabel("Saved just now");
    setNotice(
      "Content changes saved in this frontend preview. A version snapshot will be created by the persistence service when connected.",
    );
  }

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty) return;
      event.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (isDirty) saveChanges();
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  });

  if (!activeSection) return null;

  function updateContent(nextContent: InvitationBuilderContent) {
    setContent(nextContent);
    setIsDirty(true);
    setSavedLabel("Unsaved");
    setNotice(null);
  }

  function updateVisibility(visible: boolean) {
    setSections((current) =>
      current.map((section) =>
        section.id === activeSection.id ? { ...section, visible } : section,
      ),
    );
    setIsDirty(true);
    setSavedLabel("Unsaved");
    setNotice(null);
  }

  function resetChanges() {
    setContent(cloneContent(savedContent));
    setSections(cloneSections(savedSections));
    setIsDirty(false);
    setSavedLabel("Saved");
    setNotice("Unsaved local edits were discarded.");
  }

  function showPreview() {
    setMobileMode("preview");
    document
      .getElementById("admin-invitation-preview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function requestNavigation(href: string) {
    if (isDirty) {
      setPendingNavigation(href);
      return;
    }
    window.location.assign(href);
  }

  function confirmLifecycle() {
    if (!lifecycleAction) return;
    if (isDirty) saveChanges();

    if (lifecycleAction === "finalize") {
      setStatus("finalized");
      setNotice(
        "Finalize confirmed in the frontend preview. One quota would be consumed by the backend; Publish remains separate.",
      );
    }
    if (lifecycleAction === "publish") {
      setStatus("published");
      setNotice(
        "Publish confirmed in the frontend preview. First Publish would start the active duration.",
      );
    }
    if (lifecycleAction === "unpublish") {
      setStatus("finalized");
      setNotice(
        "Unpublish confirmed in the frontend preview. Quota is not returned and expiration is not paused.",
      );
    }
    setLifecycleAction(null);
  }

  return (
    <div className="admin-invitation-editor -mx-4 -my-8 min-w-0 sm:-mx-6 lg:-mx-8">
      <AdminEditorHeader
        data={initialData.detail}
        status={status}
        isDirty={isDirty}
        savedLabel={savedLabel}
        onNavigate={requestNavigation}
        onSave={saveChanges}
        onPreview={showPreview}
        onLifecycle={setLifecycleAction}
        onPrivileged={setPrivilegedAction}
      />

      {notice ? (
        <div
          role="status"
          className="mx-4 mb-5 flex items-start justify-between gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[10px] leading-5 text-emerald-950 sm:mx-6 lg:mx-8"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="grid size-7 shrink-0 place-items-center"
          >
            <X aria-hidden size={14} />
          </button>
        </div>
      ) : null}

      {(status === "expired" || status === "cancelled") && (
        <div className="mx-4 mb-5 flex items-start gap-3 border border-accent bg-accent/30 p-4 text-[11px] leading-5 text-accent-foreground sm:mx-6 lg:mx-8">
          <AlertTriangle aria-hidden size={17} className="mt-0.5 shrink-0" />
          {status === "expired"
            ? "This invitation is expired and its public page is inactive. Content editing and explicit saves remain available; use the protected Extend action to add active duration."
            : "This invitation is cancelled. Saved content remains available for operational reference, but the normal Publish flow is intentionally unavailable."}
        </div>
      )}

      <div className="mx-4 mb-5 grid grid-cols-2 bg-surface-container p-1 sm:mx-6 lg:hidden">
        {(["edit", "preview"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setMobileMode(mode)}
            aria-pressed={mobileMode === mode}
            className={cn(
              "inline-flex min-h-10 items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase",
              mobileMode === mode
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-on-surface-variant",
            )}
          >
            {mode === "edit" ? (
              <PenLine aria-hidden size={14} />
            ) : (
              <Eye aria-hidden size={14} />
            )}
            {mode}
          </button>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-7 px-4 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div
          className={cn(
            "min-w-0 flex-col gap-5 lg:col-span-7 lg:flex",
            mobileMode === "preview" ? "hidden" : "flex",
          )}
        >
          <BuilderSectionNavigation
            sections={sections}
            activeId={activeSection.id}
            onSelect={setActiveSectionId}
          />
          <BuilderFormPanel
            section={activeSection}
            sectionNumber={activeIndex + 1}
            content={content}
            onContentChange={updateContent}
            onVisibilityChange={updateVisibility}
          />
          <BuilderSaveBar
            isDirty={isDirty}
            onReset={resetChanges}
            onSave={saveChanges}
          />
        </div>

        <div
          id="admin-invitation-preview"
          className={cn(
            "min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:col-span-5 lg:block",
            mobileMode === "edit" ? "hidden" : "block",
          )}
        >
          <InvitationPreview
            invitation={{ ...initialData.invitation, status }}
            sections={sections}
            content={content}
            activeSectionLabel={activeSection.label}
            previewStatusLabel={isDirty ? "Local changes" : status}
            previewNote="Admin preview updates instantly from local editor state. Protected property changes remain confirmation-only until backend persistence is connected."
          />
        </div>
      </div>

      {lifecycleAction ? (
        <AdminEditorLifecycleDialog
          action={lifecycleAction}
          data={initialData.detail}
          onClose={() => setLifecycleAction(null)}
          onConfirm={confirmLifecycle}
        />
      ) : null}

      {privilegedAction ? (
        <InvitationPrivilegedDialog
          action={privilegedAction}
          data={initialData.detail}
          templateOptions={initialData.templates.map(
            (template) => template.name,
          )}
          reservedSlugs={initialData.reservedSlugs}
          onClose={() => setPrivilegedAction(null)}
          onConfirm={(message) => {
            setNotice(message);
            setPrivilegedAction(null);
          }}
        />
      ) : null}

      {pendingNavigation ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discard-admin-editor-title"
          className="fixed inset-0 z-[95] grid place-items-center bg-black/55 p-4"
        >
          <section className="w-full max-w-md border border-border bg-surface-lowest p-6 shadow-2xl">
            <p className="text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
              Unsaved changes
            </p>
            <h2
              id="discard-admin-editor-title"
              className="mt-2 font-serif text-[26px]"
            >
              Leave the Editor?
            </h2>
            <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
              Your local content edits have not been saved. Leaving now will
              discard them.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingNavigation(null)}
                className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.1em] uppercase"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={() => window.location.assign(pendingNavigation)}
                className="min-h-11 bg-red-700 px-5 text-[10px] font-semibold tracking-[0.1em] text-white uppercase"
              >
                Discard &amp; Leave
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
