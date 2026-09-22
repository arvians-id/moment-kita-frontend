import { EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import type { InvitationBuilderSection } from "@/types";

export function BuilderSectionNavigation({
  sections,
  activeId,
  onSelect,
}: {
  sections: InvitationBuilderSection[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Invitation sections"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
    >
      {sections.map((section, index) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-[6px] px-3.5 py-2 text-left text-[10px] leading-4 font-semibold tracking-[0.1em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-surface-container text-on-surface hover:bg-surface-high",
              !section.visible && "text-on-surface-variant",
            )}
          >
            <span
              className={isActive ? "text-terracotta-soft" : "text-secondary"}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.label}
            {!section.visible ? <EyeOff aria-hidden size={13} /> : null}
          </button>
        );
      })}
    </nav>
  );
}
