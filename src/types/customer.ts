import type {
  NotificationDeliveryPreference,
  NotificationRecord,
} from "./notification";

/**
 * Customer CMS domain types.
 *
 * Kept intentionally narrow: only what the Customer App foundation and the
 * Dashboard need today. The backend contract in `docs/technical-design.md`
 * remains authoritative once real API integration lands.
 */

/** Mirrors the invitation lifecycle states in the technical design. */
export type InvitationStatus =
  "draft" | "finalized" | "published" | "expired" | "cancelled";

export interface Customer {
  id: string;
  name: string;
  email: string;
  /** Pre-computed avatar initials so the UI never has to parse names. */
  initials: string;
}

/** Live engagement counters for a published suite. */
export interface InvitationMetrics {
  rsvps: number;
  wishes: number;
  views: number;
}

/** Setup progress for a draft suite. */
export interface InvitationProgress {
  completedSections: number;
  totalSections: number;
  /** What the couple still needs to finish. */
  pendingNote: string;
}

/** What remains available after public hosting has ended. */
export interface InvitationArchive {
  rsvpsPreserved: number;
  photoUploads: number;
  note: string;
}

export interface CustomerInvitation {
  id: string;
  slug: string;
  /** Short couple label used by the wedding switcher, e.g. "Raka & Ayu". */
  coupleLabel: string;
  /** Full editorial title shown on cards. */
  title: string;
  status: InvitationStatus;
  /** ISO 8601 date of the ceremony. */
  eventDate: string;
  venue: string;
  templateName: string;
  guestCount: number;
  confirmedCount: number;

  /*
   * Everything below is optional and state-dependent: only the fields that
   * matter for an invitation's current lifecycle state are populated.
   */

  /** One-line description of the template's visual direction. */
  templateDescription?: string;
  previewImage?: string;
  /** ISO 8601 date when public hosting ends (published and expired suites). */
  expiresAt?: string;
  /** Relative label for now; the API will supply real timestamps. */
  lastModifiedLabel?: string;
  /** Published suites only. */
  metrics?: InvitationMetrics;
  /** Draft suites only. */
  progress?: InvitationProgress;
  /** Finalized suites only: why the proof is ready to publish. */
  readinessNote?: string;
  /** Expired suites only. */
  archive?: InvitationArchive;
  /** Cancelled suites only. */
  cancelledNote?: string;
}

export interface GuestResponseSummary {
  totalInvited: number;
  attending: number;
  declined: number;
  pending: number;
  /** Confirmed head count including plus-ones. */
  confirmedPax: number;
  cateringTarget: number;
  invitedThisWeek: number;
  attendingAdults: number;
  attendingChildren: number;
}

export interface EngagementSummary {
  pageViews: number;
  interactions: number;
  envelopesOpened: number;
  calendarAdds: number;
  topLocations: string[];
  wishesReceived: number;
  featuredWish: {
    message: string;
    author: string;
  };
}

export interface EntitlementSummary {
  packageName: string;
  quotaGranted: number;
  quotaRemaining: number;
  /** Plain-language explanation of how the quota is currently used. */
  quotaNote: string;
  features: string[];
}

export type ActivityKind = "rsvp" | "wish" | "gift" | "invitation";

export interface ActivityEntry {
  id: string;
  kind: ActivityKind;
  message: string;
  /** Human-readable relative time; the API will supply timestamps later. */
  occurredAt: string;
}

