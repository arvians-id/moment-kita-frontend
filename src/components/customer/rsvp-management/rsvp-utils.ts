import type {
  GuestAttendanceStatus,
  GuestRsvpResponse,
  InvitationGuest,
  PublicRsvpResponse,
} from "@/types";

export interface RsvpListItem {
  id: string;
  guestId: string | null;
  name: string;
  initials: string;
  group: string;
  category: string;
  status: GuestAttendanceStatus;
  confirmedPax: number;
  maxPax: number;
  message: string;
  respondedAt: string | null;
  source: "guest_link" | "manual" | "public_link";
}

export interface RsvpSummary {
  totalInvited: number;
  responded: number;
  attending: number;
  notAttending: number;
  pending: number;
  confirmedPax: number;
}

export function buildRsvpItems(
  guests: InvitationGuest[],
  responses: GuestRsvpResponse[],
  publicResponses: PublicRsvpResponse[],
): RsvpListItem[] {
  const responseByGuest = new Map(
    responses.map((response) => [response.guestId, response]),
  );

  return [
    ...guests.map((guest) => {
      const response = responseByGuest.get(guest.id);
      return {
        id: guest.id,
        guestId: guest.id,
        name: guest.name,
        initials: guest.initials,
        group: guest.group,
        category: guest.category,
        status: guest.rsvpStatus,
        confirmedPax: guest.confirmedPax,
        maxPax: guest.maxPax,
        message: response?.message ?? "",
        respondedAt: response?.respondedAt ?? null,
        source: response?.source ?? "guest_link",
      } satisfies RsvpListItem;
    }),
    ...publicResponses.map(
      (response) =>
        ({
          id: response.id,
          guestId: null,
          name: response.name,
          initials: response.initials,
          group: response.group,
          category: "Submitted through the public RSVP link",
          status: response.rsvpStatus,
          confirmedPax: response.confirmedPax,
          maxPax: Math.max(response.confirmedPax, 1),
          message: response.message,
          respondedAt: response.respondedAt,
          source: "public_link",
        }) satisfies RsvpListItem,
    ),
  ];
}

export function calculateRsvpSummary(
  guests: InvitationGuest[],
  publicResponses: PublicRsvpResponse[],
): RsvpSummary {
  const allStatuses = [
    ...guests.map((guest) => ({
      status: guest.rsvpStatus,
      pax: guest.confirmedPax,
    })),
    ...publicResponses.map((response) => ({
      status: response.rsvpStatus,
      pax: response.confirmedPax,
    })),
  ];

  return {
    totalInvited: guests.reduce((total, guest) => total + guest.maxPax, 0),
    responded: allStatuses.filter((item) => item.status !== "pending").length,
    attending: allStatuses.filter((item) => item.status === "attending").length,
    notAttending: allStatuses.filter((item) => item.status === "not_attending")
      .length,
    pending: allStatuses.filter((item) => item.status === "pending").length,
    confirmedPax: allStatuses.reduce((total, item) => total + item.pax, 0),
  };
}

export function formatRespondedAt(value: string | null): string {
  if (!value) return "Awaiting response";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}
