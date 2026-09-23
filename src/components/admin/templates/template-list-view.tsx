"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import { RegisterTemplateDialog } from "@/components/admin/templates/register-template-dialog";
import { TemplateDirectory } from "@/components/admin/templates/template-directory";
import { TemplateMetrics } from "@/components/admin/templates/template-metrics";
import type { AdminTemplateListData } from "@/types";

export function TemplateListView({ data }: { data: AdminTemplateListData }) {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registrationNotice, setRegistrationNotice] = useState<string | null>(
    null,
  );

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Moment Kita Architecture Registry"
        title="Templates"
        description="Manage template metadata, commercial availability, and catalog prominence while renderer implementation and deployment remain developer-controlled."
        actions={
          <button
            type="button"
            onClick={() => setRegistrationOpen(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <Plus aria-hidden size={16} /> Register Template Version
          </button>
        }
      />

      {registrationNotice ? (
        <p
          role="status"
          className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-950"
        >
          {registrationNotice}
        </p>
      ) : null}

      <TemplateMetrics summary={data.summary} />
      <TemplateDirectory
        initialTemplates={data.templates}
        categories={data.categories}
      />

      <RegisterTemplateDialog
        open={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
        onRegistered={setRegistrationNotice}
      />
    </div>
  );
}
