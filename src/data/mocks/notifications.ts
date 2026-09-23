import type { CustomerNotification } from "@/types";

/**
 * Notification timestamps are generated relative to whenever the app runs
 * (rather than fixed ISO dates) so the Today / Yesterday / Earlier grouping on
 * the Notifications page always has something in each bucket.
 */
function ago(msAgo: number): string {
  return new Date(Date.now() - msAgo).toISOString();
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const mockCustomerNotifications: readonly CustomerNotification[] = [
  // Today
  {
    id: "ntf_01",
    kind: "guestImportIssues",
    category: "guestsRsvp",
    eyebrow: "Guests & Import",
    title: "Guest Import Completed with 3 Review Items",
    description:
      "125 guests were successfully imported to your guest list. 3 rows had ambiguous phone formats and were saved as pending drafts for your review.",
    occurredAt: ago(25 * MINUTE),
    read: false,
    attention: true,
    relatedInvitationId: "inv_01",
    tag: "Action Required",
    actionLabel: "Review Guest List",
    actionHref: "/app/invitations/inv_01/guests",
  },
  {
    id: "ntf_02",
    kind: "rsvpResponses",
    category: "guestsRsvp",
    eyebrow: "RSVP & Attendance",
    title: "12 New Guests Confirmed RSVP Attendance",
    description:
      "Sarah Jenkins, Dimas Prasetyo, and 10 others confirmed their attendance. Total confirmed headcount is now 146 pax.",
    occurredAt: ago(HOUR),
    read: false,
    attention: false,
    relatedInvitationId: "inv_01",
    meta: "Includes 3 dietary preferences noted",
    actionLabel: "View RSVP Roster",
    actionHref: "/app/invitations/inv_01/rsvp",
  },
  {
    id: "ntf_03",
    kind: "wishesPending",
    category: "wedding",
    eyebrow: "Wishes & Blessings",
    title: "2 New Wishes Waiting for Approval",
    description:
      "Nadira Salsabila and 1 other submitted warm wishes to your guestbook. Moderation is set to require review before publishing.",
    occurredAt: ago(3 * HOUR),
    read: false,
    attention: false,
    relatedInvitationId: "inv_01",
    actionLabel: "Review Wishes",
    actionHref: "/app/invitations/inv_01/wishes",
  },
  {
    id: "ntf_04",
    kind: "draftIncomplete",
    category: "wedding",
    eyebrow: "Wedding & Draft",
    title: "Draft Invitation Incomplete",
    description:
      "Your draft 'Intimate Tea Ceremony' still has digital gift accounts and background music pending. 1 quota remains allocated to this project.",
    occurredAt: ago(7 * HOUR),
    read: false,
    attention: false,
    relatedInvitationId: "inv_02",
    actionLabel: "Continue Editing",
    actionHref: "/app/invitations/inv_02/edit",
  },

  // Yesterday
  {
    id: "ntf_05",
    kind: "paymentPending",
    category: "payments",
    eyebrow: "Payments & Quota",
    title: "Payment Awaiting Verification",
    description:
      "We received your bank transfer proof for TRX-240918-003 (Additional Invitation Quota +1). Our team is reconciling your receipt manually.",
    occurredAt: ago(DAY + 5 * HOUR),
    read: false,
    attention: true,
    relatedInvitationId: null,
    relatedTransactionId: "txn_03",
    tag: "Under Review",
    meta: "Manual verification, usually confirmed within 1 business day",
    actionLabel: "View Transaction",
    actionHref: "/app/transactions",
  },
  {
    id: "ntf_06",
    kind: "invitationPublished",
    category: "wedding",
    eyebrow: "Wedding Invitation",
    title: "Your Wedding Invitation is Live & Published",
    description:
      "Your suite is now live and ready to share. Your public invitation link is active and ready for distribution to guests.",
    occurredAt: ago(DAY + 3 * HOUR),
    read: true,
    attention: false,
    relatedInvitationId: "inv_01",
    actionLabel: "View Invitation",
    actionHref: "/raka-ayu",
    actionExternal: true,
  },
  {
    id: "ntf_07",
    kind: "giftAccountsUpdated",
    category: "payments",
    eyebrow: "Digital Envelope",
    title: "Digital Gift Accounts Updated",
    description:
      "Bank Central Asia (BCA) and GoPay Indonesia destinations were verified and synced to your invitation's gift envelope.",
    occurredAt: ago(DAY + 6 * HOUR),
    read: true,
    attention: false,
    relatedInvitationId: "inv_01",
    actionLabel: "Manage Gift Accounts",
    actionHref: "/app/invitations/inv_01/gift",
  },

  // Earlier
  {
    id: "ntf_08",
    kind: "paymentConfirmed",
    category: "payments",
    eyebrow: "Payments & Quota",
    title: "Payment Confirmed",
    description:
      "Your BCA Virtual Account payment for Signature Package (TRX-240922-001) has been confirmed and settled.",
    occurredAt: ago(4 * DAY),
    read: true,
    attention: false,
    relatedInvitationId: "inv_01",
    relatedTransactionId: "txn_01",
    actionLabel: "View Transaction",
    actionHref: "/app/transactions",
  },
  {
    id: "ntf_09",
    kind: "packageActivated",
    category: "payments",
    eyebrow: "Account Entitlements",
    title: "Package Successfully Activated",
    description:
      "Your Signature Suite package is now active with 4 invitation quota and unlimited RSVPs across your celebrations.",
    occurredAt: ago(4 * DAY + 2 * HOUR),
    read: true,
    attention: false,
    relatedInvitationId: null,
    relatedTransactionId: "txn_01",
  },
  {
    id: "ntf_10",
    kind: "invitationExtended",
    category: "account",
    eyebrow: "Expiration & Lifecycle",
    title: "Invitation Successfully Extended",
    description:
      "Your validity extension (+180 days) was confirmed. Public hosting for Raka & Ayu is now guaranteed until 20 February 2027.",
    occurredAt: ago(5 * DAY),
    read: true,
    attention: false,
    relatedInvitationId: "inv_01",
    relatedTransactionId: "txn_02",
    actionLabel: "View Transaction",
    actionHref: "/app/transactions",
  },
  {
    id: "ntf_11",
    kind: "accountSecurity",
    category: "account",
    eyebrow: "Account & Security",
    title: "New Sign-In to Your Account",
    description:
      "We noticed a new sign-in to your Moment Kita account from a new device. If this wasn't you, please contact concierge support right away.",
    occurredAt: ago(6 * DAY),
    read: false,
    attention: true,
    relatedInvitationId: null,
    tag: "Security",
  },
  {
    id: "ntf_12",
    kind: "invitationExpired",
    category: "wedding",
    eyebrow: "Expiration & Lifecycle",
    title: "Invitation Hosting Has Ended",
    description:
      "Public hosting for Budi & Clara — Engagement Soirée has concluded. Guest RSVPs and guestbook wishes remain archived and available to download.",
    occurredAt: ago(9 * DAY),
    read: true,
    attention: false,
    relatedInvitationId: "inv_04",
    actionLabel: "View Invitation",
    actionHref: "/app/invitations/inv_04",
  },
  {
    id: "ntf_13",
    kind: "guestImportCompleted",
    category: "guestsRsvp",
    eyebrow: "Guests & Import",
    title: "Guest Import Completed",
    description:
      "96 guests were successfully imported to Sarah & Liam — Autumn Letterpress Preview. No review items were flagged.",
    occurredAt: ago(11 * DAY),
    read: true,
    attention: false,
    relatedInvitationId: "inv_03",
    actionLabel: "View Guest List",
    actionHref: "/app/invitations/inv_03/guests",
  },
  {
    id: "ntf_14",
    kind: "invitationExpiringSoon",
    category: "account",
    eyebrow: "Expiration & Lifecycle",
    title: "Invitation Validity Notice",
    description:
      "Your public hosting for Raka & Ayu is guaranteed until 20 February 2027. No action is needed today — this is just a routine reminder.",
    occurredAt: ago(13 * DAY),
    read: true,
    attention: false,
    relatedInvitationId: "inv_01",
    actionLabel: "View Invitation",
    actionHref: "/app/invitations/inv_01",
  },
];
