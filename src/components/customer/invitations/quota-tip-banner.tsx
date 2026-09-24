import { Lightbulb } from "lucide-react";

import type { EntitlementSummary } from "@/types";

/**
 * Explains the quota rule from the technical design: quota is only committed
 * on finalize, so drafting always stays free — including at zero quota.
 */
export function QuotaTipBanner({
  entitlement,
}: {
  entitlement: EntitlementSummary;
}) {
  const outOfQuota = entitlement.quotaRemaining <= 0;

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 border-l-2 border-secondary bg-surface-low p-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3 sm:items-center">
        <Lightbulb
          aria-hidden
          size={19}
          className="mt-0.5 shrink-0 text-secondary sm:mt-0"
        />
        <p className="text-[13px] leading-5 text-on-surface-variant">
          <span className="font-semibold text-on-surface">Atelier tip:</span>{" "}
          {outOfQuota
            ? "You can still create and design unlimited drafts. An extra celebration quota is only needed when you finalize."
            : "You can create unlimited design drafts anytime without using quota. A celebration quota is only committed when you finalize."}
        </p>
      </div>
      <span className="hidden shrink-0 text-[11px] leading-4 font-semibold tracking-[0.2em] whitespace-nowrap text-secondary uppercase md:inline">
        {entitlement.packageName}
      </span>
    </div>
  );
}
