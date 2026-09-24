import { CheckCircle2, ReceiptText, Sparkles, Wallet } from "lucide-react";

import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { TransactionsOverview } from "@/services/customer/transaction-service";
import { idrFormat as currency } from "@/lib/format";


const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const cardClass =
  "flex flex-col justify-between border border-surface-highest p-5";

export function TransactionSummaryCards({
  overview,
}: {
  overview: TransactionsOverview;
}) {
  const { entitlement, counts, totalSettledAmount, latestTransaction } =
    overview;
  const quotaUsed = Math.max(
    0,
    entitlement.quotaGranted - entitlement.quotaRemaining,
  );
  const quotaPercent = entitlement.quotaGranted
    ? Math.round((quotaUsed / entitlement.quotaGranted) * 100)
    : 0;

  return (
    <section className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
      <article className={`${cardClass} bg-surface-lowest`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Current Plan
          </span>
          <Sparkles aria-hidden size={17} className="shrink-0 text-secondary" />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {entitlement.packageName}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {entitlement.quotaNote}
          </p>
        </div>
      </article>

      <article className={`${cardClass} bg-surface-lowest`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Invitation Quota
          </span>
          <span className="shrink-0 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-secondary uppercase">
            {quotaUsed} of {entitlement.quotaGranted} used
          </span>
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {entitlement.quotaRemaining} Remaining
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden bg-surface-container">
            <div
              className="h-full bg-secondary"
              style={{ width: `${Math.min(100, quotaPercent)}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] leading-4 font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            {quotaPercent}% quota allocation deployed
          </p>
        </div>
      </article>

      <article className={`${cardClass} bg-surface-lowest`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Total Purchases
          </span>
          <ReceiptText aria-hidden size={17} className="shrink-0" />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {counts.all} {counts.all === 1 ? "Order" : "Orders"}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {currency.format(totalSettledAmount)} settled across celebrations
          </p>
        </div>
      </article>

      <article className={`${cardClass} bg-surface-low`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Latest Transaction
          </span>
          {latestTransaction ? (
            <TransactionStatusBadge status={latestTransaction.status} />
          ) : (
            <Wallet aria-hidden size={17} className="shrink-0" />
          )}
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {latestTransaction
              ? currency.format(latestTransaction.amount.total)
              : "—"}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {latestTransaction
              ? `${dateFormat.format(new Date(latestTransaction.createdAt))} via ${latestTransaction.payment.method}`
              : "No purchases yet"}
          </p>
        </div>
        {latestTransaction ? (
          <p className="mt-2 flex items-center gap-1 text-[11px] leading-4 text-on-surface-variant">
            <CheckCircle2
              aria-hidden
              size={13}
              className="shrink-0 text-secondary"
            />
            <span className="truncate">
              Settlement Ref #{latestTransaction.reference}
            </span>
          </p>
        ) : null}
      </article>
    </section>
  );
}
