import { ComparisonTable } from "@/components/ComparisonTable";
import { HeroTilt } from "@/components/HeroTilt";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustBar } from "@/components/TrustBar";
import { products } from "@/data/products";

export default function HomePage() {
  const cards = Object.fromEntries(products.map((p) => [p.id, <ProductCard key={p.id} product={p} />]));

  return (
    <>
      <HeroTilt />
      <TrustBar />

      <section id="shop" aria-labelledby="shop-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-frozen">The range</p>
            <h2 id="shop-title" className="display text-4xl sm:text-5xl">
              Shop Paddles
            </h2>
          </div>
          <p className="text-sm text-muted">Prices in AUD, GST included.</p>
        </div>
        <ProductGrid products={products} cards={cards} />
      </section>

      <section aria-labelledby="compare-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-frozen">Side by side</p>
        <h2 id="compare-title" className="display mb-8 text-4xl sm:text-5xl">
          Compare the range
        </h2>
        <ComparisonTable />
      </section>
    </>
  );
}
