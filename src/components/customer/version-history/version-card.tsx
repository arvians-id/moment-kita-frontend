"use client";

import { Eye, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import type { InvitationVersion } from "@/types";

import { formatVersionDate } from "./version-utils";

export function VersionCard({
  version,
  onPreview,
  onRestore,
}: {
  version: InvitationVersion;
  onPreview: () => void;
  onRestore: () => void;
}) {
  return (
    <article
      className={cn(
        "relative border bg-surface-lowest p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5",
        version.isCurrent ? "border-secondary/35" : "border-border",
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-[10px] font-bold",
            version.isCurrent
              ? "bg-secondary text-secondary-foreground"
              : "bg-surface-container-high text-on-surface",
          )}
        >
          {version.versionNumber}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-[22px] leading-7">
                Version {version.versionNumber}
              </h3>
              {version.isCurrent ? (
                <span className="bg-primary px-2 py-1 text-[8px] font-semibold tracking-[0.12em] text-primary-foreground uppercase">
                  Current
                </span>
              ) : null}
            </div>
            <time
              dateTime={version.savedAt}
              className="text-[10px] leading-5 text-on-surface-variant"
            >
              {formatVersionDate(version.savedAt)}
            </time>
          </div>
          <p className="mt-2 text-[13px] leading-6 text-on-surface-variant">
            {version.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={onPreview}
              className="inline-flex min-h-9 items-center gap-1.5 text-[9px] font-semibold tracking-[0.11em] text-secondary uppercase hover:text-on-surface"
            >
              <Eye aria-hidden size={14} />
              Preview
            </button>
            {version.isCurrent ? (
              <span className="text-[10px] text-on-surface-variant italic">
                Active invitation content
              </span>
            ) : (
              <button
                type="button"
                onClick={onRestore}
                className="inline-flex min-h-9 items-center gap-1.5 text-[9px] font-semibold tracking-[0.11em] uppercase hover:text-secondary"
              >
                <RotateCcw aria-hidden size={14} />
                Restore Version
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
