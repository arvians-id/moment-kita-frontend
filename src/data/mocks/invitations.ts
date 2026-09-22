import type { PublicInvitation } from "@/types";

export const mockInvitations: readonly PublicInvitation[] = [
  {
    slug: "raka-ayu",
    couple: {
      partnerOne: "Raka",
      partnerTwo: "Ayu",
    },
    eventDate: "2027-02-14T10:00:00+07:00",
    location: "Jakarta",
    template: {
      key: "elegant-01",
      version: 1,
      rendererKey: "elegant-01@1",
    },
    message:
      "With joy, we invite you to celebrate the beginning of our forever.",
  },
];
