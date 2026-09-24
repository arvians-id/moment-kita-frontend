import { idrFormat as currencyFormat } from "@/lib/format";
export { currencyFormat };

export const adminTemplateDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

