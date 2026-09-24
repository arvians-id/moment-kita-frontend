"use client";

import {
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { InvitationActionDialog } from "@/components/admin/invitations/invitation-action-dialog";
import { InvitationCardList } from "@/components/admin/invitations/invitation-card-list";
import type { InvitationLifecycleAction } from "@/components/admin/invitations/invitation-row-actions";
import { InvitationTable } from "@/components/admin/invitations/invitation-table";
import type {
  AdminInvitationListItem,
  AdminInvitationSummary,
  InvitationStatus,
} from "@/types";

type Segment = "all" | InvitationStatus | "expiring";
type StatusFilter = "all" | InvitationStatus;
type ExpirationFilter = "all" | "live" | "expiring" | "expired" | "not_started";

const selectClass =
  "h-10 w-full cursor-pointer appearance-none border border-transparent bg-surface-low py-1.5 pr-8 pl-3 text-[11px] outline-none transition-colors focus:border-secondary";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0">
      {children}
      <ChevronDown
        aria-hidden
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}

function isExpiringSoon(invitation: AdminInvitationListItem, now: Date) {
  if (!invitation.expiresAt || invitation.status === "expired") return false;
  const expires = new Date(invitation.expiresAt);
  const thirtyDays = 30 * 86_400_000;
  return expires > now && expires.getTime() - now.getTime() <= thirtyDays;
}

