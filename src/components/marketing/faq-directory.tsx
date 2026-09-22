"use client";

import { Minus, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export interface FaqGroup {
  title: string;
  items: readonly { question: string; answer: string }[];
}

export function FaqDirectory({ groups }: { groups: readonly FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [openKey, setOpenKey] = useState<string | null>(
    `${groups[0]?.title}-0`,
  );
  const visible = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              (category === "All" || category === group.title) &&
              `${item.question} ${item.answer}`
                .toLowerCase()
                .includes(query.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length),
    [category, groups, query],
  );

  return (
    <div>
      <div className="border border-border bg-surface-lowest p-4 sm:p-6">
        <label className="flex items-center gap-3 border-b border-primary pb-3">
          <Search aria-hidden size={18} />
          <span className="sr-only">Search frequently asked questions</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions, features, or materials"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`px-4 py-2 text-[10px] font-semibold tracking-widest uppercase ${category === "All" ? "bg-primary text-white" : "bg-surface-low"}`}
          >
            All
          </button>
          {groups.map((group) => (
            <button
              key={group.title}
              type="button"
              onClick={() => setCategory(group.title)}
              className={`px-4 py-2 text-[10px] font-semibold tracking-widest uppercase ${category === group.title ? "bg-primary text-white" : "bg-surface-low"}`}
            >
              {group.title}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 space-y-14">
        {visible.map((group, groupIndex) => (
          <section key={group.title} id={`faq-${groupIndex}`}>
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
                  Section 0{groupIndex + 1}
                </p>
                <h2 className="mt-3 font-serif text-3xl">{group.title}</h2>
              </div>
              <div className="border-t border-border">
                {group.items.map((item, index) => {
                  const key = `${group.title}-${index}`;
                  const isOpen = key === openKey;
                  return (
                    <div key={item.question} className="border-b border-border">
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif text-xl leading-7">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <Minus
                            size={18}
                            className="mt-1 shrink-0 text-secondary"
                          />
                        ) : (
                          <Plus
                            size={18}
                            className="mt-1 shrink-0 text-secondary"
                          />
                        )}
                      </button>
                      {isOpen ? (
                        <p className="max-w-3xl pb-6 text-sm leading-7 text-on-surface-variant">
                          {item.answer}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
      {!visible.length ? (
        <div className="py-20 text-center">
          <p className="font-serif text-3xl">No answers match that search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-4 text-xs font-semibold tracking-widest text-secondary uppercase"
          >
            Clear search
          </button>
        </div>
      ) : null}
    </div>
  );
}
