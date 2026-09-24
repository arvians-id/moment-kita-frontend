"use client";

import { Ban, CheckCircle2, Heart, UserRound } from "lucide-react";
import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import {
  idrFormat,
  purposeLabel,
  transactionDateTimeFormat,
} from "@/components/admin/transactions/transaction-list-utils";
import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { AdminTransactionListItem } from "@/types";

export function TransactionDetailHeader({
  transaction,
  onRequestConfirm,
  onRequestCancel,
}: {
  transaction: AdminTransactionListItem;
  onRequestConfirm: () => void;
  onRequestCancel: () => void;
}) {
  return (
    <section className="relative border border-border bg-surface-low p-5 shadow-sm sm:p-7 lg:p-8">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-secondary via-accent to-transparent" />
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <TransactionStatusBadge status={transaction.status} />
            <span className="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] uppercase">
              {purposeLabel[transaction.purpose]}
            </span>
          </div>

          <div className="mt-4">
            <AdminPageHeader
              eyebrow={`Transaction Dossier · ${transaction.reference}`}
              title={
                <span className="block text-[30px] leading-[1.05] sm:text-[38px]">
                  {transaction.productName}
                </span>
              }
              description={transaction.description}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap xl:max-w-[420px] xl:justify-end">
          {transaction.status === "pending" ? (
            <>
              <button
                type="button"
                onClick={onRequestConfirm}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                <CheckCircle2 aria-hidden size={15} /> Confirm Payment
              </button>
              <button
                type="button"
                onClick={onRequestCancel}
                className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase hover:bg-red-50 hover:text-red-700"
              >
                <Ban aria-hidden size={14} /> Cancel Transaction
              </button>
            </>
          ) : null}

          {transaction.status === "paid" ? (
            <>
              {transaction.customer.id ? (
                <Link
                  href={`/admin/customers/${transaction.customer.id}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.1em] uppercase shadow-sm"
                >
                  <UserRound aria-hidden size={15} /> View Customer
                </Link>
              ) : null}
              {transaction.relatedInvitation ? (
                <Link
                  href={`/admin/invitations/${transaction.relatedInvitation.id}`}
                  prefetch={false}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
                >
                  <Heart aria-hidden size={15} /> View Related Invitation
                </Link>
              ) : null}
            </>
          ) : null}

          {transaction.status === "cancelled" || transaction.status === "refunded" ? (
            <span className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase opacity-75">
              {transaction.status === "cancelled"
                ? "This transaction is closed"
                : "This transaction was refunded"}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-3 border-t border-border pt-5 text-[10px] text-on-surface-variant sm:grid-cols-2 xl:grid-cols-4">
        <span>
          Reference{" "}
          <strong className="font-mono text-on-surface">{transaction.reference}</strong>
        </span>
        <span>
          Amount{" "}
          <strong className="text-on-surface">{idrFormat.format(transaction.amount)}</strong>
        </span>
        <span>
          Created{" "}
          <strong className="text-on-surface">
            {transactionDateTimeFormat.format(new Date(transaction.createdAt))}
          </strong>
        </span>
        <span>
          Customer{" "}
          <strong className="text-on-surface">{transaction.customer.name}</strong>
        </span>
      </div>
    </section>
  );
}
