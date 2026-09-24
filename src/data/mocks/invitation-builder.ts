import type {
  CustomerInvitation,
  InvitationBuilderContent,
  InvitationBuilderSection,
} from "@/types";

const gallery = [
  {
    id: "gallery_01",
    imageUrl: "/images/marketing/digital-invitation-phone.png",
    alt: "Moment Kita digital invitation displayed on a phone",
    isCover: true,
  },
  {
    id: "gallery_02",
    imageUrl: "/images/marketing/hero-stationery-suite.png",
    alt: "Editorial wedding stationery suite",
    isCover: false,
  },
  {
    id: "gallery_03",
    imageUrl: "/images/marketing/garden-stationery-suite.png",
    alt: "Botanical wedding stationery with silk ribbon",
    isCover: false,
  },
  {
    id: "gallery_04",
    imageUrl: "/images/marketing/sunlit-stationery-table.png",
    alt: "Sunlit artisan stationery arrangement",
    isCover: false,
  },
  {
    id: "gallery_05",
    imageUrl: "/images/marketing/embossed-cotton-invitation.png",
    alt: "Embossed cotton wedding invitation",
    isCover: false,
  },
  {
    id: "gallery_06",
    imageUrl: "/images/marketing/copper-monogram-paper.png",
    alt: "Copper monogram printed on warm paper",
    isCover: false,
  },
] as const;

/**
 * Château de Chantilly's fixed MVP manifest. The template owns capabilities
 * and order; customers can only show or hide supported optional sections.
 */
export const mockBuilderSections: readonly InvitationBuilderSection[] = [
  {
    id: "couple",
    type: "couple",
    label: "Couple",
    eyebrow: "Haute stationery master",
    optional: false,
    visible: true,
  },
  {
    id: "events",
    type: "events",
    label: "Events",
    eyebrow: "Celebration chronology",
    optional: false,
    visible: true,
  },
  {
    id: "gallery",
    type: "gallery",
    label: "Gallery",
    eyebrow: "Visual monograph",
    optional: true,
    visible: true,
  },
  {
    id: "love-story",
    type: "loveStory",
    label: "Love Story",
    eyebrow: "Editorial narrative",
    optional: true,
    visible: true,
  },
  {
    id: "quote-opening",
    type: "quote",
    label: "Opening Quote",
    eyebrow: "Editorial prose · opening",
    optional: true,
    visible: true,
  },
  {
    id: "quote-closing",
    type: "quote",
    label: "Closing Quote",
    eyebrow: "Editorial prose · closing",
    optional: true,
    visible: true,
  },
  {
    id: "rsvp",
    type: "rsvp",
    label: "RSVP",
    eyebrow: "Guest response suite",
    optional: true,
    visible: true,
  },
  {
    id: "wishes",
    type: "wishes",
    label: "Wishes",
    eyebrow: "Digital guestbook",
    optional: true,
    visible: true,
  },
  {
    id: "digital-gift",
    type: "digitalGift",
    label: "Digital Gift",
    eyebrow: "Tanda kasih digital",
    optional: true,
    visible: true,
  },
  {
    id: "livestream",
    type: "livestream",
    label: "Livestream",
    eyebrow: "Remote ceremony access",
    optional: true,
    visible: false,
  },
  {
    id: "closing",
    type: "closing",
    label: "Closing",
    eyebrow: "Final gratitude",
    optional: false,
    visible: true,
  },
];

function coupleNames(invitation: CustomerInvitation): [string, string] {
  const names = invitation.coupleLabel
    .split("&")
    .map((name) => name.trim())
    .filter(Boolean);
  return [names[0] ?? "Partner One", names[1] ?? "Partner Two"];
}

