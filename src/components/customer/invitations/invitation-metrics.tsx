import { FolderHeart, PencilLine, Sparkles } from "lucide-react";

import type { InvitationCounts } from "@/services/customer/invitation-service";
import type { EntitlementSummary } from "@/types";

const cardClass =
  "flex flex-col justify-between border border-surface-highest p-5";

export function InvitationMetrics({
  counts,
  entitlement,
}: {
  counts: InvitationCounts;
  entitlement: EntitlementSummary;
}) {
  const quotaLabel =
    entitlement.quotaRemaining === 1
      ? "1 Celebration Quota"
      : `${entitlement.quotaRemaining} Celebration Quotas`;

  return (
    <section className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      <article className={`${cardClass} bg-surface-lowest`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Total Invitations
          </span>
          <FolderHeart aria-hidden size={17} className="shrink-0" />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {counts.total} {counts.total === 1 ? "Project" : "Projects"}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            Across your wedding celebrations
          </p>
        </div>
      </article>

      <article className={`${cardClass} bg-surface-lowest`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Published &amp; Live
          </span>
          <span aria-hidden className="relative flex size-2.5 shrink-0">
            {counts.published > 0 ? (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
            ) : null}
            <span
              className={`relative inline-flex size-2.5 rounded-full ${counts.published > 0 ? "bg-secondary" : "bg-surface-highest"}`}
            />
          </span>
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {counts.published} Active
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {counts.published > 0
              ? "Live on your invitation address"
              : "Nothing published yet"}
          </p>
        </div>
      </article>

      <article className={`${cardClass} bg-surface-lowest`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            In Draft &amp; Setup
          </span>
          <PencilLine aria-hidden size={17} className="shrink-0" />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {counts.drafts + counts.finalized} In Progress
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {counts.finalized} awaiting publish
          </p>
        </div>
      </article>

      <article className={`${cardClass} bg-surface-low`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-secondary">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Quota Allocation
          </span>
          <Sparkles aria-hidden size={17} className="shrink-0" />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {quotaLabel}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {entitlement.packageName} • Unlimited drafts
          </p>
        </div>
      </article>
    </section>
  );
}
