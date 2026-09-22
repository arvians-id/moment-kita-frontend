import type {
  ActivityEntry,
  Customer,
  CustomerAlert,
  CustomerInvitation,
  EngagementSummary,
  EntitlementSummary,
  GuestResponseSummary,
} from "@/types";

export const mockCustomer: Customer = {
  id: "cus_01",
  name: "Widdy",
  email: "widdy@momentkita.id",
  initials: "W",
};

export const mockCustomerInvitations: readonly CustomerInvitation[] = [
  {
    id: "inv_01",
    slug: "raka-ayu",
    coupleLabel: "Raka & Ayu",
    title: "Raka & Ayu — Holy Matrimony & Reception",
    status: "published",
    eventDate: "2026-11-24T10:00:00+07:00",
    venue: "Grand Hyatt Ballroom, Jakarta",
    templateName: "Eternal Elegance",
    templateDescription: "Editorial French floral with a digital deckled edge",
    previewImage: "/images/marketing/digital-invitation-phone.png",
    expiresAt: "2027-02-20T23:59:00+07:00",
    guestCount: 128,
    confirmedCount: 84,
    metrics: { rsvps: 84, wishes: 42, views: 1_284 },
    lastModifiedLabel: "Updated 4 hours ago",
  },
  {
    id: "inv_02",
    slug: "budi-sarah",
    coupleLabel: "Budi & Sarah",
    title: "Budi & Sarah — Intimate Tea Ceremony",
    status: "draft",
    eventDate: "2027-03-14T09:00:00+07:00",
    venue: "Pendopo Kayu, Bandung",
    templateName: "Sienna & Solstice",
    templateDescription:
      "Warm terracotta palette with relaxed editorial pacing",
    previewImage: "/images/marketing/garden-stationery-suite.png",
    guestCount: 35,
    confirmedCount: 0,
    progress: {
      completedSections: 3,
      totalSections: 5,
      pendingNote:
        "Schedule and love story are ready. Still pending: digital gift accounts and background music selection.",
    },
    lastModifiedLabel: "Last modified 2 days ago",
  },
  {
    id: "inv_03",
    slug: "sarah-liam",
    coupleLabel: "Sarah & Liam",
    title: "Sarah & Liam — Autumn Letterpress Preview",
    status: "finalized",
    eventDate: "2026-12-18T16:00:00+07:00",
    venue: "Rumah Luwih, Bali",
    templateName: "Bespoke Letterpress Floral",
    templateDescription:
      "Dual-format digital link with a matching print voucher",
    previewImage: "/images/marketing/embossed-cotton-invitation.png",
    guestCount: 96,
    confirmedCount: 0,
    readinessNote:
      "Proof review is complete. Publish to assign your remaining quota and generate the celebration link.",
    lastModifiedLabel: "Finalized 5 days ago",
  },
  {
    id: "inv_04",
    slug: "budi-clara",
    coupleLabel: "Budi & Clara",
    title: "Budi & Clara — Engagement Soirée",
    status: "expired",
    eventDate: "2026-10-12T18:00:00+07:00",
    venue: "Hutan Kota by Plataran, Jakarta",
    templateName: "Botanical Solstice",
    templateDescription: "Pressed botanical illustration with quiet typography",
    previewImage: "/images/marketing/sunlit-stationery-table.png",
    expiresAt: "2026-10-15T23:59:00+07:00",
    guestCount: 110,
    confirmedCount: 98,
    archive: {
      rsvpsPreserved: 98,
      photoUploads: 34,
      note: "Public access has concluded. Guest RSVPs and guestbook wishes are permanently archived and available to download.",
    },
    lastModifiedLabel: "Archived 15 Oct 2026",
  },
  {
    id: "inv_05",
    slug: "nadia-fajar",
    coupleLabel: "Nadia & Fajar",
    title: "Nadia & Fajar — Garden Blessing",
    status: "cancelled",
    eventDate: "2027-05-09T15:00:00+07:00",
    venue: "Kebun Raya Bogor",
    templateName: "Copenhagen Reverie",
    templateDescription:
      "Nordic restraint with generous typographic breathing room",
    previewImage: "/images/marketing/copper-monogram-paper.png",
    guestCount: 0,
    confirmedCount: 0,
    cancelledNote:
      "This celebration was cancelled before publishing. The draft content is retained and can be duplicated into a new suite.",
    lastModifiedLabel: "Cancelled 3 weeks ago",
  },
];

export const mockGuestSummary: GuestResponseSummary = {
  totalInvited: 128,
  attending: 84,
  declined: 12,
  pending: 32,
  confirmedPax: 146,
  cateringTarget: 160,
  invitedThisWeek: 12,
  attendingAdults: 72,
  attendingChildren: 12,
};

export const mockEngagement: EngagementSummary = {
  pageViews: 1_284,
  interactions: 96,
  envelopesOpened: 118,
  calendarAdds: 68,
  topLocations: ["Jakarta", "Surabaya", "Singapore", "Melbourne"],
  wishesReceived: 42,
  featuredWish: {
    message:
      "Semoga lancar sampai hari H, Raka & Ayu. Semoga berkah dan saling menyayangi hingga maut memisahkan.",
    author: "Tante Rina & Om Bramantyo (Family)",
  },
};

export const mockEntitlement: EntitlementSummary = {
  packageName: "Signature Suite",
  quotaGranted: 4,
  quotaRemaining: 1,
  quotaNote: "3 of 4 celebration quotas committed. Drafts never consume quota.",
  features: [
    "Unlimited RSVPs & real-time attendance list",
    "Licensed background music & audio guestbook",
    "Digital gift envelope (bank transfer & QRIS)",
  ],
};

export const mockActivity: readonly ActivityEntry[] = [
  {
    id: "act_01",
    kind: "rsvp",
    message: "Dimas Prasetyo confirmed attendance for 2 pax",
    occurredAt: "18 minutes ago",
  },
  {
    id: "act_02",
    kind: "wish",
    message: "New voice blessing received from Om Hendra & Tante Dewi",
    occurredAt: "2 hours ago",
  },
  {
    id: "act_03",
    kind: "gift",
    message: "Digital gift envelope received from Keluarga Wijaya",
    occurredAt: "Yesterday, 16:40 WIB",
  },
];

export const mockCustomerAlert: CustomerAlert = {
  label: "Live activity",
  headline: "Your digital suite is live and greeting guests",
  description:
    "3 new guest RSVPs and 1 audio blessing arrived in the last 4 hours, waiting for your review.",
  actionLabel: "Review RSVPs",
  actionHref: "#guest-responses",
};
