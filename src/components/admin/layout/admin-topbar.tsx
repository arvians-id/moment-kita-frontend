"use client";

import { Bell, Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminMobileNav } from "@/components/admin/layout/admin-mobile-nav";
import type { AdminSidebarProps } from "@/components/admin/layout/admin-sidebar";
import { getActiveAdminNav } from "@/config/admin-navigation";

export function AdminTopbar({
  admin,
  notificationsUnreadCount = 0,
}: Omit<AdminSidebarProps, "onNavigate">) {
  const pathname = usePathname();
  const active = getActiveAdminNav(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <AdminMobileNav
            admin={admin}
            notificationsUnreadCount={notificationsUnreadCount}
          />
          <div className="flex min-w-0 items-center gap-2">
            <span className="hidden shrink-0 text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase sm:inline">
              {active?.group.title ?? "Studio Admin"}
            </span>
            <span
              aria-hidden
              className="hidden text-on-surface-variant/50 sm:inline"
            >
              /
            </span>
            <span className="truncate text-[13px] leading-5 font-semibold sm:text-[15px]">
              {active?.item.label ?? "Overview"}
            </span>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 items-center gap-2 px-6 lg:flex">
          <div className="flex w-full max-w-sm items-center gap-2 border border-border bg-surface-lowest px-3 py-2">
            <Search
              aria-hidden
              size={15}
              className="shrink-0 text-on-surface-variant"
            />
            <input
              type="search"
              placeholder="Search customers, invitations..."
              disabled
              className="w-full bg-transparent text-[13px] leading-5 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none disabled:cursor-not-allowed"
            />
            <kbd className="shrink-0 text-[10px] font-semibold tracking-[0.08em] text-on-surface-variant/70">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/admin/invitations/new"
            className="hidden items-center gap-2 bg-primary px-3 py-2.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary sm:inline-flex sm:px-5"
          >
            <Plus aria-hidden size={15} />
            <span className="hidden sm:inline">Create Invitation</span>
          </Link>
          <Link
            href="/admin/notifications"
            aria-label={
              notificationsUnreadCount > 0
                ? `View ${notificationsUnreadCount} unread notifications`
                : "View notifications"
            }
            title={
              notificationsUnreadCount > 0
                ? `${notificationsUnreadCount} unread notifications`
                : "Notifications"
            }
            className="relative grid size-9 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Bell aria-hidden size={19} />
            {notificationsUnreadCount > 0 ? (
              <span
                aria-hidden
                className="absolute top-1.5 right-1.5 size-2 rounded-full bg-secondary ring-2 ring-surface"
              />
            ) : null}
          </Link>
          <span
            aria-label={`Signed in as ${admin.name}`}
            title={`${admin.name} · ${admin.role}`}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-[12px] font-semibold text-primary-foreground"
          >
            {admin.initials}
          </span>
        </div>
      </div>
    </header>
  );
}
