import { CalendarDays, MapPin, PackageOpen, UserRound } from "lucide-react";
import Link from "next/link";

import { PrintedOrderRowActions } from "@/components/admin/printed-orders/printed-order-row-actions";
import {
  idrFormat,
  orderDateFormat,
  PaymentStatusBadge,
  PrintedOrderStatusBadge,
} from "@/components/admin/printed-orders/printed-order-utils";
import type { AdminPrintedOrderItem } from "@/types";

export function PrintedOrderCardList({
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
    <ul className="grid gap-3 md:grid-cols-2 xl:hidden">
      {orders.map((order) => (
        <li
          key={order.id}
          className={`min-w-0 border border-border bg-surface-lowest p-4 shadow-sm ${order.orderStatus === "cancelled" ? "bg-surface-low/40" : ""}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-1.5">
                <PrintedOrderStatusBadge status={order.orderStatus} />
                <PaymentStatusBadge status={order.status} />
              </div>
              {order.id.startsWith("adm_txn_print_local_") ? (
                <span
                  title="Detail is available after backend persistence"
                  className="mt-3 block font-mono text-[11px] font-semibold"
                >
                  {order.reference}
                </span>
              ) : (
                <Link
                  href={`/admin/printed-orders/${order.id}`}
                  prefetch={false}
                  className="mt-3 block font-mono text-[11px] font-semibold hover:text-secondary"
                >
                  {order.reference}
                </Link>
              )}
              <h2 className="mt-1 truncate text-[14px] font-semibold">
                {order.productName}
              </h2>
            </div>
            <PrintedOrderRowActions
              order={order}
              isOpen={openActionId === order.id}
              onToggle={() => onToggleActions(order.id)}
              onUpdateStatus={() => onUpdateStatus(order)}
            />
          </div>

          <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-on-surface-variant">
            {order.designVariant}
          </p>

          <div className="mt-4 space-y-2 border-t border-border pt-3 text-[10px] text-on-surface-variant">
            {order.customer.id ? (
              <Link
                href={`/admin/customers/${order.customer.id}`}
                prefetch={false}
                className="flex min-w-0 items-center gap-2 hover:text-secondary"
              >
                <UserRound aria-hidden size={13} className="shrink-0" />
                <span className="truncate font-semibold text-on-surface">
                  {order.customer.name}
                </span>
                <span className="shrink-0 text-[8px] uppercase">
                  {order.customer.accountType === "managed"
                    ? "Managed"
                    : "Registered"}
                </span>
              </Link>
            ) : (
              <p className="flex min-w-0 items-center gap-2">
                <UserRound aria-hidden size={13} className="shrink-0" />
                <span className="truncate font-semibold text-on-surface">
                  {order.customer.name}
                </span>
              </p>
            )}
            <p className="flex min-w-0 items-center gap-2">
              {order.fulfillment.trackingNumber ? (
                <PackageOpen aria-hidden size={13} className="shrink-0" />
              ) : (
                <MapPin aria-hidden size={13} className="shrink-0" />
              )}
              <span className="truncate">{order.fulfillment.statusLabel}</span>
            </p>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 bg-surface-low p-3 text-center">
            <div>
              <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                Quantity
              </dt>
              <dd className="mt-1 text-[12px] font-semibold">
                {order.quantity} sets
              </dd>
            </div>
            <div className="border-x border-border px-1">
              <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                Amount
              </dt>
              <dd className="mt-1 truncate text-[10px] font-semibold">
                {idrFormat.format(order.amount)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                Ordered
              </dt>
              <dd className="mt-1 flex items-center justify-center gap-1 text-[9px] font-semibold">
                <CalendarDays aria-hidden size={11} />
                {orderDateFormat.format(new Date(order.createdAt))}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
