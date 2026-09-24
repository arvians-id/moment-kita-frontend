import { Bell, SlidersHorizontal, UserRound } from "lucide-react";

export type AdminSettingsTab = "general" | "profile" | "notifications";

const tabs = [
  { value: "general", label: "General", icon: SlidersHorizontal },
  { value: "profile", label: "Admin Profile", icon: UserRound },
  { value: "notifications", label: "Notification Preferences", icon: Bell },
] as const;

export function AdminSettingsNav({
  active,
  onChange,
}: {
  active: AdminSettingsTab;
  onChange: (tab: AdminSettingsTab) => void;
}) {
  return (
    <div className="max-w-full overflow-x-auto pb-1">
      <div
        role="tablist"
        aria-label="Admin settings sections"
        className="flex w-max min-w-full gap-1 bg-surface-container p-1"
      >
        {tabs.map(({ value, label, icon: Icon }) => {
          const selected = active === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(value)}
              className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 px-4 text-[10px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-high hover:text-on-surface"
              }`}
            >
              <Icon aria-hidden size={14} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
