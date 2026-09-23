"use client";

import { cn } from "@/lib/utils";

export function SettingsToggle({
  checked,
  onChange,
  disabled = false,
  label,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
        checked ? "bg-secondary" : "bg-surface-highest",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 size-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
