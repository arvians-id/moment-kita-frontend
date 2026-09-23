"use client";

import { Check, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type SaveStatus = "idle" | "saving" | "saved";

/**
 * Contextual save action shared by the Profile, Security, and Notification
 * Preferences sections. Each section keeps its own data/dirty state — this
 * only standardizes the saving/saved transient feedback.
 */
export function SaveButton({
  label,
  savingLabel = "Saving...",
  savedLabel = "Saved",
  icon: Icon,
  onSave,
  disabled = false,
  className,
}: {
  label: string;
  savingLabel?: string;
  savedLabel?: string;
  icon?: LucideIcon;
  onSave: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const [status, setStatus] = useState<SaveStatus>("idle");

  function handleClick() {
    if (status !== "idle") return;
    setStatus("saving");
    window.setTimeout(() => {
      onSave();
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 2200);
    }, 600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || status !== "idle"}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 bg-primary px-5 text-[11px] leading-4 font-semibold tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary",
        className,
      )}
    >
      {status === "saving" ? (
        <Loader2 aria-hidden size={15} className="animate-spin" />
      ) : status === "saved" ? (
        <Check aria-hidden size={15} />
      ) : Icon ? (
        <Icon aria-hidden size={15} />
      ) : null}
      <span>
        {status === "saving" ? savingLabel : status === "saved" ? savedLabel : label}
      </span>
    </button>
  );
}
