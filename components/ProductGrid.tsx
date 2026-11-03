"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { CATEGORIES, type Product } from "@/data/products";

type CategoryId = (typeof CATEGORIES)[number]["id"];

/** Category tabs + animated grid. Cards are server-rendered and passed in by id. */
export function ProductGrid({ products, cards }: { products: Product[]; cards: Record<string, React.ReactNode> }) {
  const [active, setActive] = useState<CategoryId>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const visible = products.filter((p) => active === "all" || p.category === active);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % CATEGORIES.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = CATEGORIES.length - 1;
    else return;
    e.preventDefault();
    setActive(CATEGORIES[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Paddle categories" className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c, i) => {
          const selected = c.id === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="product-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(c.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected ? "text-black" : "text-muted hover:text-text"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-text"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          );
        })}
      </div>

      <motion.ul
        layout={!reduce}
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              {cards[p.id]}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
