"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/cart";

export function QuantityStepper({
  value,
  onChange,
  label,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "size-8" : "size-10";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border border-line">
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full text-muted hover:text-text disabled:opacity-40`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full text-muted hover:text-text disabled:opacity-40`}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
