import { RotateCcw, Save } from "lucide-react";

export function BuilderSaveBar({
  isDirty,
  onReset,
  onSave,
}: {
  isDirty: boolean;
  onReset: () => void;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-20 flex flex-col justify-between gap-3 rounded-[10px] bg-primary p-4 text-primary-foreground shadow-xl sm:flex-row sm:items-center">
      <span className="flex items-center gap-2 text-[11px] leading-5">
        <span
          aria-hidden
          className={
            "size-2 rounded-full " +
            (isDirty ? "bg-terracotta-soft" : "bg-emerald-400")
          }
        />
        {isDirty
          ? "Unsaved changes detected in the studio"
          : "All local changes explicitly saved"}
      </span>
      <span className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={!isDirty}
          className="inline-flex min-h-9 items-center gap-1.5 px-3 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:text-terracotta-soft disabled:opacity-40"
        >
          <RotateCcw aria-hidden size={14} />
          Reset
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={!isDirty}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-[6px] bg-secondary px-4 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-45"
        >
          <Save aria-hidden size={14} />
          Save Changes
        </button>
      </span>
    </div>
  );
}
