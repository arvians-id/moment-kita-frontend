import {
  CalendarDays,
  CircleDollarSign,
  Gauge,
  Mail,
  MessageCircle,
  NotebookPen,
  PackageCheck,
  ShieldCheck,
  type LucideIcon,
  UserRoundX,
} from "lucide-react";

import type { AdminCustomerDetailData } from "@/types";

import { dateFormat, idrFormat } from "./customer-detail-formatters";

function MetricCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="flex min-h-36 flex-col justify-between border border-border bg-surface-lowest p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 text-on-surface-variant">
        <span className="text-[9px] font-semibold tracking-[0.14em] uppercase">
          {label}
        </span>
        <Icon aria-hidden size={16} />
      </div>
      <div>
        <p className="font-serif text-[28px] leading-8 tracking-tight sm:text-[32px]">
          {value}
        </p>
        <p className="mt-2 text-[10px] leading-4 text-on-surface-variant">
          {note}
        </p>
      </div>
    </article>
  );
}

export function CustomerOverview({ data }: { data: AdminCustomerDetailData }) {
  const { customer, currentPackage } = data;

  return (
    <div role="tabpanel" className="space-y-6">
      <section
        aria-label="Customer operational metrics"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <MetricCard
          icon={Gauge}
          label="Remaining Quota"
          value={`${customer.quotaRemaining} / ${customer.quotaGranted}`}
          note="Current entitlement balance — ledger entries are historical"
        />
        <MetricCard
          icon={CircleDollarSign}
          label="Lifetime Spending"
          value={idrFormat.format(customer.totalSpending)}
          note={`${data.transactions.length} customer-specific transaction records`}
        />
        <MetricCard
          icon={Mail}
          label="Invitation Suites"
          value={String(customer.invitationCount)}
          note={`${data.invitations.filter((item) => item.status === "published").length} published · ${data.invitations.filter((item) => item.status === "draft").length} draft`}
        />
        <MetricCard
          icon={customer.linkedUserId ? ShieldCheck : UserRoundX}
          label="Registration Status"
          value={customer.linkedUserId ? "Linked" : "Unlinked"}
          note={
            customer.linkedUserId
              ? "Registered login account is explicitly linked"
              : "Managed Customer — No account linked"
          }
        />
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-12">
        <article className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6 lg:col-span-7">
          <div className="border-b border-border pb-4">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
              01 — Customer Information
            </p>
            <h2 className="mt-1 font-serif text-[23px] leading-8">
              Profile &amp; account context
            </h2>
          </div>

          <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div>
              <dt className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Full Name
              </dt>
              <dd className="mt-1.5 text-[13px] font-semibold">
                {customer.name}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Customer ID
              </dt>
              <dd className="mt-1.5 break-all font-mono text-[11px]">
                {customer.id}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                <Mail aria-hidden size={12} /> Email
              </dt>
              <dd className="mt-1.5 break-words text-[12px]">
                {customer.email ?? "No email on file"}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                <MessageCircle aria-hidden size={12} /> WhatsApp
              </dt>
              <dd className="mt-1.5 text-[12px] text-secondary">
                {customer.whatsapp}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Account Type
              </dt>
              <dd className="mt-1.5 text-[12px] font-semibold">
                {customer.accountType === "registered"
                  ? "Registered Customer"
                  : "Managed Customer"}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                <CalendarDays aria-hidden size={12} /> Joined
              </dt>
              <dd className="mt-1.5 text-[12px]">
                {dateFormat.format(new Date(customer.joinedAt))}
              </dd>
            </div>
          </dl>

          <div
            className={`mt-6 flex gap-3 p-4 ${customer.linkedUserId ? "bg-emerald-50 text-emerald-950" : "bg-accent text-accent-foreground"}`}
          >
            {customer.linkedUserId ? (
              <ShieldCheck aria-hidden size={18} className="mt-0.5 shrink-0" />
            ) : (
              <UserRoundX aria-hidden size={18} className="mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-[11px] font-semibold">
                {customer.linkedUserId
                  ? "Registered account linked"
                  : "Managed Customer — No account linked"}
              </p>
              <p className="mt-1 text-[10px] leading-4 opacity-80">
                {customer.linkedUserId
                  ? `Explicitly linked to ${customer.linkedUserId}.`
                  : "This profile remains operational without a login. Email matching never creates a link automatically."}
              </p>
            </div>
          </div>
        </article>

        <div className="space-y-6 lg:col-span-5">
          <article className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  02 — Current Package
                </p>
                <h2 className="mt-1 font-serif text-[23px] leading-8">
                  {currentPackage?.name ?? "No active package"}
                </h2>
              </div>
              <PackageCheck
                aria-hidden
                size={21}
                className={
                  currentPackage ? "text-secondary" : "text-on-surface-variant"
                }
              />
            </div>
            {currentPackage ? (
              <>
                <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
                  {currentPackage.description}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 bg-surface-low p-4">
                  <div>
                    <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                      Activated
                    </dt>
                    <dd className="mt-1 text-[11px] font-semibold">
                      {dateFormat.format(new Date(currentPackage.activatedAt))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                      Valid Through
                    </dt>
                    <dd className="mt-1 text-[11px] font-semibold">
                      {currentPackage.expiresAt
                        ? dateFormat.format(new Date(currentPackage.expiresAt))
                        : "No fixed expiry"}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="mt-3 bg-amber-50 p-4 text-[11px] leading-5 text-amber-950">
                Package access is not active. Review the pending payment before
                granting any entitlement.
              </p>
            )}
          </article>

          <article className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <NotebookPen
                aria-hidden
                size={18}
                className="mt-0.5 text-secondary"
              />
              <div>
                <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  03 — Internal Notes
                </p>
                <h2 className="mt-1 font-serif text-[21px] leading-7">
                  Customer context
                </h2>
              </div>
            </div>
            <p className="mt-4 bg-surface-low p-4 text-[12px] leading-6 text-on-surface-variant">
              {customer.notes ??
                "No internal customer notes have been recorded yet."}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
