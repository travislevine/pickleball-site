import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = ["", "/technology", "/faq", "/shipping-returns", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...products.map((p) => ({ url: `${base}/paddles/${p.slug}` })),
  ];
}
