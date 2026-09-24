import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const fieldClass =
  "h-11 w-full border border-transparent bg-surface-low px-3.5 text-[13px] text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary focus:bg-surface-lowest";

export const textareaClass =
  "w-full resize-none border border-transparent bg-surface-low px-3.5 py-3 text-[13px] leading-6 text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary focus:bg-surface-lowest";

export function SettingsSectionIntro({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
      <div>
        <span className="text-[10px] font-semibold tracking-[0.15em] text-secondary uppercase">
          {eyebrow}
        </span>
        <h2 className="mt-1 font-serif text-[22px] leading-8 sm:text-[24px]">
          {title}
        </h2>
        <p className="mt-1 max-w-2xl text-[12px] leading-5 text-on-surface-variant">
          {description}
        </p>
      </div>
      {icon ? (
        <span className="grid size-10 shrink-0 place-items-center bg-accent text-accent-foreground">
          {icon}
        </span>
      ) : null}
    </div>
  );
}

export function SettingsField({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-[10px] leading-4 text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[10px] leading-4 text-on-surface-variant">{hint}</p>
      ) : null}
    </div>
  );
}

export function SettingsFormActions({
  dirty,
  saveLabel,
  onReset,
}: {
  dirty: boolean;
  saveLabel: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
      <button
        type="button"
        onClick={onReset}
        disabled={!dirty}
        className="h-10 px-4 text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
      >
        Reset to Saved
      </button>
      <button
        type="submit"
        disabled={!dirty}
        className="h-10 bg-primary px-5 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saveLabel}
      </button>
    </div>
  );
}

export function SettingsToggle({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-60",
        checked ? "bg-secondary" : "bg-surface-highest",
      )}
    >
      <span
        className={cn(
          "absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
}
