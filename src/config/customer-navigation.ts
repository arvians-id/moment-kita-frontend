import {
  Bell,
  Gift,
  History,
  LayoutDashboard,
  type LucideIcon,
  Mail,
  MessageSquareHeart,
  PanelsTopLeft,
  PenLine,
  ReceiptText,
  SlidersHorizontal,
  UserCheck,
  Users,
} from "lucide-react";

/**
 * Canonical Customer CMS navigation.
 *
 * This file is the single source of truth for the Customer sidebar and mobile
 * drawer. Destinations that are not built yet are marked `available: false` so
 * the sidebar can render them without linking to a 404; flipping the flag is
 * all that is needed once a page lands.
 */

export const CUSTOMER_APP_ROOT = "/app";

/**
 * The Create Invitation flow. It is a child flow rather than a sidebar item,
 * so its availability is tracked here alongside the rest of the route map.
 */
export const createInvitationRoute = {
  href: "/app/invitations/new",
  available: true,
} as const;

export interface CustomerNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** False until the destination page exists. */
  available: boolean;
  /** Optional count rendered as a pill, e.g. unread notifications. */
  badge?: number;
}

export interface CustomerNavGroup {
  /** Section heading, e.g. "OVERVIEW". */
  title: string;
  items: CustomerNavItem[];
}

/** Navigation that is always present, regardless of invitation context. */
export const customerGlobalNavigation: CustomerNavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/app/dashboard",
        icon: LayoutDashboard,
        available: true,
      },
    ],
  },
  {
    title: "Wedding",
    items: [
      {
        label: "My Invitations",
        href: "/app/invitations",
        icon: Mail,
        available: true,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Transactions",
        href: "/app/transactions",
        icon: ReceiptText,
        available: false,
      },
      {
        label: "Notifications",
        href: "/app/notifications",
        icon: Bell,
        available: false,
        badge: 2,
      },
      {
        label: "Settings",
        href: "/app/settings",
        icon: SlidersHorizontal,
        available: false,
      },
    ],
  },
];

/**
 * Contextual navigation for the selected invitation. Built from the invitation
 * id so future invitation pages can supply their own context.
 */
export function buildInvitationNavigation(
  invitationId: string,
): CustomerNavItem[] {
  const base = `/app/invitations/${invitationId}`;

  return [
    { label: "Overview", href: base, icon: PanelsTopLeft, available: true },
    {
      label: "Edit Invitation",
      href: `${base}/edit`,
      icon: PenLine,
      available: true,
    },
    { label: "Guests", href: `${base}/guests`, icon: Users, available: true },
    { label: "RSVP", href: `${base}/rsvp`, icon: UserCheck, available: false },
    {
      label: "Wishes",
      href: `${base}/wishes`,
      icon: MessageSquareHeart,
      available: false,
    },
    {
      label: "Digital Gift",
      href: `${base}/gift`,
      icon: Gift,
      available: false,
    },
    {
      label: "Version History",
      href: `${base}/versions`,
      icon: History,
      available: false,
    },
  ];
}

/**
 * Reads the invitation id out of an invitation workspace route so the sidebar
 * can follow the URL rather than its own local selection.
 * Returns null for `/app/invitations` and `/app/invitations/new`.
 */
export function getInvitationIdFromPath(pathname: string): string | null {
  const match = /^\/app\/invitations\/([^/]+)/.exec(pathname);
  if (!match) return null;
  return match[1] === "new" ? null : match[1];
}

/** True when the pathname is the route itself or one of its nested routes. */
export function isCurrentRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Contextual invitation navigation needs an exact match for the Overview root,
 * otherwise every child workspace would also mark Overview as active.
 */
export function isInvitationNavigationCurrent(
  pathname: string,
  href: string,
): boolean {
  const isOverviewRoute = /^\/app\/invitations\/[^/]+$/.test(href);
  return isOverviewRoute ? pathname === href : isCurrentRoute(pathname, href);
}
