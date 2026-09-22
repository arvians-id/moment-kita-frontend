"use client";

import { AlertTriangle, Eye, PenLine } from "lucide-react";
import { useEffect, useState } from "react";

import { BuilderFormPanel } from "@/components/customer/invitation-builder/builder-form-panel";
import {
  BuilderHeader,
  type LifecycleDialogKind,
} from "@/components/customer/invitation-builder/builder-header";
import { BuilderSaveBar } from "@/components/customer/invitation-builder/builder-save-bar";
import { BuilderSectionNavigation } from "@/components/customer/invitation-builder/builder-section-navigation";
import { InvitationPreview } from "@/components/customer/invitation-builder/invitation-preview";
import { LifecycleDialog } from "@/components/customer/invitation-builder/lifecycle-dialog";
import { cn } from "@/lib/utils";
import type {
  InvitationBuilderContent,
  InvitationBuilderData,
  InvitationBuilderSection,
  InvitationStatus,
} from "@/types";

type MobileMode = "edit" | "preview";

function cloneContent(
  value: InvitationBuilderContent,
): InvitationBuilderContent {
  return JSON.parse(JSON.stringify(value)) as InvitationBuilderContent;
}

function cloneSections(
  value: InvitationBuilderSection[],
): InvitationBuilderSection[] {
  return value.map((section) => ({ ...section }));
}

export function InvitationBuilder({
  initialData,
}: {
  initialData: InvitationBuilderData;
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
  const [mobileMode, setMobileMode] = useState<MobileMode>("edit");
  const [dialog, setDialog] = useState<LifecycleDialogKind | null>(null);

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
  }

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

  useEffect(() => {
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setDialog(null);
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [dialog]);

  if (!activeSection) return null;

  function updateContent(nextContent: InvitationBuilderContent) {
    setContent(nextContent);
    setIsDirty(true);
    setSavedLabel("Unsaved");
  }

  function updateVisibility(visible: boolean) {
    setSections((current) =>
      current.map((section) =>
        section.id === activeSection.id ? { ...section, visible } : section,
      ),
    );
    setIsDirty(true);
    setSavedLabel("Unsaved");
  }

  function resetChanges() {
    setContent(cloneContent(savedContent));
    setSections(cloneSections(savedSections));
    setIsDirty(false);
    setSavedLabel("Saved");
  }

  function showPreview() {
    setMobileMode("preview");
    document
      .getElementById("invitation-builder-preview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function confirmLifecycle() {
    if (!dialog) return;
    if (isDirty) saveChanges();
    if (dialog === "finalize") setStatus("finalized");
    if (dialog === "publish") setStatus("published");
    if (dialog === "unpublish") setStatus("finalized");
    setDialog(null);
    setSavedLabel("Lifecycle preview updated");
  }

  return (
    <div className="-mx-4 -my-8 sm:-mx-6 lg:-mx-8">
      <BuilderHeader
        invitation={initialData.invitation}
        status={status}
        isDirty={isDirty}
        savedLabel={savedLabel}
        onSave={saveChanges}
        onPreview={showPreview}
        onLifecycle={setDialog}
      />

      {(status === "expired" || status === "cancelled") && (
        <div className="mx-4 mb-5 flex items-start gap-3 rounded-[8px] border border-accent bg-accent/30 p-4 text-[11px] leading-5 text-accent-foreground sm:mx-6 lg:mx-8">
          <AlertTriangle aria-hidden size={17} className="mt-0.5 shrink-0" />
          {status === "expired"
            ? "This invitation’s public hosting is inactive. Editing and explicit saves remain available, but guests cannot access the public invitation."
            : "This invitation is cancelled and inactive. Its saved studio content remains accessible for reference."}
        </div>
      )}

      <div className="mx-4 mb-5 grid grid-cols-2 rounded-[8px] bg-surface-container p-1 sm:mx-6 lg:hidden">
        {(["edit", "preview"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setMobileMode(mode)}
            aria-pressed={mobileMode === mode}
            className={cn(
              "inline-flex min-h-10 items-center justify-center gap-2 rounded-[6px] text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors",
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
            "flex flex-col gap-5 lg:col-span-7 lg:flex",
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
          id="invitation-builder-preview"
          className={cn(
            "scroll-mt-24 lg:sticky lg:top-24 lg:col-span-5 lg:block",
            mobileMode === "edit" ? "hidden" : "block",
          )}
        >
          <InvitationPreview
            invitation={initialData.invitation}
            sections={sections}
            content={content}
            activeSectionLabel={activeSection.label}
          />
        </div>
      </div>

      {dialog ? (
        <LifecycleDialog
          kind={dialog}
          invitation={initialData.invitation}
          entitlement={initialData.entitlement}
          onClose={() => setDialog(null)}
          onConfirm={confirmLifecycle}
        />
      ) : null}
    </div>
  );
}
