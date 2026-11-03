"use client";

import { Loader2 } from "lucide-react";
import type { CartItem } from "@/lib/cart";
import { useCart } from "./CartProvider";
import { useCheckout } from "./useCheckout";

export function BuyButtons({ item, size = "md", className = "" }: { item: CartItem; size?: "sm" | "md"; className?: string }) {
  const { add } = useCart();
  const { checkout, pending } = useCheckout();
  const pad = size === "sm" ? "px-4 py-2" : "px-6 py-3 text-base";

  return (
    <div className={`flex gap-2 ${className}`}>
      <button type="button" className={`btn btn-secondary flex-1 ${pad}`} onClick={() => add(item)}>
        Add to Cart
      </button>
      <button
        type="button"
        className={`btn btn-primary flex-1 ${pad}`}
        onClick={() => checkout([item])}
        disabled={pending}
      >
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        Buy Now
      </button>
    </div>
  );
}
