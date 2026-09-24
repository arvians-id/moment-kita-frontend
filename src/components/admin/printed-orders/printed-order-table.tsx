import { MapPin, PackageOpen } from "lucide-react";
import Link from "next/link";

import { PrintedOrderRowActions } from "@/components/admin/printed-orders/printed-order-row-actions";
import {
  idrFormat,
  orderDateFormat,
  PaymentStatusBadge,
  PrintedOrderStatusBadge,
} from "@/components/admin/printed-orders/printed-order-utils";
import type { AdminPrintedOrderItem } from "@/types";

export function PrintedOrderTable({
  orders,
  openActionId,
  onToggleActions,
  onUpdateStatus,
}: {
  orders: AdminPrintedOrderItem[];
  openActionId: string | null;
  onToggleActions: (id: string) => void;
  onUpdateStatus: (order: AdminPrintedOrderItem) => void;
}) {
  return (
    <div className="hidden border border-border bg-surface-lowest shadow-sm xl:block">
      <table className="w-full table-fixed text-left">
        <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
          <tr>
            <th className="w-[12%] px-4 py-3">Order / Date</th>
            <th className="w-[15%] px-3 py-3">Customer</th>
            <th className="w-[22%] px-3 py-3">Product / Design</th>
            <th className="w-[8%] px-3 py-3 text-center">Quantity</th>
            <th className="w-[12%] px-3 py-3 text-right">Amount</th>
            <th className="w-[11%] px-3 py-3 text-center">Payment</th>
            <th className="w-[11%] px-3 py-3 text-center">Order</th>
            <th className="w-[14%] px-3 py-3">Fulfillment</th>
            <th className="w-[5%] px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr
              key={order.id}
              className={`transition-colors hover:bg-surface-low/75 ${order.orderStatus === "cancelled" ? "bg-surface-low/30" : ""}`}
            >
              <td className="px-4 py-4 align-middle">
                {order.id.startsWith("adm_txn_print_local_") ? (
                  <span
                    title="Detail is available after backend persistence"
                    className="block truncate font-mono text-[11px] font-semibold"
                  >
                    {order.reference}
                  </span>
                ) : (
                  <Link
                    href={`/admin/printed-orders/${order.id}`}
                    prefetch={false}
                    className="block truncate font-mono text-[11px] font-semibold hover:text-secondary"
                  >
                    {order.reference}
                  </Link>
                )}
                <p className="mt-1 text-[9px] text-on-surface-variant">
                  {orderDateFormat.format(new Date(order.createdAt))}
                </p>
              </td>
              <td className="px-3 py-4 align-middle">
                {order.customer.id ? (
                  <Link
                    href={`/admin/customers/${order.customer.id}`}
                    prefetch={false}
                    className="block truncate text-[11px] font-semibold hover:text-secondary"
                  >
                    {order.customer.name}
                  </Link>
                ) : (
                  <p className="truncate text-[11px] font-semibold">
                    {order.customer.name}
                  </p>
                )}
                <p className="mt-1 text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                  {order.customer.accountType === "managed"
                    ? "Managed · No login"
                    : order.customer.accountType === "registered"
                      ? "Registered"
                      : "Manual contact"}
                </p>
              </td>
              <td className="px-3 py-4 align-middle">
                <p className="truncate text-[11px] font-semibold">
                  {order.productName}
                </p>
                <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-on-surface-variant">
                  {order.designVariant}
                </p>
              </td>
              <td className="px-3 py-4 text-center align-middle">
                <p className="font-serif text-[18px]">{order.quantity}</p>
                <p className="text-[8px] text-on-surface-variant uppercase">
                  sets
                </p>
              </td>
              <td className="px-3 py-4 text-right align-middle">
                <p className="text-[11px] font-semibold whitespace-nowrap">
                  {idrFormat.format(order.amount)}
                </p>
                <p className="mt-1 text-[8px] text-on-surface-variant">
                  {idrFormat.format(order.unitPrice)} / set
                </p>
              </td>
              <td className="px-3 py-4 text-center align-middle">
                <PaymentStatusBadge status={order.status} />
              </td>
              <td className="px-3 py-4 text-center align-middle">
                <PrintedOrderStatusBadge status={order.orderStatus} />
              </td>
              <td className="px-3 py-4 align-middle">
                <p className="flex items-center gap-1.5 text-[9px] font-semibold">
                  {order.fulfillment.trackingNumber ? (
                    <PackageOpen aria-hidden size={12} />
                  ) : (
                    <MapPin aria-hidden size={12} />
                  )}
                  <span className="truncate">
                    {order.fulfillment.statusLabel}
                  </span>
                </p>
                <p className="mt-1 truncate text-[8px] text-on-surface-variant">
                  {order.fulfillment.trackingNumber ??
                    order.fulfillment.addressSummary ??
                    "Details unavailable"}
                </p>
              </td>
              <td className="px-3 py-4 text-right align-middle">
                <PrintedOrderRowActions
                  order={order}
                  isOpen={openActionId === order.id}
                  onToggle={() => onToggleActions(order.id)}
                  onUpdateStatus={() => onUpdateStatus(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
