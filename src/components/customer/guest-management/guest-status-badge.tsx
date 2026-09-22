import { cn } from "@/lib/utils";
import type { GuestAttendanceStatus } from "@/types";

import { guestStatusLabels } from "./guest-utils";

const tones: Record<GuestAttendanceStatus, string> = {
  attending: "bg-secondary/10 text-secondary",
  pending: "bg-surface-container text-on-surface-variant",
  not_attending: "bg-terracotta-soft/35 text-accent-foreground",
};

export function GuestStatusBadge({
  status,
  confirmedPax,
  compact = false,
}: {
  status: GuestAttendanceStatus;
  confirmedPax: number;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold tracking-[0.1em] uppercase",
        compact ? "px-2 py-1 text-[9px]" : "px-2.5 py-1.5 text-[10px]",
        tones[status],
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "attending"
            ? "bg-secondary"
            : status === "pending"
              ? "bg-outline"
              : "bg-accent-foreground",
        )}
      />
      {guestStatusLabels[status]}
      {status !== "pending" ? ` · ${confirmedPax} pax` : null}
    </span>
  );
}
