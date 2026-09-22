import { BadgeCheck } from "lucide-react";

import type { EntitlementSummary } from "@/types";

export function QuotaStatusCard({
  entitlement,
}: {
  entitlement: EntitlementSummary;
}) {
  const hasQuota = entitlement.quotaRemaining > 0;

  return (
    <aside className="flex flex-col justify-between gap-4 rounded-[12px] bg-surface-container p-5 sm:flex-row sm:items-center">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-surface-lowest text-secondary shadow-sm">
          <BadgeCheck aria-hidden size={21} />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-bold">
              {entitlement.packageName}
            </span>
            <span className="bg-secondary px-2 py-0.5 text-[9px] leading-4 font-bold tracking-[0.14em] text-secondary-foreground uppercase">
              Active account
            </span>
          </div>
          <p className="mt-1 max-w-xl text-[11px] leading-5 text-on-surface-variant">
            {hasQuota ? (
              <>
                You hold{" "}
                <strong className="text-on-surface">
                  {entitlement.quotaRemaining} available official quota
                </strong>
                . Creating this draft uses 0 units until you finalize.
              </>
            ) : (
              <>
                You currently have{" "}
                <strong className="text-on-surface">0 launch quota</strong>, but
                this draft is still free to create and edit. Quota is only
                required when Finalizing.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-left sm:text-right">
        <span className="block text-[9px] font-semibold tracking-[0.18em] text-secondary uppercase">
          Unlimited drafts
        </span>
        <span className="text-[12px] font-semibold">Enabled</span>
      </div>
    </aside>
  );
}
