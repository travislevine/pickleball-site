import { site } from "./site";

export function standardShippingFee(subtotal: number): number {
  return subtotal >= site.freeShippingThreshold ? 0 : site.standardShippingFee;
}

/** How much more the customer needs to spend for free standard shipping (0 when already free). */
export function amountToFreeShipping(subtotal: number): number {
  return Math.max(0, site.freeShippingThreshold - subtotal);
}

/** e.g. "$199+" */
export const freeShippingFrom = `$${site.freeShippingThreshold}+`;

export const freeShippingLine = `Free standard shipping Australia-wide on orders ${freeShippingFrom}`;

export const leadTimeLine = `Sourced to order: dispatched within ${site.sourcingDays} business days.`;
