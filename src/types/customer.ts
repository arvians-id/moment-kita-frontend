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
  /** e.g. "Primary bank transfer". */
  role: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  badge: string;
}

export interface DigitalGiftSummary {
  accounts: DigitalGiftAccount[];
  /** Physical gift delivery address shown to guests, when configured. */
  deliveryAddress?: string;
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
