export interface PublicInvitation {
  slug: string;
  /** `ended` invitations are expired: the address resolves but shows no content. */
  availability: "live" | "ended";
  couple: {
    partnerOne: string;
    partnerTwo: string;
  };
  eventDate: string;
  location: string;
  template: {
    key: string;
    version: number;
    rendererKey: string;
  };
  message: string;
}
