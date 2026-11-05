// Store-wide settings. Change these in one place.
export const site = {
  name: "Pickleball Sales",
  domain: "pickleballsales.com.au",
  description:
    "Genuine Luzz pickleball paddles, shipped Australia-wide from the Sunshine Coast. Prices in AUD. Free standard shipping on orders $199+.",
  email: "leo@pickleballsales.com.au",
  abn: "22 319 847 270",
  location: "the Sunshine Coast, QLD",
  currency: "AUD",
  freeShippingThreshold: 199, // AUD, standard shipping is free at or above this
  standardShippingFee: 9.95, // AUD, only charged below the threshold
  // Paddles are sourced to order, then shipped.
  sourcingDays: 10, // business days to receive stock from Luzz and dispatch
  deliveryDays: 10, // business days for Australia Post standard delivery after dispatch
  returnsDays: 14,
  disclaimer:
    "Pickleball Sales is an independently owned Australian business selling genuine Luzz Pickleball products. It is not operated by Luzz Pickleball (luzzpickleball.com).",
  privacyUpdated: "5 November 2026",
};

export const navLinks = [
  { href: "/#shop", label: "Shop" },
  { href: "/technology", label: "Technology" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/contact", label: "Contact" },
];

/** Public URL of the site, used for metadata. Checkout falls back to the request origin. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}
