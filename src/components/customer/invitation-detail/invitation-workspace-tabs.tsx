import Link from "next/link";

import { buildInvitationNavigation } from "@/config/customer-navigation";
import type { InvitationDetail } from "@/types";

/**
 * In-page echo of the invitation workspace sections.
 *
 * Destinations and availability come from the canonical navigation config, so
 * this never becomes a competing navigation system — it mirrors the sidebar
 * and surfaces each section's count. Every section besides Overview now has a
 * real page, so this renders live links rather than disabled placeholders.
 */
export function InvitationWorkspaceTabs({
  detail,
}: {
  detail: InvitationDetail;
}) {
  const { invitation, guests, wishes, gift } = detail;
  const items = buildInvitationNavigation(invitation.id);
  const totalWishes = invitation.metrics?.wishes ?? wishes.length;

  const counts: Record<string, string | undefined> = {
    Guests: guests ? String(guests.totalInvited) : undefined,
    RSVP: guests ? String(guests.attending + guests.declined) : undefined,
    Wishes: totalWishes > 0 ? String(totalWishes) : undefined,
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
        const tabClass = `flex shrink-0 items-center gap-2 px-4 py-2 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors ${
          isOverview
            ? "bg-surface-lowest text-on-surface shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
        }`;
        const content = (
          <>
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
          </>
        );

        if (isOverview || !item.available) {
          return (
            <span
              key={item.href}
              aria-current={isOverview ? "page" : undefined}
              aria-disabled={!item.available ? "true" : undefined}
              className={
                item.available
                  ? tabClass
                  : `${tabClass} cursor-not-allowed text-on-surface-variant/70`
              }
            >
              {content}
            </span>
          );
        }

        return (
          <Link key={item.href} href={item.href} className={tabClass}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
