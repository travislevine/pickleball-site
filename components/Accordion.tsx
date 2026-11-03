import { ChevronDown } from "lucide-react";

/** Native <details> accordion: keyboard accessible out of the box. */
export function Accordion({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="card divide-y divide-line">
      {items.map((item) => (
        <details key={item.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold">
            <span>{item.q}</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="prose-store pb-5 text-sm">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
