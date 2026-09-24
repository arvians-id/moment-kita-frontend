import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";

export function PackageEditorHeader({
  mode,
  packageName,
  isDirty,
  saving,
  onSave,
  onCancel,
}: {
  mode: "create" | "edit";
  packageName: string;
  isDirty: boolean;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <AdminPageHeader
      eyebrow="Commerce · Packages & Quota"
      title={
        mode === "create" ? (
          "Create Package"
        ) : (
          <>
            Edit Package
            <span className="ml-2 italic">{packageName || "Untitled"}</span>
          </>
        )
      }
      description="Commercial configuration only — template implementation, invitation content, and customer entitlement state are managed elsewhere."
      actions={
        <>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || (mode === "edit" && !isDirty)}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Save Package"
                : isDirty
                  ? "Save Changes"
                  : "Saved"}
          </button>
        </>
      }
    />
  );
}
