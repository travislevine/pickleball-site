"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "@/lib/cart";
import { useToast } from "./ToastProvider";

/** Sends items to /api/checkout and redirects to Stripe Checkout. */
export function useCheckout() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  // Reset the spinner if the browser restores this page from the back/forward cache.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setPending(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  async function checkout(items: CartItem[]) {
    if (pending || items.length === 0) return;
    setPending(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data: { url?: string; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return; // keep the spinner while the browser leaves
      }
      if (data.error === "checkout_not_configured") {
        toast("Checkout isn't connected yet – add your Stripe keys to .env.local.");
      } else {
        toast(data.error || "Something went wrong starting checkout. Please try again.", "error");
      }
    } catch {
      toast("We couldn't reach checkout. Check your connection and try again.", "error");
    }
    setPending(false);
  }

  return { checkout, pending };
}
