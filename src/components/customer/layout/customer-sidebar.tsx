"use client";

import { BadgeCheck, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { WeddingSwitcher } from "@/components/customer/layout/wedding-switcher";
import {
  buildInvitationNavigation,
  customerGlobalNavigation,
  getInvitationIdFromPath,
  isCurrentRoute,
  isInvitationNavigationCurrent,
  type CustomerNavItem,
} from "@/config/customer-navigation";
import { cn } from "@/lib/utils";
import type { Customer, CustomerInvitation, EntitlementSummary } from "@/types";

const groupTitleClass =
  "px-3 text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase";
const itemBaseClass =
  "flex items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-[13px] leading-5 transition-colors";

export interface CustomerSidebarProps {
  customer: Customer;
  invitations: CustomerInvitation[];
  currentInvitation: CustomerInvitation | null;
  entitlement: EntitlementSummary;
  /** Overrides the Notifications item's static badge with the live count. */
  notificationsUnreadCount?: number;
  /** Lets the mobile drawer close itself when a destination is chosen. */
  onNavigate?: () => void;
}

function NavItem({
  item,
  isActive,
  onNavigate,
}: {
  item: CustomerNavItem;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  const inner = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        <Icon aria-hidden size={18} className="shrink-0" />
        <span className="truncate">{item.label}</span>
      </span>
      {item.badge ? (
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
          {item.badge}
        </span>
      ) : null}
      {!item.available ? (
        <span className="shrink-0 rounded-full bg-surface-container px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          Soon
        </span>
      ) : null}
    </>
  );

  // Destinations that do not exist yet stay inert instead of linking to a 404.
  if (!item.available) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          itemBaseClass,
          "cursor-not-allowed text-on-surface-variant/70",
        )}
      >
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        itemBaseClass,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
        isActive
          ? "bg-surface-high font-semibold text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
      )}
    >
      {inner}
    </Link>
  );
}

/**
 * The full Customer navigation surface. Rendered once on desktop inside the
 * persistent aside and again inside the mobile drawer — never duplicated.
 */
export function CustomerSidebarContent({
  customer,
  invitations,
  currentInvitation,
  entitlement,
  notificationsUnreadCount,
  onNavigate,
}: CustomerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [manualId, setManualId] = useState<string | null>(
    currentInvitation?.id ?? null,
  );

  /*
   * Inside an invitation workspace the URL owns the context, so the sidebar
   * always reflects the invitation being viewed. Elsewhere it falls back to
   * the switcher's own selection.
   */
  const routeInvitationId = getInvitationIdFromPath(pathname);
  const selectedId = routeInvitationId ?? manualId;

  const selected =
    invitations.find((invitation) => invitation.id === selectedId) ?? null;

  function handleSelectInvitation(invitationId: string) {
    setManualId(invitationId);
    // Switching weddings while inside a workspace moves to that workspace.
    if (routeInvitationId) {
      router.push(`/app/invitations/${invitationId}`);
      onNavigate?.();
    }
  }
  const invitationNavigation = selected
    ? buildInvitationNavigation(selected.id)
    : [];

  return (
    <div className="flex h-full flex-col justify-between gap-6 overflow-y-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <Link
          href="/app/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-secondary/30 font-serif text-sm text-secondary italic">
            MK
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg leading-none tracking-tight">
              Moment Kita
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Client Suite
            </span>
          </span>
        </Link>

        <nav aria-label="Customer navigation" className="flex flex-col gap-5">
          {customerGlobalNavigation.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <span className={cn(groupTitleClass, "mb-1")}>{group.title}</span>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={
                    item.href === "/app/notifications" &&
                    notificationsUnreadCount
                      ? { ...item, badge: notificationsUnreadCount }
                      : item
                  }
                  isActive={
                    item.available && isCurrentRoute(pathname, item.href)
                  }
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <span className={groupTitleClass}>Current Wedding</span>
            {selected ? (
              <>
                <WeddingSwitcher
                  invitations={invitations}
                  selectedId={selectedId}
                  onSelect={handleSelectInvitation}
                />
                <div className="mt-1 flex flex-col gap-1">
                  {invitationNavigation.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      isActive={
                        item.available &&
                        isInvitationNavigationCurrent(pathname, item.href)
                      }
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="mx-1 flex flex-col gap-2 rounded-[8px] bg-surface-container p-3.5">
                <span className="text-[13px] leading-5 font-medium">
                  No invitation yet
                </span>
                <span className="text-[11px] leading-4 text-on-surface-variant">
                  Create your first invitation to unlock guests, RSVP, and
                  wishes.
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-secondary uppercase">
                  <Plus aria-hidden size={13} />
                  Create Invitation
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 rounded-[12px] bg-surface-container p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
              {entitlement.packageName}
            </span>
            <BadgeCheck
              aria-hidden
              size={16}
              className="shrink-0 text-secondary"
            />
          </div>
          <span className="text-[13px] leading-5 font-medium">
            {entitlement.quotaRemaining} invitation quota left
          </span>
          <span className="text-[11px] leading-4 tracking-[0.12em] text-on-surface-variant uppercase">
            Active plan
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-[12px] bg-surface-high p-2.5">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-terracotta-soft/50 text-[13px] font-semibold text-accent-foreground">
              {customer.initials}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] leading-5 font-medium">
                {customer.name}
              </span>
              <span className="truncate text-[11px] leading-4 text-on-surface-variant">
                {customer.email}
              </span>
            </span>
          </span>
          <Link
            href="/login"
            title="Sign out"
            aria-label="Sign out"
            onClick={onNavigate}
            className="shrink-0 rounded-[8px] p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <LogOut aria-hidden size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Persistent desktop sidebar. */
export function CustomerSidebar(props: CustomerSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-surface-low lg:block">
      <CustomerSidebarContent {...props} />
    </aside>
  );
}
