import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { publicConfig } from "@/lib/config";
import type { AdminInvitationDetailData } from "@/types";

import { InvitationDetailHeader } from "./invitation-detail-header";
import { InvitationDetailTabs } from "./invitation-detail-tabs";

export function InvitationDetailShell({
  data,
  children,
}: {
  data: AdminInvitationDetailData;
  children: React.ReactNode;
}) {
  const publicUrl = `${publicConfig.appUrl}/${data.invitation.slug}`;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-semibold tracking-[0.14em] uppercase">
        <Link
          href="/admin/invitations"
          className="inline-flex min-h-9 items-center gap-2 text-on-surface-variant transition-colors hover:text-secondary"
        >
          <ArrowLeft aria-hidden size={14} /> Invitation Registry
        </Link>
        <span className="bg-surface-container px-2.5 py-1 font-mono tracking-normal text-on-surface-variant normal-case">
          ID: {data.invitation.id}
        </span>
      </div>
      <InvitationDetailHeader data={data} publicUrl={publicUrl} />
      <InvitationDetailTabs invitationId={data.invitation.id} />
      {children}
    </div>
  );
}
