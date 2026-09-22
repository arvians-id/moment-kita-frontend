import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full rounded-[6px] border border-transparent bg-surface-low px-3.5 py-2.5 text-[13px] leading-5 text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/45 focus:border-secondary focus:bg-surface-lowest";

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[9px] leading-4 font-semibold tracking-[0.14em] text-on-surface-variant uppercase"
    >
      {children}
    </label>
  );
}

export function EditorCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] bg-surface-lowest p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function VisibilityToggle({
  visible,
  disabled,
  onChange,
}: {
  visible: boolean;
  disabled?: boolean;
  onChange: (visible: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={visible}
      disabled={disabled}
      onClick={() => onChange(!visible)}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1 text-[9px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-default",
        visible
          ? "bg-accent text-accent-foreground"
          : "bg-surface-container text-on-surface-variant",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          visible ? "bg-secondary" : "bg-on-surface-variant/40",
        )}
      />
      {visible ? "Visible" : "Hidden"}
      {disabled ? " · Required" : ""}
    </button>
  );
}
