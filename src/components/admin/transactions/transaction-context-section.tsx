import { ArrowRight, Gift, Package, Printer, TimerReset } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  idrFormat,
  transactionDateFormat,
} from "@/components/admin/transactions/transaction-list-utils";
import type {
  AdminTransactionExtensionEffect,
  AdminTransactionListItem,
  AdminTransactionPackageEffect,
  AdminTransactionPrintedEffect,
  AdminTransactionQuotaEffect,
} from "@/types";

/**
 * The commercial-effect callout reads differently depending on whether the
 * effect already happened, is still projected, or will never happen —
 * cancelled/refunded transactions must never imply a future action.
 */
function effectNote(
  transaction: Pick<AdminTransactionListItem, "status" | "paidAt">,
  appliedText: string,
  pendingText: string,
): string {
  switch (transaction.status) {
    case "paid":
      return appliedText;
    case "pending":
      return pendingText;
    case "cancelled":
      return transaction.paidAt
        ? `${appliedText} The later cancellation did not reverse this effect or refund the settled payment.`
        : "This transaction was cancelled before its commercial effect was applied.";
    case "refunded":
      return "This transaction was refunded. Its commercial effect is no longer active.";
    default:
      return pendingText;
  }
}

function Panel({
  eyebrow,
  title,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-[24px]">{title}</h2>
        </div>
        <Icon aria-hidden size={20} className="shrink-0 text-secondary" />
      </div>
      {children}
    </section>
  );
}

function EffectStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-low p-4">
      <dt className="text-[8px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-[13px] font-semibold">{value}</dd>
    </div>
  );
}

function PackageContext({
  transaction,
  effect,
}: {
  transaction: AdminTransactionListItem;
  effect: AdminTransactionPackageEffect;
}) {
  return (
    <Panel eyebrow="Digital Package" title="Package purchase" icon={Package}>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <EffectStat label="Package" value={effect.packageName} />
        <EffectStat label="Price" value={idrFormat.format(effect.price)} />
        <EffectStat
          label="Included Invitation Quota"
          value={`+${effect.quotaGranted} Invitation Quota`}
        />
        <EffectStat
          label="Active Duration"
          value={`${effect.activeDurationDays} days`}
        />
      </dl>
      <p className="mt-4 bg-accent p-4 text-[11px] leading-5 text-accent-foreground">
        {effectNote(
          transaction,
          `${effect.packageName} is active for ${transaction.customer.name}, with +${effect.quotaGranted} invitation quota granted.`,
          `Confirming this payment will activate ${effect.packageName} and grant +${effect.quotaGranted} invitation quota to ${transaction.customer.name}.`,
        )}
      </p>
    </Panel>
  );
}

function QuotaContext({
  transaction,
  effect,
}: {
  transaction: AdminTransactionListItem;
  effect: AdminTransactionQuotaEffect;
}) {
  return (
    <Panel eyebrow="Additional Quota" title="Quota purchase" icon={Gift}>
      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <EffectStat label="Quantity Purchased" value={`+${effect.quantity}`} />
        <EffectStat
          label="Quota Before"
          value={effect.quotaBefore === null ? "Unresolved" : `${effect.quotaBefore}`}
        />
        <EffectStat
          label="Resulting Quota"
          value={effect.quotaAfter === null ? "Unresolved" : `${effect.quotaAfter}`}
        />
      </dl>
      <p className="mt-4 bg-accent p-4 text-[11px] leading-5 text-accent-foreground">
        {effectNote(
          transaction,
          `+${effect.quantity} invitation quota has been granted to ${transaction.customer.name}.`,
          `Confirming this payment will grant +${effect.quantity} invitation quota to ${transaction.customer.name}.`,
        )}
      </p>
    </Panel>
  );
}

function ExtensionContext({
  transaction,
  effect,
}: {
  transaction: AdminTransactionListItem;
  effect: AdminTransactionExtensionEffect;
}) {
  return (
    <Panel eyebrow="Invitation Extension" title="Hosting extension" icon={TimerReset}>
      <Link
        href={`/admin/invitations/${effect.invitationId}`}
        prefetch={false}
        className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-secondary hover:underline"
      >
        {effect.coupleLabel} <ArrowRight aria-hidden size={13} />
      </Link>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <EffectStat
          label="Existing Expiration"
          value={transactionDateFormat.format(new Date(effect.previousExpiresAt))}
        />
        <EffectStat
          label="Extension Duration"
          value={`+${effect.extensionDays} days`}
        />
        <EffectStat
          label="Resulting Expiration"
          value={transactionDateFormat.format(new Date(effect.newExpiresAt))}
        />
      </dl>
      <p className="mt-4 bg-accent p-4 text-[11px] leading-5 text-accent-foreground">
        {effectNote(
          transaction,
          `${effect.coupleLabel}'s hosting window was extended through ${transactionDateFormat.format(new Date(effect.newExpiresAt))}.`,
          `Confirming this payment will extend ${effect.coupleLabel}'s hosting window to the later of today or its existing expiration, plus ${effect.extensionDays} days.`,
        )}
      </p>
    </Panel>
  );
}

function PrintedContext({
  transaction,
  effect,
}: {
  transaction: AdminTransactionListItem;
  effect: AdminTransactionPrintedEffect;
}) {
  return (
    <Panel eyebrow="Printed Order" title="Printed product" icon={Printer}>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <EffectStat label="Order Reference" value={effect.orderReference} />
        <EffectStat label="Product Summary" value={effect.summary} />
        <EffectStat label="Total Amount" value={idrFormat.format(transaction.amount)} />
      </dl>
      <p className="mt-4 border border-border p-4 text-[10px] leading-5 text-on-surface-variant">
        Printed order production and fulfillment is managed in the dedicated
        Printed Orders module, not here.
      </p>
    </Panel>
  );
}

export function TransactionContextSection({
  transaction,
  packageEffect,
  quotaEffect,
  extensionEffect,
  printedEffect,
}: {
  transaction: AdminTransactionListItem;
  packageEffect: AdminTransactionPackageEffect | null;
  quotaEffect: AdminTransactionQuotaEffect | null;
  extensionEffect: AdminTransactionExtensionEffect | null;
  printedEffect: AdminTransactionPrintedEffect | null;
}) {
  if (packageEffect) {
    return <PackageContext transaction={transaction} effect={packageEffect} />;
  }
  if (quotaEffect) {
    return <QuotaContext transaction={transaction} effect={quotaEffect} />;
  }
  if (extensionEffect) {
    return <ExtensionContext transaction={transaction} effect={extensionEffect} />;
  }
  if (printedEffect) {
    return <PrintedContext transaction={transaction} effect={printedEffect} />;
  }

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Commercial Effect
      </p>
      <h2 className="mt-1 font-serif text-[24px]">No linked resource</h2>
      <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
        This transaction has no related invitation, package, or printed
        order on file.
      </p>
    </section>
  );
}
