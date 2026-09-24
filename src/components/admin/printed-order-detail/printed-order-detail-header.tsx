"use client";

import {
  ArrowLeft,
  CalendarDays,
  PackageCheck,
  ReceiptText,
  RefreshCw,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import {
  idrFormat,
  orderDateFormat,
  PaymentStatusBadge,
  PrintedOrderStatusBadge,
  validStatusTransitions,
} from "@/components/admin/printed-orders/printed-order-utils";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type { AdminPrintedOrderItem } from "@/types";

export function PrintedOrderDetailHeader({
  order,
  onUpdateStatus,
}: {
  order: AdminPrintedOrderItem;
  onUpdateStatus: () => void;
}) {
  const canUpdate = validStatusTransitions[order.orderStatus].length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-semibold tracking-[0.14em] uppercase">
        <Link
          href="/admin/printed-orders"
          className="inline-flex min-h-9 items-center gap-2 text-on-surface-variant transition-colors hover:text-secondary"
        >
          <ArrowLeft aria-hidden size={14} /> Printed Orders
        </Link>
        <span className="bg-surface-container px-2.5 py-1 font-mono tracking-normal text-on-surface-variant normal-case">
          ID: {order.id}
        </span>
      </div>

      <section className="relative overflow-hidden border border-border bg-surface-lowest p-5 shadow-sm sm:p-7 lg:p-8">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-secondary via-accent to-transparent" />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2">
              <PrintedOrderStatusBadge status={order.orderStatus} />
              <PaymentStatusBadge status={order.status} />
            </div>
            <div className="mt-4">
              <AdminPageHeader
                eyebrow={`Printed Order Dossier · ${order.reference}`}
                title={
                  <span className="block text-[30px] leading-[1.05] sm:text-[38px]">
                    {order.productName}
                  </span>
                }
                description={`${order.quantity} printed sets for ${order.customer.name}. Order progress and payment settlement are tracked independently.`}
              />
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap xl:max-w-[480px] xl:justify-end">
            {canUpdate ? (
              <button
                type="button"
                onClick={onUpdateStatus}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                <RefreshCw aria-hidden size={15} /> Update Status
              </button>
            ) : null}
            <Link
              href={`/admin/transactions/${order.id}`}
              prefetch={false}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-container px-4 text-[10px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-container-high"
            >
              <ReceiptText aria-hidden size={15} /> View Transaction
            </Link>
            {order.customer.id ? (
              <Link
                href={`/admin/customers/${order.customer.id}`}
                prefetch={false}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-container px-4 text-[10px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-container-high"
              >
                <UserRound aria-hidden size={15} /> View Customer
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-border pt-5 text-[10px] text-on-surface-variant sm:grid-cols-2 xl:grid-cols-4">
          <span className="flex items-center gap-2">
            <PackageCheck aria-hidden size={13} /> Reference{" "}
            <strong className="font-mono text-on-surface">
              {order.reference}
            </strong>
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays aria-hidden size={13} /> Ordered{" "}
            <strong className="text-on-surface">
              {orderDateFormat.format(new Date(order.createdAt))}
            </strong>
          </span>
          <span>
            Quantity{" "}
            <strong className="text-on-surface">{order.quantity} sets</strong>
          </span>
          <span>
            Total{" "}
            <strong className="text-on-surface">
              {idrFormat.format(order.amount)}
            </strong>
          </span>
        </div>
      </section>
    </div>
  );
}
