import {
  Bell,
  LayoutDashboard,
  type LucideIcon,
  Mail,
  Palette,
  PackageSearch,
  Printer,
  ReceiptText,
  SlidersHorizontal,
  Users,
} from "lucide-react";

/**
 * Canonical Admin CMS navigation.
 *
 * This file is the single source of truth for the Admin sidebar and mobile
 * drawer, per `docs/admin-implementation.md`. Destinations that are not
 * built yet stay `available: false` so the sidebar can render the complete
 * canonical structure without linking to a 404 — flipping the flag is all
 * that is needed once a page lands. Audit Logs is intentionally absent: it
 * is out of MVP scope even though most design references show it.
 */

export const ADMIN_APP_ROOT = "/admin";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** False until the destination page exists. */
  available: boolean;
  /** Optional count rendered as a pill, e.g. unread notifications. */
  badge?: number;
}

export interface AdminNavGroup {
  /** Section heading, e.g. "OVERVIEW". */
  title: string;
  items: AdminNavItem[];
}

export const adminNavigation: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: ADMIN_APP_ROOT,
        icon: LayoutDashboard,
        available: true,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
        available: true,
      },
      {
        label: "Invitations",
        href: "/admin/invitations",
        icon: Mail,
        available: true,
      },
      {
        label: "Templates",
        href: "/admin/templates",
        icon: Palette,
        available: true,
      },
    ],
  },
  {
    title: "Commerce",
    items: [
      {
        label: "Transactions",
        href: "/admin/transactions",
        icon: ReceiptText,
        available: true,
      },
      {
        label: "Packages & Quota",
        href: "/admin/packages",
        icon: PackageSearch,
        available: true,
      },
      {
        label: "Printed Orders",
        href: "/admin/printed-orders",
        icon: Printer,
        available: true,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        label: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
        available: true,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: SlidersHorizontal,
        available: true,
      },
    ],
  },
];

/**
 * True when the pathname is the route itself or one of its nested routes.
 * The Dashboard root (`/admin`) is a prefix of every other Admin route, so
 * it needs an exact match instead of the usual `startsWith` check.
 */
export function isCurrentRoute(pathname: string, href: string): boolean {
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const normalizedHref = href.length > 1 ? href.replace(/\/+$/, "") : href;

  if (normalizedHref === ADMIN_APP_ROOT) {
    return normalizedPathname === ADMIN_APP_ROOT;
  }
  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

/** Resolves the active nav group + item for a pathname, for breadcrumbs. */
export function getActiveAdminNav(
  pathname: string,
): { group: AdminNavGroup; item: AdminNavItem } | null {
  for (const group of adminNavigation) {
    for (const item of group.items) {
      if (isCurrentRoute(pathname, item.href)) return { group, item };
    }
  }
  return null;
}
