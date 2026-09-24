import { idrFormat, numberFormat } from "@/lib/format";
export { idrFormat };

export { numberFormat };



export const quotaDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export const quotaDateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

export function formatMaybeDate(value: string | null): string {
  return value ? quotaDateFormat.format(new Date(value)) : "No activity yet";
}
