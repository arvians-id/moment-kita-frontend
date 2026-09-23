import type {
  ActivityEntry,
  AdminInvitationContentSummary,
  AdminInvitationEngagement,
  AdminInvitationExtension,
  AdminInvitationListItem,
  AdminInvitationVersionSummary,
  DigitalGiftSummary,
  InvitationGuestEntry,
  InvitationWish,
} from "@/types";

export interface AdminInvitationDetailSupplement {
  engagement: AdminInvitationEngagement;
  content: AdminInvitationContentSummary;
  recentGuests: InvitationGuestEntry[];
  recentWishes: InvitationWish[];
  gift: DigitalGiftSummary | null;
  giftEnabled: boolean;
  versions: AdminInvitationVersionSummary[];
  activity: ActivityEntry[];
  extensionHistory: AdminInvitationExtension[];
}

function stableNumber(value: string) {
  return Array.from(value).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );
}

/**
 * Detail-only operational fixtures. Invitation identity and lifecycle fields
 * remain owned by the Customer Detail records and are never repeated here.
 */
export function buildAdminInvitationDetailSupplement(
  invitation: AdminInvitationListItem,
): AdminInvitationDetailSupplement {
  const seed = stableNumber(invitation.id);
  const hasResponses =
    invitation.status === "published" || invitation.status === "expired";
  const guestCount = hasResponses ? 120 + (seed % 181) : 40 + (seed % 70);
  const attending = hasResponses ? Math.round(guestCount * 0.72) : 0;
  const declined = hasResponses ? Math.round(guestCount * 0.11) : 0;
  const pending = guestCount - attending - declined;
  const rsvpCount = attending + declined;
  const wishes = hasResponses ? 36 + (seed % 90) : 0;
  const publishedWishes = Math.max(0, wishes - 6);
  const pendingWishes = wishes > 0 ? 4 : 0;
  const hiddenWishes = wishes > 0 ? 2 : 0;
  const partnerNames =
    invitation.coupleLabel.split(" — ")[0] ?? invitation.coupleLabel;

  const recentGuests: InvitationGuestEntry[] = hasResponses
    ? [
        {
          id: `${invitation.id}_guest_1`,
          name: "Bpk. Hendra Gunawan & Ibu",
          initials: "HG",
          tag: "VIP Family",
          rsvpStatus: "confirmed",
          responseLabel: "2 pax attending",
        },
        {
          id: `${invitation.id}_guest_2`,
          name: "Sarah Jenkins",
          initials: "SJ",
          tag: "Close Friends",
          rsvpStatus: "confirmed",
          responseLabel: "1 pax attending",
        },
        {
          id: `${invitation.id}_guest_3`,
          name: "Dimas Raditya",
          initials: "DR",
          tag: "Family",
          rsvpStatus: "declined",
          responseLabel: "Sent regrets",
        },
      ]
    : [];

  const recentWishes: InvitationWish[] = hasResponses
    ? [
        {
          id: `${invitation.id}_wish_1`,
          author: "Keluarga Besar Sastromidjojo",
          relation: "Family",
          occurredAt: "Today, 09:12",
          message: `Dearest ${partnerNames}, may your journeys unite under the sacred Uluwatu horizon and your marriage be filled with enduring patience, endless laughter, and abundant blessings.`,
        },
        {
          id: `${invitation.id}_wish_2`,
          author: "Sarah Jenkins",
          relation: "Close Friends",
          occurredAt: "Yesterday, 18:40",
          message:
            "Wishing you a celebration full of warmth and a lifetime of joyful adventures together.",
        },
      ]
    : [];

  const giftEnabled = invitation.status !== "cancelled";
  const gift: DigitalGiftSummary | null = giftEnabled
    ? {
        accounts: [
          {
            id: `${invitation.id}_gift_1`,
            accountType: "bank",
            provider: "Bank BCA",
            role: "Primary bank transfer",
            bankName: "Bank BCA",
            accountNumber: "•••• 8821",
            accountHolder: partnerNames,
            badge: "Bank account",
          },
          {
            id: `${invitation.id}_gift_2`,
            accountType: "e_wallet",
            provider: "GoPay",
            role: "Secondary gift channel",
            bankName: "GoPay",
            accountNumber: "•••• 2210",
            accountHolder: partnerNames,
            badge: "E-wallet",
          },
        ],
        deliveryAddress: `${invitation.venue} — concierge-confirmed physical gift delivery`,
      }
    : null;

  const versions: AdminInvitationVersionSummary[] = [
    {
      id: `${invitation.id}_version_3`,
      versionNumber: 3,
      summary: "Gallery, venue, and RSVP copy updated",
      savedAt: "2026-09-22T18:42:00+07:00",
      actor: invitation.customer.name,
      isCurrent: true,
    },
    {
      id: `${invitation.id}_version_2`,
      versionNumber: 2,
      summary: "Template sections and digital gift settings updated",
      savedAt: "2026-09-18T11:20:00+07:00",
      actor: "Atelier Admin",
      isCurrent: false,
    },
    {
      id: `${invitation.id}_version_1`,
      versionNumber: 1,
      summary: "Initial invitation content saved",
      savedAt: invitation.createdAt,
      actor: invitation.customer.name,
      isCurrent: false,
    },
  ];

  const activity: ActivityEntry[] = [
    ...(invitation.status === "cancelled"
      ? [
          {
            id: `${invitation.id}_cancelled`,
            kind: "invitation" as const,
            message: "Invitation cancelled by Atelier Admin",
            occurredAt: "21 Sep 2026 • Reason recorded",
          },
        ]
      : []),
    ...(invitation.publishedAt
      ? [
          {
            id: `${invitation.id}_published`,
            kind: "invitation" as const,
            message: "Invitation published to its public URL",
            occurredAt: "12 Sep 2026 • Atelier Admin",
          },
        ]
      : []),
    ...(invitation.finalizedAt
      ? [
          {
            id: `${invitation.id}_finalized`,
            kind: "invitation" as const,
            message: "Invitation finalized; quota allocation committed",
            occurredAt: "10 Sep 2026 • Studio workflow",
          },
        ]
      : []),
    {
      id: `${invitation.id}_content`,
      kind: "invitation",
      message: "Content and event details updated",
      occurredAt: "8 Sep 2026 • Customer workspace",
    },
    {
      id: `${invitation.id}_created`,
      kind: "invitation",
      message: "Invitation suite created",
      occurredAt: "Initial version • Atelier Admin",
    },
  ];

  const extensionHistory: AdminInvitationExtension[] = invitation.expiresAt
    ? [
        {
          id: `${invitation.id}_extension_1`,
          days: 30,
          previousExpiration: new Date(
            new Date(invitation.expiresAt).getTime() - 30 * 86_400_000,
          ).toISOString(),
          newExpiration: invitation.expiresAt,
          createdAt: "2026-09-20T10:30:00+07:00",
          actor: "Atelier Admin",
          reason: "Customer requested continued guestbook access.",
        },
      ]
    : [];

  return {
    engagement: {
      views: hasResponses ? 2_400 + (seed % 2_800) : 0,
      guests: {
        totalInvited: guestCount,
        attending,
        declined,
        pending,
        confirmedPax: attending + Math.round(attending * 0.18),
        cateringTarget: Math.ceil(guestCount * 1.15),
        invitedThisWeek: hasResponses ? 12 : 0,
        attendingAdults: attending,
        attendingChildren: Math.round(attending * 0.08),
      },
      rsvpCount,
      wishes,
      publishedWishes,
      pendingWishes,
      hiddenWishes,
    },
    content: {
      enabledSections: [
        "Couple Story",
        "Events",
        "Gallery",
        "RSVP",
        "Wishes",
        ...(giftEnabled ? ["Digital Gift"] : []),
      ],
      eventCount: invitation.coupleLabel.includes("—") ? 2 : 1,
      galleryCount: 12,
      audioEnabled: true,
      rsvpEnabled: invitation.status !== "cancelled",
      wishesEnabled: invitation.status !== "cancelled",
    },
    recentGuests,
    recentWishes,
    gift,
    giftEnabled,
    versions,
    activity,
    extensionHistory,
  };
}
