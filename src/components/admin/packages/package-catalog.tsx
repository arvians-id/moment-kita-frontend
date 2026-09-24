"use client";

import {
  Copy,
  Layers3,
  Palette,
  Power,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { PackageActionDialog } from "@/components/admin/packages/package-action-dialog";
import { idrFormat } from "@/components/admin/packages/packages-quota-formatters";
import type { AdminPackageListItem } from "@/types";

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex min-h-6 items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase ${
        active
          ? "bg-emerald-50 text-emerald-800"
          : "bg-surface-container text-on-surface-variant"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${active ? "bg-emerald-600" : "bg-on-surface-variant/50"}`}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-surface-low p-3">
      <Icon aria-hidden size={14} className="shrink-0 text-secondary" />
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold">{value}</p>
        <p className="truncate text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}

export function PackageCatalog({
  packages: initialPackages,
  onToggleActive,
  onDuplicate,
}: {
  packages: AdminPackageListItem[];
  onToggleActive: (packageId: string) => void;
  onDuplicate: (packageId: string) => void;
}) {
  const [pendingAction, setPendingAction] = useState<AdminPackageListItem | null>(
    null,
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Commercial Package Catalog
          </p>
          <h2 className="mt-1 font-serif text-[22px]">
            {initialPackages.length} Configured Tiers
          </h2>
        </div>
        <p className="max-w-md text-[10px] leading-5 text-on-surface-variant">
          Pricing, quota, live duration windows, and template entitlement are
          configurable per tier — never hard-coded per page.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {initialPackages.map((pkg) => (
          <article
            key={pkg.id}
            className="flex flex-col justify-between gap-4 border border-border bg-surface-lowest p-5 shadow-sm"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge active={pkg.active} />
                {pkg.featured ? (
                  <span className="inline-flex items-center gap-1.5 bg-accent px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-accent-foreground uppercase">
                    <Star aria-hidden size={11} fill="currentColor" /> Recommended
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-serif text-[22px]">{pkg.name}</h3>
              <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                {pkg.description}
              </p>
              <p className="mt-3 font-serif text-[26px]">
                {idrFormat.format(pkg.price)}
                <span className="ml-1 text-[11px] font-sans text-on-surface-variant">
                  / couple
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Stat
                icon={Layers3}
                label="Invitation Quota"
                value={`+${pkg.invitationQuota}`}
              />
              <Stat
                icon={Power}
                label="Active Duration"
                value={`${pkg.activeDurationDays} days`}
              />
              <Stat
                icon={Palette}
                label="Template Access"
                value={`${pkg.templateAccessCount} architectures`}
              />
              <Stat
                icon={Users}
                label="Active Customers"
                value={`${pkg.activeCustomerCount}`}
              />
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border pt-4">
              <Link
                href={`/admin/packages/${pkg.id}/edit`}
                prefetch={false}
                className="inline-flex min-h-9 flex-1 items-center justify-center bg-primary px-3 text-[9px] font-semibold tracking-[0.08em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Edit Package
              </Link>
              <button
                type="button"
                onClick={() => setPendingAction(pkg)}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 border border-border px-3 text-[9px] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-surface-low"
              >
                <Power aria-hidden size={13} />
                {pkg.active ? "Disable" : "Enable"}
              </button>
              <button
                type="button"
                onClick={() => onDuplicate(pkg.id)}
                title="Duplicate package"
                aria-label={`Duplicate ${pkg.name}`}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 border border-border px-3 text-[9px] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-surface-low"
              >
                <Copy aria-hidden size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {pendingAction ? (
        <PackageActionDialog
          pkg={pendingAction}
          onClose={() => setPendingAction(null)}
          onConfirm={() => {
            onToggleActive(pendingAction.id);
            setPendingAction(null);
          }}
        />
      ) : null}
    </section>
  );
}
