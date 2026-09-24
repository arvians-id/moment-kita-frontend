"use client";

import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

import { PrintedOrderDetailHeader } from "@/components/admin/printed-order-detail/printed-order-detail-header";
import {
  FulfillmentSection,
  ProductAndPricingSection,
  ProductionSection,
  RelatedInvitation,
} from "@/components/admin/printed-order-detail/printed-order-main-sections";
import {
  PrintedOrderActivity,
  PrintedOrderCustomerPanel,
  PrintedOrderNotesPanel,
  PrintedOrderPaymentPanel,
} from "@/components/admin/printed-order-detail/printed-order-sidebar";
import { printedOrderStatusLabel } from "@/components/admin/printed-orders/printed-order-utils";
import { UpdateOrderStatusDialog } from "@/components/admin/printed-orders/update-order-status-dialog";
import type {
  AdminPrintedOrderActivity,
  AdminPrintedOrderDetailData,
  AdminPrintedOrderStatus,
} from "@/types";

export function PrintedOrderDetailView({
  initialData,
}: {
  initialData: AdminPrintedOrderDetailData;
}) {
  const [order, setOrder] = useState(initialData.order);
  const [activity, setActivity] = useState(initialData.activity);
  const [internalNote, setInternalNote] = useState(order.internalNote);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const data = { ...initialData, order, activity };

  function addActivity(
    entry: Omit<AdminPrintedOrderActivity, "id" | "createdAt">,
  ) {
    setActivity((current) => [
      {
        ...entry,
        id: `order_activity_preview_${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  }

  function updateStatus(status: AdminPrintedOrderStatus, note: string) {
    const previous = order.orderStatus;
    const now = new Date().toISOString();
    setOrder((current) => ({
      ...current,
      orderStatus: status,
      internalNote: note || current.internalNote,
      productionStartedAt:
        status === "in_production" && !current.productionStartedAt
          ? now
          : current.productionStartedAt,
      shippedAt:
        status === "shipped" && !current.shippedAt ? now : current.shippedAt,
      deliveredAt:
        status === "completed" && !current.deliveredAt
          ? now
          : current.deliveredAt,
      fulfillment:
        status === "shipped"
          ? { ...current.fulfillment, statusLabel: "In transit" }
          : status === "completed"
            ? { ...current.fulfillment, statusLabel: "Completed" }
            : status === "cancelled"
              ? {
                  ...current.fulfillment,
                  statusLabel: "Cancelled before fulfillment",
                }
              : current.fulfillment,
    }));
    if (note) setInternalNote(note);
    addActivity({
      kind:
        status === "shipped" || status === "completed"
          ? "fulfillment"
          : status === "in_production" || status === "ready"
            ? "production"
            : "order",
      title:
        status === "cancelled" ? "Order cancelled" : "Order status changed",
      description: `${printedOrderStatusLabel[previous]} → ${printedOrderStatusLabel[status]}.${note ? ` ${note}` : ""}${status === "cancelled" ? " Payment status was not changed and no refund was initiated." : ""}`,
      actor: "Atelier Admin",
    });
    setNotice(
      `${order.reference} moved to ${printedOrderStatusLabel[status]}. Payment status remains ${order.status}.`,
    );
    setStatusDialogOpen(false);
  }

  function saveNote(note: string) {
    setInternalNote(note || null);
    setOrder((current) => ({ ...current, internalNote: note || null }));
    addActivity({
      kind: "note",
      title: "Internal note updated",
      description: note || "The internal note was cleared.",
      actor: "Atelier Admin",
    });
    setNotice("Internal operational note saved in this local preview.");
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 pb-10">
      <PrintedOrderDetailHeader
        order={order}
        onUpdateStatus={() => setStatusDialogOpen(true)}
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

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <ProductAndPricingSection data={data} />
          <ProductionSection order={order} />
          <FulfillmentSection
            order={order}
            phone={initialData.customerProfile?.whatsapp ?? null}
          />
          <PrintedOrderActivity activity={activity} />
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <PrintedOrderCustomerPanel
            order={order}
            customer={initialData.customerProfile}
          />
          <PrintedOrderPaymentPanel order={order} />
          <RelatedInvitation order={order} />
          <PrintedOrderNotesPanel
            order={order}
            internalNote={internalNote}
            onSave={saveNote}
          />
        </aside>
      </div>

      {statusDialogOpen ? (
        <UpdateOrderStatusDialog
          order={order}
          onClose={() => setStatusDialogOpen(false)}
          onConfirm={updateStatus}
        />
      ) : null}
    </div>
  );
}
