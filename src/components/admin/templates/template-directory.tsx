"use client";

import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Eye,
  Power,
  RotateCcw,
  Search,
  SearchX,
  Star,
  StarOff,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { TemplateActionDialog } from "@/components/admin/templates/template-action-dialog";
import type { AdminTemplateListItem } from "@/types";

type StatusFilter = "all" | "enabled" | "disabled";
type FeaturedFilter = "all" | "featured" | "standard";

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

function StatusBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex min-h-6 items-center gap-1.5 px-2 text-[8px] font-semibold tracking-[0.1em] uppercase ${
        enabled
          ? "bg-emerald-50 text-emerald-800"
          : "bg-surface-container text-on-surface-variant"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${enabled ? "bg-emerald-600" : "bg-on-surface-variant/50"}`}
      />
      {enabled ? "Enabled" : "Disabled"}
    </span>
  );
}

function TemplateActions({
  template,
  onToggleEnabled,
  onToggleFeatured,
  compact = false,
}: {
  template: AdminTemplateListItem;
  onToggleEnabled: (template: AdminTemplateListItem) => void;
  onToggleFeatured: (template: AdminTemplateListItem) => void;
  compact?: boolean;
}) {
  const buttonClass = compact
    ? "inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 border border-border px-2 text-[9px] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-surface-low"
    : "grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary";

  return (
    <div className={compact ? "flex gap-2" : "flex justify-end gap-0.5"}>
      <Link
        href={`/admin/templates/${template.key}`}
        prefetch={false}
        title="View Template"
        aria-label={`View ${template.name}`}
        className={buttonClass}
      >
        <Eye aria-hidden size={compact ? 14 : 15} />
        {compact ? "View" : null}
      </Link>
      <a
        href={template.imageUrl}
        target="_blank"
        rel="noreferrer"
        title="Preview visual"
        aria-label={`Preview ${template.name}`}
        className={buttonClass}
      >
        <ExternalLink aria-hidden size={compact ? 14 : 15} />
        {compact ? "Preview" : null}
      </a>
      <button
        type="button"
        onClick={() => onToggleFeatured(template)}
        title={
          template.featured ? "Remove featured placement" : "Feature template"
        }
        aria-label={`${template.featured ? "Unfeature" : "Feature"} ${template.name}`}
        className={buttonClass}
      >
        {template.featured ? (
          <StarOff aria-hidden size={compact ? 14 : 15} />
        ) : (
          <Star aria-hidden size={compact ? 14 : 15} />
        )}
        {compact ? (template.featured ? "Unfeature" : "Feature") : null}
      </button>
      <button
        type="button"
        onClick={() => onToggleEnabled(template)}
        title={template.enabled ? "Disable template" : "Enable template"}
        aria-label={`${template.enabled ? "Disable" : "Enable"} ${template.name}`}
        className={buttonClass}
      >
        <Power aria-hidden size={compact ? 14 : 15} />
        {compact ? (template.enabled ? "Disable" : "Enable") : null}
      </button>
    </div>
  );
}

export function TemplateDirectory({
  initialTemplates,
  categories,
}: {
  initialTemplates: AdminTemplateListItem[];
  categories: string[];
}) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [featured, setFeatured] = useState<FeaturedFilter>("all");
  const [pendingTemplate, setPendingTemplate] =
    useState<AdminTemplateListItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const term = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      templates.filter((template) => {
        const matchesQuery =
          term === "" ||
          `${template.name} ${template.key} ${template.styleLabel}`
            .toLowerCase()
            .includes(term);
        const matchesCategory =
          category === "all" || template.styleLabel === category;
        const matchesStatus =
          status === "all" ||
          (status === "enabled" ? template.enabled : !template.enabled);
        const matchesFeatured =
          featured === "all" ||
          (featured === "featured" ? template.featured : !template.featured);

        return (
          matchesQuery && matchesCategory && matchesStatus && matchesFeatured
        );
      }),
    [category, featured, status, templates, term],
  );

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setFeatured("all");
  }

  function toggleFeatured(template: AdminTemplateListItem) {
    setTemplates((current) =>
      current.map((item) =>
        item.key === template.key
          ? { ...item, featured: !item.featured }
          : item,
      ),
    );
    setNotice(
      `${template.name} was ${template.featured ? "removed from" : "added to"} featured placement.`,
    );
  }

  function confirmAvailability() {
    if (!pendingTemplate) return;
    setTemplates((current) =>
      current.map((item) =>
        item.key === pendingTemplate.key
          ? { ...item, enabled: !item.enabled }
          : item,
      ),
    );
    setNotice(
      `${pendingTemplate.name} is now ${pendingTemplate.enabled ? "disabled" : "enabled"} in this registry preview.`,
    );
    setPendingTemplate(null);
  }

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

      <div className="border border-border bg-surface-lowest p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
              Commercial catalog controls
            </p>
            <h2 className="mt-1 font-serif text-[22px]">Template Directory</h2>
          </div>
          <p className="max-w-lg text-[10px] leading-5 text-on-surface-variant lg:text-right">
            Availability and featured placement are separate controls. Renderer
            code and version deployment remain outside Admin.
          </p>
        </div>

        <div className="mt-4 grid gap-2 lg:grid-cols-12">
          <div className="relative h-10 lg:col-span-5">
            <Search
              aria-hidden
              size={15}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <label htmlFor="template-search" className="sr-only">
              Search templates
            </label>
            <input
              id="template-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search template name, key, or category..."
              className="h-10 w-full border border-transparent bg-surface-low pr-3 pl-9 text-[12px] outline-none placeholder:text-on-surface-variant/60 focus:border-secondary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 lg:col-span-7 lg:grid-cols-4">
            <SelectShell>
              <label htmlFor="template-category" className="sr-only">
                Category
              </label>
              <select
                id="template-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={selectClass}
              >
                <option value="all">Category: All</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="template-status" className="sr-only">
                Status
              </label>
              <select
                id="template-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as StatusFilter)
                }
                className={selectClass}
              >
                <option value="all">Status: All</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="template-featured" className="sr-only">
                Featured status
              </label>
              <select
                id="template-featured"
                value={featured}
                onChange={(event) =>
                  setFeatured(event.target.value as FeaturedFilter)
                }
                className={selectClass}
              >
                <option value="all">Placement: All</option>
                <option value="featured">Featured</option>
                <option value="standard">Standard</option>
              </select>
            </SelectShell>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-10 items-center justify-center gap-2 border border-border px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase hover:bg-surface-low"
            >
              <RotateCcw aria-hidden size={13} /> Reset
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-[10px] text-on-surface-variant">
          <span>
            Showing <strong className="text-primary">{visible.length}</strong>{" "}
            of {templates.length} templates
          </span>
          <span className="hidden sm:inline">
            Registry metadata · mock service
          </span>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="grid min-h-64 place-items-center border border-dashed border-border bg-surface-lowest p-8 text-center">
          <div>
            <SearchX
              aria-hidden
              size={28}
              className="mx-auto text-on-surface-variant"
            />
            <p className="mt-3 font-serif text-[20px]">No templates found</p>
            <p className="mt-1 text-[11px] text-on-surface-variant">
              Adjust the search or reset the catalog filters.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden overflow-visible bg-surface-lowest shadow-sm xl:block">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="bg-surface-low text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                  <th className="w-[31%] px-4 py-3 font-semibold">Template</th>
                  <th className="w-[14%] px-3 py-3 font-semibold">Category</th>
                  <th className="w-[13%] px-3 py-3 font-semibold">Release</th>
                  <th className="w-[17%] px-3 py-3 font-semibold">
                    Package Access
                  </th>
                  <th className="w-[9%] px-3 py-3 text-center font-semibold">
                    Usage
                  </th>
                  <th className="w-[11%] px-3 py-3 text-center font-semibold">
                    Placement
                  </th>
                  <th className="w-[12%] px-3 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map((template) => (
                  <tr
                    key={template.key}
                    className="transition-colors hover:bg-surface-low/75"
                  >
                    <td className="px-4 py-3.5 align-middle">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-surface-container">
                          <Image
                            src={template.imageUrl}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold">
                            {template.name}
                          </p>
                          <p className="mt-1 truncate font-mono text-[9px] text-on-surface-variant">
                            {template.key}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 align-middle text-[11px]">
                      {template.styleLabel}
                    </td>
                    <td className="px-3 py-3.5 align-middle">
                      <p className="text-[11px] font-semibold">
                        {template.activeVersion}
                      </p>
                      <div className="mt-1.5">
                        <StatusBadge enabled={template.enabled} />
                      </div>
                    </td>
                    <td className="px-3 py-3.5 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {template.packageAccess.map((item) => (
                          <span
                            key={item}
                            className="bg-surface-container px-2 py-1 text-[8px] font-semibold tracking-[0.08em] uppercase"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-center align-middle">
                      <p className="font-serif text-[19px]">
                        {template.usageCount}
                      </p>
                      <p className="text-[8px] text-on-surface-variant uppercase">
                        suites
                      </p>
                    </td>
                    <td className="px-3 py-3.5 text-center align-middle">
                      {template.featured ? (
                        <span className="inline-flex items-center gap-1 bg-accent px-2 py-1.5 text-[8px] font-semibold tracking-[0.08em] text-accent-foreground uppercase">
                          <Star aria-hidden size={11} fill="currentColor" />{" "}
                          Featured
                        </span>
                      ) : (
                        <span className="text-[9px] text-on-surface-variant">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3.5 text-right align-middle">
                      <TemplateActions
                        template={template}
                        onToggleEnabled={setPendingTemplate}
                        onToggleFeatured={toggleFeatured}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="grid gap-3 md:grid-cols-2 xl:hidden">
            {visible.map((template) => (
              <li
                key={template.key}
                className="min-w-0 bg-surface-lowest p-4 shadow-sm"
              >
                <div className="flex min-w-0 gap-3">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-container">
                    <Image
                      src={template.imageUrl}
                      alt={template.imageAlt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="truncate text-[13px] font-semibold">
                          {template.name}
                        </h2>
                        <p className="mt-1 truncate font-mono text-[9px] text-on-surface-variant">
                          {template.key}
                        </p>
                      </div>
                      {template.featured ? (
                        <Star
                          aria-label="Featured"
                          size={14}
                          fill="currentColor"
                          className="shrink-0 text-secondary"
                        />
                      ) : null}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <StatusBadge enabled={template.enabled} />
                      <span className="bg-surface-low px-2 py-1.5 text-[8px] font-semibold tracking-[0.08em] uppercase">
                        {template.styleLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-3 gap-2 bg-surface-low p-3 text-center">
                  <div>
                    <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                      Version
                    </dt>
                    <dd className="mt-1 text-[12px] font-semibold">
                      {template.activeVersion}
                    </dd>
                  </div>
                  <div className="border-x border-border px-1">
                    <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                      Usage
                    </dt>
                    <dd className="mt-1 text-[12px] font-semibold">
                      {template.usageCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                      Access
                    </dt>
                    <dd className="mt-1 truncate text-[10px] font-semibold">
                      {template.packageAccess.join(" + ")}
                    </dd>
                  </div>
                </dl>
                <div className="mt-3">
                  <TemplateActions
                    compact
                    template={template}
                    onToggleEnabled={setPendingTemplate}
                    onToggleFeatured={toggleFeatured}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {pendingTemplate ? (
        <TemplateActionDialog
          template={pendingTemplate}
          onClose={() => setPendingTemplate(null)}
          onConfirm={confirmAvailability}
        />
      ) : null}
    </section>
  );
}
