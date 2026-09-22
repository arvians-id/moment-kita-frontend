export interface PublicInvitation {
  slug: string;
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
