"use client";

import { Handshake, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { LogPrintedOrderDialog } from "@/components/admin/printed-orders/log-printed-order-dialog";
import { PrintedOrderDirectory } from "@/components/admin/printed-orders/printed-order-directory";
import { PrintedOrderMetrics } from "@/components/admin/printed-orders/printed-order-metrics";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type {
  AdminPrintedOrderItem,
  AdminPrintedOrderListData,
  AdminPrintedOrderStatus,
} from "@/types";

export function PrintedOrderListView({
  data,
}: {
  data: AdminPrintedOrderListData;
}) {
  const [orders, setOrders] = useState(data.orders);
  const [logOrderOpen, setLogOrderOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const summary = useMemo(
    () => ({
      totalOrders: orders.length,
      newOrders: orders.filter((order) =>
        ["new", "confirmed"].includes(order.orderStatus),
      ).length,
      inProduction: orders.filter(
        (order) => order.orderStatus === "in_production",
      ).length,
      readyOrShipped: orders.filter((order) =>
        ["ready", "shipped"].includes(order.orderStatus),
      ).length,
      completed: orders.filter((order) => order.orderStatus === "completed")
        .length,
      paidRevenue: orders
        .filter((order) => order.status === "paid")
        .reduce((sum, order) => sum + order.amount, 0),
    }),
    [orders],
  );

  function updateStatus(
    id: string,
    status: AdminPrintedOrderStatus,
    note: string,
  ) {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? {
              ...order,
              orderStatus: status,
              internalNote: note || order.internalNote,
              fulfillment:
                status === "completed"
                  ? { ...order.fulfillment, statusLabel: "Completed" }
                  : status === "shipped"
                    ? { ...order.fulfillment, statusLabel: "In transit" }
                    : order.fulfillment,
            }
          : order,
      ),
    );
  }

  function addOrder(order: AdminPrintedOrderItem) {
    setOrders((current) => [order, ...current]);
    setNotice(
      `${order.reference} was staged with a pending PRINTED transaction. No payment or fulfillment action was triggered.`,
    );
    setLogOrderOpen(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Commerce · Printed Atelier Operations"
        title="Printed Orders"
        description="Track manual printed invitation commissions, payment state, print-run progress, and fulfillment context without turning the atelier workflow into ecommerce or inventory management."
        actions={
          <button
            type="button"
            onClick={() => setLogOrderOpen(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <Plus aria-hidden size={16} /> Log Printed Order
          </button>
        }
      />

      {notice ? (
        <p
          role="status"
          className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-950"
        >
          {notice}
        </p>
      ) : null}

      <PrintedOrderMetrics summary={summary} />

      <section className="flex items-start gap-3 border border-border bg-surface-low p-4 text-on-surface-variant sm:p-5">
        <span className="grid size-9 shrink-0 place-items-center bg-accent text-accent-foreground">
          <Handshake aria-hidden size={18} />
        </span>
        <div>
          <h2 className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
            Concierge-assisted physical workflow
          </h2>
          <p className="mt-1 max-w-4xl text-[11px] leading-5">
            Printed commissions are discussed, quoted, approved, and fulfilled
            manually. Payment comes from the shared transaction ledger;
            production and delivery fields here are informational studio notes,
            not automated warehouse or carrier controls.
          </p>
        </div>
      </section>

      <PrintedOrderDirectory
        orders={orders}
        products={data.products}
        onStatusChange={updateStatus}
      />

      <LogPrintedOrderDialog
        open={logOrderOpen}
        customers={data.customers}
        products={data.products}
        onClose={() => setLogOrderOpen(false)}
        onSubmit={addOrder}
      />
    </div>
  );
}
