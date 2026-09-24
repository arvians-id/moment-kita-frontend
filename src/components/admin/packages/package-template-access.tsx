import { Check } from "lucide-react";
import Image from "next/image";

import type { AdminPackageEditorTemplateOption } from "@/types";

export function PackageTemplateAccess({
  templates,
  mode,
  selectedKeys,
  onModeChange,
  onToggleTemplate,
  error,
}: {
  templates: AdminPackageEditorTemplateOption[];
  mode: "all" | "selected";
  selectedKeys: string[];
  onModeChange: (mode: "all" | "selected") => void;
  onToggleTemplate: (key: string) => void;
  error?: string;
}) {
  const selectableTemplates = templates.filter((template) => template.enabled);

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Template Access
      </p>
      <h2 className="mt-1 font-serif text-[22px]">
        Which templates can this package use?
      </h2>
      <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
        Commercial entitlement only — template implementation, capabilities,
        and manifests remain developer-controlled and are never edited here.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Template access mode">
        <button
          type="button"
          aria-pressed={mode === "all"}
          onClick={() => onModeChange("all")}
          className={`min-h-11 text-[10px] font-semibold tracking-[0.1em] uppercase ${
            mode === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          All Active Templates
        </button>
        <button
          type="button"
          aria-pressed={mode === "selected"}
          onClick={() => onModeChange("selected")}
          className={`min-h-11 text-[10px] font-semibold tracking-[0.1em] uppercase ${
            mode === "selected"
              ? "bg-primary text-primary-foreground"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          Selected Templates
        </button>
      </div>

      {mode === "selected" ? (
        <>
          <div className="mt-4 flex items-center justify-between text-[10px] text-on-surface-variant">
            <span>
              {selectedKeys.length} of {selectableTemplates.length} selected
            </span>
            {error ? <span className="font-semibold text-red-700">{error}</span> : null}
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {selectableTemplates.map((template) => {
              const selected = selectedKeys.includes(template.key);
              return (
                <button
                  key={template.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggleTemplate(template.key)}
                  className={`flex items-start gap-3 border p-3 text-left transition-colors ${
                    selected
                      ? "border-secondary bg-secondary/10"
                      : "border-border bg-surface-low hover:bg-surface-container"
                  }`}
                >
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-surface-container">
                    <Image
                      src={template.thumbnailUrl}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold">
                      {template.name}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] text-on-surface-variant uppercase tracking-[0.08em]">
                      {template.category}
                    </p>
                  </div>
                  {selected ? (
                    <Check
                      aria-hidden
                      size={16}
                      className="mt-0.5 shrink-0 text-secondary"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          {templates.length !== selectableTemplates.length ? (
            <p className="mt-3 text-[10px] text-on-surface-variant">
              {templates.length - selectableTemplates.length} disabled
              template(s) are not selectable.
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-4 bg-surface-low p-4 text-[11px] leading-5 text-on-surface-variant">
          This package grants access to every currently active template.
          Newly enabled templates are included automatically.
        </p>
      )}
    </section>
  );
}
