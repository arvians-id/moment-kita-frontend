import type { TemplateDetail } from "@/types";

export const mockTemplates: readonly TemplateDetail[] = [
  {
    key: "elegant-01",
    version: 1,
    rendererKey: "elegant-01@1",
    name: "Le Jardin Minimaliste",
    description:
      "Clean architectural typesetting with botanical chapter breaks and olive accents.",
    category: "Digital",
    thumbnailUrl: "/images/marketing/garden-stationery-suite.png",
    previewImages: ["/images/marketing/garden-stationery-suite.png"],
    features: ["Responsive layout", "Gallery-ready", "Event details"],
  },
  {
    key: "sienna-01",
    version: 1,
    rendererKey: "sienna-01@1",
    name: "Sienna & Solstice",
    description:
      "Sun-washed terracotta, deckled cotton stock, and warm copper detailing.",
    category: "Printed",
    thumbnailUrl: "/images/marketing/hero-stationery-suite.png",
    previewImages: ["/images/marketing/hero-stationery-suite.png"],
    features: ["Letterpress-ready", "Custom monogram", "Artisan paper"],
  },
  {
    key: "nocturne-01",
    version: 1,
    rendererKey: "nocturne-01@1",
    name: "Nocturne Monolith",
    description:
      "A deep editorial canvas with luminous copper accents and dramatic restraint.",
    category: "Digital",
    thumbnailUrl: "/images/marketing/copper-monogram-paper.png",
    previewImages: ["/images/marketing/copper-monogram-paper.png"],
    features: ["Dark editorial mode", "Gallery-ready", "Event details"],
  },
  {
    key: "copenhagen-01",
    version: 1,
    rendererKey: "copenhagen-01@1",
    name: "Copenhagen Reverie",
    description:
      "Nordic minimalism, blind embossing, vellum layers, and raw silk details.",
    category: "Printed",
    thumbnailUrl: "/images/marketing/embossed-cotton-invitation.png",
    previewImages: ["/images/marketing/embossed-cotton-invitation.png"],
    features: ["Blind embossing", "Vellum wrap", "Silk finishing"],
  },
];