export function InvitationDirectory({
  invitations,
  summary,
  templates,
}: {
  invitations: AdminInvitationListItem[];
  summary: AdminInvitationSummary;
  templates: string[];
}) {
  const [segment, setSegment] = useState<Segment>("all");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [weddingFrom, setWeddingFrom] = useState("");
  const [weddingTo, setWeddingTo] = useState("");
  const [expirationFilter, setExpirationFilter] =
    useState<ExpirationFilter>("all");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    invitation: AdminInvitationListItem;
    action: InvitationLifecycleAction;
  } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const term = query.trim().toLowerCase();
  const now = useMemo(() => new Date(), []);
  const expiringCount = invitations.filter((invitation) =>
    isExpiringSoon(invitation, now),
  ).length;

  const visible = useMemo(
    () =>
      invitations.filter((invitation) => {
        const eventDay = invitation.eventDate.slice(0, 10);
        const expiresAt = invitation.expiresAt
          ? new Date(invitation.expiresAt)
          : null;
        const matchesSegment =
          segment === "all" ||
          (segment === "expiring"
            ? isExpiringSoon(invitation, now)
            : invitation.status === segment);
        const matchesStatus =
          statusFilter === "all" || invitation.status === statusFilter;
        const matchesTemplate =
          templateFilter === "all" ||
          invitation.templateName === templateFilter;
        const matchesWeddingFrom = !weddingFrom || eventDay >= weddingFrom;
        const matchesWeddingTo = !weddingTo || eventDay <= weddingTo;
        const matchesExpiration =
          expirationFilter === "all" ||
          (expirationFilter === "live" &&
            invitation.status === "published" &&
            expiresAt !== null &&
            expiresAt > now) ||
          (expirationFilter === "expiring" &&
            isExpiringSoon(invitation, now)) ||
          (expirationFilter === "expired" &&
            (invitation.status === "expired" ||
              (expiresAt !== null && expiresAt <= now))) ||
          (expirationFilter === "not_started" && expiresAt === null);
        const matchesQuery =
          term === "" ||
          `${invitation.coupleLabel} ${invitation.customer.name} ${invitation.slug}`
            .toLowerCase()
            .includes(term);

        return (
          matchesSegment &&
          matchesStatus &&
          matchesTemplate &&
          matchesWeddingFrom &&
          matchesWeddingTo &&
          matchesExpiration &&
          matchesQuery
        );
      }),
    [
      expirationFilter,
      invitations,
      now,
      segment,
      statusFilter,
      templateFilter,
      term,
      weddingFrom,
      weddingTo,
    ],
  );

  function resetFilters() {
    setSegment("all");
    setQuery("");
    setStatusFilter("all");
    setTemplateFilter("all");
    setWeddingFrom("");
    setWeddingTo("");
    setExpirationFilter("all");
    setOpenActionId(null);
  }

  function openLifecycleAction(
    invitation: AdminInvitationListItem,
    action: InvitationLifecycleAction,
  ) {
    setOpenActionId(null);
    setPendingAction({ invitation, action });
  }

  const segments: readonly { id: Segment; label: string; count: number }[] = [
    { id: "all", label: "All", count: summary.total },
    { id: "published", label: "Published", count: summary.published },
    { id: "draft", label: "Draft", count: summary.draft },
    { id: "finalized", label: "Finalized", count: summary.finalized },
    { id: "expiring", label: "Expiring Soon", count: expiringCount },
    { id: "expired", label: "Expired", count: summary.expired },
    { id: "cancelled", label: "Cancelled", count: summary.cancelled },
  ];

  return (
    <section className="space-y-5">
      {notice ? (
        <div
          role="status"
          className="flex items-center justify-between gap-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-950"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 aria-hidden size={15} /> {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="grid size-7 shrink-0 place-items-center hover:bg-emerald-100"
          >
            <X aria-hidden size={14} />
          </button>
        </div>
      ) : null}

      <div className="space-y-4 border border-border bg-surface-lowest p-4 shadow-sm sm:p-5">
        <div className="overflow-x-auto border-b border-border pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="group"
            aria-label="Invitation lifecycle segments"
            className="flex min-w-max items-center gap-1"
          >
            {segments.map((item) => {
              const active = segment === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSegment(item.id)}
                  className={`min-h-8 px-3 text-[9px] font-semibold tracking-[0.11em] whitespace-nowrap uppercase transition-colors sm:text-[10px] ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                  }`}
                >
                  {item.label}{" "}
                  <span className="ml-1 opacity-65">{item.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-12">
          <div className="relative h-10 lg:col-span-5">
            <Search
              aria-hidden
              size={15}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <label htmlFor="invitation-search" className="sr-only">
              Search invitations
            </label>
            <input
              id="invitation-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search couple, customer, or slug..."
              className="h-10 w-full border border-transparent bg-surface-low pr-3 pl-9 text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
            />
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-2 lg:col-span-7 lg:grid-cols-3">
            <SelectShell>
              <label htmlFor="invitation-status-filter" className="sr-only">
                Status
              </label>
              <select
                id="invitation-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                className={selectClass}
              >
                <option value="all">Status: All</option>
                <option value="draft">Draft</option>
                <option value="finalized">Finalized</option>
                <option value="published">Published</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="invitation-template-filter" className="sr-only">
                Template
              </label>
              <select
                id="invitation-template-filter"
                value={templateFilter}
                onChange={(event) => setTemplateFilter(event.target.value)}
                className={selectClass}
              >
                <option value="all">Template: All</option>
                {templates.map((template) => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="invitation-expiration-filter" className="sr-only">
                Expiration state
              </label>
              <select
                id="invitation-expiration-filter"
                value={expirationFilter}
                onChange={(event) =>
                  setExpirationFilter(event.target.value as ExpirationFilter)
                }
                className={selectClass}
              >
                <option value="all">Expiration: All</option>
                <option value="live">Live</option>
                <option value="expiring">Within 30 Days</option>
                <option value="expired">Expired</option>
                <option value="not_started">Not Started</option>
              </select>
            </SelectShell>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Wedding from
            <input
              type="date"
              value={weddingFrom}
              onChange={(event) => setWeddingFrom(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
            />
          </label>
          <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Wedding to
            <input
              type="date"
              value={weddingTo}
              onChange={(event) => setWeddingTo(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
            />
          </label>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-10 items-center justify-center gap-2 px-4 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container hover:text-primary"
          >
            <RotateCcw aria-hidden size={14} /> Clear Filters
          </button>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <InvitationTable
            invitations={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
            onAction={openLifecycleAction}
          />
          <InvitationCardList
            invitations={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
            onAction={openLifecycleAction}
          />
          <div className="flex flex-col gap-2 border border-border bg-surface-low px-4 py-3 text-[11px] text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <strong className="text-primary">{visible.length}</strong>{" "}
              registry samples from{" "}
              <strong className="text-primary">
                {summary.total.toLocaleString("en-US")}
              </strong>{" "}
              invitations
            </p>
            <p className="text-[9px] font-semibold tracking-[0.1em] uppercase">
              Mock service · Page 1
            </p>
          </div>
        </>
      ) : (
        <div className="border border-border bg-surface-lowest px-6 py-14 text-center shadow-sm">
          <SearchX
            aria-hidden
            size={30}
            className="mx-auto text-on-surface-variant"
          />
          <h2 className="mt-3 font-serif text-[22px]">
            No invitations match this view
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-[12px] leading-5 text-on-surface-variant">
            Try another lifecycle, template, wedding date, expiration, or search
            filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 min-h-10 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}

      {pendingAction ? (
        <InvitationActionDialog
          action={pendingAction.action}
          coupleLabel={pendingAction.invitation.coupleLabel}
          onClose={() => setPendingAction(null)}
          onConfirm={() => {
            setNotice(
              `${pendingAction.action[0]?.toUpperCase()}${pendingAction.action.slice(1)} acknowledged for ${pendingAction.invitation.coupleLabel}; no mock data was changed.`,
            );
            setPendingAction(null);
          }}
        />
      ) : null}
    </section>
  );
}
