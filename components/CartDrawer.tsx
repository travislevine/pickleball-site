"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/format";
import { amountToFreeShipping } from "@/lib/shipping";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
import { useCheckout } from "./useCheckout";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, items, setQuantity, remove } = useCart();
  const { checkout, pending } = useCheckout();
  const panelRef = useRef<HTMLDivElement>(null);
  const toFree = amountToFreeShipping(subtotal);

  // Focus trap, Esc to close, body scroll lock, and focus restore.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-carbon shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 id="cart-title" className="text-lg font-bold">
                Your cart
              </h2>
              <button
                type="button"
                onClick={close}
                className="grid size-9 place-items-center rounded-full text-muted hover:bg-line hover:text-text"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="size-10 text-muted" aria-hidden="true" />
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-muted">Find a paddle that suits your game.</p>
                <Link href="/#shop" onClick={close} className="btn btn-primary">
                  Shop paddles
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4 py-4">
                      <div className="image-well size-20 shrink-0">
                        <Image src={line.image} alt="" fill sizes="80px" className="object-contain p-1" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/paddles/${line.product.slug}${line.variant ? `?variant=${line.variant.id}` : ""}`}
                              onClick={close}
                              className="block truncate font-semibold hover:text-frozen"
                            >
                              {line.product.name}
                            </Link>
                            {line.variant && <p className="truncate text-xs text-muted">{line.variant.name}</p>}
                            <p className="text-xs text-muted">{formatPrice(line.unitPrice)} each</p>
                          </div>
                          <p className="shrink-0 font-semibold tabular-nums">
                            {formatPrice(line.unitPrice * line.quantity)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <QuantityStepper
                            size="sm"
                            value={line.quantity}
                            onChange={(q) => setQuantity(line.key, q)}
                            label={`Quantity for ${line.title}`}
                          />
                          <button
                            type="button"
                            onClick={() => remove(line.key)}
                            className="grid size-8 place-items-center rounded-full text-muted hover:text-inferno"
                            aria-label={`Remove ${line.title}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-line px-5 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-xl font-bold tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted">Prices in AUD, GST included.</p>
                  <p className="text-sm text-frozen">
                    {toFree === 0
                      ? "Free standard shipping on orders $150+."
                      : `Add ${formatPrice(toFree)} for free standard shipping.`}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary w-full py-3 text-base"
                    onClick={() => checkout(items)}
                    disabled={pending}
                  >
                    {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                    {pending ? "Starting checkout…" : "Checkout"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
