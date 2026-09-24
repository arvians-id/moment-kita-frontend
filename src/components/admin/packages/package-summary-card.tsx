import { Star } from "lucide-react";

import { idrFormat } from "@/components/admin/packages/packages-quota-formatters";
import type { PackageFormValues } from "@/types";

export function PackageSummaryCard({ values }: { values: PackageFormValues }) {
  const templateCount =
    values.templateAccessMode === "all"
      ? "All active"
      : `${values.selectedTemplateKeys.length}`;

  return (
    <section className="sticky top-24 border border-border bg-surface-lowest p-5 shadow-sm">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Live Preview
      </p>
      <h2 className="mt-1 font-serif text-[22px]">
        {values.name.trim() || "Untitled Package"}
      </h2>
      {values.featured ? (
        <span className="mt-2 inline-flex items-center gap-1.5 bg-accent px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-accent-foreground uppercase">
          <Star aria-hidden size={11} fill="currentColor" /> Recommended
        </span>
      ) : null}
      <p className="mt-3 font-serif text-[28px]">
        {idrFormat.format(values.price || 0)}
        <span className="ml-1 text-[11px] font-sans text-on-surface-variant">
          / couple
        </span>
      </p>
      {values.description ? (
        <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
          {values.description}
        </p>
      ) : null}

      <div className="mt-4 space-y-2 border-t border-border pt-4 text-[11px]">
        <p className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Includes
        </p>
        <ul className="space-y-1.5">
          <li>
            +{values.invitationQuota || 0}{" "}
            {values.invitationQuota === 1 ? "Invitation" : "Invitations"}
          </li>
          <li>{values.activeDurationDays || 0} Days Active Duration</li>
          <li>{templateCount} Templates</li>
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Status
        </span>
        <span
          className={`text-[10px] font-semibold uppercase ${values.active ? "text-emerald-700" : "text-on-surface-variant"}`}
        >
          {values.active ? "Active" : "Inactive"}
        </span>
      </div>
    </section>
  );
}
