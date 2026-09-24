"use client";

import {
  ChevronDown,
  MousePointerClick,
  Search,
  SearchX,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Container } from "@/components/shared/container";
import type { CatalogStyle, CatalogTemplate } from "@/types";
import { idrFormat as currency } from "@/lib/format";

const PAGE_SIZE = 12;


const styleFilters = [
  { id: "all", label: "All" },
  { id: "minimal", label: "Minimal" },
  { id: "elegant", label: "Elegant" },
  { id: "floral", label: "Floral" },
  { id: "rustic", label: "Rustic" },
  { id: "modern", label: "Modern" },
  { id: "manga", label: "Manga" },
  { id: "traditional", label: "Traditional" },
] as const;

type SortKey = "latest" | "popular" | "price-high" | "price-low";

const selectClass =
  "rounded-[6px] border-0 bg-surface-low px-3 py-1.5 text-xs font-semibold tracking-[0.06em] uppercase outline-none focus:ring-1 focus:ring-secondary";

/**
 * Per-design detail pages are part of the deferred template renderer work, so a
 * catalog entry previews the medium it belongs to rather than linking to a
 * route that does not exist yet.
 */
function previewHref(item: CatalogTemplate) {
  return item.tier === "signature" ? "/digital" : "/printed";
}

function priceLabel(item: CatalogTemplate) {
  return item.tier === "signature"
    ? currency.format(item.price)
    : `From ${currency.format(item.price)}`;
}

export function TemplateDirectory({
  templates,
}: {
  templates: CatalogTemplate[];
}) {
  const [style, setStyle] = useState<CatalogStyle | "all">("all");
  const [tier, setTier] = useState<"all" | "signature" | "bespoke">("all");
  const [sort, setSort] = useState<SortKey>("latest");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const term = query.trim().toLowerCase();

  const matched = useMemo(() => {
    const filtered = templates.filter(
      (item) =>
        (style === "all" || item.style === style) &&
        (tier === "all" || item.tier === tier) &&
        (term === "" ||
          `${item.name} ${item.description} ${item.styleLabel} ${item.kicker}`
            .toLowerCase()
            .includes(term)),
    );

    const sorted = [...filtered];
    if (sort === "popular") sorted.sort((a, b) => b.popularity - a.popularity);
    if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }, [sort, style, templates, term, tier]);

  const visible = matched.slice(0, shown);

  function update<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setShown(PAGE_SIZE);
    };
  }

  function reset() {
    setStyle("all");
    setTier("all");
    setSort("latest");
    setQuery("");
    setShown(PAGE_SIZE);
  }

  return (
    <section
      id="catalog-grid-section"
      className="relative w-full scroll-mt-20 border-y border-surface-highest/60 bg-[#f8f5ee] py-20 lg:py-28"
    >
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-secondary" />
              <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                The Complete Atelier Directory • {templates.length} Master
                Suites
              </span>
            </div>
            <h2 className="font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
              Explore More Designs
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
              Browse our curated collection and find a style that matches your
              wedding. Every edition is engineered for fluid cloud RSVPs and
              high-touch artisan print reproduction.
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-surface-high bg-surface-lowest px-3.5 py-1.5 text-xs font-semibold shadow-sm">
            <Sparkles aria-hidden size={15} className="text-secondary" />
            <span aria-live="polite">
              Showing {visible.length} of {templates.length} Curated Archival
              Suites
            </span>
          </span>
        </div>

        <div className="mb-10 rounded-[16px] border border-surface-high bg-surface-lowest p-4 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 border-b border-surface-high pb-4 lg:flex-row lg:items-center">
            <div
              role="group"
              aria-label="Filter designs by style"
              className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0"
            >
              {styleFilters.map((item) => {
                const active = style === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      update<CatalogStyle | "all">(setStyle)(item.id)
                    }
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
            <div className="relative grow lg:max-w-xs">
              <Search
                aria-hidden
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
              />
              <label htmlFor="catalog-search" className="sr-only">
                Search templates
              </label>
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) =>
                  update<string>(setQuery)(event.target.value)
                }
                placeholder="Search templates by name, floral, typography..."
                className="w-full rounded-[8px] border-0 bg-surface-low py-2 pr-4 pl-10 text-[13px] outline-none placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs">
            <div className="flex items-center gap-2">
              <label
                htmlFor="catalog-tier"
                className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase"
              >
                Tier:
              </label>
              <select
                id="catalog-tier"
                value={tier}
                onChange={(event) =>
                  update<"all" | "signature" | "bespoke">(setTier)(
                    event.target.value as "all" | "signature" | "bespoke",
                  )
                }
                className={selectClass}
              >
                <option value="all">All Tiers</option>
                <option value="signature">Signature Suite</option>
                <option value="bespoke">Bespoke Atelier</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="catalog-sort"
                className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase"
              >
                Sort:
              </label>
              <select
                id="catalog-sort"
                value={sort}
                onChange={(event) =>
                  update<SortKey>(setSort)(event.target.value as SortKey)
                }
                className={selectClass}
              >
                <option value="latest">Latest Releases</option>
                <option value="popular">Most Popular</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
              <button
                type="button"
                onClick={reset}
                className="ml-2 text-xs font-semibold text-secondary uppercase underline transition-colors hover:text-primary"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((item) => (
              <article
                key={item.key}
                className="group flex flex-col justify-between overflow-hidden rounded-[12px] bg-surface-lowest shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase backdrop-blur-sm">
                    {item.styleLabel}
                  </span>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/70 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                    <Link
                      href={previewHref(item)}
                      className="w-full rounded-[4px] bg-white px-4 py-2 text-center text-xs font-semibold tracking-[0.12em] text-primary uppercase transition-colors hover:bg-champagne"
                    >
                      Live Preview
                    </Link>
                    <Link
                      href="/register"
                      className="w-full rounded-[4px] bg-secondary px-4 py-2 text-center text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-secondary/90"
                    >
                      Use This Design
                    </Link>
                  </div>
                </div>
                <div className="flex grow flex-col justify-between p-5">
                  <div>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                        {item.kicker}
                      </span>
                      <span className="font-mono text-xs font-semibold whitespace-nowrap">
                        {priceLabel(item)}
                      </span>
                    </div>
                    <h3 className="mb-1 font-serif text-lg leading-6 font-semibold">
                      {item.name}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-surface-container pt-4 text-xs">
                    <span className="font-mono text-[11px] text-on-surface-variant">
                      {item.tier === "signature"
                        ? "Included in Signature"
                        : "Bespoke Atelier"}
                    </span>
                    <MousePointerClick
                      aria-hidden
                      size={16}
                      className="text-secondary"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[12px] border border-surface-high bg-surface-lowest py-16 text-center">
            <SearchX
              aria-hidden
              size={36}
              className="mx-auto mb-2 text-on-surface-variant"
            />
            <h3 className="mb-1 font-serif text-lg">
              No matching suites found
            </h3>
            <p className="mx-auto mb-4 max-w-sm text-xs leading-5 text-on-surface-variant">
              Try broadening your search term, changing the aesthetic style, or
              clearing filters.
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

        {matched.length > 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-surface-high pt-8">
            {visible.length < matched.length ? (
              <button
                type="button"
                onClick={() => setShown((value) => value + PAGE_SIZE)}
                className="flex items-center gap-2 rounded-[8px] border border-surface-high bg-surface-lowest px-8 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase shadow-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                <span>Load More Designs</span>
                <ChevronDown aria-hidden size={18} />
              </button>
            ) : null}
            <span className="font-mono text-xs text-on-surface-variant">
              {visible.length} of {matched.length} suites loaded
            </span>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
