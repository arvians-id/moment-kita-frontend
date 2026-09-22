"use client";

import { ChevronDown, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { CreateInvitationCard } from "@/components/customer/invitations/create-invitation-card";
import { InvitationCard } from "@/components/customer/invitations/invitation-card";
import type { InvitationCounts } from "@/services/customer/invitation-service";
import type { CustomerInvitation, InvitationStatus } from "@/types";

type FilterId = "all" | "published" | "finalized" | "drafts" | "archived";
type SortId = "recent" | "date" | "alphabetical";

/** Which lifecycle states each tab collects. */
const filterStatuses: Record<FilterId, InvitationStatus[] | null> = {
  all: null,
  published: ["published"],
  finalized: ["finalized"],
  drafts: ["draft"],
  archived: ["expired", "cancelled"],
};

const sortOptions: { id: SortId; label: string }[] = [
  { id: "recent", label: "Recently modified" },
  { id: "date", label: "Event date: nearest" },
  { id: "alphabetical", label: "Alphabetical" },
];

export function InvitationCollection({
  invitations,
  counts,
}: {
  invitations: CustomerInvitation[];
  counts: InvitationCounts;
}) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("recent");

  const tabs: { id: FilterId; label: string; count: number }[] = [
    { id: "all", label: "All invitations", count: counts.total },
    { id: "published", label: "Published", count: counts.published },
    { id: "finalized", label: "Finalized", count: counts.finalized },
    { id: "drafts", label: "Drafts", count: counts.drafts },
    { id: "archived", label: "Archived", count: counts.archived },
  ];

  const term = query.trim().toLowerCase();

  const visible = useMemo(() => {
    const statuses = filterStatuses[filter];
    const matched = invitations.filter((invitation) => {
      const inFilter = !statuses || statuses.includes(invitation.status);
      const inSearch =
        term === "" ||
        `${invitation.title} ${invitation.coupleLabel} ${invitation.slug} ${invitation.templateName}`
          .toLowerCase()
          .includes(term);
      return inFilter && inSearch;
    });

    const sorted = [...matched];
    if (sort === "date") {
      sorted.sort(
        (a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
      );
    }
    if (sort === "alphabetical") {
      sorted.sort((a, b) => a.coupleLabel.localeCompare(b.coupleLabel));
    }
    return sorted;
  }, [filter, invitations, sort, term]);

  function reset() {
    setFilter("all");
    setQuery("");
  }

  return (
    <>
      <section className="mb-8 flex flex-col items-stretch justify-between gap-4 border-b border-surface-highest pb-6 md:flex-row md:items-center">
        <div
          role="group"
          aria-label="Filter invitations by status"
          className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0"
        >
          {tabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(tab.id)}
                className={`shrink-0 border-b-2 px-3.5 py-1.5 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                  isActive
                    ? "border-primary bg-surface-highest text-on-surface"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search
              aria-hidden
              size={16}
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
              placeholder="Search by couple or slug..."
              className="w-full border border-surface-highest bg-surface-lowest py-1.5 pr-3 pl-9 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
            />
          </div>
          <div className="relative shrink-0">
            <label htmlFor="invitation-sort" className="sr-only">
              Sort invitations
            </label>
            <select
              id="invitation-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortId)}
              className="cursor-pointer appearance-none border border-surface-highest bg-surface-lowest py-1.5 pr-8 pl-3 text-[13px] outline-none focus:border-secondary"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              size={15}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-on-surface-variant"
            />
          </div>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {visible.map((invitation, index) => (
          <InvitationCard
            key={invitation.id}
            invitation={invitation}
            index={index}
          />
        ))}
        {/* The create entry point stays present in every filtered view. */}
        <CreateInvitationCard />
      </section>

      {visible.length === 0 ? (
        <div className="mb-8 border border-surface-highest bg-surface-lowest px-6 py-12 text-center">
          <SearchX
            aria-hidden
            size={32}
            className="mx-auto mb-2 text-on-surface-variant"
          />
          <p className="font-serif text-[18px] leading-7">
            No invitations match this view
          </p>
          <p className="mx-auto mt-1 mb-4 max-w-sm text-[13px] leading-5 text-on-surface-variant">
            Try another status tab or clear your search term.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center bg-primary px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </>
  );
}
