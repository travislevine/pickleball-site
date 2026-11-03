"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { useCart } from "./CartProvider";
import { Wordmark } from "./Wordmark";

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-obsidian/80 backdrop-blur-xl" : "border-b border-transparent bg-black"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={open}
            className="relative grid size-10 place-items-center rounded-full hover:bg-line"
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-inferno px-1 text-[0.7rem] font-bold leading-5 text-black">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full hover:bg-line lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-line"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
