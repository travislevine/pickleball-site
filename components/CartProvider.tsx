"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { lineKey, MAX_LINES, MAX_QTY, resolveLine, type CartItem, type ResolvedLine } from "@/lib/cart";
import { getServerSnapshot, getSnapshot, setItems, subscribe } from "@/lib/cart-store";
import { useToast } from "./ToastProvider";

interface CartContextValue {
  items: CartItem[];
  lines: (ResolvedLine & { key: string })[];
  count: number;
  subtotal: number;
  add: (item: CartItem, options?: { open?: boolean }) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const { toast } = useToast();

  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const line = resolveLine(item);
        return line ? [{ ...line, key: lineKey(item) }] : [];
      }),
    [items],
  );

  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0);

  const add = useCallback<CartContextValue["add"]>(
    (item, options) => {
      const line = resolveLine(item);
      if (!line) return;
      const current = getSnapshot();
      const key = lineKey(item);
      const existing = current.find((i) => lineKey(i) === key);
      let next: CartItem[];
      if (existing) {
        const quantity = Math.min(MAX_QTY, existing.quantity + item.quantity);
        if (quantity === existing.quantity) {
          toast(`You can add up to ${MAX_QTY} of each paddle.`);
          return;
        }
        next = current.map((i) => (lineKey(i) === key ? { ...i, quantity } : i));
      } else {
        if (current.length >= MAX_LINES) {
          toast("Your cart is full.", "error");
          return;
        }
        next = [...current, { ...item, quantity: Math.min(MAX_QTY, item.quantity) }];
      }
      setItems(next);
      setAnnouncement(`Added ${line.title} to your cart.`);
      if (options?.open !== false) setIsOpen(true);
    },
    [toast],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    const q = Math.max(1, Math.min(MAX_QTY, Math.floor(quantity)));
    setItems(getSnapshot().map((i) => (lineKey(i) === key ? { ...i, quantity: q } : i)));
    setAnnouncement(`Quantity updated to ${q}.`);
  }, []);

  const remove = useCallback((key: string) => {
    const removed = getSnapshot().find((i) => lineKey(i) === key);
    setItems(getSnapshot().filter((i) => lineKey(i) !== key));
    const line = removed && resolveLine(removed);
    setAnnouncement(line ? `Removed ${line.title} from your cart.` : "Item removed.");
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ items, lines, count, subtotal, add, setQuantity, remove, clear, isOpen, open, close }),
    [items, lines, count, subtotal, add, setQuantity, remove, clear, isOpen, open, close],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite" role="status">
        {announcement}
      </p>
    </CartContext.Provider>
  );
}
