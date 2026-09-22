/**
 * Studio WhatsApp deep links.
 *
 * The number stays configurable and defaults to empty, which matches the
 * existing marketing behaviour: WhatsApp opens with a prefilled message and
 * lets the visitor pick the studio contact.
 */
const studioNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
  /[^0-9]/g,
  "",
);

export function whatsappHref(message: string): string {
  return `https://wa.me/${studioNumber}?text=${encodeURIComponent(message)}`;
}

/** Safe attributes for every outbound WhatsApp link. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
