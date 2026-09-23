import { Ban, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types";

const presentation: Record<
  TransactionStatus,
  { label: string; tone: string; icon: LucideIcon }
> = {
  paid: {
    label: "Paid",
    tone: "bg-secondary/10 text-secondary",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending Review",
    tone: "bg-champagne/60 text-espresso",
    icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    tone: "bg-surface-high text-on-surface-variant",
    icon: Ban,
  },
  refunded: {
    label: "Refunded",
    tone: "bg-surface-highest text-on-surface-variant",
    icon: RotateCcw,
  },
};

export function TransactionStatusBadge({
  status,
  className,
}: {
  status: TransactionStatus;
  className?: string;
}) {
  const { label, tone, icon: Icon } = presentation[status];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase",
        tone,
        className,
      )}
    >
      <Icon aria-hidden size={12} />
      {label}
    </span>
  );
}
