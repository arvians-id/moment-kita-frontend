/**
 * Shared display formatters. Money is stored as integer IDR and only formatted
 * here; date display helpers stay next to their feature because their fields
 * differ, but all use an explicit IANA zone rather than the viewer's locale.
 */
export const idrFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const numberFormat = new Intl.NumberFormat("en-US");
