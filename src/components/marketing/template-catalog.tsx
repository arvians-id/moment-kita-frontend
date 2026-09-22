"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { TemplateSummary } from "@/types";

export function TemplateCatalog({
  templates,
}: {
  templates: TemplateSummary[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(templates.map((item) => item.category)),
  ];
  const visible = useMemo(
    () =>
      templates.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          `${item.name} ${item.description}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query, templates],
  );

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap gap-2"
          aria-label="Filter templates by category"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`px-4 py-2 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors ${category === item ? "bg-primary text-white" : "bg-surface-low hover:bg-surface-container"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="flex min-w-64 items-center gap-2 border-b border-primary py-2">
          <Search aria-hidden size={16} />
          <span className="sr-only">Search templates</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the collection"
            className="w-full bg-transparent text-sm outline-none placeholder:text-on-surface-variant/60"
          />
        </label>
      </div>
      {visible.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {visible.map((template) => (
            <article
              key={template.rendererKey}
              className="group bg-surface-lowest"
            >
              <Link href={`/templates/${template.key}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                  <Image
                    src={template.thumbnailUrl}
                    alt={`${template.name} invitation design`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="border-x border-b border-border p-6">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
                    {template.category} collection
                  </p>
                  <h3 className="mt-2 font-serif text-3xl">{template.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                    {template.description}
                  </p>
                  <span className="mt-5 inline-block text-[10px] font-semibold tracking-[0.16em] uppercase">
                    View design →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-border bg-surface-lowest px-6 py-16 text-center">
          <p className="font-serif text-2xl">No matching suites found.</p>
          <button
            type="button"
            className="mt-4 text-xs font-semibold tracking-widest text-secondary uppercase"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
