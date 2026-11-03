import Image from "next/image";
import Link from "next/link";
import { getCompareAtPrice, getImages, getPrice, getVariant, type Product } from "@/data/products";
import { BuyButtons } from "./BuyButtons";
import { CoreChip, PriceTag } from "./PriceTag";

export function ProductCard({ product }: { product: Product }) {
  const variant = getVariant(product);
  const price = getPrice(product, variant?.id);
  const compareAt = getCompareAtPrice(product, variant?.id);
  const image = getImages(product, variant?.id)[0];
  const onSale = compareAt !== undefined && compareAt > price;

  return (
    <article className="card group relative flex h-full flex-col p-3 transition duration-300 hover:-translate-y-1 hover:border-[#2c2f36] hover:shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]">
      <div className="image-well">
        <Image
          src={image}
          alt={`${product.name}${variant ? ` – ${variant.name}` : ""} – image 1`}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-inferno px-2.5 py-1 text-xs font-bold uppercase text-black">
            Sale
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight">
            {/* Stretched link: the whole card navigates, the buttons below sit above it. */}
            <Link
              href={`/paddles/${product.slug}`}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-frozen"
            >
              {product.name}
            </Link>
          </h3>
          <CoreChip coreType={product.coreType} />
        </div>
        <p className="text-sm text-muted">{product.tagline}</p>
        <div className="mt-auto space-y-3">
          <PriceTag price={price} compareAt={compareAt} />
          <BuyButtons
            item={{ productId: product.id, variantId: variant?.id, quantity: 1 }}
            size="sm"
            className="relative z-10"
          />
        </div>
      </div>
    </article>
  );
}
