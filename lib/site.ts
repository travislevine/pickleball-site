// Store-wide settings. Change these in one place.
export const site = {
  name: "Luzz Pickleball Australia",
  shortName: "Luzz AU",
  description:
    "Genuine Luzz pickleball paddles shipped Australia-wide. Prices in AUD, GST included. Free standard shipping on orders $150+.",
  email: "hello@example.com", // TODO owner: real contact email
  abn: "", // TODO owner: ABN, shown in the footer when set
  currency: "AUD",
  freeShippingThreshold: 150, // AUD, standard shipping is free at or above this
  standardShippingFee: 9.95, // AUD, only charged below the threshold
  expressShippingFee: 12, // AUD flat
  disclaimer:
    "Luzz Pickleball Australia is an independently owned Australian storefront selling genuine Luzz Pickleball products. It is not operated by Luzz Pickleball (luzzpickleball.com).",
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
