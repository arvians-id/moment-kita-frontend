"use client";

import { Bell, ChevronRight, Shield, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type SettingsTab = "profile" | "security" | "notifications";

const tabs: {
  id: SettingsTab;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  {
    id: "profile",
    label: "Profile Details",
    hint: "Personal info & contact",
    icon: User,
  },
  {
    id: "security",
    label: "Account & Security",
    hint: "Credentials & active sessions",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notification Preferences",
    hint: "In-app & email dispatch",
    icon: Bell,
  },
];

export function SettingsNav({
  active,
  onChange,
}: {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}) {
  return (
    <>
      {/* Desktop: vertical tile list */}
      <nav
        aria-label="Settings sections"
        className="hidden flex-col gap-1 bg-surface-low p-2 shadow-sm lg:flex"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center justify-between gap-3 p-3 text-left transition-colors",
                isActive
                  ? "bg-surface-highest text-secondary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center",
                    isActive
                      ? "bg-surface-lowest text-secondary"
                      : "bg-surface-container text-on-surface-variant",
                  )}
                >
                  <Icon aria-hidden size={17} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold text-on-surface">
                    {tab.label}
                  </span>
                  <span className="block text-[10px] text-on-surface-variant">
                    {tab.hint}
                  </span>
                </span>
              </span>
              <ChevronRight aria-hidden size={16} className="shrink-0" />
            </button>
          );
        })}
      </nav>

      {/* Mobile / tablet: horizontal scrollable tabs */}
      <div
        role="tablist"
        aria-label="Settings sections"
        className="flex gap-1 overflow-x-auto bg-surface-low p-1.5 shadow-sm lg:hidden"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-on-surface-variant hover:bg-surface-container",
              )}
            >
              <Icon aria-hidden size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
