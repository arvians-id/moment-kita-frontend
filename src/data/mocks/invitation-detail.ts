import type {
  ActivityEntry,
  DigitalGiftSummary,
  GuestResponseSummary,
  InvitationGuestEntry,
  InvitationWish,
} from "@/types";

/**
 * Per-invitation workspace data, keyed by invitation id.
 *
 * Only suites that have actually collected responses carry guest, wish, or
 * gift data; drafts and cancelled suites legitimately have none, which lets
 * the detail page exercise its empty states.
 */
export interface InvitationDetailRecord {
  guests?: GuestResponseSummary;
  linksSent?: number;
  linksPending?: number;
  recentGuests?: InvitationGuestEntry[];
  wishes?: InvitationWish[];
  gift?: DigitalGiftSummary;
  activity?: ActivityEntry[];
}

export const mockInvitationDetails: Readonly<
  Record<string, InvitationDetailRecord>
> = {
  // Published suite — the fully populated workspace.
  inv_01: {
    guests: {
      totalInvited: 128,
      attending: 84,
      declined: 12,
      pending: 32,
      confirmedPax: 146,
      cateringTarget: 160,
      invitedThisWeek: 12,
      attendingAdults: 134,
      attendingChildren: 12,
    },
    linksSent: 112,
    linksPending: 16,
    recentGuests: [
      {
        id: "gst_01",
        name: "Bpk. Hendra Gunawan & Keluarga",
        initials: "HG",
        tag: "VIP Table 01",
        personalLink: "raka-ayu?to=hendra-gunawan",
        rsvpStatus: "confirmed",
        responseLabel: "2 pax confirmed",
      },
      {
        id: "gst_02",
        name: "Clarissa Valois",
        initials: "CV",
        tag: "Bridesmaid",
        personalLink: "raka-ayu?to=clarissa-valois",
        rsvpStatus: "confirmed",
        responseLabel: "1 pax confirmed",
      },
      {
        id: "gst_03",
        name: "Dimas Prasetyo",
        initials: "DP",
        tag: "Groom family",
        note: "Link dispatched via WhatsApp — not opened yet",
        rsvpStatus: "awaiting",
        responseLabel: "Awaiting RSVP",
      },
    ],
    wishes: [
      {
        id: "wsh_01",
        message:
          "Semoga lancar dan penuh keberkahan hingga hari H untuk Raka & Ayu tersayang. Bahagia selalu menempuh hidup baru!",
        author: "Sarah Jenkins",
        relation: "Bridesmaid",
        occurredAt: "2 hrs ago",
      },
      {
        id: "wsh_02",
        message:
          "Selamat untuk ananda berdua. Semoga senantiasa menjadi keluarga yang sakinah, mawaddah, warahmah di lindungan-Nya.",
        author: "Bpk. & Ibu Dr. Arya",
        relation: "Family elder",
        occurredAt: "5 hrs ago",
      },
    ],
    gift: {
      accounts: [
        {
          id: "gift_01",
          role: "Primary bank transfer",
          bankName: "Bank BCA",
          accountNumber: "0882-9910-21",
          accountHolder: "Raka Daniswara",
          badge: "QRIS ready",
        },
        {
          id: "gift_02",
          role: "Secondary bank transfer",
          bankName: "Bank Mandiri",
          accountNumber: "132-00-9981-221",
          accountHolder: "Ayu Prameswari",
          badge: "Active",
        },
      ],
      deliveryAddress: "Menteng, Central Jakarta (visible to guests)",
    },
    activity: [
      {
        id: "evt_01",
        kind: "invitation",
        message: "Ayu uploaded 4 new gallery portraits",
        occurredAt: "2 hours ago • Gallery section",
      },
      {
        id: "evt_02",
        kind: "invitation",
        message: "3 guests opened their personalized invitation link",
        occurredAt: "4 hours ago • WhatsApp direct",
      },
      {
        id: "evt_03",
        kind: "rsvp",
        message: "Clarissa confirmed attendance with 1 companion",
        occurredAt: "Yesterday, 18:20 • RSVP engine",
      },
    ],
  },

  // Draft suite — guests are listed but nothing has been dispatched.
  inv_02: {
    guests: {
      totalInvited: 35,
      attending: 0,
      declined: 0,
      pending: 35,
      confirmedPax: 0,
      cateringTarget: 40,
      invitedThisWeek: 0,
      attendingAdults: 0,
      attendingChildren: 0,
    },
    linksSent: 0,
    linksPending: 35,
    activity: [
      {
        id: "evt_11",
        kind: "invitation",
        message: "Sarah updated the ceremony schedule section",
        occurredAt: "2 days ago • Builder",
      },
      {
        id: "evt_12",
        kind: "invitation",
        message: "Template switched to Sienna & Solstice",
        occurredAt: "4 days ago • Builder",
      },
    ],
  },

  // Finalized suite — locked proof, awaiting publish.
  inv_03: {
    guests: {
      totalInvited: 96,
      attending: 0,
      declined: 0,
      pending: 96,
      confirmedPax: 0,
      cateringTarget: 110,
      invitedThisWeek: 0,
      attendingAdults: 0,
      attendingChildren: 0,
    },
    linksSent: 0,
    linksPending: 96,
    activity: [
      {
        id: "evt_21",
        kind: "invitation",
        message: "Proof locked and validated by the studio",
        occurredAt: "5 days ago • Finalize",
      },
    ],
  },

  // Expired suite — hosting has ended, records preserved.
  inv_04: {
    guests: {
      totalInvited: 110,
      attending: 98,
      declined: 8,
      pending: 4,
      confirmedPax: 164,
      cateringTarget: 170,
      invitedThisWeek: 0,
      attendingAdults: 152,
      attendingChildren: 12,
    },
    linksSent: 110,
    linksPending: 0,
    recentGuests: [
      {
        id: "gst_11",
        name: "Keluarga Wijaya",
        initials: "KW",
        tag: "Family",
        rsvpStatus: "confirmed",
        responseLabel: "4 pax attended",
      },
      {
        id: "gst_12",
        name: "Rinaldi Saputra",
        initials: "RS",
        tag: "Colleague",
        rsvpStatus: "declined",
        responseLabel: "Sent regrets",
      },
    ],
    wishes: [
      {
        id: "wsh_11",
        message:
          "Terima kasih sudah mengundang kami. Acaranya hangat dan berkesan sekali.",
        author: "Om Bramantyo",
        relation: "Family",
        occurredAt: "12 Oct 2026",
      },
    ],
    activity: [
      {
        id: "evt_31",
        kind: "invitation",
        message: "Public hosting ended and the archive was sealed",
        occurredAt: "15 Oct 2026 • Hosting",
      },
    ],
  },

  // Cancelled suite — draft content retained, nothing dispatched.
  inv_05: {
    linksSent: 0,
    linksPending: 0,
    activity: [
      {
        id: "evt_41",
        kind: "invitation",
        message: "Celebration cancelled before publishing",
        occurredAt: "3 weeks ago • Workspace",
      },
    ],
  },
};
