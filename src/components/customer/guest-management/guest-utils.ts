import type { GuestAttendanceStatus, InvitationGuest } from "@/types";

export const guestStatusLabels: Record<GuestAttendanceStatus, string> = {
  pending: "Pending",
  attending: "Attending",
  not_attending: "Not Attending",
};

export function createGuestAlias(name: string): string {
  return (
    name
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join("") || "GuestName"
  );
}

export function createGuestInitials(name: string): string {
  const words = name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "G";
  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

export function friendlyGuestPath(
  invitationSlug: string,
  guest: Pick<InvitationGuest, "linkAlias">,
): string {
  return `/${invitationSlug}?to=${guest.linkAlias}`;
}

export function guestWhatsAppHref(
  contact: string,
  invitationUrl: string,
  guestName: string,
): string {
  const number = contact.replace(/[^0-9]/g, "");
  const message = `Hello ${guestName}, here is your Moment Kita wedding invitation: ${invitationUrl}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
