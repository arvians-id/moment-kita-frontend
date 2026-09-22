import { cn } from "@/lib/utils";
import type { InvitationStatus } from "@/types";

const presentation: Record<InvitationStatus, { label: string; tone: string }> =
  {
    draft: {
      label: "Draft",
      tone: "bg-surface-highest text-on-surface-variant",
    },
    finalized: { label: "Finalized", tone: "bg-champagne/60 text-espresso" },
    published: {
      label: "Published",
      tone: "bg-terracotta-soft/45 text-accent-foreground",
    },
    expired: {
      label: "Expired",
      tone: "bg-surface-high text-on-surface-variant",
    },
    cancelled: {
      label: "Cancelled",
      tone: "bg-surface-high text-on-surface-variant",
    },
  };

export function InvitationStatusBadge({
  status,
  className,
}: {
  status: InvitationStatus;
  className?: string;
}) {
  const { label, tone } = presentation[status];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase",
        tone,
        className,
      )}
    >
      {label}
    </span>
  );
}
