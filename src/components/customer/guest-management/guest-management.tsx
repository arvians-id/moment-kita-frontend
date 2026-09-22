"use client";

import {
  ChevronDown,
  MailCheck,
  Search,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";

import { DeleteGuestDialog } from "@/components/customer/guest-management/delete-guest-dialog";
import { GuestCardList } from "@/components/customer/guest-management/guest-card-list";
import { GuestDrawer } from "@/components/customer/guest-management/guest-drawer";
import { GuestManagementHeader } from "@/components/customer/guest-management/guest-management-header";
import { GuestSummaryCards } from "@/components/customer/guest-management/guest-summary-cards";
import { GuestTable } from "@/components/customer/guest-management/guest-table";
import { friendlyGuestPath } from "@/components/customer/guest-management/guest-utils";
import { publicConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type {
  GuestAttendanceStatus,
  GuestDirectorySummary,
  GuestManagementData,
  InvitationGuest,
} from "@/types";

type StatusFilter = "all" | GuestAttendanceStatus;

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "attending", label: "Attending" },
  { id: "pending", label: "Pending" },
  { id: "not_attending", label: "Not Attending" },
];

const defaultGroups = [
  "VIP Family",
  "Family",
  "Bridesmaids",
  "Groomsmen",
  "Close Friends",
  "Colleagues",
];

function pendingValue(guest: InvitationGuest): number {
  return guest.rsvpStatus === "pending" ? 1 : 0;
}

function dispatchedValue(guest: InvitationGuest): number {
  return guest.linkDispatched ? 1 : 0;
}

