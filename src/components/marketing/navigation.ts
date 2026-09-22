export const primaryNavigation = [
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const productNavigation = [
  { href: "/digital", label: "Digital Invitations" },
  { href: "/printed", label: "Printed & Fine Stationery" },
] as const;

export const mobileNavigation = [
  ...productNavigation,
  ...primaryNavigation,
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log In" },
] as const;
