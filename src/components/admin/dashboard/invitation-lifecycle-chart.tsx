import type { InvitationLifecycleBreakdown, InvitationStatus } from "@/types";

const statusLabel: Record<InvitationStatus, string> = {
  draft: "Draft",
  finalized: "Finalized, awaiting publish",
  published: "Published & live",
  expired: "Expired",
  cancelled: "Cancelled",
};

const barTone: Record<InvitationStatus, string> = {
  draft: "bg-surface-highest",
  finalized: "bg-champagne",
  published: "bg-secondary",
  expired: "bg-on-surface-variant/30",
  cancelled: "bg-on-surface-variant/15",
};

export function InvitationLifecycleChart({
  breakdown,
}: {
  breakdown: InvitationLifecycleBreakdown[];
}) {
  const total = breakdown.reduce((sum, entry) => sum + entry.count, 0) || 1;

  return (
    <section className="flex h-full flex-col gap-5 border border-border bg-surface-lowest p-5 sm:p-6">
      <div className="flex flex-col">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          Invitations
        </span>
        <h2 className="font-serif text-[20px] leading-7 font-semibold">
          Lifecycle Distribution
        </h2>
      </div>

      <ul className="flex flex-col gap-3">
        {breakdown.map((entry) => {
          const percent = Math.round((entry.count / total) * 100);
          return (
            <li key={entry.status} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 text-[12px] leading-5">
                <span className="font-medium text-on-surface">
                  {statusLabel[entry.status]}
                </span>
                <span className="shrink-0 text-on-surface-variant">
                  {entry.count} · {percent}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden bg-surface-container">
                <div
                  className={`h-full ${barTone[entry.status]}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
