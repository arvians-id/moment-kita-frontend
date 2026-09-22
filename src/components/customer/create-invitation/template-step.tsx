import { Check, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { CatalogTemplate } from "@/types";

export function TemplateStep({
  templates,
  selectedKey,
  isChoosing,
  onToggleChoosing,
  onSelect,
  onActivate,
}: {
  templates: CatalogTemplate[];
  selectedKey: string;
  isChoosing: boolean;
  onToggleChoosing: () => void;
  onSelect: (key: string) => void;
  onActivate: () => void;
}) {
  const selected =
    templates.find((template) => template.key === selectedKey) ?? templates[0];

  if (!selected) return null;

  return (
    <section
      id="create-step-1"
      onFocusCapture={onActivate}
      className="scroll-mt-28 rounded-[12px] bg-surface-lowest p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
            01 — Selected atelier theme
          </span>
          <span className="rounded-full bg-surface-high px-2.5 py-0.5 text-[10px] leading-4 tracking-[0.12em] text-on-surface-variant uppercase">
            {selected.styleLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleChoosing}
          aria-expanded={isChoosing}
          className="inline-flex items-center gap-1.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          {isChoosing ? "Keep selected" : "Change template"}
          <SlidersHorizontal aria-hidden size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-4 rounded-[8px] bg-surface-low p-4 sm:flex-row sm:items-center">
        <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-[6px] bg-surface-container shadow-sm sm:aspect-[4/5] sm:h-auto sm:w-20">
          <Image
            src={selected.imageUrl}
            alt={selected.imageAlt}
            fill
            priority
            sizes="(min-width: 640px) 80px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-[22px] leading-7 font-semibold">
              {selected.name}
            </h2>
            <span className="bg-accent px-2 py-0.5 text-[9px] leading-4 font-semibold tracking-[0.14em] text-accent-foreground uppercase">
              Curator pick
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-5 text-on-surface-variant">
            {selected.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9px] leading-4 font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
            <span>Responsive suite</span>
            <span>Audio prelude</span>
            <span>Interactive RSVP</span>
          </div>
        </div>
        <div className="hidden shrink-0 text-right md:block">
          <span className="block text-[9px] leading-4 font-semibold tracking-[0.16em] text-secondary uppercase">
            Aesthetic match
          </span>
          <span className="font-serif text-[20px] font-semibold">99.4%</span>
        </div>
      </div>

      {isChoosing ? (
        <fieldset className="mt-5 border-t border-surface-highest pt-5">
          <legend className="mb-3 text-[10px] leading-4 font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
            Choose your starting suite
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {templates.map((template) => {
              const isSelected = template.key === selectedKey;
              return (
                <label
                  key={template.key}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-3 rounded-[8px] border p-3 transition-colors",
                    isSelected
                      ? "border-secondary bg-accent/25"
                      : "border-surface-highest bg-surface-low hover:bg-surface-container",
                  )}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.key}
                    checked={isSelected}
                    onChange={() => onSelect(template.key)}
                    className="sr-only"
                  />
                  <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-[4px]">
                    <Image
                      src={template.imageUrl}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-serif text-[15px] leading-5 font-semibold">
                      {template.name}
                    </span>
                    <span className="block text-[10px] leading-4 tracking-[0.1em] text-on-surface-variant uppercase">
                      {template.styleLabel} · {template.tier}
                    </span>
                  </span>
                  {isSelected ? (
                    <span className="absolute top-2 right-2 grid size-5 place-items-center rounded-full bg-secondary text-secondary-foreground">
                      <Check aria-hidden size={12} />
                    </span>
                  ) : null}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}
    </section>
  );
}