export interface CustomerAlert {
  label: string;
  headline: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export interface CustomerDashboardData {
  customer: Customer;
  /** The invitation currently in context; null when the customer has none. */
  currentInvitation: CustomerInvitation | null;
  invitations: CustomerInvitation[];
  /** Whole days between today and the ceremony; null without an invitation. */
  daysUntilWedding: number | null;
  guests: GuestResponseSummary;
  engagement: EngagementSummary;
  entitlement: EntitlementSummary;
  activity: ActivityEntry[];
  alert: CustomerAlert | null;
}

/*
 * Invitation workspace (detail) types. These describe one invitation's own
 * operational data, as opposed to the account-wide dashboard summaries above.
 */

export type GuestRsvpStatus = "confirmed" | "declined" | "awaiting";

export interface InvitationGuestEntry {
  id: string;
  name: string;
  initials: string;
  /** Relationship or seating tag, e.g. "VIP Table 01". */
  tag?: string;
  /** Personalized guest link, when one has been generated. */
  personalLink?: string;
  /** Shown instead of the link when the invitation has not been dispatched. */
  note?: string;
  rsvpStatus: GuestRsvpStatus;
  /** Human-readable response, e.g. "2 pax confirmed". */
  responseLabel: string;
}

export interface InvitationWish {
  id: string;
  message: string;
  author: string;
  relation: string;
  occurredAt: string;
}

export interface DigitalGiftAccount {
  id: string;
  accountType?: "bank" | "e_wallet";
  /** Canonical bank or e-wallet provider name for management forms. */
  provider?: string;
  /** e.g. "Primary bank transfer". */
  role: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  badge: string;
  label?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  deliveryNotes?: string;
}

export interface DigitalGiftSummary {
  accounts: DigitalGiftAccount[];
  /** Physical gift delivery address shown to guests, when configured. */
  deliveryAddress?: string;
  physicalAddress?: PhysicalGiftAddress;
}

/** One invitation's full workspace payload. */
export interface InvitationDetail {
  invitation: CustomerInvitation;
  /** Whole days until the ceremony; null once the date has passed. */
  daysUntilWedding: number | null;
  /** Null for suites that have not collected responses yet. */
  guests: GuestResponseSummary | null;
  /** Personalized links already dispatched. */
  linksSent: number;
  linksPending: number;
  recentGuests: InvitationGuestEntry[];
  wishes: InvitationWish[];
  gift: DigitalGiftSummary | null;
  activity: ActivityEntry[];
  entitlement: EntitlementSummary;
}

/** Section capabilities exposed by an invitation template in the editor. */
export type InvitationBuilderSectionType =
  | "couple"
  | "events"
  | "gallery"
  | "loveStory"
  | "quote"
  | "rsvp"
  | "wishes"
  | "digitalGift"
  | "livestream"
  | "closing";

/**
 * One template-defined editor section. IDs are instance-specific so repeated
 * section types, such as opening and closing quotes, stay independently
 * addressable without allowing arbitrary section creation or reordering.
 */
export interface InvitationBuilderSection {
  id: string;
  type: InvitationBuilderSectionType;
  label: string;
  eyebrow: string;
  optional: boolean;
  visible: boolean;
}

export interface InvitationBuilderPartner {
  id: string;
  roleLabel: string;
  fullName: string;
  nickname: string;
  socialHandle: string;
  lineage: string;
  portraitUrl?: string;
}

export interface InvitationBuilderEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  timezone: string;
  mapLink: string;
}

export interface InvitationBuilderGalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  isCover: boolean;
}

export interface InvitationBuilderQuote {
  id: string;
  label: string;
  text: string;
  attribution: string;
}

export interface InvitationBuilderContent {
  partners: InvitationBuilderPartner[];
  events: InvitationBuilderEvent[];
  gallery: InvitationBuilderGalleryItem[];
  loveStory: {
    title: string;
    body: string;
  };
  quotes: InvitationBuilderQuote[];
  rsvp: {
    headline: string;
    deadline: string;
    accessMode: RsvpAccessMode;
    allowPlusOne: boolean;
    collectMealPreference: boolean;
  };
  wishes: {
    headline: string;
    prompt: string;
    moderationEnabled: boolean;
  };
  digitalGift: DigitalGiftSummary;
  livestream: {
    title: string;
    url: string;
    accessNote: string;
  };
  closing: {
    title: string;
    message: string;
    signature: string;
  };
}

