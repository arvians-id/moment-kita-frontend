"use client";

import {
  ArrowRight,
  LayoutGrid,
  LayoutPanelLeft,
  Search,
  SearchX,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

import {
  EmilyCard,
  MargaretCard,
  MelinaCard,
  SarahCard,
} from "@/components/marketing/templates/archive-cards";
import { Container } from "@/components/shared/container";

type Discipline = "all" | "digital" | "printed" | "harmonized";
type Aesthetic =
  "all" | "minimal" | "elegant" | "botanical" | "monolith" | "traditional";

const disciplines = [
  { id: "all", label: "All Editions" },
  { id: "digital", label: "Digital Invitations", note: "Instant Setup" },
  { id: "printed", label: "Printed Stationery", note: "Hand-Pressed" },
  { id: "harmonized", label: "Harmonized Suites", note: "Dual Medium" },
] as const;

const aesthetics = [
  { id: "all", label: "All Styles" },
  { id: "minimal", label: "Minimalist" },
  { id: "elegant", label: "Haute Couture" },
  { id: "botanical", label: "Botanique & Floral" },
  { id: "monolith", label: "Modern Noir" },
  { id: "traditional", label: "Archival Heritage" },
] as const;

const archive = [
  {
    key: "margaret",
    discipline: "printed",
    aesthetic: "minimal",
    search: "margaret andrew heritage monogram copper foil cotton deckle serif",
    Card: MargaretCard,
  },
  {
    key: "melina",
    discipline: "digital",
    aesthetic: "elegant",
    search: "melina dayson digital suite rsvp architectural beige mobile",
    Card: MelinaCard,
  },
  {
    key: "emily",
    discipline: "harmonized",
    aesthetic: "botanical",
    search: "emily james botanical raw silk ribbon wax seal harmonized",
    Card: EmilyCard,
  },
  {
    key: "sarah",
    discipline: "printed",
    aesthetic: "botanical",
    search: "sarah james sonoma floral ranunculus foil pressed envelope liner",
    Card: SarahCard,
  },
] as const satisfies readonly {
  key: string;
  discipline: Discipline;
  aesthetic: Aesthetic;
  search: string;
  Card: () => ReactNode;
}[];

export function ArchiveDiscovery({ children }: { children: ReactNode }) {
  const [discipline, setDiscipline] = useState<Discipline>("all");
  const [aesthetic, setAesthetic] = useState<Aesthetic>("all");
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);

  const term = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      archive.filter(
        (item) =>
          (discipline === "all" || item.discipline === discipline) &&
          (aesthetic === "all" || item.aesthetic === aesthetic) &&
          (term === "" || item.search.includes(term)),
      ),
    [aesthetic, discipline, term],
  );

  function reset() {
    setDiscipline("all");
    setAesthetic("all");
    setQuery("");
  }

  return (
    <>
      <section className="bg-surface pb-16 lg:pb-24">
        <Container>
          <div
            role="group"
            aria-label="Filter the archive by discipline"
            className="flex flex-col items-center justify-between gap-4 rounded-[12px] bg-surface-low p-3 shadow-sm md:flex-row md:flex-wrap"
          >
            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
              {disciplines.map((item) => {
                const active = discipline === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDiscipline(item.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-[8px] px-5 py-3 lg:px-6 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-transparent hover:bg-surface"
                    }`}
                  >
                    <span>{item.label}</span>
                    {"note" in item ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-normal normal-case ${
                          active
                            ? "bg-white/20 text-primary-foreground"
                            : "bg-secondary/15 text-secondary"
                        }`}
                      >
                        {item.note}
                      </span>
                    ) : (
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-normal ${
                          active
                            ? "bg-white/20 text-primary-foreground"
                            : "bg-surface-highest text-on-surface-variant"
                        }`}
                      >
                        {archive.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex w-full shrink-0 items-center justify-end gap-4 md:w-auto">
              <span className="hidden text-[13px] leading-5 whitespace-nowrap text-on-surface-variant xl:inline">
                <span className="font-semibold text-primary">100% Cotton</span>{" "}
                or{" "}
                <span className="font-semibold text-primary">
                  Interactive Cloud
                </span>
              </span>
              <Link
                href="#concierge-sample"
                className="inline-flex shrink-0 items-center gap-2 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap text-secondary uppercase transition-colors hover:text-primary"
              >
                <span>Order Swatches</span>
                <ArrowRight aria-hidden size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="sticky top-20 z-40 bg-surface/95 py-4 shadow-sm backdrop-blur-md">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div
              role="group"
              aria-label="Filter the archive by aesthetic"
              className="flex w-full items-center gap-2 overflow-x-auto pb-2 lg:w-auto lg:pb-0"
            >
              <span className="mr-1 shrink-0 text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                Aesthetic:
              </span>
              {aesthetics.map((item) => {
                const active = aesthetic === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setAesthetic(item.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-container hover:bg-surface-high"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:justify-end">
              <div className="relative grow lg:w-72">
                <Search
                  aria-hidden
                  size={18}
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
                />
                <label htmlFor="archive-search" className="sr-only">
                  Search the curated archive
                </label>
                <input
                  id="archive-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by font, finish, mood..."
                  className="w-full rounded-[8px] bg-surface-lowest py-2.5 pr-4 pl-10 text-[13px] shadow-sm transition-shadow outline-none placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div className="flex shrink-0 items-center rounded-[8px] bg-surface-lowest p-1 shadow-sm">
                <button
                  type="button"
                  aria-pressed={!compact}
                  onClick={() => setCompact(false)}
                  title="Curated editorial monograph view"
                  className={`rounded-[4px] p-2 transition-colors ${!compact ? "bg-surface-container text-primary" : "text-on-surface-variant hover:text-primary"}`}
                >
                  <LayoutPanelLeft aria-hidden size={20} />
                  <span className="sr-only">Curated monograph view</span>
                </button>
                <button
                  type="button"
                  aria-pressed={compact}
                  onClick={() => setCompact(true)}
                  title="Compact catalog grid"
                  className={`rounded-[4px] p-2 transition-colors ${compact ? "bg-surface-container text-primary" : "text-on-surface-variant hover:text-primary"}`}
                >
                  <LayoutGrid aria-hidden size={20} />
                  <span className="sr-only">Compact grid view</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {children}

      <section className="bg-surface-low/40 py-12 lg:py-20">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                Architectural Curation
              </span>
              <h2 className="font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
                The Autumn / Winter Archive
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-6 text-on-surface-variant">
              Each template is designed with intentional rhythm: generous
              line-height, tactile paper simulation, and hyper-customizable
              layouts.
            </p>
          </div>

          {visible.length > 0 ? (
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
              {visible.map(({ key, Card }, index) => (
                <div
                  key={key}
                  className={
                    compact
                      ? "md:col-span-6 lg:col-span-4"
                      : index % 3 === 0
                        ? "md:col-span-5"
                        : "md:col-span-7"
                  }
                >
                  <Card />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[12px] border border-surface-high bg-surface-lowest px-6 py-16 text-center">
              <SearchX
                aria-hidden
                size={34}
                className="mx-auto mb-2 text-on-surface-variant"
              />
              <h3 className="mb-1 font-serif text-lg">
                No matching suites in this archive
              </h3>
              <p className="mx-auto mb-4 max-w-sm text-xs leading-5 text-on-surface-variant">
                Try broadening your search term, changing the aesthetic, or
                clearing the filters.
              </p>
              <button
                type="button"
                onClick={reset}
                className="rounded-[8px] bg-primary px-4 py-2 text-xs font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
