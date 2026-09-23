"use client";

import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

import { CustomerActivity } from "@/components/admin/customer-detail/customer-activity";
import {
  AdjustQuotaDialog,
  EditCustomerDialog,
  type EditCustomerInput,
  type QuotaAdjustmentInput,
} from "@/components/admin/customer-detail/customer-detail-dialogs";
import { CustomerDetailHeader } from "@/components/admin/customer-detail/customer-detail-header";
import {
  CustomerDetailTabs,
  type CustomerDetailTab,
} from "@/components/admin/customer-detail/customer-detail-tabs";
import { initialsFor } from "@/components/admin/customer-detail/customer-detail-formatters";
import { CustomerInvitations } from "@/components/admin/customer-detail/customer-invitations";
import { CustomerOverview } from "@/components/admin/customer-detail/customer-overview";
import { CustomerQuotaHistory } from "@/components/admin/customer-detail/customer-quota-history";
import { CustomerTransactions } from "@/components/admin/customer-detail/customer-transactions";
import type {
  AdminCustomerActivity,
  AdminCustomerDetailData,
  AdminCustomerQuotaEntry,
} from "@/types";

export function CustomerDetailView({
  initialData,
}: {
  initialData: AdminCustomerDetailData;
}) {
  const [activeTab, setActiveTab] = useState<CustomerDetailTab>("overview");
  const [customer, setCustomer] = useState(initialData.customer);
  const [quotaHistory, setQuotaHistory] = useState(initialData.quotaHistory);
  const [activity, setActivity] = useState(initialData.activity);
  const [dialog, setDialog] = useState<"edit" | "quota" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const data: AdminCustomerDetailData = {
    ...initialData,
    customer,
    quotaHistory,
    activity,
  };

  function addActivity(entry: Omit<AdminCustomerActivity, "id" | "createdAt">) {
    setActivity((current) => [
      {
        ...entry,
        id: `activity_preview_${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  }

  function saveCustomer(input: EditCustomerInput) {
    setCustomer((current) => ({
      ...current,
      name: input.name,
      initials: initialsFor(input.name),
      email: input.email || null,
      whatsapp: input.whatsapp,
      notes: input.notes || undefined,
    }));
    addActivity({
      kind: "profile",
      title: "Customer profile updated",
      description:
        "Contact details or internal notes were updated in this local preview.",
      actor: "Atelier Admin",
    });
    setDialog(null);
    setNotice("Customer profile updated in this local preview.");
  }

  function adjustQuota(input: QuotaAdjustmentInput) {
    const delta = input.direction === "increase" ? input.amount : -input.amount;
    const nextRemaining = Math.max(0, customer.quotaRemaining + delta);
    const entry: AdminCustomerQuotaEntry = {
      id: `quota_preview_${crypto.randomUUID()}`,
      delta,
      reason: input.reason,
      source: "Admin adjustment",
      createdAt: new Date().toISOString(),
      adminName: "Atelier Admin",
    };

    setCustomer((current) => ({
      ...current,
      quotaGranted:
        delta > 0 ? current.quotaGranted + delta : current.quotaGranted,
      quotaRemaining: nextRemaining,
      status:
        current.status === "pending_payment"
          ? current.status
          : nextRemaining === 0
            ? "no_quota"
            : "active",
    }));
    setQuotaHistory((current) => [entry, ...current]);
    addActivity({
      kind: "quota",
      title: "Quota adjusted",
      description: `${delta > 0 ? "+" : ""}${delta} quota · ${input.reason}`,
      actor: "Atelier Admin",
    });
    setDialog(null);
    setNotice("Quota adjustment applied to this local preview.");
    setActiveTab("quota");
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-10">
      <CustomerDetailHeader
        customer={customer}
        onAdjustQuota={() => setDialog("quota")}
        onEdit={() => setDialog("edit")}
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

      <CustomerDetailTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        counts={{
          invitations: data.invitations.length,
          transactions: data.transactions.length,
          quota: data.quotaHistory.length,
          activity: data.activity.length,
        }}
      />

      {activeTab === "overview" ? <CustomerOverview data={data} /> : null}
      {activeTab === "invitations" ? (
        <CustomerInvitations invitations={data.invitations} />
      ) : null}
      {activeTab === "transactions" ? (
        <CustomerTransactions transactions={data.transactions} />
      ) : null}
      {activeTab === "quota" ? (
        <CustomerQuotaHistory
          currentQuota={customer.quotaRemaining}
          grantedQuota={customer.quotaGranted}
          history={quotaHistory}
        />
      ) : null}
      {activeTab === "activity" ? (
        <CustomerActivity activity={activity} />
      ) : null}

      {dialog === "edit" ? (
        <EditCustomerDialog
          customer={customer}
          onClose={() => setDialog(null)}
          onSave={saveCustomer}
        />
      ) : null}
      {dialog === "quota" ? (
        <AdjustQuotaDialog
          currentQuota={customer.quotaRemaining}
          onClose={() => setDialog(null)}
          onConfirm={adjustQuota}
        />
      ) : null}
    </div>
  );
}