export interface InvitationBuilderData {
  invitation: CustomerInvitation;
  entitlement: EntitlementSummary;
  sections: InvitationBuilderSection[];
  content: InvitationBuilderContent;
}

export interface InvitationVersion {
  versionNumber: number;
  /** ISO 8601 timestamp for an explicit successful save. */
  savedAt: string;
  summary: string;
  content: InvitationBuilderContent;
  sections: InvitationBuilderSection[];
  isCurrent: boolean;
  restoredFromVersion?: number;
}

export interface VersionHistoryData {
  invitation: CustomerInvitation;
  /** Newest first, with no more than ten restorable versions. */
  versions: InvitationVersion[];
}

/** Customer-facing RSVP states used by the invitation guest directory. */
export type GuestAttendanceStatus = "pending" | "attending" | "not_attending";

/**
 * One guest-directory entry. `linkAlias` is presentation-only and deliberately
 * excludes the private fragment token used by the public invitation flow.
 */
export interface InvitationGuest {
  id: string;
  name: string;
  initials: string;
  contact: string;
  group: string;
  category: string;
  maxPax: number;
  rsvpStatus: GuestAttendanceStatus;
  confirmedPax: number;
  linkAlias: string;
  linkDispatched: boolean;
  lastUpdatedLabel: string;
  activityNote: string;
  notes: string;
}

export interface GuestDirectorySummary {
  /** Total seats offered across all invitation entries. */
  totalGuests: number;
  invitationEntries: number;
  confirmedPax: number;
  pendingResponses: number;
  dispatchedEntries: number;
}

export interface GuestManagementData {
  invitation: CustomerInvitation;
  summary: GuestDirectorySummary;
  guests: InvitationGuest[];
  groups: string[];
}

/** Metadata recorded when an existing directory guest submits an RSVP. */
export interface GuestRsvpResponse {
  guestId: string;
  message: string;
  /** ISO 8601 timestamp; null while the guest is still pending. */
  respondedAt: string | null;
  source: "guest_link" | "manual";
}

/**
 * A response accepted through an open RSVP link. These entries intentionally
 * remain separate from the managed guest directory until the customer chooses
 * to add them there.
 */
export interface PublicRsvpResponse {
  id: string;
  name: string;
  initials: string;
  group: string;
  rsvpStatus: GuestAttendanceStatus;
  confirmedPax: number;
  message: string;
  respondedAt: string;
}

/** Who may submit an RSVP; shared by the builder and RSVP management. */
export type RsvpAccessMode = "guest_list_only" | "anyone_with_link";

export interface RsvpSettingsSummary {
  enabled: boolean;
  accessMode: RsvpAccessMode;
  deadline: string;
}

export interface RsvpManagementData {
  invitation: CustomerInvitation;
  guests: InvitationGuest[];
  responses: GuestRsvpResponse[];
  publicResponses: PublicRsvpResponse[];
  groups: string[];
  settings: RsvpSettingsSummary;
}

export type WishModerationStatus = "published" | "pending" | "hidden";

/**
 * One guestbook submission. Known guests resolve their identity from the
 * shared guest directory; public-link submissions carry only display details.
 */
export interface WishRecord {
  id: string;
  guestId?: string;
  publicAuthor?: string;
  publicInitials?: string;
  message: string;
  submittedAt: string;
  status: WishModerationStatus;
  source: "guest_link" | "public_link";
}

export interface WishesSettingsSummary {
  enabled: boolean;
  moderationMode: "automatic" | "approval_required";
}

export interface WishesManagementData {
  invitation: CustomerInvitation;
  guests: InvitationGuest[];
  wishes: WishRecord[];
  settings: WishesSettingsSummary;
}

export interface DigitalGiftConfiguration {
  enabled: boolean;
  physicalGiftEnabled: boolean;
}

