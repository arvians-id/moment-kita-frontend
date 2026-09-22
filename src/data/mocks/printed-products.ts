import type { PrintedCollection, PrintedProduct } from "@/types";

export const mockPrintedCollections: readonly PrintedCollection[] = [
  { id: "all", label: "All Editions" },
  { id: "minimal", label: "Minimal Monolith" },
  { id: "classic", label: "Classic Archival" },
  { id: "botanical", label: "Warm Botanical" },
  { id: "couture", label: "Modern Haute Couture" },
  { id: "bespoke", label: "Bespoke Atelier" },
];

export const mockPrintedProducts: readonly PrintedProduct[] = [
  {
    id: "linen-suite",
    name: "Le Jardin Minimaliste",
    description:
      "Botanical restraint on cotton stock with olive ink and a blind-debossed monogram.",
    materials:
      "600gsm Somerset Cotton · Blind Deboss Botanical Crest & Rose Foil · Hand-Torn Deckle Edge.",
    edition: "Edition 01",
    badge: "Botanical Deboss",
    category: "botanical",
    startingPrice: 1_250_000,
    currency: "IDR",
    imageUrl: "/images/marketing/embossed-cotton-invitation.png",
  },
  {
    id: "sienna-suite",
    name: "Sienna & Solstice",
    description:
      "Sun-washed terracotta, deckled papers, and warm copper detailing.",
    materials:
      "Sun-bleached Tuscan Ocre & Raw Cotton · Matte Bronze Foil Stamping · Hand-dyed Crepe Silk Ribbon.",
    edition: "Edition 02",
    badge: "Bronze Foil",
    category: "classic",
    startingPrice: 1_850_000,
    currency: "IDR",
    imageUrl: "/images/marketing/sunlit-stationery-table.png",
  },
  {
    id: "copenhagen-suite",
    name: "Copenhagen Reverie",
    description:
      "Nordic minimalism with vellum layers, raw silk, and sculptural blind embossing.",
    materials:
      "Double-thick 700gsm French Moulin Cotton · Deep Tactile Letterpress · Custom Typographic Crest.",
    edition: "Edition 03",
    badge: "700gsm Moulin",
    category: "minimal",
    startingPrice: 2_400_000,
    currency: "IDR",
    imageUrl: "/images/marketing/copper-monogram-paper.png",
  },
  {
    id: "ethereal-botanique-suite",
    name: "Ethereal Botanique",
    description:
      "Stone-washed ivory paper finished with a hand-poured seal and vellum wrap.",
    materials:
      "Stone-washed Ivory Paper · Terracotta Hand-Poured Wax Seal · Olive Botanical Impression · Vellum.",
    edition: "Edition 04",
    badge: "Terracotta Wax",
    category: "bespoke",
    startingPrice: 2_750_000,
    currency: "IDR",
    imageUrl: "/images/marketing/garden-stationery-suite.png",
  },
];
