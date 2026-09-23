"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ADMIN_APP_ROOT,
  adminNavigation,
  isCurrentRoute,
  type AdminNavItem,
} from "@/config/admin-navigation";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/types";

const groupTitleClass =
  "px-3 text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase";
const itemBaseClass =
  "flex items-center justify-between gap-3 px-3 py-2 text-[13px] leading-5 transition-colors";

export interface AdminSidebarProps {
  admin: AdminUser;
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
  item: AdminNavItem;
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
        <span className="shrink-0 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant/70 uppercase">
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
          "cursor-not-allowed text-on-surface-variant/60",
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
 * The full Admin navigation surface. Rendered once on desktop inside the
 * persistent aside and again inside the mobile drawer — never duplicated.
 */
export function AdminSidebarContent({
  admin,
  notificationsUnreadCount,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between gap-6 overflow-y-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <Link
          href={ADMIN_APP_ROOT}
          onClick={onNavigate}
          className="flex items-center gap-3 px-3"
        >
          <span className="grid size-8 shrink-0 place-items-center border border-secondary/30 font-serif text-sm text-secondary italic">
            MK
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg leading-none tracking-tight">
              Moment Kita
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Studio Admin
            </span>
          </span>
        </Link>

        <nav aria-label="Admin navigation" className="flex flex-col gap-5">
          {adminNavigation.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <span className={cn(groupTitleClass, "mb-1")}>{group.title}</span>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={
                    item.href === "/admin/notifications" &&
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
        </nav>
      </div>

      <div className="flex items-center justify-between gap-2 bg-surface-high p-2.5">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-terracotta-soft/50 text-[13px] font-semibold text-accent-foreground">
            {admin.initials}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] leading-5 font-medium">
              {admin.name}
            </span>
            <span className="truncate text-[11px] leading-4 tracking-[0.1em] text-on-surface-variant uppercase">
              {admin.role}
            </span>
          </span>
        </span>
        <span
          aria-disabled="true"
          title="Sign out (coming soon)"
          className="shrink-0 cursor-not-allowed p-1.5 text-on-surface-variant/60"
        >
          <LogOut aria-hidden size={17} />
        </span>
      </div>
    </div>
  );
}

/** Persistent desktop sidebar. */
export function AdminSidebar(props: AdminSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-surface-low lg:block">
      <AdminSidebarContent {...props} />
    </aside>
  );
}
