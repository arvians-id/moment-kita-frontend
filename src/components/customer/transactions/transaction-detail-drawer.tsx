"use client";

import {
  Ban,
  Building2,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Receipt,
  RotateCcw,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";
import type { CustomerTransactionWithInvitation, TransactionStatus } from "@/types";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const statusBanner: Record<
  TransactionStatus,
  { icon: LucideIcon; tone: string; title: string; body: (t: CustomerTransactionWithInvitation) => string }
> = {
  paid: {
    icon: CheckCircle2,
    tone: "bg-secondary/10 text-on-surface",
    title: "Payment Confirmed & Reconciled",
    body: (t) =>
      t.entitlementsGranted.length > 0
        ? `Your ${t.productName} entitlement has been credited to your account.`
        : "Your payment has been confirmed and reconciled.",
  },
  pending: {
    icon: Clock,
    tone: "bg-champagne/40 text-on-surface",
    title: "We're Reviewing Your Payment",
    body: () =>
      "We're reviewing your payment. Your purchase will become available once verification is complete — usually within 15–30 minutes during studio hours.",
  },
  cancelled: {
    icon: Ban,
    tone: "bg-surface-container text-on-surface-variant",
    title: "Transaction Cancelled",
    body: () =>
      "This transaction was cancelled before payment was confirmed. No charge was made and no quota was consumed.",
  },
  refunded: {
    icon: RotateCcw,
    tone: "bg-surface-highest text-on-surface-variant",
    title: "Payment Refunded",
    body: () =>
      "This payment has been refunded through your original payment channel. Any entitlement already granted remains unaffected unless arranged otherwise with our concierge team.",
  },
};

export function TransactionDetailDrawer({
  transaction,
  onClose,
}: {
  transaction: CustomerTransactionWithInvitation;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const banner = statusBanner[transaction.status];
  const BannerIcon = banner.icon;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  async function copyReference() {
    await navigator.clipboard.writeText(transaction.reference);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close transaction details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-espresso/50 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-surface-lowest shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 bg-surface-low px-5 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Transaction Dossier
            </p>
            <h2
              id="transaction-drawer-title"
              className="mt-1 flex items-center gap-2 font-serif text-[24px] leading-8"
            >
              <span className="truncate">#{transaction.reference}</span>
              <button
                type="button"
                onClick={copyReference}
                aria-label="Copy transaction reference"
                className="shrink-0 text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <Copy aria-hidden size={16} />
              </button>
            </h2>
            {copied ? (
              <p aria-live="polite" className="mt-0.5 text-[11px] text-secondary">
                Reference copied.
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <X aria-hidden size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-8">
          <div className={`flex items-start gap-2.5 p-3.5 ${banner.tone}`}>
            <BannerIcon aria-hidden size={20} className="mt-0.5 shrink-0" />
            <div className="flex flex-col text-[13px]">
              <span className="font-semibold">{banner.title}</span>
              <span className="mt-0.5 leading-snug">
                {banner.body(transaction)}
              </span>
            </div>
          </div>

          <div className="bg-surface-low p-4">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              {transaction.productName}
            </span>
            <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
              {transaction.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 bg-surface-low p-4">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Financial Breakdown
            </span>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="font-medium">
                {currency.format(transaction.amount.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-on-surface-variant">VAT / PPN (11%)</span>
              <span className="font-medium">
                {currency.format(transaction.amount.tax)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-on-surface-variant">
                Payment Gateway Surcharge
              </span>
              <span className="font-semibold text-secondary">
                {transaction.amount.surcharge > 0
                  ? currency.format(transaction.amount.surcharge)
                  : "Free"}
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between bg-surface-container-high/60 px-2.5 py-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                {transaction.status === "paid" ? "Total Settled" : "Total Amount"}
              </span>
              <span className="font-serif text-[22px] font-bold text-primary">
                {currency.format(transaction.amount.total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-surface-low p-4">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Payment Method
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2">
                <Building2 aria-hidden size={18} className="shrink-0 text-secondary" />
                <span className="truncate text-[13px] font-semibold">
                  {transaction.payment.method}
                </span>
              </span>
              {transaction.payment.channelBadge ? (
                <span className="shrink-0 bg-surface-container px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
                  {transaction.payment.channelBadge}
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[12px]">
              {transaction.payment.accountReference ? (
                <div>
                  <span className="block text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                    Account Reference
                  </span>
                  <span className="font-mono font-medium">
                    {transaction.payment.accountReference}
                  </span>
                </div>
              ) : null}
              <div>
                <span className="block text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                  {transaction.status === "paid" ? "Verified" : "Submitted"}
                </span>
                <span>
                  {transaction.payment.verifiedAt
                    ? dateTimeFormat.format(new Date(transaction.payment.verifiedAt))
                    : dateTimeFormat.format(new Date(transaction.createdAt))}
                </span>
              </div>
              {transaction.payment.bankReferenceNumber ? (
                <div className="col-span-2">
                  <span className="block text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                    Bank Reference #
                  </span>
                  <span className="font-mono">
                    {transaction.payment.bankReferenceNumber}
                  </span>
                </div>
              ) : null}
            </div>
            {transaction.status === "pending" ? (
              <p className="pt-1 text-[11px] text-on-surface-variant">
                Awaiting manual verification by our billing concierge.
              </p>
            ) : null}
          </div>

          {transaction.extension ? (
            <div className="flex flex-col gap-2 bg-surface-low p-4">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-secondary uppercase">
                Hosting Extension
              </span>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-on-surface-variant">Previously expired</span>
                <span className="font-medium">
                  {dateFormat.format(new Date(transaction.extension.previousExpiresAt))}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-on-surface-variant">Extended until</span>
                <span className="font-semibold text-secondary">
                  {dateFormat.format(new Date(transaction.extension.extendedUntil))}
                </span>
              </div>
            </div>
          ) : null}

          {transaction.entitlementsGranted.length > 0 ? (
            <div className="flex flex-col gap-2 bg-surface-low p-4">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-secondary uppercase">
                Entitlements Unlocked
              </span>
              <ul className="flex flex-col gap-1.5 text-[13px]">
                {transaction.entitlementsGranted.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      aria-hidden
                      size={15}
                      className="mt-0.5 shrink-0 text-secondary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {transaction.relatedInvitation ? (
            <div className="flex flex-col gap-1.5 bg-surface-container-high/40 p-4">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Linked Celebration
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-semibold">
                  {transaction.relatedInvitation.coupleLabel}
                </span>
                <span className="shrink-0 text-[10px] font-semibold tracking-[0.1em] text-secondary uppercase">
                  {transaction.relatedInvitation.templateName}
                </span>
              </div>
              <Link
                href={`/app/invitations/${transaction.relatedInvitation.id}`}
                className="flex items-center gap-1 text-[11px] text-on-surface-variant transition-colors hover:text-secondary"
              >
                <span className="truncate font-mono">
                  momentkita.id/{transaction.relatedInvitation.slug}
                </span>
                <ExternalLink aria-hidden size={12} className="shrink-0" />
              </Link>
            </div>
          ) : null}

          {transaction.invoiceNumber ? (
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between px-1 text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                <span>Official Tax Invoice</span>
                <span className="font-mono text-on-surface">
                  #{transaction.invoiceNumber}
                </span>
              </div>
              {/* No PDF invoice generator exists yet; stays inert instead of a dead download. */}
              <span
                aria-disabled="true"
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 bg-secondary/60 py-2.5 text-[11px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase opacity-90"
              >
                <Receipt aria-hidden size={16} />
                Download Tax Receipt (PDF)
              </span>
            </div>
          ) : null}
        </div>

        <div className="border-t border-border bg-surface-low px-5 py-4 sm:px-8">
          <a
            href={whatsappHref(
              `I have a question about transaction ${transaction.reference}.`,
            )}
            {...externalLinkProps}
            className="flex w-full items-center justify-center gap-2 bg-surface-container px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            Contact Concierge Desk
          </a>
        </div>
      </aside>
    </div>
  );
}
