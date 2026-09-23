import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { TemplateDetailHeader } from "@/components/admin/templates/template-detail-header";
import { TemplateDetailTabs } from "@/components/admin/templates/template-detail-tabs";
import type { AdminTemplateListItem } from "@/types";

export function TemplateDetailShell({
  template,
  children,
}: {
  template: AdminTemplateListItem;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-semibold tracking-[0.14em] uppercase">
        <Link
          href="/admin/templates"
          className="inline-flex min-h-9 items-center gap-2 text-on-surface-variant transition-colors hover:text-secondary"
        >
          <ArrowLeft aria-hidden size={14} /> Template Registry
        </Link>
        <span className="bg-surface-container px-2.5 py-1 font-mono tracking-normal text-on-surface-variant normal-case">
          {template.key}
        </span>
      </div>
      <TemplateDetailHeader template={template} />
      <TemplateDetailTabs templateKey={template.key} />
      {children}
    </div>
  );
}
