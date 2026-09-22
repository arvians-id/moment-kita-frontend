import type {
  InvitationGuest,
  WishModerationStatus,
  WishRecord,
} from "@/types";

export interface WishViewItem {
  id: string;
  guestId: string | null;
  author: string;
  initials: string;
  group: string;
  context: string;
  message: string;
  submittedAt: string;
  status: WishModerationStatus;
  source: WishRecord["source"];
}

export interface WishesSummary {
  total: number;
  published: number;
  pending: number;
  hidden: number;
}

export function buildWishItems(
  wishes: WishRecord[],
  guests: InvitationGuest[],
): WishViewItem[] {
  const guestById = new Map(guests.map((guest) => [guest.id, guest]));

  return wishes.map((wish) => {
    const guest = wish.guestId ? guestById.get(wish.guestId) : undefined;
    return {
      id: wish.id,
      guestId: guest?.id ?? null,
      author: guest?.name ?? wish.publicAuthor ?? "Guest",
      initials: guest?.initials ?? wish.publicInitials ?? "G",
      group: guest?.group ?? "Public Link Guest",
      context:
        guest?.category ?? "Submitted through the public invitation link",
      message: wish.message,
      submittedAt: wish.submittedAt,
      status: wish.status,
      source: wish.source,
    };
  });
}

export function calculateWishesSummary(wishes: WishRecord[]): WishesSummary {
  return {
    total: wishes.length,
    published: wishes.filter((wish) => wish.status === "published").length,
    pending: wishes.filter((wish) => wish.status === "pending").length,
    hidden: wishes.filter((wish) => wish.status === "hidden").length,
  };
}

export function formatWishDate(value: string): string {
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
