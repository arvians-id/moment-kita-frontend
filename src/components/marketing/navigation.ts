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

/**
 * A destination is current when the pathname is the route itself or one of its
 * nested routes, so `/templates/elegant-01` still marks Templates as current.
 */
export function isCurrentRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The Products parent is current on any of its product destinations. */
export function isProductRoute(pathname: string): boolean {
  return productNavigation.some((item) => isCurrentRoute(pathname, item.href));
}