export interface DigitalGiftManagementData {
  invitation: CustomerInvitation;
  gift: DigitalGiftSummary;
  configuration: DigitalGiftConfiguration;
}

/** Frontend-only review states for one row in the guided guest import flow. */
export type GuestImportRowStatus =
  | "valid"
  | "missing_name"
  | "invalid_pax"
  | "invalid_phone"
  | "possible_duplicate";

export type GuestImportDuplicateDecision = "skip" | "update" | null;

export interface GuestImportRow {
  id: string;
  rowNumber: number;
  name: string;
  phone: string;
  group: string;
  maxPax: number;
  status: GuestImportRowStatus;
  message: string;
  /** Existing guest matched by the preview service, never a private token. */
  duplicateGuestId?: string;
}

export interface GuestImportDuplicate {
  id: string;
  rowId: string;
  existingGuest: InvitationGuest;
  decision: GuestImportDuplicateDecision;
}

export interface GuestImportFilePreview {
  name: string;
  sizeLabel: string;
  rowCount: number;
  rows: GuestImportRow[];
  duplicates: GuestImportDuplicate[];
}

export interface GuestImportData {
  invitation: CustomerInvitation;
  groups: string[];
  preview: GuestImportFilePreview;
}

/*
 * Transactions & billing. Mirrors the backend's transaction design
 * (docs/technical-design.md §22): four states, one commercial purpose per
 * transaction, and an immutable snapshot captured at confirmation.
 */

/** Matches the backend transaction state machine exactly. */
export type TransactionStatus = "pending" | "paid" | "cancelled" | "refunded";

/**
 * Customer-facing purchase purpose. `package` and `quotaAddon` both settle to
 * the backend's DIGITAL_PACKAGE commercial purpose — they stay distinct
 * customer-facing labels because a top-up invitation slot reads differently
 * to a couple than their main suite purchase. `extension` maps to EXTENSION.
 * PRINTED is intentionally omitted: no customer-side printed order record
 * exists yet in this project's model.
 */
export type TransactionPurpose = "package" | "quotaAddon" | "extension";

export interface TransactionAmount {
  subtotal: number;
  tax: number;
  surcharge: number;
  total: number;
  currency: "IDR";
}

export interface TransactionPayment {
  method: string;
  /** e.g. "Auto-Settled"; omitted when not meaningful for the channel. */
  channelBadge?: string;
  /** Virtual account / channel reference number, customer-facing only. */
  accountReference?: string;
  bankReferenceNumber?: string;
  /** ISO 8601; set once the payment is confirmed. */
  verifiedAt?: string;
}

/** Present only on `extension` transactions. */
export interface TransactionExtensionDetail {
  previousExpiresAt: string;
  /** Purchased duration; it cannot be derived when an expired term restarts from now. */
  extensionDays: number;
  extendedUntil: string;
}

export interface CustomerTransaction {
  id: string;
  /** Customer-friendly reference, e.g. "TRX-240922-001". Never a raw UUID. */
  reference: string;
  purpose: TransactionPurpose;
  /** Product/package title, e.g. "Signature Package", "Validity Extension (+180 Days)". */
  productName: string;
  description: string;
  status: TransactionStatus;
  amount: TransactionAmount;
  /** Null when the purchase is not yet assigned to a specific celebration. */
  relatedInvitationId: string | null;
  payment: TransactionPayment;
  /** ISO 8601. */
  createdAt: string;
  /** ISO 8601; set once paid. */
  paidAt?: string;
  /** Official tax invoice number; only meaningful once paid. */
  invoiceNumber?: string;
  /** Customer-friendly entitlement grants, e.g. "+1 Invitation Quota". Paid only. */
  entitlementsGranted: string[];
  extension?: TransactionExtensionDetail;
}

/** A transaction with its related invitation resolved for display. */
export interface CustomerTransactionWithInvitation extends CustomerTransaction {
  relatedInvitation: Pick<
    CustomerInvitation,
    "id" | "coupleLabel" | "slug" | "templateName"
  > | null;
}

