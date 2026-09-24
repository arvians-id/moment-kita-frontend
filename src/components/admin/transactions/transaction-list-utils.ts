import type { AdminTransactionListItem, AdminTransactionPurpose } from "@/types";
import { idrFormat } from "@/lib/format";
export { idrFormat };



export const transactionDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export const transactionDateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

export function formatMaybeDate(value: string | null): string {
  return value ? transactionDateFormat.format(new Date(value)) : "Not yet";
}

export const purposeLabel: Record<AdminTransactionPurpose, string> = {
  package: "Digital Package",
  quotaAddon: "Additional Invitation Quota",
  extension: "Invitation Extension",
  printed: "Printed Order",
};

/** Plain-language description of what confirming this transaction would do. */
export function effectDescription(transaction: AdminTransactionListItem): string {
  const name = transaction.customer.name;

  switch (transaction.purpose) {
    case "package":
      return `Activates ${transaction.productName} for ${name} and grants +1 invitation quota.`;
    case "quotaAddon":
      return `Grants +1 invitation quota to ${name}.`;
    case "extension":
      return transaction.extension
        ? `Extends ${transaction.relatedInvitation?.coupleLabel ?? "the related invitation"}'s hosting window from ${transactionDateFormat.format(new Date(transaction.extension.previousExpiresAt))} to ${transactionDateFormat.format(new Date(transaction.extension.extendedUntil))}.`
        : `Confirms the invitation extension for ${name}.`;
    case "printed":
      return `Confirms the printed order for production for ${name}.`;
    default:
      return `Confirms the purchase for ${name}.`;
  }
}
