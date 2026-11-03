import Link from "next/link";
import { getPrice, products, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

const dash = "—";

function ProductPrice({ product }: { product: Product }) {
  const prices = product.variants?.map((v) => getPrice(product, v.id)) ?? [product.price];
  const varies = new Set(prices).size > 1;
  return (
    <>
      {varies && "From "}
      {formatPrice(Math.min(...prices))}
    </>
  );
}

/** Uses only values from product.specs; missing values show an em dash. */
export function ComparisonTable() {
  return (
    <div className="card overflow-x-auto" tabIndex={0} role="region" aria-label="Paddle comparison table (scrolls sideways)">
      <table className="w-full min-w-[820px] text-left text-sm">
        <caption className="sr-only">Compare Luzz paddles by specification</caption>
        <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
          <tr>
            {["Paddle", "Core", "Shape", "Thickness", "Swing weight", "Twist weight", "Weight", "Price"].map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-white/[0.02]">
              <th scope="row" className="px-4 py-3 font-semibold">
                <Link href={`/paddles/${p.slug}`} className="hover:text-frozen">
                  {p.name}
                </Link>
              </th>
              <td className="px-4 py-3 text-muted">{p.specs.core || dash}</td>
              <td className="px-4 py-3 text-muted">{p.specs.shape || dash}</td>
              <td className="px-4 py-3 text-muted">{p.specs.thickness || dash}</td>
              <td className="px-4 py-3 text-muted">{p.specs.swingWeight ?? dash}</td>
              <td className="px-4 py-3 text-muted">{p.specs.twistWeight ?? dash}</td>
              <td className="px-4 py-3 text-muted">{p.specs.weight ?? dash}</td>
              <td className="px-4 py-3 font-semibold tabular-nums">
                <ProductPrice product={p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
