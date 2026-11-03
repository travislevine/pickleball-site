import { getCompareAtPrice, getImages, getPrice, getProduct, type Product, type ProductVariant } from "@/data/products";

export const MAX_QTY = 10;
export const MAX_LINES = 20;

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface ResolvedLine {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  compareAtPrice?: number;
  image: string;
  title: string;
}

/**
 * Strict lookup: the product must exist, and the variant must exist for products
 * with variants (and be absent for products without). Unlike getVariant, this
 * never falls back to a default variant.
 */
export function resolveLine(item: CartItem): ResolvedLine | null {
  const product = getProduct(item.productId);
  if (!product || product.id !== item.productId) return null;

  let variant: ProductVariant | undefined;
  if (product.variants?.length) {
    variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant) return null;
  } else if (item.variantId !== undefined) {
    return null;
  }

  return {
    product,
    variant,
    quantity: item.quantity,
    unitPrice: getPrice(product, variant?.id),
    compareAtPrice: getCompareAtPrice(product, variant?.id),
    image: getImages(product, variant?.id)[0],
    title: variant ? `${product.name} – ${variant.name}` : product.name,
  };
}

export function isValidQuantity(q: unknown): q is number {
  return typeof q === "number" && Number.isInteger(q) && q >= 1 && q <= MAX_QTY;
}

export function lineKey(item: Pick<CartItem, "productId" | "variantId">): string {
  return `${item.productId}::${item.variantId ?? ""}`;
}
