import {
  ArrowLeft,
  CalendarDays,
  Gauge,
  Mail,
  MessageCircle,
  Pencil,
  Plus,
  ShieldCheck,
  UserRoundX,
} from "lucide-react";
import Link from "next/link";

import { CustomerStatusBadge } from "@/components/admin/customers/customer-status-badge";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type { AdminCustomer } from "@/types";

import { dateFormat } from "./customer-detail-formatters";

export function CustomerDetailHeader({
  customer,
  onAdjustQuota,
  onEdit,
}: {
  customer: AdminCustomer;
  onAdjustQuota: () => void;
  onEdit: () => void;
}) {
  const whatsappNumber = customer.whatsapp.replace(/\D/g, "");
  const accountDescription = customer.linkedUserId
    ? `Registered account · Linked as ${customer.linkedUserId}`
    : "Managed Customer — No account linked";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-semibold tracking-[0.14em] uppercase">
        <Link
          href="/admin/customers"
          className="inline-flex min-h-9 items-center gap-2 text-on-surface-variant transition-colors hover:text-secondary"
        >
          <ArrowLeft aria-hidden size={14} /> Customer Directory
        </Link>
        <span className="bg-surface-container px-2.5 py-1 font-mono tracking-normal text-on-surface-variant normal-case">
          ID: {customer.id}
        </span>
      </div>

      <section className="relative overflow-hidden border border-border bg-surface-lowest p-5 shadow-sm sm:p-7 lg:p-8">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-secondary via-accent to-transparent" />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <div className="relative grid size-20 shrink-0 place-items-center bg-surface-container font-serif text-[26px] text-secondary shadow-inner sm:size-24">
            {customer.initials}
            <span className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full bg-accent text-accent-foreground ring-4 ring-surface-lowest">
              {customer.linkedUserId ? (
                <ShieldCheck aria-hidden size={14} />
              ) : (
                <UserRoundX aria-hidden size={14} />
              )}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <AdminPageHeader
              eyebrow="Management · Customer Dossier"
              title={customer.name}
              description={accountDescription}
              actions={
                <>
                  <button
                    type="button"
                    onClick={onAdjustQuota}
                    className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[10px] font-semibold tracking-[0.11em] uppercase transition-colors hover:bg-surface-container-high"
                  >
                    <Gauge aria-hidden size={15} /> Adjust Quota
                  </button>
                  <button
                    type="button"
                    onClick={onEdit}
                    className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[10px] font-semibold tracking-[0.11em] uppercase transition-colors hover:bg-surface-container-high"
                  >
                    <Pencil aria-hidden size={14} /> Edit Customer
                  </button>
                  <Link
                    href={`/admin/invitations/new?customerId=${customer.id}`}
                    prefetch={false}
                    title="The Create Invitation flow is the next Admin milestone"
                    className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
                  >
                    <Plus aria-hidden size={15} /> Create Invitation
                  </Link>
                </>
              }
            />

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex bg-primary px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] whitespace-nowrap text-primary-foreground uppercase">
                {customer.accountType === "registered"
                  ? "Registered"
                  : "Managed Customer"}
              </span>
              <CustomerStatusBadge status={customer.status} />
              <span className="inline-flex bg-surface-low px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                {customer.paymentStatus === "paid"
                  ? "Payment Current"
                  : "Pending Payment"}
              </span>
            </div>

            <div className="mt-5 grid gap-3 border-t border-border pt-5 text-[11px] text-on-surface-variant sm:grid-cols-2 xl:grid-cols-4">
              <span className="flex min-w-0 items-center gap-2">
                <Mail aria-hidden size={14} className="shrink-0" />
                <span className="truncate">
                  {customer.email ?? "No email on file"}
                </span>
              </span>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-center gap-2 text-secondary transition-colors hover:text-primary"
              >
                <MessageCircle aria-hidden size={14} className="shrink-0" />
                <span className="truncate">{customer.whatsapp}</span>
              </a>
              <span className="flex min-w-0 items-center gap-2">
                {customer.linkedUserId ? (
                  <ShieldCheck aria-hidden size={14} className="shrink-0" />
                ) : (
                  <UserRoundX aria-hidden size={14} className="shrink-0" />
                )}
                <span className="truncate">
                  {customer.linkedUserId
                    ? "Login account linked"
                    : "No login account linked"}
                </span>
              </span>
              <span className="flex min-w-0 items-center gap-2">
                <CalendarDays aria-hidden size={14} className="shrink-0" />
                Joined {dateFormat.format(new Date(customer.joinedAt))}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
