// Cart state kept in localStorage and read through useSyncExternalStore,
// so the server render and first client render both see an empty cart.
import { lineKey, MAX_LINES, MAX_QTY, resolveLine, type CartItem } from "./cart";

const STORAGE_KEY = "luzzau-cart-v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

/** Keep only items that still exist in the catalog, merged and capped. */
function sanitise(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  const merged = new Map<string, CartItem>();
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { productId, variantId, quantity } = entry as Record<string, unknown>;
    if (typeof productId !== "string") continue;
    if (variantId !== undefined && typeof variantId !== "string") continue;
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
    const item: CartItem = { productId, variantId, quantity: Math.floor(quantity) };
    if (item.quantity < 1 || !resolveLine({ ...item, quantity: 1 })) continue;
    const key = lineKey(item);
    const prev = merged.get(key);
    merged.set(key, { ...item, quantity: Math.min(MAX_QTY, (prev?.quantity ?? 0) + item.quantity) });
  }
  return Array.from(merged.values()).slice(0, MAX_LINES);
}

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitise(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  for (const l of listeners) l();
}

export function getSnapshot(): CartItem[] {
  if (!loaded) {
    loaded = true;
    items = readStorage();
  }
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    items = readStorage();
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setItems(next: CartItem[]) {
  items = next.length ? next : EMPTY;
  loaded = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Private mode or storage full: the cart still works for this visit.
  }
  emit();
}
