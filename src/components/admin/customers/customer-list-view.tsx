"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AddCustomerDialog,
  type NewManagedCustomerInput,
} from "@/components/admin/customers/add-customer-dialog";
import { CustomerDirectory } from "@/components/admin/customers/customer-directory";
import { CustomerMetrics } from "@/components/admin/customers/customer-metrics";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type {
  AdminCustomer,
  AdminCustomerListData,
  AdminCustomerSummary,
} from "@/types";

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function CustomerListView({ data }: { data: AdminCustomerListData }) {
  const [customers, setCustomers] = useState(data.customers);
  const [isAdding, setIsAdding] = useState(false);
  const addedManagedCount = customers.length - data.customers.length;

  const summary = useMemo<AdminCustomerSummary>(
    () => ({
      ...data.summary,
      totalCustomers: data.summary.totalCustomers + addedManagedCount,
      managedCustomers: data.summary.managedCustomers + addedManagedCount,
      addedThisMonth: data.summary.addedThisMonth + addedManagedCount,
    }),
    [addedManagedCount, data.summary],
  );

  function addManagedCustomer(input: NewManagedCustomerInput) {
    const customer: AdminCustomer = {
      id: `cus_preview_${crypto.randomUUID()}`,
      name: input.name,
      initials: initialsFor(input.name),
      email: input.email || null,
      whatsapp: input.whatsapp,
      accountType: "managed",
      linkedUserId: null,
      invitationCount: 0,
      quotaGranted: 0,
      quotaRemaining: 0,
      totalSpending: 0,
      paymentStatus: "pending",
      status: "pending_payment",
      joinedAt: new Date().toISOString(),
      notes: input.notes || undefined,
    };

    setCustomers((current) => [customer, ...current]);
    setIsAdding(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Clientele Directory · CustomerProfile Operations"
        title="Customers"
        description="Manage registered Moment Kita accounts and studio-managed customers without assuming every profile has a linked login."
        actions={
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <Plus aria-hidden size={16} /> Add Customer
          </button>
        }
      />

      <CustomerMetrics summary={summary} />
      <CustomerDirectory customers={customers} summary={summary} />

      {isAdding ? (
        <AddCustomerDialog
          onClose={() => setIsAdding(false)}
          onCreate={addManagedCustomer}
        />
      ) : null}
    </div>
  );
}
