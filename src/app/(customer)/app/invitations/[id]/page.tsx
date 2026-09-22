import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvitationCountdown } from "@/components/customer/invitation-detail/invitation-countdown";
import { InvitationDetailHeader } from "@/components/customer/invitation-detail/invitation-detail-header";
import { InvitationGiftPanel } from "@/components/customer/invitation-detail/invitation-gift-panel";
import { InvitationGuestActivity } from "@/components/customer/invitation-detail/invitation-guest-activity";
import { InvitationMetricCards } from "@/components/customer/invitation-detail/invitation-metric-cards";
import { InvitationPlanAndChangelog } from "@/components/customer/invitation-detail/invitation-plan-and-changelog";
import { InvitationPreviewPanel } from "@/components/customer/invitation-detail/invitation-preview-panel";
import { InvitationRsvpPanel } from "@/components/customer/invitation-detail/invitation-rsvp-panel";
import { InvitationStatusBanner } from "@/components/customer/invitation-detail/invitation-status-banner";
import { InvitationWishesPanel } from "@/components/customer/invitation-detail/invitation-wishes-panel";
import { InvitationWorkspaceTabs } from "@/components/customer/invitation-detail/invitation-workspace-tabs";
import { getInvitationDetail } from "@/services/customer/invitation-service";

interface InvitationOverviewPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InvitationOverviewPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getInvitationDetail(id);

  return { title: detail ? detail.invitation.coupleLabel : "Invitation" };
}

/** Live per-invitation workspace data; will read the session cookie later. */
export const dynamic = "force-dynamic";

export default async function InvitationOverviewPage({
  params,
}: InvitationOverviewPageProps) {
  const { id } = await params;
  const detail = await getInvitationDetail(id);

  if (!detail) notFound();

  const { invitation, guests, recentGuests, wishes, gift, activity } = detail;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-10">
      <InvitationDetailHeader invitation={invitation} />
      <InvitationWorkspaceTabs detail={detail} />

      <div className="flex flex-col gap-8 pt-2">
        <InvitationStatusBanner invitation={invitation} />
        <InvitationMetricCards detail={detail} />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <InvitationPreviewPanel invitation={invitation} />
          </div>
          <div className="flex flex-col gap-8 lg:col-span-7">
            <InvitationCountdown
              invitation={invitation}
              daysUntilWedding={detail.daysUntilWedding}
            />
            <InvitationRsvpPanel invitationId={invitation.id} guests={guests} />
            <InvitationGuestActivity
              invitationId={invitation.id}
              guests={recentGuests}
              totalGuests={invitation.guestCount}
            />
            <InvitationWishesPanel
              invitationId={invitation.id}
              wishes={wishes}
              totalWishes={invitation.metrics?.wishes ?? wishes.length}
            />
            <InvitationGiftPanel invitationId={invitation.id} gift={gift} />
            <InvitationPlanAndChangelog
              invitation={invitation}
              entitlement={detail.entitlement}
              activity={activity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
