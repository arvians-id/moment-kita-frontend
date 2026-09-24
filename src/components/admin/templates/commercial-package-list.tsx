"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";

import { currencyFormat } from "@/components/admin/templates/template-detail-formatters";
import type { AdminTemplatePackageAccess } from "@/types";

export function CommercialPackageList({
  packages: initialPackages,
}: {
  packages: AdminTemplatePackageAccess[];
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [notice, setNotice] = useState<string | null>(null);

  function toggle(packageId: string) {
    setPackages((current) =>
      current.map((entry) =>
        entry.packageId === packageId
          ? { ...entry, available: !entry.available }
          : entry,
      ),
    );
    const entry = packages.find((item) => item.packageId === packageId);
    if (entry) {
      setNotice(
        `${entry.packageName} is now ${entry.available ? "unavailable for" : "available for"} this template in this registry preview.`,
      );
    }
  }

  return (
    <div className="space-y-4">
      {notice ? (
        <p
          role="status"
          className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-[10px] text-emerald-950"
        >
          {notice}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((entry) => {
          return (
            <article
              key={entry.packageId}
              className={`flex flex-col justify-between gap-4 border p-5 ${
                entry.available
                  ? "border-border bg-surface-low"
                  : "border-border bg-surface-container/60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-[19px]">{entry.packageName}</h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 px-2 py-1 text-[8px] font-semibold tracking-[0.1em] uppercase ${
                      entry.available
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {entry.available ? (
                      <Check aria-hidden size={11} />
                    ) : (
                      <X aria-hidden size={11} />
                    )}
                    {entry.available ? "Available" : "Excluded"}
                  </span>
                </div>
                <p className="mt-2 text-[10px] leading-5 text-on-surface-variant">
                  {currencyFormat.format(entry.price)} · {entry.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggle(entry.packageId)}
                className="inline-flex min-h-9 items-center justify-center border border-border px-3 text-[9px] font-semibold tracking-[0.1em] uppercase transition-colors hover:bg-surface-lowest"
              >
                {entry.available
                  ? "Exclude From Package"
                  : "Include In Package"}
              </button>
            </article>
          );
        })}
      </div>

      <p className="border border-border bg-surface-low p-4 text-[10px] leading-5 text-on-surface-variant">
        Commercial permission changes apply to newly provisioned invitations
        immediately. Invitations already using this template remain
        grandfathered under their original purchase terms. Full package
        pricing and entitlement editing lives in Packages &amp; Quota, not
        here.
      </p>
    </div>
  );
}
