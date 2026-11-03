"use client";

import { useCart } from "./CartProvider";

export function OpenCartButton({ className = "btn btn-primary" }: { className?: string }) {
  const { open } = useCart();
  return (
    <button type="button" className={className} onClick={open}>
      Open my cart
    </button>
  );
}
