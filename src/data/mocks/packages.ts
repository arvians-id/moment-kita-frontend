import type { Package } from "@/types";

export const mockPackages: readonly Package[] = [
  {
    id: "essential",
    name: "Essential",
    description: "A thoughtful starting point for an intimate celebration.",
    price: 299_000,
    currency: "IDR",
    features: ["One digital invitation", "Core invitation sections"],
  },
  {
    id: "signature",
    name: "Signature",
    description:
      "More room for the story, imagery, and details that feel like you.",
    price: 499_000,
    currency: "IDR",
    features: [
      "One digital invitation",
      "Extended sections",
      "Custom visual identity",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: "prestige",
    name: "Prestige",
    description:
      "A white-glove digital suite prepared with a dedicated studio designer.",
    price: 799_000,
    currency: "IDR",
    features: [
      "One digital invitation",
      "Bespoke setup assistance",
      "Priority design consultation",
    ],
  },
];
