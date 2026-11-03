import type { ProductSpecs } from "@/data/products";

const labels: Record<keyof ProductSpecs, string> = {
  core: "Core",
  thickness: "Thickness",
  shape: "Shape",
  face: "Face",
  length: "Length",
  width: "Width",
  weight: "Weight",
  gripLength: "Grip length",
  gripCircumference: "Grip circumference",
  swingWeight: "Swing weight",
  twistWeight: "Twist weight",
  certification: "Certification",
};

/** Only the spec fields that exist for this product. */
export function SpecTable({ specs }: { specs: ProductSpecs }) {
  const rows = (Object.keys(labels) as (keyof ProductSpecs)[]).filter((k) => specs[k]);
  return (
    <dl className="card divide-y divide-line">
      {rows.map((k) => (
        <div key={k} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 px-5 py-3 text-sm">
          <dt className="text-muted">{labels[k]}</dt>
          <dd className="font-medium">{specs[k]}</dd>
        </div>
      ))}
    </dl>
  );
}
