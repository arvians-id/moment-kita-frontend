"use client";

import {
  CheckCircle2,
  ExternalLink,
  Star,
  StarOff,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import { TemplateActionDialog } from "@/components/admin/templates/template-action-dialog";
import type { AdminTemplateListItem } from "@/types";

function StatusBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex min-h-6 items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase ${
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

export function TemplateDetailHeader({
  template: initialTemplate,
}: {
  template: AdminTemplateListItem;
}) {
  const [template, setTemplate] = useState(initialTemplate);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function toggleFeatured() {
    setTemplate((current) => ({ ...current, featured: !current.featured }));
    setNotice(
      `${template.name} was ${template.featured ? "removed from" : "added to"} featured placement.`,
    );
  }

  function confirmAvailability() {
    setTemplate((current) => ({ ...current, enabled: !current.enabled }));
    setNotice(
      `${template.name} is now ${template.enabled ? "disabled" : "enabled"} in this registry preview.`,
    );
    setAvailabilityDialogOpen(false);
  }

  return (
    <div className="space-y-4">
      {notice ? (
        <div
          role="status"
          className="flex items-center justify-between gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[10px] text-emerald-950"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 aria-hidden size={14} /> {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="grid size-7 shrink-0 place-items-center"
          >
            <X aria-hidden size={14} />
          </button>
        </div>
      ) : null}

      <section className="relative border border-border bg-surface-low p-5 shadow-sm sm:p-7 lg:p-8">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-secondary via-accent to-transparent" />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-container sm:h-28 sm:w-24">
              <Image
                src={template.imageUrl}
                alt={template.imageAlt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge enabled={template.enabled} />
                {template.featured ? (
                  <span className="inline-flex items-center gap-1.5 bg-accent px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-accent-foreground uppercase">
                    <Star aria-hidden size={11} fill="currentColor" /> Featured
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] uppercase">
                  <Tag aria-hidden size={12} /> {template.styleLabel}
                </span>
              </div>

              <div className="mt-3">
                <AdminPageHeader
                  eyebrow={`Template Architecture Dossier · ${template.activeVersion}`}
                  title={
                    <span className="block text-[30px] leading-[1.05] sm:text-[38px]">
                      {template.name}
                    </span>
                  }
                  description={template.description}
                />
              </div>

              <p className="mt-3 font-mono text-[10px] text-on-surface-variant">
                {template.key}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap xl:max-w-[420px] xl:justify-end">
            <a
              href={template.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.1em] uppercase shadow-sm"
            >
              <ExternalLink aria-hidden size={15} /> Preview
            </a>
            <button
              type="button"
              onClick={toggleFeatured}
              className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase hover:bg-accent"
            >
              {template.featured ? (
                <StarOff aria-hidden size={14} />
              ) : (
                <Star aria-hidden size={14} />
              )}
              {template.featured ? "Unfeature" : "Feature"}
            </button>
            <button
              type="button"
              onClick={() => setAvailabilityDialogOpen(true)}
              className={`inline-flex min-h-10 items-center justify-center gap-2 px-4 text-[9px] font-semibold tracking-[0.1em] uppercase ${
                template.enabled
                  ? "bg-surface-container hover:bg-red-50 hover:text-red-700"
                  : "bg-primary text-primary-foreground hover:bg-secondary"
              }`}
            >
              {template.enabled ? "Disable" : "Enable"}
            </button>
            <Link
              href={`/admin/templates/${template.key}/commercial`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
            >
              <Wallet aria-hidden size={15} /> Commercial Settings
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-border pt-5 text-[10px] text-on-surface-variant sm:grid-cols-2 xl:grid-cols-4">
          <span>
            Category{" "}
            <strong className="text-on-surface">{template.styleLabel}</strong>
          </span>
          <span>
            Active version{" "}
            <strong className="text-on-surface">{template.activeVersion}</strong>
          </span>
          <span>
            Package access{" "}
            <strong className="text-on-surface">
              {template.packageAccess.join(" · ")}
            </strong>
          </span>
          <span>
            Suites deployed{" "}
            <strong className="text-on-surface">{template.usageCount}</strong>
          </span>
        </div>
      </section>

      {availabilityDialogOpen ? (
        <TemplateActionDialog
          template={template}
          onClose={() => setAvailabilityDialogOpen(false)}
          onConfirm={confirmAvailability}
        />
      ) : null}
    </div>
  );
}
