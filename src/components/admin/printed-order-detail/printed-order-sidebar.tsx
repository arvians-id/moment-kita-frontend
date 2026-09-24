"use client";

import {
  CalendarDays,
  Mail,
  MessageCircle,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Truck,
  UserRoundX,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  idrFormat,
  orderDateFormat,
  PaymentStatusBadge,
} from "@/components/admin/printed-orders/printed-order-utils";
import type {
  AdminCustomer,
  AdminPrintedOrderItem,
  AdminPrintedOrderActivity,
} from "@/types";

function PanelTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="border-b border-border pb-4">
      <p className="text-[8px] font-semibold tracking-[0.14em] text-secondary uppercase">
        {kicker}
      </p>
      <h2 className="mt-1 font-serif text-[21px]">{title}</h2>
    </div>
  );
}

export function PrintedOrderCustomerPanel({
  order,
  customer,
}: {
  order: AdminPrintedOrderItem;
  customer: AdminCustomer | null;
}) {
  const whatsapp = customer?.whatsapp ?? null;
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm">
      <PanelTitle kicker="Customer" title={order.customer.name} />
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-primary px-2.5 py-1 text-[8px] font-semibold tracking-[0.1em] text-primary-foreground uppercase">
          {order.customer.accountType === "managed"
            ? "Managed Customer"
            : order.customer.accountType === "registered"
              ? "Registered"
              : "Manual Contact"}
        </span>
        {customer?.linkedUserId ? (
          <span className="inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-1 text-[8px] font-semibold text-emerald-800 uppercase">
            <ShieldCheck aria-hidden size={11} /> Login linked
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 bg-surface-container px-2.5 py-1 text-[8px] font-semibold text-on-surface-variant uppercase">
            <UserRoundX aria-hidden size={11} /> No login account
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2 text-[10px] text-on-surface-variant">
        <p className="flex min-w-0 items-center gap-2">
          <Mail aria-hidden size={13} className="shrink-0" />
          <span className="truncate">
            {customer?.email ?? "No email on file"}
          </span>
        </p>
        {whatsapp ? (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 items-center gap-2 text-secondary hover:text-primary"
          >
            <MessageCircle aria-hidden size={13} className="shrink-0" />
            <span className="truncate">{whatsapp}</span>
          </a>
        ) : (
          <p className="flex items-center gap-2">
            <MessageCircle aria-hidden size={13} /> No WhatsApp on file
          </p>
        )}
      </div>
      {order.customer.id ? (
        <Link
          href={`/admin/customers/${order.customer.id}`}
          prefetch={false}
          className="mt-5 inline-flex min-h-10 w-full items-center justify-center bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-container-high"
        >
          View Customer Dossier
        </Link>
      ) : null}
    </section>
  );
}

export function PrintedOrderPaymentPanel({
  order,
}: {
  order: AdminPrintedOrderItem;
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm">
      <PanelTitle kicker="Commercial settlement" title="Payment" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <PaymentStatusBadge status={order.status} />
        <span className="font-serif text-[20px]">
          {idrFormat.format(order.amount)}
        </span>
      </div>
      <dl className="mt-4 space-y-3 bg-surface-low p-4 text-[10px]">
        <div className="flex justify-between gap-3">
          <dt className="text-on-surface-variant">Transaction</dt>
          <dd className="font-mono font-semibold">{order.reference}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-on-surface-variant">Method</dt>
          <dd className="text-right font-semibold">
            {order.payment?.method ?? "Not on file"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-on-surface-variant">Paid date</dt>
          <dd className="font-semibold">
            {order.paidAt
              ? orderDateFormat.format(new Date(order.paidAt))
              : "Not yet paid"}
          </dd>
        </div>
      </dl>
      <Link
        href={`/admin/transactions/${order.id}`}
        prefetch={false}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.1em] text-primary-foreground uppercase hover:bg-secondary"
      >
        <ReceiptText aria-hidden size={14} /> View Transaction
      </Link>
      <p className="mt-3 text-[9px] leading-4 text-on-surface-variant">
        Verification, cancellation, and refunds remain owned by Transaction
        Detail.
      </p>
    </section>
  );
}

export function PrintedOrderNotesPanel({
  order,
  internalNote,
  onSave,
}: {
  order: AdminPrintedOrderItem;
  internalNote: string | null;
  onSave: (note: string) => void;
}) {
  const [draft, setDraft] = useState(internalNote ?? "");
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm">
      <PanelTitle kicker="Concierge context" title="Order notes" />
      <div className="mt-4">
        <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Customer request
        </p>
        <p className="mt-2 bg-surface-low p-4 text-[10px] leading-5 text-on-surface-variant">
          {order.customerNote ?? "No customer-provided note on file."}
        </p>
      </div>
      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(draft);
        }}
      >
        <label className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Internal operational note
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={4}
            placeholder="Add proof, production, or delivery context..."
            className="mt-2 w-full resize-none border border-border px-3 py-2.5 text-[11px] leading-5 font-normal tracking-normal text-on-surface normal-case outline-none focus:border-secondary"
          />
        </label>
        <button
          type="submit"
          className="mt-2 min-h-10 w-full bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-container-high"
        >
          Save Internal Note
        </button>
      </form>
    </section>
  );
}

const activityIcon = {
  order: PackageCheck,
  payment: ReceiptText,
  production: CalendarDays,
  fulfillment: Truck,
  note: MessageCircle,
};

export function PrintedOrderActivity({
  activity,
}: {
  activity: AdminPrintedOrderActivity[];
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <div className="border-b border-border pb-4">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Operational stream
        </p>
        <h2 className="mt-1 font-serif text-[24px]">Order activity</h2>
        <p className="mt-1 text-[10px] leading-5 text-on-surface-variant">
          Order-scoped manual events only. This is not a global Audit Logs
          product.
        </p>
      </div>
      <ol className="mt-6">
        {activity.map((entry, index) => {
          const Icon = activityIcon[entry.kind];
          return (
            <li key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
              {index < activity.length - 1 ? (
                <span className="absolute top-9 bottom-0 left-[17px] w-px bg-border" />
              ) : null}
              <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-surface-container text-secondary">
                <Icon aria-hidden size={15} />
              </span>
              <div className="min-w-0 flex-1 border-b border-border pb-6 last:border-0 last:pb-0 sm:flex sm:justify-between sm:gap-5">
                <div>
                  <h3 className="text-[11px] font-semibold">{entry.title}</h3>
                  <p className="mt-1 text-[10px] leading-5 text-on-surface-variant">
                    {entry.description}
                  </p>
                  <p className="mt-2 text-[8px] font-semibold tracking-[0.1em] text-secondary uppercase">
                    {entry.actor}
                  </p>
                </div>
                <time
                  dateTime={entry.createdAt}
                  className="mt-2 block shrink-0 text-[9px] text-on-surface-variant sm:mt-0"
                >
                  {orderDateFormat.format(new Date(entry.createdAt))}
                </time>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
