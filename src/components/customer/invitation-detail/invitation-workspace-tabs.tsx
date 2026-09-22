import { buildInvitationNavigation } from "@/config/customer-navigation";
import type { InvitationDetail } from "@/types";

/**
 * In-page echo of the invitation workspace sections.
 *
 * Destinations and availability come from the canonical navigation config, so
 * this never becomes a competing navigation system — it mirrors the sidebar
 * and surfaces each section's count.
 */
export function InvitationWorkspaceTabs({
  detail,
}: {
  detail: InvitationDetail;
}) {
  const { invitation, guests, wishes, gift } = detail;
  const items = buildInvitationNavigation(invitation.id);

  const counts: Record<string, string | undefined> = {
    Guests: guests ? String(guests.totalInvited) : undefined,
    RSVP: guests ? String(guests.attending + guests.declined) : undefined,
    Wishes: wishes.length > 0 ? String(wishes.length) : undefined,
    "Digital Gift": gift ? `${gift.accounts.length} active` : undefined,
  };

  return (
    <nav
      aria-label="Invitation sections"
      className="flex w-full items-center gap-1 overflow-x-auto bg-surface-low p-1.5"
    >
      {items.map((item) => {
        const isOverview = item.label === "Overview";
        const count = counts[item.label];

        return (
          <span
            key={item.href}
            aria-current={isOverview ? "page" : undefined}
            aria-disabled={isOverview ? undefined : "true"}
            className={`flex shrink-0 items-center gap-2 px-4 py-2 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap uppercase ${
              isOverview
                ? "bg-surface-lowest text-on-surface shadow-sm"
                : "cursor-not-allowed text-on-surface-variant/70"
            }`}
          >
            {isOverview ? (
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-secondary"
              />
            ) : null}
            <span>{item.label}</span>
            {count ? (
              <span className="rounded-full bg-surface-high px-1.5 text-[11px] font-medium normal-case">
                {count}
              </span>
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}
