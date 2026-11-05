"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getCompareAtPrice, getImages, getPrice, type Product } from "@/data/products";
import { freeShippingLine, leadTimeLine } from "@/lib/shipping";
import { BuyButtons } from "./BuyButtons";
import { ImageGallery } from "./ImageGallery";
import { QuantityStepper } from "./QuantityStepper";
import { CoreChip, PriceTag } from "./PriceTag";

/** Reads ?variant= from the URL. Rendered inside Suspense; the fallback is <ProductView> with the default variant. */
export function ProductViewFromUrl({ product }: { product: Product }) {
  const param = useSearchParams().get("variant");
  const match = product.variants?.find((v) => v.id === param);
  return <ProductView product={product} variantId={(match ?? product.variants?.[0])?.id} />;
}

export function ProductView({ product, variantId }: { product: Product; variantId?: string }) {
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants?.find((v) => v.id === variantId);
  const price = getPrice(product, variant?.id);
  const compareAt = getCompareAtPrice(product, variant?.id);
  const images = getImages(product, variant?.id);
  const altBase = variant ? `${product.name} – ${variant.name}` : product.name;

  function selectVariant(id: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", id);
    // Next.js syncs native history updates with useSearchParams; no server round trip.
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <ImageGallery key={variant?.id ?? "default"} images={images} altBase={altBase} />

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <CoreChip coreType={product.coreType} />
            <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
              {product.skillLevel}
            </span>
            {product.specs.certification && (
              <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
                {product.specs.certification} certified
              </span>
            )}
          </div>
          <h1 className="display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="text-lg text-muted">{product.tagline}</p>
        </div>

        <div>
          <PriceTag price={price} compareAt={compareAt} large />
          <p className="mt-1 text-xs text-muted">Prices in AUD.</p>
        </div>

        {product.variants && product.variants.length > 0 && (
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">
              {product.variantLabel ?? "Option"}: <span className="font-normal text-muted">{variant?.name}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const selected = v.id === variant?.id;
                return (
                  <label
                    key={v.id}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-frozen ${
                      selected ? "border-frozen bg-frozen/10 text-frozen" : "border-line text-muted hover:text-text"
                    }`}
                  >
                    <input
                      type="radio"
                      name="variant"
                      value={v.id}
                      checked={selected}
                      onChange={() => selectVariant(v.id)}
                      className="sr-only"
                    />
                    {v.name}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <div className="space-y-3">
          <p className="text-sm font-semibold">Quantity</p>
          <QuantityStepper value={quantity} onChange={setQuantity} label="Quantity" />
        </div>

        <BuyButtons item={{ productId: product.id, variantId: variant?.id, quantity }} />
        <div className="space-y-1 text-sm">
          <p className="text-frozen">{freeShippingLine}.</p>
          <p className="text-muted">{leadTimeLine}</p>
        </div>
      </div>
    </div>
  );
}
