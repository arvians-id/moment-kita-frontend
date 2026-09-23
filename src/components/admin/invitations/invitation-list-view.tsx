import { Plus } from "lucide-react";
import Link from "next/link";

import { InvitationDirectory } from "@/components/admin/invitations/invitation-directory";
import { InvitationMetrics } from "@/components/admin/invitations/invitation-metrics";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type { AdminInvitationListData } from "@/types";

export function InvitationListView({
  data,
}: {
  data: AdminInvitationListData;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Atelier Archive · Invitation Lifecycle Operations"
        title="Invitations"
        description="Orchestrate, monitor, publish, and extend digital wedding suites across registered accounts and studio-managed customers."
        actions={
          <Link
            href="/admin/invitations/new"
            prefetch={false}
            title="Admin Create Invitation is the next dedicated flow"
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <Plus aria-hidden size={16} /> Create Invitation
          </Link>
        }
      />

      <InvitationMetrics summary={data.summary} />
      <InvitationDirectory
        invitations={data.invitations}
        summary={data.summary}
        templates={data.templates}
      />
    </div>
  );
}
