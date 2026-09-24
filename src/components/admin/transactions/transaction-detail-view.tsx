"use client";

import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { CancelTransactionDialog } from "@/components/admin/transactions/cancel-transaction-dialog";
import { ConfirmPaymentDialog } from "@/components/admin/transactions/confirm-payment-dialog";
import { TransactionActivitySection } from "@/components/admin/transactions/transaction-activity-section";
import { TransactionContextSection } from "@/components/admin/transactions/transaction-context-section";
import { TransactionCustomerCard } from "@/components/admin/transactions/transaction-customer-card";
import { TransactionDetailHeader } from "@/components/admin/transactions/transaction-detail-header";
import { TransactionNotesPanel } from "@/components/admin/transactions/transaction-notes-panel";
import { TransactionOverviewSection } from "@/components/admin/transactions/transaction-overview-section";
import { TransactionPaymentProofSection } from "@/components/admin/transactions/transaction-payment-proof-section";
import type {
  AdminTransactionActivityEntry,
  AdminTransactionDetailData,
} from "@/types";

type DialogState = "confirm" | "cancel" | null;

export function TransactionDetailView({ data }: { data: AdminTransactionDetailData }) {
  const [transaction, setTransaction] = useState(data.transaction);
  const [activity, setActivity] = useState(data.activity);
  const [notes, setNotes] = useState(data.transaction.notes);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function pushActivity(entries: Omit<AdminTransactionActivityEntry, "id">[]) {
    setActivity((current) => [
      ...current,
      ...entries.map((entry, index) => ({
        ...entry,
        id: `${transaction.id}_local_${current.length + index}`,
      })),
    ]);
  }

  function applyConfirm(note: string) {
    const confirmedAt = new Date().toISOString();
    setTransaction((current) => ({
      ...current,
      status: "paid",
      paidAt: confirmedAt,
      notes: note || current.notes,
    }));
    if (note) setNotes(note);

    const effectTitles =
      transaction.entitlementsGranted.length > 0
        ? transaction.entitlementsGranted
        : ["Commercial effect applied"];
    pushActivity([
      {
        title: "Payment confirmed",
        description: "An Admin verified the manual payment.",
        createdAt: confirmedAt,
      },
      ...effectTitles.map((title) => ({
        title,
        description: "Commercial effect applied.",
        createdAt: confirmedAt,
      })),
    ]);

    setNotice(
      `${transaction.reference} confirmed as paid. Its commercial effect is applied once.`,
    );
    setDialog(null);
  }

  function applyCancel(reason: string) {
    const cancelledAt = new Date().toISOString();
    const wasPaid = transaction.status === "paid";
    setTransaction((current) => ({ ...current, status: "cancelled", notes: reason }));
    setNotes(reason);
    pushActivity([
      {
        title: "Transaction cancelled",
        description: wasPaid
          ? `${reason} Payment and granted commercial effects were not reversed.`
          : reason,
        createdAt: cancelledAt,
      },
    ]);
    setNotice(
      wasPaid
        ? `${transaction.reference} was cancelled. Its settled payment and granted commercial effect were not reversed.`
        : `${transaction.reference} was cancelled. No commercial effect was applied.`,
    );
    setDialog(null);
  }

  function saveNote(note: string) {
    setTransaction((current) => ({ ...current, notes: note || null }));
    setNotes(note || null);
    setNotice("Internal note saved.");
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-semibold tracking-[0.14em] uppercase">
        <Link
          href="/admin/transactions"
          className="inline-flex min-h-9 items-center gap-2 text-on-surface-variant transition-colors hover:text-secondary"
        >
          <ArrowLeft aria-hidden size={14} /> Transactions Ledger
        </Link>
        <span className="bg-surface-container px-2.5 py-1 font-mono tracking-normal text-on-surface-variant normal-case">
          {transaction.id}
        </span>
      </div>

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

      <TransactionDetailHeader
        transaction={transaction}
        onRequestConfirm={() => setDialog("confirm")}
        onRequestCancel={() => setDialog("cancel")}
      />

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <TransactionOverviewSection transaction={transaction} />
          <TransactionContextSection
            transaction={transaction}
            packageEffect={data.packageEffect}
            quotaEffect={data.quotaEffect}
            extensionEffect={data.extensionEffect}
            printedEffect={data.printedEffect}
          />
          <TransactionPaymentProofSection transaction={transaction} />
          <TransactionActivitySection activity={activity} />
        </div>

        <div className="space-y-6 lg:col-span-4">
          <TransactionCustomerCard
            customer={transaction.customer}
            customerProfile={data.customerProfile}
          />
          <TransactionNotesPanel note={notes} onSave={saveNote} />
        </div>
      </div>

      {dialog === "confirm" ? (
        <ConfirmPaymentDialog
          transaction={transaction}
          onClose={() => setDialog(null)}
          onConfirm={applyConfirm}
        />
      ) : null}
      {dialog === "cancel" ? (
        <CancelTransactionDialog
          transaction={transaction}
          onClose={() => setDialog(null)}
          onConfirm={applyCancel}
        />
      ) : null}
    </div>
  );
}
