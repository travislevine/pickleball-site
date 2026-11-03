import { formatPrice } from "@/lib/format";

export function PriceTag({ price, compareAt, large = false }: { price: number; compareAt?: number; large?: boolean }) {
  const onSale = compareAt !== undefined && compareAt > price;
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className={`${large ? "text-3xl" : "text-lg"} font-bold tabular-nums`}>
        {onSale && <span className="sr-only">Sale price </span>}
        {formatPrice(price)}
      </span>
      {onSale && (
        <s className={`${large ? "text-lg" : "text-sm"} text-muted tabular-nums`}>
          <span className="sr-only">Was </span>
          {formatPrice(compareAt)}
        </s>
      )}
    </p>
  );
}

export function CoreChip({ coreType }: { coreType: "mpp-foam" | "thermoformed-honeycomb" }) {
  return coreType === "mpp-foam" ? (
    <span className="inline-flex rounded-full border border-frozen/40 bg-frozen/10 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-frozen">
      MPP Foam
    </span>
  ) : (
    <span className="inline-flex rounded-full border border-inferno/40 bg-inferno/10 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-inferno">
      Thermoformed
    </span>
  );
}
