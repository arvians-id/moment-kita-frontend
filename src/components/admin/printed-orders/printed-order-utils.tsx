import type { AdminPrintedOrderStatus, TransactionStatus } from "@/types";

export const idrFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const orderDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export const printedOrderStatusLabel: Record<AdminPrintedOrderStatus, string> =
  {
    new: "New",
    confirmed: "Confirmed",
    in_production: "In Production",
    ready: "Ready",
    shipped: "Shipped",
    completed: "Completed",
    cancelled: "Cancelled",
  };

export const paymentStatusLabel: Record<TransactionStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export const validStatusTransitions: Record<
  AdminPrintedOrderStatus,
  AdminPrintedOrderStatus[]
> = {
  new: ["confirmed", "cancelled"],
  confirmed: ["in_production", "cancelled"],
  in_production: ["ready", "cancelled"],
  ready: ["shipped", "completed"],
  shipped: ["completed"],
  completed: [],
  cancelled: [],
};

export function PrintedOrderStatusBadge({
  status,
}: {
  status: AdminPrintedOrderStatus;
}) {
  const tone =
    status === "completed"
      ? "bg-emerald-50 text-emerald-800"
      : status === "cancelled"
        ? "bg-surface-container text-on-surface-variant"
        : status === "new" || status === "confirmed"
          ? "bg-amber-50 text-amber-800"
          : "bg-accent text-accent-foreground";

  return (
    <span
      className={`inline-flex min-h-6 items-center px-2 text-[8px] font-semibold tracking-[0.09em] whitespace-nowrap uppercase ${tone}`}
    >
      {printedOrderStatusLabel[status]}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: TransactionStatus }) {
  const tone =
    status === "paid"
      ? "bg-emerald-50 text-emerald-800"
      : status === "pending"
        ? "bg-amber-50 text-amber-800"
        : status === "refunded"
          ? "bg-sky-50 text-sky-800"
          : "bg-surface-container text-on-surface-variant";

  return (
    <span
      className={`inline-flex min-h-6 items-center px-2 text-[8px] font-semibold tracking-[0.09em] whitespace-nowrap uppercase ${tone}`}
    >
      {paymentStatusLabel[status]}
    </span>
  );
}
