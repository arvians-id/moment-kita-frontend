import type {
  GuestRsvpResponse,
  PublicRsvpResponse,
  RsvpSettingsSummary,
} from "@/types";

export interface RsvpManagementMockRecord {
  responses: GuestRsvpResponse[];
  publicResponses: PublicRsvpResponse[];
  settings: RsvpSettingsSummary;
}

export const mockRsvpManagementByInvitation: Record<
  string,
  RsvpManagementMockRecord
> = {
  inv_01: {
    responses: [
      {
        guestId: "guest_01",
        message:
          "We are delighted to celebrate with you. Thank you for arranging accessible entry.",
        respondedAt: "2026-10-22T19:15:00+07:00",
        source: "guest_link",
      },
      {
        guestId: "guest_02",
        message: "Ready for the morning preparations. I cannot wait!",
        respondedAt: "2026-10-19T09:05:00+07:00",
        source: "guest_link",
      },
      {
        guestId: "guest_03",
        message: "",
        respondedAt: null,
        source: "guest_link",
      },
      {
        guestId: "guest_04",
        message:
          "We booked our flights from Heathrow and are so excited to celebrate with you.",
        respondedAt: "2026-10-22T14:30:00+07:00",
        source: "guest_link",
      },
      {
        guestId: "guest_05",
        message: "We will attend the ceremony and evening reception.",
        respondedAt: "2026-10-21T11:20:00+07:00",
        source: "guest_link",
      },
      {
        guestId: "guest_06",
        message:
          "I am sorry I cannot attend, but I am sending my warmest wishes.",
        respondedAt: "2026-10-18T17:02:00+07:00",
        source: "manual",
      },
      {
        guestId: "guest_07",
        message: "",
        respondedAt: null,
        source: "guest_link",
      },
    ],
    publicResponses: [
      {
        id: "public_rsvp_01",
        name: "Nadia Putri & Arman",
        initials: "NP",
        group: "Public Link Guest",
        rsvpStatus: "attending",
        confirmedPax: 2,
        message:
          "Thank you for sharing the invitation. We would love to celebrate with you.",
        respondedAt: "2026-10-23T10:40:00+07:00",
      },
    ],
    settings: {
      enabled: true,
      accessMode: "anyone_with_link",
      deadline: "2026-11-10",
    },
  },
};
