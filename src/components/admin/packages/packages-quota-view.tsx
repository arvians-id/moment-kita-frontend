"use client";

import { CheckCircle2, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  AdjustQuotaDialog,
  type QuotaAdjustmentInput,
} from "@/components/admin/customer-detail/customer-detail-dialogs";
import { PackageCatalog } from "@/components/admin/packages/package-catalog";
import { PackageMetrics } from "@/components/admin/packages/package-metrics";
import { QuotaHistory } from "@/components/admin/packages/quota-history";
import { QuotaOverview } from "@/components/admin/packages/quota-overview";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type {
  AdminPackageListItem,
  AdminPackagesQuotaData,
  AdminQuotaLedgerEntry,
} from "@/types";

export function PackagesQuotaView({ data }: { data: AdminPackagesQuotaData }) {
  const [packages, setPackages] = useState(data.packages);
  const [customers, setCustomers] = useState(data.customers);
  const [history, setHistory] = useState(data.history);
  const [summary, setSummary] = useState(data.summary);
  const [notice, setNotice] = useState<string | null>(null);

  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );

  function openAdjust(customerId: string | null) {
    setSelectedCustomerId(customerId);
    setAdjustDialogOpen(true);
  }

  function toggleActive(packageId: string) {
    const nextPackages = packages.map((pkg) =>
      pkg.id === packageId ? { ...pkg, active: !pkg.active } : pkg,
    );
    setPackages(nextPackages);
    setSummary((current) => ({
      ...current,
      activePackages: nextPackages.filter((pkg) => pkg.active).length,
    }));
    const target = nextPackages.find((pkg) => pkg.id === packageId);
    if (target) {
      setNotice(
        `${target.name} is now ${target.active ? "active" : "inactive"} for new selection.`,
      );
    }
  }

  function duplicatePackage(packageId: string) {
    const source = packages.find((pkg) => pkg.id === packageId);
    if (!source) return;

    const copy: AdminPackageListItem = {
      ...source,
      id: `${source.id}-copy-${Date.now()}`,
      name: `${source.name} (Copy)`,
      active: false,
      featured: false,
      activeCustomerCount: 0,
    };
    setPackages((current) => [...current, copy]);
    setNotice(
      `${source.name} duplicated as a new inactive draft tier. Full editing continues in the Package Editor.`,
    );
  }

  function applyAdjustment(customerId: string, input: QuotaAdjustmentInput) {
    const delta = input.direction === "increase" ? input.amount : -input.amount;
    const adjustedAt = new Date().toISOString();

    const nextCustomers = customers.map((row) => {
      if (row.customer.id !== customerId) return row;
      const quotaRemaining = Math.max(0, row.customer.quotaRemaining + delta);
      return {
        customer: {
          ...row.customer,
          quotaGranted:
            delta > 0 ? row.customer.quotaGranted + delta : row.customer.quotaGranted,
          quotaRemaining,
        },
        lastActivityAt: adjustedAt,
      };
    });
    const target = nextCustomers.find((row) => row.customer.id === customerId);
    if (!target) return;

    setCustomers(nextCustomers);
    setSummary((current) => ({
      ...current,
      remainingCustomerQuota: Math.max(0, current.remainingCustomerQuota + delta),
      customersWithNoQuota: nextCustomers.filter(
        (row) => row.customer.quotaRemaining === 0,
      ).length,
    }));

    const entry: AdminQuotaLedgerEntry = {
      id: `quota_preview_${customerId}_${Date.now()}`,
      delta,
      reason: input.reason,
      source: "Admin adjustment",
      createdAt: adjustedAt,
      adminName: "Atelier Admin",
      customer: {
        id: target.customer.id,
        name: target.customer.name,
        accountType: target.customer.accountType,
      },
      relatedTransactionId: null,
      relatedInvitationId: null,
    };
    setHistory((current) => [entry, ...current]);

    setAdjustDialogOpen(false);
    setSelectedCustomerId(null);
    setNotice(
      `Quota ${input.direction}d by ${input.amount} for ${target.customer.name}. Remaining is now ${target.customer.quotaRemaining}.`,
    );
  }

  const selectedCustomer =
    customers.find((row) => row.customer.id === selectedCustomerId)?.customer ??
    null;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Commerce · Packages & Quota"
        title="Packages & Quota"
        description="Manage commercial wedding suite tiers, invitation quota allowances, and monitor client quota balance operations."
        actions={
          <Link
            href="/admin/packages/new"
            prefetch={false}
            title="Package Editor is the next dedicated flow"
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <Plus aria-hidden size={16} /> Add Package
          </Link>
        }
      />

      {notice ? (
        <div
          role="status"
          className="flex items-center justify-between gap-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-950"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 aria-hidden size={15} /> {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="grid size-7 shrink-0 place-items-center hover:bg-emerald-100"
          >
            <X aria-hidden size={14} />
          </button>
        </div>
      ) : null}

      <PackageMetrics summary={summary} />

      <PackageCatalog
        packages={packages}
        onToggleActive={toggleActive}
        onDuplicate={duplicatePackage}
      />

      <QuotaOverview
        rows={customers}
        onAdjust={(customerId) => openAdjust(customerId)}
        onAdjustAny={() => openAdjust(null)}
      />

      <QuotaHistory entries={history} />

      {adjustDialogOpen ? (
        <AdjustQuotaDialog
          currentQuota={selectedCustomer?.quotaRemaining ?? 0}
          onClose={() => setAdjustDialogOpen(false)}
          onConfirm={(input) => {
            if (!selectedCustomerId) return;
            applyAdjustment(selectedCustomerId, input);
          }}
          customerPicker={{
            customers: customers.map((row) => ({
              id: row.customer.id,
              name: row.customer.name,
              quotaRemaining: row.customer.quotaRemaining,
            })),
            selectedId: selectedCustomerId,
            onSelect: setSelectedCustomerId,
          }}
        />
      ) : null}
    </div>
  );
}