function quoteCsv(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function GuestManagement({
  initialData,
}: {
  initialData: GuestManagementData;
}) {
  const [guests, setGuests] = useState(() =>
    initialData.guests.map((guest) => ({ ...guest })),
  );
  const [summary, setSummary] = useState<GuestDirectorySummary>(() => ({
    ...initialData.summary,
  }));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [drawerGuest, setDrawerGuest] = useState<InvitationGuest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteGuest, setDeleteGuest] = useState<InvitationGuest | null>(null);
  const [copiedGuestId, setCopiedGuestId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const invitationBaseUrl = publicConfig.appUrl;
  const groups = useMemo(
    () =>
      Array.from(
        new Set([
          ...defaultGroups,
          ...initialData.groups,
          ...guests.map((guest) => guest.group),
        ]),
      ).sort((a, b) => a.localeCompare(b)),
    [guests, initialData.groups],
  );

  const term = query.trim().toLowerCase();
  const visibleGuests = useMemo(
    () =>
      guests.filter((guest) => {
        const matchesStatus =
          statusFilter === "all" || guest.rsvpStatus === statusFilter;
        const matchesGroup =
          groupFilter === "all" || guest.group === groupFilter;
        const matchesQuery =
          term === "" ||
          `${guest.name} ${guest.contact} ${guest.group} ${guest.category}`
            .toLowerCase()
            .includes(term);
        return matchesStatus && matchesGroup && matchesQuery;
      }),
    [groupFilter, guests, statusFilter, term],
  );

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function openAddGuest() {
    setDrawerGuest(null);
    setIsDrawerOpen(true);
  }

  function openEditGuest(guest: InvitationGuest) {
    setDrawerGuest(guest);
    setIsDrawerOpen(true);
  }

  function saveGuest(nextGuest: InvitationGuest) {
    const previous = guests.find((guest) => guest.id === nextGuest.id);

    if (previous) {
      setGuests((current) =>
        current.map((guest) => (guest.id === nextGuest.id ? nextGuest : guest)),
      );
      setSummary((current) => ({
        ...current,
        totalGuests: Math.max(
          0,
          current.totalGuests - previous.maxPax + nextGuest.maxPax,
        ),
        confirmedPax: Math.max(
          0,
          current.confirmedPax - previous.confirmedPax + nextGuest.confirmedPax,
        ),
        pendingResponses: Math.max(
          0,
          current.pendingResponses -
            pendingValue(previous) +
            pendingValue(nextGuest),
        ),
        dispatchedEntries: Math.max(
          0,
          current.dispatchedEntries -
            dispatchedValue(previous) +
            dispatchedValue(nextGuest),
        ),
      }));
      showNotice(`${nextGuest.name} was updated.`);
    } else {
      setGuests((current) => [nextGuest, ...current]);
      setSummary((current) => ({
        ...current,
        totalGuests: current.totalGuests + nextGuest.maxPax,
        invitationEntries: current.invitationEntries + 1,
        confirmedPax: current.confirmedPax + nextGuest.confirmedPax,
        pendingResponses: current.pendingResponses + pendingValue(nextGuest),
        dispatchedEntries:
          current.dispatchedEntries + dispatchedValue(nextGuest),
      }));
      showNotice(`${nextGuest.name} was added to the directory.`);
    }

    setIsDrawerOpen(false);
    setDrawerGuest(null);
  }

  function confirmDelete() {
    if (!deleteGuest) return;
    setGuests((current) =>
      current.filter((guest) => guest.id !== deleteGuest.id),
    );
    setSummary((current) => ({
      ...current,
      totalGuests: Math.max(0, current.totalGuests - deleteGuest.maxPax),
      invitationEntries: Math.max(0, current.invitationEntries - 1),
      confirmedPax: Math.max(
        0,
        current.confirmedPax - deleteGuest.confirmedPax,
      ),
      pendingResponses: Math.max(
        0,
        current.pendingResponses - pendingValue(deleteGuest),
      ),
      dispatchedEntries: Math.max(
        0,
        current.dispatchedEntries - dispatchedValue(deleteGuest),
      ),
    }));
    showNotice(`${deleteGuest.name} was removed.`);
    setDeleteGuest(null);
  }

  async function copyGuestLink(guest: InvitationGuest) {
    const path = friendlyGuestPath(initialData.invitation.slug, guest);
    await navigator.clipboard.writeText(`${invitationBaseUrl}${path}`);
    setCopiedGuestId(guest.id);
    showNotice(`Invitation address copied for ${guest.name}.`);
    window.setTimeout(() => setCopiedGuestId(null), 1600);
  }

  function exportGuestbook() {
    const rows = [
      [
        "Guest Name",
        "Group",
        "Category",
        "Max Pax",
        "RSVP Status",
        "Confirmed Pax",
        "Contact",
        "Last Updated",
      ],
      ...guests.map((guest) => [
        guest.name,
        guest.group,
        guest.category,
        guest.maxPax,
        guest.rsvpStatus,
        guest.confirmedPax,
        guest.contact,
        guest.lastUpdatedLabel,
      ]),
    ];
    const csv = rows.map((row) => row.map(quoteCsv).join(",")).join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${initialData.invitation.slug}-guestbook.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    showNotice("Guestbook export prepared.");
  }

  function resetFilters() {
    setQuery("");
    setStatusFilter("all");
    setGroupFilter("all");
  }

  return (
    <div className="-mx-4 -my-8 overflow-x-clip sm:-mx-6 lg:-mx-8">
      <GuestManagementHeader
        invitation={initialData.invitation}
        onAddGuest={openAddGuest}
        onExport={exportGuestbook}
      />

      <div className="mt-8">
        <GuestSummaryCards summary={summary} />
      </div>

      <section className="mx-auto mt-7 w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-lowest p-4 shadow-sm">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div className="relative w-full xl:max-w-md">
              <Search
                aria-hidden
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
              />
              <label htmlFor="guest-search" className="sr-only">
                Search guests
              </label>
              <input
                id="guest-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by guest, group, or contact..."
                className="h-11 w-full bg-surface-low pr-4 pl-11 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/55 focus:bg-surface-container"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
              <div
                role="group"
                aria-label="Filter guests by RSVP status"
                className="flex min-w-0 items-center overflow-x-auto bg-surface-low p-1"
              >
                {statusFilters.map((filter) => {
                  const count =
                    filter.id === "all"
                      ? guests.length
                      : guests.filter((guest) => guest.rsvpStatus === filter.id)
                          .length;
                  const active = statusFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setStatusFilter(filter.id)}
                      className={cn(
                        "min-h-9 shrink-0 px-3 text-[9px] font-semibold tracking-[0.11em] whitespace-nowrap uppercase transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-on-surface-variant hover:text-on-surface",
                      )}
                    >
                      {filter.label} ({count})
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-48 flex-1 sm:flex-none">
                <label htmlFor="guest-group-filter" className="sr-only">
                  Filter by guest group
                </label>
                <select
                  id="guest-group-filter"
                  value={groupFilter}
                  onChange={(event) => setGroupFilter(event.target.value)}
                  className="h-11 w-full cursor-pointer appearance-none bg-surface-low pr-9 pl-3 text-[10px] font-semibold tracking-[0.09em] uppercase outline-none sm:w-52"
                >
                  <option value="all">All Guest Groups</option>
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  size={16}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-3 bg-surface-low px-4 py-3 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2 text-[11px] font-medium">
              <span aria-hidden className="size-2 rounded-full bg-secondary" />
              Showing {visibleGuests.length} curated entries
              <span className="hidden text-on-surface-variant sm:inline">
                of {summary.invitationEntries} invitations
              </span>
            </p>
            <p className="inline-flex items-center gap-2 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              <SlidersHorizontal aria-hidden size={14} />
              Directory filters active locally
            </p>
          </div>
        </div>

        <div className="mt-5">
          {visibleGuests.length > 0 ? (
            <>
              <GuestTable
                guests={visibleGuests}
                invitationSlug={initialData.invitation.slug}
                invitationBaseUrl={invitationBaseUrl}
                copiedGuestId={copiedGuestId}
                onCopy={copyGuestLink}
                onEdit={openEditGuest}
                onDelete={setDeleteGuest}
              />
              <GuestCardList
                guests={visibleGuests}
                invitationSlug={initialData.invitation.slug}
                invitationBaseUrl={invitationBaseUrl}
                copiedGuestId={copiedGuestId}
                onCopy={copyGuestLink}
                onEdit={openEditGuest}
                onDelete={setDeleteGuest}
              />
            </>
          ) : (
            <div className="bg-surface-lowest px-6 py-14 text-center shadow-sm">
              <SearchX
                aria-hidden
                size={30}
                className="mx-auto text-on-surface-variant"
              />
              <h2 className="mt-3 font-serif text-[22px]">
                No guests match this view
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-[12px] leading-5 text-on-surface-variant">
                Try another RSVP status, guest group, or search phrase.
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
        </div>

        <aside className="my-8 flex flex-col justify-between gap-5 bg-surface-low p-5 shadow-sm sm:p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <MailCheck aria-hidden size={19} />
            </span>
            <div>
              <h2 className="font-serif text-[22px] leading-7">
                Automated Personalised Experience
              </h2>
              <p className="mt-1 max-w-3xl text-[12px] leading-6 text-on-surface-variant">
                Friendly links show the guest’s name and RSVP allowance. Secure
                access fragments remain hidden and are appended only during
                backend dispatch—never exposed in this directory.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openAddGuest}
            className="min-h-10 shrink-0 bg-surface-lowest px-5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-container"
          >
            Add Another Guest
          </button>
        </aside>
      </section>

      {notice ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 bottom-4 z-[90] max-w-sm bg-primary px-4 py-3 text-[11px] text-primary-foreground shadow-xl sm:right-6 sm:bottom-6"
        >
          {notice}
        </div>
      ) : null}

      {isDrawerOpen ? (
        <GuestDrawer
          invitationSlug={initialData.invitation.slug}
          guest={drawerGuest}
          groups={groups}
          onClose={() => {
            setIsDrawerOpen(false);
            setDrawerGuest(null);
          }}
          onSave={saveGuest}
        />
      ) : null}

      {deleteGuest ? (
        <DeleteGuestDialog
          guest={deleteGuest}
          onClose={() => setDeleteGuest(null)}
          onConfirm={confirmDelete}
        />
      ) : null}
    </div>
  );
}
