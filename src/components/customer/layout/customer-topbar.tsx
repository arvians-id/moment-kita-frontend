"use client";

import { Bell, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CustomerMobileNav } from "@/components/customer/layout/customer-mobile-nav";
import type { CustomerSidebarProps } from "@/components/customer/layout/customer-sidebar";
import {
  createInvitationRoute,
  getInvitationIdFromPath,
} from "@/config/customer-navigation";

export function CustomerTopbar({
  customer,
  invitations,
  currentInvitation,
  entitlement,
}: Omit<CustomerSidebarProps, "onNavigate">) {
  const pathname = usePathname();
  const routeInvitationId = getInvitationIdFromPath(pathname);
  const workspaceInvitation =
    invitations.find((invitation) => invitation.id === routeInvitationId) ??
    currentInvitation;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <CustomerMobileNav
            customer={customer}
            invitations={invitations}
            currentInvitation={currentInvitation}
            entitlement={entitlement}
          />
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden shrink-0 text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase sm:inline">
              Workspace
            </span>
            <span
              aria-hidden
              className="hidden text-on-surface-variant/50 sm:inline"
            >
              /
            </span>
            <span className="truncate font-serif text-lg italic sm:text-xl lg:text-2xl">
              {workspaceInvitation
                ? `${workspaceInvitation.coupleLabel} Wedding`
                : "Your celebration"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href={createInvitationRoute.href}
            className="inline-flex items-center gap-2 bg-primary px-3 py-2.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary sm:px-5"
          >
            <Plus aria-hidden size={15} />
            <span className="hidden sm:inline">New Invitation</span>
            <span className="sm:hidden">New</span>
          </Link>
          <span
            aria-hidden
            className="relative grid size-9 place-items-center rounded-full text-on-surface-variant"
          >
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-secondary ring-2 ring-surface" />
          </span>
          <Link
            href="/login"
            aria-label={`Signed in as ${customer.name}`}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-secondary"
          >
            {customer.initials}
          </Link>
        </div>
      </div>
    </header>
  );
}
