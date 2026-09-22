export type PrintedCategory =
  "minimal" | "classic" | "botanical" | "couture" | "bespoke";

export interface PrintedProduct {
  id: string;
  name: string;
  /** Editorial summary reused by the pricing page. */
  description: string;
  /** Material specification line shown on the printed collection card. */
  materials: string;
  edition: string;
  badge: string;
  category: PrintedCategory;
  startingPrice: number;
  currency: "IDR";
  imageUrl: string;
}

export interface PrintedCollection {
  id: PrintedCategory | "all";
  label: string;
}
