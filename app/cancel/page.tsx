import type { Metadata } from "next";
import Link from "next/link";
import { OpenCartButton } from "@/components/OpenCartButton";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false },
};

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <h1 className="display mb-4 text-4xl sm:text-5xl">Checkout cancelled</h1>
      <p className="mb-10 text-lg text-muted">Checkout cancelled – your cart is saved.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <OpenCartButton />
        <Link href="/#shop" className="btn btn-secondary">
          Return to the shop
        </Link>
      </div>
    </div>
  );
}
