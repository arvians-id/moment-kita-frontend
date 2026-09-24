"use client";

import {
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { PrintedOrderCardList } from "@/components/admin/printed-orders/printed-order-card-list";
import { PrintedOrderTable } from "@/components/admin/printed-orders/printed-order-table";
import { printedOrderStatusLabel } from "@/components/admin/printed-orders/printed-order-utils";
import { UpdateOrderStatusDialog } from "@/components/admin/printed-orders/update-order-status-dialog";
import type {
  AdminPrintedOrderItem,
  AdminPrintedOrderStatus,
  PrintedProduct,
  TransactionStatus,
} from "@/types";

type OrderFilter = "all" | AdminPrintedOrderStatus | "ready_shipped";
type PaymentFilter = "all" | TransactionStatus;

const selectClass =
  "h-10 w-full cursor-pointer appearance-none border border-transparent bg-surface-low py-1.5 pr-8 pl-3 text-[11px] outline-none transition-colors focus:border-secondary";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0">
      {children}
      <ChevronDown
        aria-hidden
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}

export function PrintedOrderDirectory({
  orders,
  products,
  onStatusChange,
}: {
  orders: AdminPrintedOrderItem[];
  products: PrintedProduct[];
  onStatusChange: (
    id: string,
    status: AdminPrintedOrderStatus,
    note: string,
  ) => void;
}) {
  const [query, setQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [productFilter, setProductFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [pendingOrder, setPendingOrder] =
    useState<AdminPrintedOrderItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const term = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      orders.filter((order) => {
        const createdDay = order.createdAt.slice(0, 10);
        const matchesOrder =
          orderFilter === "all" ||
          (orderFilter === "ready_shipped"
            ? order.orderStatus === "ready" || order.orderStatus === "shipped"
            : order.orderStatus === orderFilter);
        const matchesPayment =
          paymentFilter === "all" || order.status === paymentFilter;
        const matchesProduct =
          productFilter === "all" || order.productId === productFilter;
        const matchesFrom = !dateFrom || createdDay >= dateFrom;
        const matchesTo = !dateTo || createdDay <= dateTo;
        const matchesQuery =
          term === "" ||
          `${order.reference} ${order.customer.name} ${order.productName} ${order.designVariant}`
            .toLowerCase()
            .includes(term);

        return (
          matchesOrder &&
          matchesPayment &&
          matchesProduct &&
          matchesFrom &&
          matchesTo &&
          matchesQuery
        );
      }),
    [dateFrom, dateTo, orderFilter, orders, paymentFilter, productFilter, term],
  );

  function resetFilters() {
    setQuery("");
    setOrderFilter("all");
    setPaymentFilter("all");
    setProductFilter("all");
    setDateFrom("");
    setDateTo("");
    setOpenActionId(null);
  }

  const segments: readonly { id: OrderFilter; label: string; count: number }[] =
    [
      { id: "all", label: "All Orders", count: orders.length },
      {
        id: "new",
        label: "New",
        count: orders.filter((order) => order.orderStatus === "new").length,
      },
      {
        id: "confirmed",
        label: "Confirmed",
        count: orders.filter((order) => order.orderStatus === "confirmed")
          .length,
      },
      {
        id: "in_production",
        label: "In Production",
        count: orders.filter((order) => order.orderStatus === "in_production")
          .length,
      },
      {
        id: "ready_shipped",
        label: "Ready / Shipped",
        count: orders.filter((order) =>
          ["ready", "shipped"].includes(order.orderStatus),
        ).length,
      },
      {
        id: "completed",
        label: "Completed",
        count: orders.filter((order) => order.orderStatus === "completed")
          .length,
      },
      {
        id: "cancelled",
        label: "Cancelled",
        count: orders.filter((order) => order.orderStatus === "cancelled")
          .length,
      },
    ];

  return (
    <section className="space-y-5">
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

      <div className="space-y-4 border border-border bg-surface-lowest p-4 shadow-sm sm:p-5">
        <div className="overflow-x-auto border-b border-border pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="group"
            aria-label="Printed order status segments"
            className="flex min-w-max gap-1"
          >
            {segments.map((segment) => {
              const active = orderFilter === segment.id;
              return (
                <button
                  key={segment.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setOrderFilter(segment.id)}
                  className={`min-h-8 px-3 text-[9px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors ${active ? "bg-primary text-primary-foreground" : "text-on-surface-variant hover:bg-surface-container hover:text-primary"}`}
                >
                  {segment.label}{" "}
                  <span className="ml-1 opacity-65">{segment.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-12">
          <div className="relative h-10 lg:col-span-5">
            <Search
              aria-hidden
              size={15}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <label htmlFor="printed-order-search" className="sr-only">
              Search printed orders
            </label>
            <input
              id="printed-order-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search order, customer, product, or design..."
              className="h-10 w-full border border-transparent bg-surface-low pr-3 pl-9 text-[12px] outline-none placeholder:text-on-surface-variant/60 focus:border-secondary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 lg:col-span-7 lg:grid-cols-3">
            <SelectShell>
              <label htmlFor="printed-payment-filter" className="sr-only">
                Payment status
              </label>
              <select
                id="printed-payment-filter"
                value={paymentFilter}
                onChange={(event) =>
                  setPaymentFilter(event.target.value as PaymentFilter)
                }
                className={selectClass}
              >
                <option value="all">Payment: All</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="printed-product-filter" className="sr-only">
                Product
              </label>
              <select
                id="printed-product-filter"
                value={productFilter}
                onChange={(event) => setProductFilter(event.target.value)}
                className={selectClass}
              >
                <option value="all">Product: All</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </SelectShell>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-10 items-center justify-center gap-2 px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase hover:bg-surface-container"
            >
              <RotateCcw aria-hidden size={13} /> Reset
            </button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Ordered from
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
            />
          </label>
          <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Ordered to
            <input
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
            />
          </label>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <PrintedOrderTable
            orders={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
            onUpdateStatus={(order) => {
              setOpenActionId(null);
              setPendingOrder(order);
            }}
          />
          <PrintedOrderCardList
            orders={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
            onUpdateStatus={(order) => {
              setOpenActionId(null);
              setPendingOrder(order);
            }}
          />
          <div className="flex flex-col gap-2 border border-border bg-surface-low px-4 py-3 text-[11px] text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <strong className="text-primary">{visible.length}</strong>{" "}
              of <strong className="text-primary">{orders.length}</strong>{" "}
              printed orders
            </p>
            <p className="text-[9px] font-semibold tracking-[0.1em] uppercase">
              Manual operations · Page 1
            </p>
          </div>
        </>
      ) : (
        <div className="grid min-h-64 place-items-center border border-dashed border-border bg-surface-lowest p-8 text-center">
          <div>
            <SearchX
              aria-hidden
              size={28}
              className="mx-auto text-on-surface-variant"
            />
            <p className="mt-3 font-serif text-[20px]">
              No printed orders found
            </p>
            <p className="mt-1 text-[11px] text-on-surface-variant">
              Adjust the filters or clear the search.
            </p>
          </div>
        </div>
      )}

      {pendingOrder ? (
        <UpdateOrderStatusDialog
          order={pendingOrder}
          onClose={() => setPendingOrder(null)}
          onConfirm={(status, note) => {
            onStatusChange(pendingOrder.id, status, note);
            setNotice(
              `${pendingOrder.reference} moved from ${printedOrderStatusLabel[pendingOrder.orderStatus]} to ${printedOrderStatusLabel[status]}. Payment status was not changed.`,
            );
            setPendingOrder(null);
          }}
        />
      ) : null}
    </section>
  );
}
