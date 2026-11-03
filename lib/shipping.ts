import { site } from "./site";

export function standardShippingFee(subtotal: number): number {
  return subtotal >= site.freeShippingThreshold ? 0 : site.standardShippingFee;
}

/** How much more the customer needs to spend for free standard shipping (0 when already free). */
export function amountToFreeShipping(subtotal: number): number {
  return Math.max(0, site.freeShippingThreshold - subtotal);
}