/*
 * Notifications. The customer-facing notification center groups updates by
 * celebration (or the account itself) rather than modeling a generic
 * social-style feed.
 */

/** The four filterable buckets shown in the Notifications page. */
export type NotificationCategory =
  "wedding" | "guestsRsvp" | "payments" | "account";

/**
 * What happened, used only to pick presentation (icon/tone). Kept separate
 * from `category` so filtering stays coarse while the card content stays
 * specific.
 */
export type NotificationKind =
  | "guestImportCompleted"
  | "guestImportIssues"
  | "rsvpResponses"
  | "wishesPending"
  | "draftIncomplete"
  | "invitationPublished"
  | "invitationExtended"
  | "invitationExpiringSoon"
  | "invitationExpired"
  | "giftAccountsUpdated"
  | "paymentPending"
  | "paymentConfirmed"
  | "packageActivated"
  | "accountSecurity";

export interface CustomerNotification extends NotificationRecord {
  kind: NotificationKind;
  category: NotificationCategory;
  /** Fine-grained label shown as the card's eyebrow, e.g. "Guests & Import". */
  eyebrow: string;
  read: boolean;
  /** Needs the customer to act, beyond simply being unread. */
  attention: boolean;
  /** Null for account-level notifications not tied to one celebration. */
  relatedInvitationId: string | null;
  relatedTransactionId?: string;
  /** Small pill next to the wedding chip, e.g. "Action Required". */
  tag?: string;
  /** Trailing note shown after the timestamp, e.g. "Includes 3 dietary notes". */
  meta?: string;
  actionLabel?: string;
  actionHref?: string;
  /** True for links that leave the app, e.g. the public invitation URL. */
  actionExternal?: boolean;
}

/** A notification with its related invitation/transaction resolved for display. */
export interface CustomerNotificationWithContext extends CustomerNotification {
  relatedInvitation: Pick<
    CustomerInvitation,
    "id" | "coupleLabel" | "slug" | "templateName"
  > | null;
  relatedTransaction: Pick<
    CustomerTransaction,
    "id" | "reference" | "productName"
  > | null;
}

/*
 * Account settings: profile identity, sign-in/security, and notification
 * delivery preferences. This is account-level data, not celebration-level —
 * invitation-specific configuration (RSVP, wishes, digital gift, slug, etc.)
 * lives in the invitation workspace instead.
 */

export type SignInMethod = "password" | "google";

/** Settings-only profile fields not needed by the rest of the Customer CMS. */
export interface CustomerProfileDetails {
  avatarUrl?: string;
  /** Local Indonesian mobile number without the leading +62, e.g. "82212345678". */
  whatsappNumber: string;
  /** Human-readable label, e.g. "September 2026". */
  memberSince: string;
}

export interface AccountSession {
  id: string;
  device: string;
  location: string;
  lastActiveLabel: string;
  isCurrentDevice: boolean;
}

export interface CustomerSecurity {
  signInMethod: SignInMethod;
  /** Set when a Google account is linked, regardless of the primary sign-in method. */
  googleEmail?: string;
  hasPassword: boolean;
  passwordUpdatedLabel: string;
  sessions: AccountSession[];
}

export type NotificationPreferenceCategory =
  "wedding" | "guestsRsvp" | "wishes" | "payments" | "account";

export interface NotificationPreferenceItem extends NotificationDeliveryPreference {
  category: NotificationPreferenceCategory;
}

/** Everything the Settings page needs, composed from existing services. */
export interface SettingsOverview {
  customer: Customer;
  profile: CustomerProfileDetails;
  security: CustomerSecurity;
  notificationPreferences: NotificationPreferenceItem[];
  entitlement: EntitlementSummary;
  currentInvitation: CustomerInvitation | null;
  invitationCount: number;
}