/** Produces mock editor content without duplicating the base invitation data. */
export function createMockBuilderContent(
  invitation: CustomerInvitation,
): InvitationBuilderContent {
  const [first, second] = coupleNames(invitation);
  const isRakaAyu = invitation.id === "inv_01";
  const eventDate = invitation.eventDate.slice(0, 10);

  return {
    partners: [
      {
        id: "partner_01",
        roleLabel: "Bride / Partner 01",
        fullName: isRakaAyu ? "Ayu Prameswari, S.Sn." : first,
        nickname: isRakaAyu ? "Ayu" : first,
        socialHandle: isRakaAyu ? "ayuprameswari" : first.toLowerCase(),
        lineage: isRakaAyu
          ? "Putri tercinta dari Bpk. Bambang Prameswara & Ibu Retno Sukardi"
          : "Together with their beloved family",
        portraitUrl: "/images/marketing/garden-stationery-suite.png",
      },
      {
        id: "partner_02",
        roleLabel: "Groom / Partner 02",
        fullName: isRakaAyu ? "Raka Daniswara, M.Sc." : second,
        nickname: isRakaAyu ? "Raka" : second,
        socialHandle: isRakaAyu ? "rakadaniswara" : second.toLowerCase(),
        lineage: isRakaAyu
          ? "Putra terkasih dari Bpk. Ir. Hendra Daniswara & Ibu Ratna Dewi"
          : "Together with their beloved family",
        portraitUrl: "/images/marketing/copper-monogram-paper.png",
      },
    ],
    events: [
      {
        id: "event_01",
        title: "Akad Nikah / Holy Matrimony",
        date: eventDate,
        startTime: "08:00",
        endTime: "10:00",
        venue: invitation.venue,
        address: "Jl. M.H. Thamrin Kav. 28–30, Jakarta",
        timezone: "Asia/Jakarta (WIB)",
        mapLink: "https://maps.google.com/?q=Grand+Hyatt+Jakarta",
      },
      {
        id: "event_02",
        title: "Resepsi Agung / Evening Gala",
        date: eventDate,
        startTime: "19:00",
        endTime: "22:00",
        venue: "Grand Ballroom, Grand Hyatt Jakarta",
        address: "Jl. M.H. Thamrin Kav. 28–30, Jakarta",
        timezone: "Asia/Jakarta (WIB)",
        mapLink: "https://maps.google.com/?q=Grand+Hyatt+Jakarta",
      },
    ],
    gallery: gallery.map((item) => ({ ...item })),
    loveStory: {
      title: "A Quiet Beginning",
      body: "What began as a conversation over rain-soaked Jakarta evenings became a shared life shaped by kindness, curiosity, and the courage to choose one another every day.",
    },
    quotes: [
      {
        id: "quote-opening",
        label: "Opening Epigraph",
        text: "Two souls, one journey. Found each other amidst the quiet autumn rain.",
        attribution: "Our story",
      },
      {
        id: "quote-closing",
        label: "Closing Benediction",
        text: "May this celebration be the first page of a life written with grace, patience, and joy.",
        attribution: "With love, our families",
      },
    ],
    rsvp: {
      headline: "Will you celebrate with us?",
      deadline: "2026-11-10",
      accessMode: "anyone_with_link",
      allowPlusOne: true,
      collectMealPreference: true,
    },
    wishes: {
      headline: "Leave a blessing for our new chapter",
      prompt: "Share a prayer, memory, or a few warm words for the couple.",
      moderationEnabled: true,
    },
    digitalGift: {
      accounts: [
        {
          id: "gift_01",
          role: "Primary bank transfer",
          bankName: "Bank Central Asia",
          accountNumber: "0882-9910-21",
          accountHolder: "Raka Daniswara",
          badge: "BCA",
        },
        {
          id: "gift_02",
          role: "Secondary bank transfer",
          bankName: "Bank Mandiri",
          accountNumber: "132-00-9981-221",
          accountHolder: "Ayu Prameswari",
          badge: "MDR",
        },
      ],
      deliveryAddress:
        "Jl. Teuku Umar No. 14, Gondangdia, Menteng, Jakarta Pusat 10350",
    },
    livestream: {
      title: "Join the Ceremony Online",
      url: "",
      accessNote: "The livestream link will appear 30 minutes before Akad.",
    },
    closing: {
      title: "With Gratitude",
      message:
        "Your presence, prayers, and warm wishes are the greatest gifts as we begin this new chapter.",
      signature: first + " & " + second,
    },
  };
}
